"use client";
import InputField from "@/components/forms/inputField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/better-auth/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export const updateEmailSchema = z.object({
  newEmail: z.email({ message: "Enter a valid email" }),
});

export type UpdateEmailValues = z.infer<typeof updateEmailSchema>;

interface EmailFormProps {
  currentEmail: string;
}

export function EmailForm({ currentEmail }: EmailFormProps) {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<UpdateEmailValues>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: {
      newEmail: currentEmail,
    },
  });

  async function onSubmit(data: UpdateEmailValues) {
    const result = await authClient.changeEmail({
      newEmail: data.newEmail,
      callbackURL: "/dashboard",
    });

    if (result.error) {
      toast.error("Sign up failed", {
        description: result.error.message || "Failed to change email",
        position: "top-center",
      });
      return;
    } else {
      toast.success("Email changed successfully!", {
        description: "Verification email sent to your current address",
        position: "top-center",
      });
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Email</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <InputField
            name="newEmail"
            label="Email"
            placeholder={currentEmail}
            type="email"
            register={register}
            error={errors.newEmail}
            validation={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Update Email"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
