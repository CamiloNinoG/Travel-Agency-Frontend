// src/components/ImageCaptchaModal.tsx
import { useState } from "react";

interface ImageCaptchaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (success: boolean) => void;
}

interface CaptchaImage {
  url: string;
  isCorrect: boolean;
}

const ImageCaptchaModal: React.FC<ImageCaptchaModalProps> = ({ isOpen, onClose, onVerify }) => {
  const images: CaptchaImage[] = [
    { url: "/images/car1.jpg", isCorrect: true },
    { url: "/images/car2.jpg", isCorrect: true },
    { url: "/images/bike.jpg", isCorrect: false },
    { url: "/images/tree.jpg", isCorrect: false },
    { url: "/images/car3.jpg", isCorrect: true },
    { url: "/images/dog1.jpg", isCorrect: false },
    { url: "/images/car4.jpg", isCorrect: true },
    { url: "/images/dog2.jpg", isCorrect: false },
    { url: "/images/flower.jpg", isCorrect: false },
  ];

  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (index: number) => {
    if (selected.includes(index)) {
      setSelected(selected.filter((i) => i !== index));
    } else {
      setSelected([...selected, index]);
    }
  };

  const handleVerify = () => {
    const isValid = images.every((img, idx) =>
      img.isCorrect ? selected.includes(idx) : !selected.includes(idx)
    );
    onVerify(isValid);
    onClose();
    setSelected([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-2xl w-96">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Selecciona todas las imágenes de autos
        </h2>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={`border-2 rounded-lg overflow-hidden cursor-pointer transition-all duration-200
                ${selected.includes(idx) ? "border-green-500 scale-105" : "border-gray-300"}
              `}
              onClick={() => toggleSelect(idx)}
            >
              <img src={img.url} alt="captcha" className="w-full h-24 object-cover" />
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleVerify}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Validar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCaptchaModal;
