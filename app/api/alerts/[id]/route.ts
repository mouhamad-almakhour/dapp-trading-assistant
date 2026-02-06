// app/api/alerts/[id]/route.ts
import { Activity } from "@/database/models/activity.model";
import { Alert } from "@/database/models/alert.model";
import { connectToDatabase } from "@/database/mongoose";
import { auth } from "@/lib/better-auth/auth";
import { toAlert } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

// PATCH update alert (toggle active, update triggered status)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await connectToDatabase();

    const alert = await Alert.findOne({
      _id: id,
      userId: session.user.id,
    });

    if (!alert) {
      return NextResponse.json({ error: "Alert not found" }, { status: 404 });
    }

    // Update fields
    if (body.triggered !== undefined) {
      alert.triggered = body.triggered;

      if (body.triggered && !alert.lastTriggeredAt) {
        alert.lastTriggeredAt = Date.now();

        // Create activity for first trigger
        await Activity.create({
          userId: session.user.id,
          type: "alert_triggered",
          message: `Alert triggered: Gas ${alert.condition} ${alert.threshold} gwei`,
          details: "Your alert condition was met",
          metadata: {
            alertId: alert._id.toString(),
            threshold: alert.threshold,
            condition: alert.condition,
          },
          createdAt: Date.now(),
        });
      }
    }

    if (body.active !== undefined) {
      alert.active = body.active;
    }

    if (body.lastTriggeredAt !== undefined) {
      alert.lastTriggeredAt = body.lastTriggeredAt;
    }

    alert.updatedAt = Date.now();
    await alert.save();

    return NextResponse.json(toAlert(alert));
  } catch (error) {
    console.error("PATCH /api/alerts/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to update alert" },
      { status: 500 },
    );
  }
}

// DELETE alert
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = await params;
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const alert = await Alert.findOne({
      _id: id,
      userId: session.user.id,
    });

    if (!alert) {
      return NextResponse.json({ error: "Alert not found" }, { status: 404 });
    }

    // Create activity before deleting
    await Activity.create({
      userId: session.user.id,
      type: "alert_deleted",
      message: `Deleted alert: Gas ${alert.condition} ${alert.threshold} gwei`,
      details: null,
      metadata: {
        alertId: alert._id.toString(),
        threshold: alert.threshold,
        condition: alert.condition,
      },
      createdAt: Date.now(),
    });

    await Alert.deleteOne({ _id: id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/alerts/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete alert" },
      { status: 500 },
    );
  }
}
