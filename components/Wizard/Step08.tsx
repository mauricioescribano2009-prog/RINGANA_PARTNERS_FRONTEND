"use client";

import ProgressBar from "../ProgressBar/ProgressBar";
import Button from "../Button/Button";

type Props = {
  formData: any;
  onBack: () => void;
  onNext: () => void;
};

export default function Step08({
  formData,
  onBack,
  onNext,
}: Props) {
  return (
    <>
      <ProgressBar current={8} total={12} />

      <h2 className="text-3xl font-bold text-center mb-3">
        Revisa tus datos
      </h2>

      <p className="text-center text-gray-500 mb-8">
        Comprueba que toda la información es correcta antes de crear tu cuenta.
      </p>

      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 space-y-4">

        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Tratamiento</span>
          <span>{formData.salutation}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Nombre</span>
          <span>{formData.firstName} {formData.lastName}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Nacimiento</span>
          <span>{formData.birthDate}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Email</span>
          <span>{formData.email}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-500">NIF/NIE</span>
          <span>{formData.taxNumber}</span>
        </div>

        <hr />

        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Dirección</span>
          <span>{formData.streetName} {formData.streetNumber}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Código Postal</span>
          <span>{formData.postalCode}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Ciudad</span>
          <span>{formData.city}</span>
        </div>

        <hr />

        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Teléfono</span>
          <span>+34 {formData.phoneNumber}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-500">Horario</span>
          <span>{formData.contactSchedule}</span>
        </div>

      </div>

      <div className="mt-10 flex gap-4">

        <button
          onClick={onBack}
          className="flex-1 rounded-xl border border-gray-300 py-5 font-semibold hover:bg-gray-100 transition"
        >
          Atrás
        </button>

        <div className="flex-1">

          <Button
            text="Crear cliente"
            onClick={onNext}
          />

        </div>

      </div>

    </>
  );
}