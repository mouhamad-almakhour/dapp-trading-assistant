"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import { signUp } from "@/lib/actions/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import InputField from "@/components/forms/inputField";

export default function SignUp() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpFormData) => {
    await signUp.email({
      email: data.email,
      password: data.password,
      name: `${data.firstName} ${data.lastName}`,
      image: image ? await convertImageToBase64(image) : "",
      callbackURL: "/dashboard",
      fetchOptions: {
        onResponse: () => {
          setLoading(false);
        },
        onRequest: () => {
          setLoading(true);
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          router.push("/dashboard");
        },
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full max-lg:border-t flex flex-col justify-start">
      <CardHeader>
        <CardTitle className="text-lg md:text-2xl">Sign Up</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <InputField
                  name="firstName"
                  label="First Name"
                  placeholder="First Name"
                  register={register}
                  error={errors.firstName}
                  validation={{
                    required: "First name is required",
                    minLength: 2,
                  }}
                />
              </div>
              <div className="grid gap-2">
                <InputField
                  name="lastName"
                  label="Last Name"
                  placeholder="Last Name"
                  register={register}
                  error={errors.lastName}
                  validation={{
                    required: "Last name is required",
                    minLength: 2,
                  }}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <InputField
                name="email"
                label="Email"
                placeholder="Email"
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
            </div>
            <div className="grid gap-2">
              <InputField
                name="password"
                label="Password"
                placeholder="Password"
                register={register}
                error={errors.password}
                validation={{
                  required: "Password is required",
                  minLength: 8,
                }}
              />
            </div>
            <div className="grid gap-2">
              <InputField
                name="confirmPassword"
                label="Confirm Password"
                placeholder="Confirm Password"
                register={register}
                error={errors.passwordConfirmation}
                validation={{
                  required: "Confirm password is required",
                  minLength: 8,
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Profile Image (optional)</Label>
              <div className="flex items-end gap-4">
                {imagePreview && (
                  <div className="relative w-16 h-16 rounded-sm overflow-hidden">
                    <Image
                      src={imagePreview}
                      alt="Profile preview"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
                <div className="flex items-center gap-2 w-full">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full"
                  />
                  {imagePreview && (
                    <X
                      className="cursor-pointer"
                      onClick={() => {
                        setImage(null);
                        setImagePreview(null);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading || isSubmitting}
            >
              {loading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                "Create your account"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className="flex justify-center w-full border-t py-4">
          <p className="text-center text-xs text-neutral-500">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-orange-400">
              Sign In
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}

async function convertImageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
