import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const createAnnouncementSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
});

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (session.user.role !== "ADMINISTRATOR" && session.user.role !== "MANAGER") {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const body = await request.json();
    const { title, content } = createAnnouncementSchema.parse(body);

    const announcement = await prisma.announcement.create({
      data: {
        title,
        content,
        authorId: session.user.id,
      },
    });

    return NextResponse.json(announcement, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}