import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (session.user.role !== "ADMINISTRATOR" && session.user.role !== "MANAGER") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const announcement = await prisma.announcement.findUnique({
      where: { id: params.id },
    });

    if (!announcement) {
      return new NextResponse("Announcement not found", { status: 404 });
    }

    await prisma.announcement.delete({
      where: { id: params.id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}