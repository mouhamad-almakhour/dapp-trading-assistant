"use client";

import InputField from "@/components/forms/inputField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/better-auth/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "better-auth";
import { Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import Image from "next/image";

const updateProfileSchema = z.object({
  name: z.string().trim().min(1, { message: "Name is required" }),
  image: z.string().optional().nullable(),
});

export type UpdateProfileValues = z.infer<typeof updateProfileSchema>;

interface ProfileDetailsFormProps {
  user: User;
}

export function ProfileDetailsForm({ user }: ProfileDetailsFormProps) {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileValues>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: user.name ?? "",
      image: user.image ?? null,
    },
  });

  async function onSubmit(data: UpdateProfileValues) {
    try {
      const { name, image } = data;

      const result = await authClient.updateUser({ name, image });

      if (result.error) {
        toast.error("Failed to update profile", {
          description:
            result.error.message ||
            "An error occurred while updating your profile",
          position: "top-center",
        });
        return;
      } else {
        toast.success("Profile updated successfully!", {
          description: "Your profile has been updated.",
          position: "top-center",
        });
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong", {
        description:
          error instanceof Error ? error.message : "Please try again later.",
        position: "top-center",
      });
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      setValue("image", null);
      setImagePreview(null);
      return;
    }

    const file = files[0];

    if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
      toast.error("Invalid image type", {
        description: "Only PNG, JPG or JPEG images are allowed",
        position: "top-center",
      });
      e.target.value = "";
      setValue("image", null);
      setImagePreview(null);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image too large", {
        description: "Image must be smaller than 2MB",
        position: "top-center",
      });
      e.target.value = "";
      setValue("image", null);
      setImagePreview(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImagePreview(result);
      setValue("image", result); // sets a base64 string — schema is happy
    };
    reader.readAsDataURL(file);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <InputField
            name="Full Name"
            label="Full Name"
            placeholder="Full Name"
            register={register}
            error={errors.name}
            validation={{
              required: "Full name is required",
              minLength: 1,
            }}
          />

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
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
