import { useLoanFormContext } from "../hooks/useFormContext";
import { useNavigate } from "react-router-dom";
import { useFetchCategories } from "../hooks/useFetchCategories";

const Step2 = () => {
  const navigate = useNavigate();
  const { categories } = useFetchCategories();
  const {
    register,
    formState: { errors },
    trigger,
  } = useLoanFormContext();

  const handleSubmit = async () => {
    const isValid = await trigger(["workplace", "address"]);
    if (isValid) {
      navigate("/step3");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-4">Адрес и работа</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Место работы
        </label>
        <select
          {...register("workplace", {
            required: "Место работы обязательно",
            onChange: () => trigger("workplace"),
          })}
          className={`input w-full ${errors.workplace ? "border-red-500" : ""}`}
          aria-invalid={errors.workplace ? "true" : "false"}
        >
          <option value="">Выберите категорию</option>
          {categories.map((cat) => (
            <option key={cat.slug} value={cat.slug}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.workplace && (
          <p className="mt-1 text-sm text-red-600">
            {errors.workplace.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Адрес проживания
        </label>
        <input
          {...register("address", {
            required: "Адрес обязателен",
            onChange: () => trigger("address"),
          })}
          className={`input w-full ${errors.address ? "border-red-500" : ""}`}
          placeholder="Улица, дом, квартира"
          aria-invalid={errors.address ? "true" : "false"}
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
        )}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition"
        >
          ← Назад
        </button>
        <button
          onClick={handleSubmit}
          type="button"
          className="px-4 py-2 text-white rounded-md transition bg-blue-500 hover:bg-blue-600"
        >
          Продолжить →
        </button>
      </div>
    </div>
  );
};

export default Step2;
