"use client";

import { useState } from "react";

import ProgressBar from "../ProgressBar/ProgressBar";
import Button from "../Button/Button";

type Props = {
  onBack: () => void;
  onNext: (data: {
    phonePrefix: string;
    phoneNumber: string;
    contactSchedule: string;
  }) => void;
};

export default function Step07({
  onBack,
  onNext,
}: Props) {

  const [phonePrefix, setPhonePrefix] = useState("0034");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [contactSchedule, setContactSchedule] = useState("09:00-18:00");

  const valid =
    phonePrefix.trim() !== "" &&
    phoneNumber.trim().length >= 9;

  return (
    <>
      <ProgressBar
        current={7}
        total={12}
      />

      <h2 className="text-3xl font-bold text-center mb-3">
        ¿Cómo podemos llamarte?
      </h2>

      <p className="text-center text-gray-500 mb-8">
        Introduce tu teléfono de contacto.
      </p>

      <div className="space-y-5">

        <div>

          <label className="block mb-2 font-medium">
            Prefijo *
          </label>

          <input
            value={phonePrefix}
            onChange={(e) => setPhonePrefix(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-4 text-lg outline-none focus:border-green-700"
          />

        </div>

        <div>

          <label className="block mb-2 font-medium">
            Teléfono *
          </label>

          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="600123456"
            className="w-full rounded-xl border border-gray-300 p-4 text-lg outline-none focus:border-green-700"
          />

        </div>

        <div>

          <label className="block mb-2 font-medium">
            Horario de contacto
          </label>

          <select
            value={contactSchedule}
            onChange={(e) => setContactSchedule(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-4"
          >

            <option value="09:00-18:00">
              09:00 - 18:00
            </option>

            <option value="09:00-14:00">
              09:00 - 14:00
            </option>

            <option value="15:00-20:00">
              15:00 - 20:00
            </option>

            <option value="Cualquier hora">
              Cualquier hora
            </option>

          </select>

        </div>

      </div>

      <div className="mt-10 flex gap-4">

        <button
          onClick={onBack}
          className="
            flex-1
            rounded-xl
            border
            border-gray-300
            py-5
            font-semibold
          "
        >
          Atrás
        </button>

        <div className="flex-1">

          <Button
            text="Siguiente"
            disabled={!valid}
            onClick={() =>
              onNext({
                phonePrefix,
                phoneNumber,
                contactSchedule,
              })
            }
          />

        </div>

      </div>

    </>
  );

}