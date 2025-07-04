import axios from "axios";
import { LoanFormData } from "../hooks/useFormContext";

export const submitLoanApplication = async (formData: LoanFormData) => {
  try {
    const response = await axios.post("https://dummyjson.com/products/add", {
      title: `${formData.firstName} ${formData.lastName}`,
      amount: formData.amount,
      term: formData.term,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Не удалось отправить заявку"
      );
    }
    throw new Error("Неизвестная ошибка при отправке заявки");
  }
};
