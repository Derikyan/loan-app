import { useLoanFormContext } from "../hooks/useFormContext";
import { useNavigate } from "react-router-dom";

const Step3 = () => {
  const navigate = useNavigate();
  const {
    register,
    watch,
    formState: { errors },
  } = useLoanFormContext();

  const amount = watch("amount");
  const term = watch("term");

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-4">Параметры займа</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Сумма займа:{" "}
          <span className="font-bold text-blue-600">{amount}$</span>
        </label>
        <input
          type="range"
          min="200"
          max="1000"
          step="100"
          {...register("amount", {
            required: "Укажите сумму",
            valueAsNumber: true,
          })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        {errors.amount && (
          <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Срок займа:{" "}
          <span className="font-bold text-blue-600">{term} дней</span>
        </label>
        <input
          type="range"
          min="10"
          max="30"
          step="1"
          {...register("term", {
            required: "Укажите срок",
            valueAsNumber: true,
          })}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        {errors.term && (
          <p className="mt-1 text-sm text-red-600">{errors.term.message}</p>
        )}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => navigate("/step2")}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition"
        >
          ← Назад
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition disabled:bg-gray-400"
        >
          Отправить
        </button>
      </div>
    </div>
  );
};

export default Step3;
