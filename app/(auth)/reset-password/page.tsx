"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import InputField from "@/components/forms/inputField";
import { toast } from "sonner";
import { resetPassword } from "@/lib/actions/auth.actions";
import { useState } from "react";

export default function ResetPassword() {
  const [passwordResetSuccess, setPasswordResetSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    defaultValues: {
      password: "",
      passwordConfirmation: "",
    },
    mode: "onBlur",
  });
  const onSubmit = async (data: ResetPasswordServerData) => {
    const token = new URLSearchParams(window.location.search).get("token");
    if (!token) {
      toast.error("Invalid token", {
        description: "Please try again",
        position: "top-center",
      });
      return;
    }
    try {
      const result = await resetPassword({ password: data.password, token });
      if (result.error) {
        toast.error("Password reset failed", {
          description: result.error,
          position: "top-center",
        });
        return;
      }
      setPasswordResetSuccess(true);
      toast.success("Password reset successfully!", {
        description: "You can now login with your new password.",
        position: "top-center",
      });
    } catch (error) {
      console.error("Error during reset password request:", error);
      toast.error("Something went wrong", {
        description: "Please try again",
        position: "top-center",
      });
    }
  };

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Reset password</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          {passwordResetSuccess
            ? "Your password has been updated successfully."
            : "Enter your new password to reset it"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!passwordResetSuccess ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <InputField
                  name="password"
                  label="Password"
                  placeholder="Password"
                  register={register}
                  type="password"
                  error={errors.password}
                  validation={{
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  }}
                />
              </div>
              <div className="grid gap-2">
                <InputField
                  name="passwordConfirmation"
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm Password"
                  register={register}
                  error={errors.passwordConfirmation}
                  validation={{
                    required: "Please confirm password",
                    validate: (val: string) =>
                      val === getValues("password") || "Passwords don't match",
                  }}
                />
              </div>
              <Button
                type="submit"
                className=" btn-primary w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <p>Reset password</p>
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle className="text-green-500" size={40} />
            <p className="text-sm text-muted-foreground">
              Your password has been reset successfully.
              <br />
              You can now sign in with your new password.
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="flex justify-center w-full border-t py-4">
          <Link href="/sign-in">
            <Button variant="link" className="px-0 gap-2">
              <ArrowLeft size={15} />
              Back to sign in
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
