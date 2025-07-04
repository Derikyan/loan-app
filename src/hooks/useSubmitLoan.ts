import React from "react";
import { submitLoanApplication } from "../api/loanService";
import { LoanFormData } from "./useFormContext";

export function useSubmitLoan({ onSuccess }: { onSuccess: () => void }) {
  return React.useCallback(
    async (values: LoanFormData) => {
      try {
        await submitLoanApplication(values);
        onSuccess();
      } catch (error: unknown) {
        let errorMessage = "Неизвестная ошибка";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        console.error("Ошибка при отправке заявки:", error, errorMessage);
      } finally {
      }
    },
    [onSuccess]
  );
}
