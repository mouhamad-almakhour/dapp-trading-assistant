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

import { useState } from "react";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import InputField from "@/components/forms/inputField";
import { signUpWithEmail } from "@/lib/actions/auth.actions";

export default function SignUp() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      image: undefined,
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      let imageBase64: string | undefined;

      if (data.image?.[0]) {
        imageBase64 = await convertImageToBase64(data.image[0]);
      }

      const result = await signUpWithEmail({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        image: imageBase64,
      });

      if (!result.success) {
        toast.error("Sign up failed", {
          description: result.error,
          position: "top-center",
        });
        return;
      }

      toast.success("Account created!", {
        description: "You have successfully signed up.",
        position: "top-center",
      });

      router.push("/dashboard");
    } catch (error) {
      toast.error("Something went wrong", {
        description:
          error instanceof Error ? error.message : "Please try again later.",
        position: "top-center",
      });
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      setValue("image", undefined); // reset the form field
      setImagePreview(null);
      return;
    }

    const file = files[0];

    // Validate file type
    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      toast.error("Invalid image type", {
        description: "Only PNG, JPG or JPEG images are allowed",
        position: "top-center",
      });
      e.target.value = "";
      setValue("image", undefined); // reset RHF field
      setImagePreview(null);
      return;
    }

    // Update React Hook Form
    setValue("image", files);

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
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
                    minLength: 1,
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
                    minLength: 1,
                  }}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <InputField
                name="email"
                label="Email"
                placeholder="Email"
                type="email"
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
            <div className="grid gap-2">
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
                  <InputField
                    name="image"
                    label="Profile Image (optional)"
                    placeholder="Profile Image"
                    register={register}
                    type="file"
                    error={errors.image}
                    accept=".png,.jpg,.jpeg"
                    validation={{
                      validate: {
                        fileType: (files: FileList) => {
                          if (!files?.length) return true;
                          const file = files[0];
                          // Check MIME type (image/png, image/jpeg, etc)
                          const allowedTypes = [
                            "image/png",
                            "image/jpeg",
                            "image/jpg",
                          ];
                          return (
                            allowedTypes.includes(file.type) ||
                            "Only PNG, JPG or JPEG images are allowed"
                          );
                        },
                        fileSize: (files: FileList) => {
                          if (!files?.length) return true;
                          return (
                            files[0].size <= 2 * 1024 * 1024 ||
                            "Image must be smaller than 2MB"
                          );
                        },
                      },
                    }}
                    onChange={handleImageChange}
                  />

                  {imagePreview && (
                    <X
                      className="cursor-pointer"
                      onClick={() => {
                        const fileInput = document.querySelector(
                          'input[name="image"]',
                        ) as HTMLInputElement;
                        if (fileInput) {
                          fileInput.value = "";
                        }
                        setImagePreview(null);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
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
