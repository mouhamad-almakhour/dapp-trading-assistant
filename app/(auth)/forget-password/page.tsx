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

import { ArrowLeft, Loader2, MailCheck } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import InputField from "@/components/forms/inputField";
import { toast } from "sonner";
import { forgetPasswordRequest } from "@/lib/actions/auth.actions";
import { useState } from "react";

export default function ForgetPassword() {
  const [emailSent, setEmailSent] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordFormValues>({
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });

  function maskEmail(email: string) {
    const [name, domain] = email.split("@");
    if (!name || !domain) return "";

    const visible = name.slice(0, 2);
    return `${visible}***@${domain}`;
  }

  const onSubmit = async (data: ForgetPasswordServerData) => {
    try {
      const result = await forgetPasswordRequest({ email: data.email });

      if (!result.success) {
        toast.error("Failed to send reset link", {
          description: result.error,
          position: "top-center",
        });
        return;
      }
      setSubmittedEmail(data.email);
      setEmailSent(true);
      toast.success("Reset link sent!", {
        description: "Check your email for the password reset link.",
        position: "top-center",
      });
    } catch (error) {
      console.error("Error during forget password request:", error);
      toast.error("Something went wrong", {
        description: "Please try again",
        position: "top-center",
      });
    }
  };

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Forgot password</CardTitle>

        <CardDescription className="text-xs md:text-sm">
          {emailSent
            ? "If the email exists, a reset link was sent."
            : "Enter your email to reset your password"}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {!emailSent ? (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <InputField
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              register={register}
              error={errors.email}
              validation={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Send reset link"
              )}
            </Button>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <MailCheck className="text-primary" size={40} />
            <p className="text-sm text-muted-foreground">
              We sent a password reset link to
              <br />
              <span className="font-medium text-foreground">
                {maskEmail(submittedEmail)}
              </span>
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
