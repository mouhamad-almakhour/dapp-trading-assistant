declare global {
  interface Feature {
    id: number;
    title: string;
    description: string;
    image: string;
  }
  type FormInputProps = {
    name: string;
    label: string;
    placeholder: string;
    type?: string;
    accept?: string;
    register: UseFormRegister;
    error?: FieldError;
    validation?: RegisterOptions;
    disabled?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  type SignInFormData = {
    email: string;
    password: string;
    rememberMe?: boolean;
  };

  type SignUpFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    image?: FileList;
  };

  type SignUpServerData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    image?: string; // base64 string
  };
  type ForgetPasswordFormValues = {
    email: string;
  };
}
export {};
