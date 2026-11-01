import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ready",
    providers: ["credentials", "email", "guest-demo"],
    sessionStorage: "client-persisted",
    engineTarget: "Track B Positional Inverted Index (C++20)",
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email, name, password } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    if (action === "signup" && !name) {
      return NextResponse.json(
        { error: "Full name is required for registration." },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const resolvedName =
      name?.trim() ||
      cleanEmail
        .split("@")[0]
        .replace(/[._-]/g, " ")
        .replace(/\b\w/g, (c: string) => c.toUpperCase());

    const user = {
      id: `usr_${Math.random().toString(36).substring(2, 10)}`,
      name: resolvedName,
      email: cleanEmail,
      role: "Engineer",
      createdAt: new Date().toISOString(),
      settings: {
        theme: "light",
        emailNotifications: true,
        defaultEngineMode: "offline",
        resultsPerPage: 10,
        enableTelemetry: true,
      },
    };

    return NextResponse.json({
      success: true,
      user,
      token: `tok_${Math.random().toString(36).substring(2, 15)}`,
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Malformed authentication request." },
      { status: 400 }
    );
  }
}
