import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { z } from "zod";

const changeEmailSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newEmail: z.string().email("Invalid email address"),
});

export async function PUT(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await request.json();
    const { currentPassword, newEmail } = changeEmailSchema.parse(body);

    // Check if new email is already in use
    const existingUser = await prisma.user.findUnique({
      where: { email: newEmail },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 }
      );
    }

    // Verify current password
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { password: true },
    });

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const passwordMatch = await compare(currentPassword, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Update email
    await prisma.user.update({
      where: { id: session.user.id },
      data: { email: newEmail },
    });

    return NextResponse.json(
      { message: "Email updated successfully" },
      { status: 200 }
    );
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