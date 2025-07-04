import { useLoanFormContext } from "../hooks/useFormContext";
import { useNavigate } from "react-router-dom";

const Step1 = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    setValue,
    trigger,
  } = useLoanFormContext();

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "").substring(0, 10);
    let formatted = "";
    if (numbers.length > 0) formatted += numbers.substring(0, 4);
    if (numbers.length > 4) formatted += " " + numbers.substring(4, 7);
    if (numbers.length > 7) formatted += " " + numbers.substring(7, 10);
    return formatted;
  };

  const handlePhoneChange = (e: React.FormEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.currentTarget.value);
    e.currentTarget.value = formatted;
    setValue("phone", formatted, { shouldValidate: true });
  };

  const handleSubmit = async () => {
    const isValid = await trigger();
    if (isValid) {
      navigate("/step2");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center mb-4">Личные данные</h2>

      <div>
        <input
          {...register("phone", {
            required: "Телефон обязателен",
            pattern: {
              value: /^0\d{3} \d{3} \d{3}$/,
              message: "Формат: 0XXX XXX XXX",
            },
          })}
          className={`input w-full ${errors.phone ? "border-red-500" : ""}`}
          placeholder="0XXX XXX XXX"
          onInput={handlePhoneChange}
          type="tel"
          aria-invalid={errors.phone ? "true" : "false"}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("firstName", {
            required: "Имя обязательно",
            pattern: {
              value: /^[A-Za-zА-Яа-яЁё\s-]+$/,
              message: "Имя должно содержать только буквы",
            },
            onChange: () => trigger("firstName"),
          })}
          className={`input w-full ${errors.firstName ? "border-red-500" : ""}`}
          placeholder="Имя"
          aria-invalid={errors.firstName ? "true" : "false"}
        />
        {errors.firstName && (
          <p className="mt-1 text-sm text-red-600">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div>
        <input
          {...register("lastName", {
            required: "Фамилия обязательна",
            pattern: {
              value: /^[A-Za-zА-Яа-яЁё\s-]+$/,
              message: "Фамилия должна содержать только буквы",
            },
            onChange: () => trigger("lastName"),
          })}
          className={`input w-full ${errors.lastName ? "border-red-500" : ""}`}
          placeholder="Фамилия"
          aria-invalid={errors.lastName ? "true" : "false"}
        />
        {errors.lastName && (
          <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <select
          {...register("gender", {
            required: "Пол обязателен",
            onChange: () => trigger("gender"),
          })}
          className={`input w-full ${errors.gender ? "border-red-500" : ""}`}
          aria-invalid={errors.gender ? "true" : "false"}
        >
          <option value="">Выберите пол</option>
          <option value="Мужской">Мужской</option>
          <option value="Женский">Женский</option>
        </select>
        {errors.gender && (
          <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
        )}
      </div>

      <button
        onClick={handleSubmit}
        type="button"
        className="w-full py-3 px-4 text-white font-medium rounded-md transition duration-200 shadow-sm bg-blue-600 hover:bg-blue-700"
      >
        Далее
      </button>
    </div>
  );
};

export default Step1;
