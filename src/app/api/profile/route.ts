import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const updateProfileSchema = z.object({
  bio: z.string().optional(),
  imageUrl: z.string().url().optional(),
});

export async function PATCH(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { bio, imageUrl } = updateProfileSchema.parse(body);

    const profile = await prisma.profile.update({
      where: { userId: session.user.id },
      data: {
        bio,
        ...(imageUrl && { imageUrl }),
      },
    });

    return NextResponse.json(profile);
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