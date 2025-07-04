import { FormProvider } from "react-hook-form";
import { useLoanForm } from "./hooks/useFormContext";
import React, { useState } from "react";
import { useSubmitLoan } from "./hooks/useSubmitLoan";
import { SuccessModal } from "./components/SuccessModal";

interface FormWrapperProps {
  children?: React.ReactNode;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children }) => {
  const formMethods = useLoanForm();
  const [isOpen, setIsOpen] = useState(false);

  const save = useSubmitLoan({
    onSuccess: () => {
      setIsOpen(true);
    },
  });

  const formSubmit = formMethods.handleSubmit(save);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <FormProvider {...formMethods}>
        <form
          onSubmit={formSubmit}
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-md animate-fade-in"
        >
          {children}
        </form>
        <SuccessModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </FormProvider>
    </div>
  );
};

export default FormWrapper;
