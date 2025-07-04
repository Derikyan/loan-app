import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { useLoanFormContext } from "../hooks/useFormContext";
Modal.setAppElement("#root");

export const SuccessModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const { watch, reset } = useLoanFormContext();

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const amount = watch("amount");
  const term = watch("term");

  const handleCloseModal = () => {
    reset();
    onClose();
    navigate("/");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      contentLabel="Успешная отправка"
      className="bg-white p-8 rounded-xl shadow-md w-full max-w-md animate-fade-in mx-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4"
    >
      <h2 className="text-2xl font-bold text-center mb-4">
        Поздравляем, {firstName} {lastName}!
      </h2>
      <p className="text-center mb-6">
        Вам одобрена сумма <span className="font-bold">{amount}$</span> на{" "}
        <span className="font-bold">{term}</span> дней.
      </p>
      <button
        onClick={handleCloseModal}
        className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition"
      >
        Закрыть
      </button>
    </Modal>
  );
};
