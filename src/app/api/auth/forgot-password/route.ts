import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import crypto from 'crypto';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = forgotPasswordSchema.parse(body);

    // Generate reset token
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000); // 1 hour from now

    // Store the token
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    // In a real application, you would send an email here with the reset link
    // For now, we'll just return success
    // The reset link would be something like: ${process.env.NEXTAUTH_URL}/reset-password?token=${token}

    return NextResponse.json(
      { message: 'Password reset instructions sent' },
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
      { message: 'Something went wrong' },
      { status: 500 }
    );
  }
}