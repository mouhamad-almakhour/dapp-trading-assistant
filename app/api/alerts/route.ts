// app/api/alerts/route.ts
import { NextRequest, NextResponse } from "next/server";

import { connectToDatabase } from "@/database/mongoose";
import { toAlert } from "@/lib/utils";
import { Alert } from "@/database/models/alert.model";
import { Activity } from "@/database/models/activity.model";
import { auth } from "@/lib/better-auth/auth";

// GET all alerts for current user
export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const alerts = await Alert.find({ userId: session.user.id }).sort({
      createdAt: -1,
    });

    return NextResponse.json(alerts.map(toAlert));
  } catch (error) {
    console.error("GET /api/alerts error:", error);
    return NextResponse.json(
      { error: "Failed to fetch alerts" },
      { status: 500 },
    );
  }
}

// POST create new alert
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { threshold, condition, type = "gas" } = body;

    if (!threshold || !condition) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (typeof threshold !== "number" || threshold <= 0) {
      return NextResponse.json({ error: "Invalid threshold" }, { status: 400 });
    }

    if (!["below", "above"].includes(condition)) {
      return NextResponse.json({ error: "Invalid condition" }, { status: 400 });
    }

    await connectToDatabase();

    // Create alert
    const alert = await Alert.create({
      userId: session.user.id,
      type,
      condition,
      threshold,
      active: true,
      triggered: false,
      createdAt: Date.now(),
      lastTriggeredAt: null,
      updatedAt: Date.now(),
    });

    // Create activity
    await Activity.create({
      userId: session.user.id,
      type: "alert_created",
      message: `Created alert: Gas ${condition} ${threshold} gwei`,
      details: `Alert will trigger when gas is ${condition} ${threshold} gwei`,
      metadata: {
        alertId: alert._id.toString(),
        threshold,
        condition,
      },
      createdAt: Date.now(),
    });

    return NextResponse.json(toAlert(alert), { status: 201 });
  } catch (error) {
    console.error("POST /api/alerts error:", error);
    return NextResponse.json(
      { error: "Failed to create alert" },
      { status: 500 },
    );
  }
}
