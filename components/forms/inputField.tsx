import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const InputField = ({
  name,
  label,
  placeholder,
  type = "text",
  accept,
  register,
  error,
  validation,
  disabled,
  onChange,
}: FormInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="form-label">
        {label}
      </Label>
      <Input
        id={name}
        type={type}
        accept={accept}
        placeholder={placeholder}
        disabled={disabled}
        className={cn("form-input", {
          "opacity-50 cursor-not-allowed": disabled,
        })}
        {...register(name, validation)}
        onChange={onChange}
      />
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default InputField;
