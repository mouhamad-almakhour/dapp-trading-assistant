"use client";

import InputField from "@/components/forms/inputField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/better-auth/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const passwordSchema = z
  .string()
  .min(1, { message: "Password is required" })
  .min(8, { message: "Password must be at least 8 characters" })
  .regex(/[^A-Za-z0-9]/, {
    message: "Password must contain at least one special character",
  });

const updatePasswordSchema = z.object({
  currentPassword: z
    .string()
    .min(1, { message: "Current password is required" }),
  newPassword: passwordSchema,
});

type UpdatePasswordValues = z.infer<typeof updatePasswordSchema>;

export function PasswordForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordValues>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  async function onSubmit({
    currentPassword,
    newPassword,
  }: UpdatePasswordValues) {
    try {
      const result = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      });

      if (result.error) {
        toast.error("Password change failed", {
          description: result.error.message || "Failed to change password",
          position: "top-center",
        });
        return;
      } else {
        toast.success("Password changed successfully!", {
          description: "You can now login with your new password.",
          position: "top-center",
        });
        reset();
      }
    } catch (error) {
      console.error("Error during change password request:", error);
      toast.error("Something went wrong", {
        description: "Please try again",
        position: "top-center",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {/* OAuth users (without a password) can use the "forgot password" flow */}
          <InputField
            name="currentPassword"
            label="Current Password"
            placeholder="Current password"
            register={register}
            type="password"
            error={errors.currentPassword}
            validation={{
              required: "Current password is required",
              minLength: {
                value: 8,
                message: "Current password must be at least 8 characters",
              },
            }}
          />
          <InputField
            name="newPassword"
            label="New Password"
            placeholder="New password"
            register={register}
            type="password"
            error={errors.newPassword}
            validation={{
              required: "New password is required",
              minLength: {
                value: 8,
                message: "New password must be at least 8 characters",
              },
            }}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <p>Change password</p>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
