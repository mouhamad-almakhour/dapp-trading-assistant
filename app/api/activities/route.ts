// app/api/activities/route.ts
import { Activity } from "@/database/models/activity.model";
import { connectToDatabase } from "@/database/mongoose";
import { auth } from "@/lib/better-auth/auth";
import { toActivity } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

// GET recent activities for current user
export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const type = searchParams.get("type");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = { userId: session.user.id };
    if (type) {
      query.type = type;
    }

    const activities = await Activity.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);

    return NextResponse.json(activities.map(toActivity));
  } catch (error) {
    console.error("GET /api/activities error:", error);
    return NextResponse.json(
      { error: "Failed to fetch activities" },
      { status: 500 },
    );
  }
}

// POST create activity (for manual tracking like swaps)
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { type, message, details, metadata } = body;

    if (!type || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    await connectToDatabase();

    const activity = await Activity.create({
      userId: session.user.id,
      type,
      message,
      details: details || null,
      metadata: metadata || {},
      createdAt: Date.now(),
    });

    return NextResponse.json(toActivity(activity), { status: 201 });
  } catch (error) {
    console.error("POST /api/activities error:", error);
    return NextResponse.json(
      { error: "Failed to create activity" },
      { status: 500 },
    );
  }
}
