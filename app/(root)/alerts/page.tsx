// app/alerts/page.tsx
"use client";

import { useState } from "react";
import { useAlerts } from "@/hooks/useAlerts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Trash2, Plus, Loader2 } from "lucide-react";

export default function AlertsPage() {
  const { alerts, addAlert, removeAlert, loading, error } = useAlerts(null);
  const [threshold, setThreshold] = useState("");
  const [condition, setCondition] = useState<"below" | "above">("below");

  const handleAddAlert = async () => {
    const value = parseFloat(threshold);
    if (isNaN(value) || value <= 0) return;
    try {
      addAlert(value, condition);
      setThreshold("");
    } catch {}
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Manage Alerts</h1>

      {/* Create Alert */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Create New Alert</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="threshold">Gas Price (gwei)</Label>
            <Input
              id="threshold"
              type="number"
              placeholder="30"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Condition</Label>
            <RadioGroup
              value={condition}
              onValueChange={(v) => setCondition(v as "below" | "above")}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="below" id="below" />
                <Label htmlFor="below" className="cursor-pointer">
                  Below threshold
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="above" id="above" />
                <Label htmlFor="above" className="cursor-pointer">
                  Above threshold
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Submit */}
          <Button onClick={handleAddAlert} className="btn-success w-full">
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Plus className="h-4 w-4 mr-2"></Plus>
            )}
            Add Alert
          </Button>
        </CardContent>
      </Card>

      {/* All Alerts List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">All Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className=" h-6 w-6" />
            </div>
          ) : error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : alerts.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No alerts yet. Create one above.
            </p>
          ) : (
            <div className="space-y-2">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium">
                      Gas {alert.condition} {alert.threshold} gwei
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Created {new Date(alert.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <Button
                    className="btn-danger"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeAlert(alert.id).catch(() => {})}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
