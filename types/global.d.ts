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
    register: UseFormRegister;
    error?: FieldError;
    validation?: RegisterOptions;
    disabled?: boolean;
    value?: string;
  };
  type SignInFormData = {
    email: string;
    password: string;
  };

  type SignUpFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    image?: File | null;
  };
}

export {};
