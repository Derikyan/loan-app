import { useForm, useFormContext } from "react-hook-form";
import { useFetchCategories } from "./useFetchCategories";

export type LoanFormData = {
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
  workplace: string;
  address: string;
  amount: number;
  term: number;
};

export function useLoanForm() {
  // called useFetchCategories for further use in context, since we have caching mechanism, request will not be sent for certain time
  useFetchCategories();

  return useForm({
    defaultValues: {
      phone: "",
      firstName: "",
      lastName: "",
      gender: "",
      workplace: "",
      address: "",
      amount: 200,
      term: 10,
    },
  });
}

export function useLoanFormContext() {
  return useFormContext<LoanFormData>();
}
