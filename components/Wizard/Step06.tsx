"use client";

import { useState } from "react";

import ProgressBar from "../ProgressBar/ProgressBar";
import Button from "../Button/Button";

type Props = {
  onBack: () => void;
  onNext: (data: {
    streetName: string;
    streetNumber: string;
    postalCode: string;
    city: string;
    country: string;
  }) => void;
};

export default function Step06({
  onBack,
  onNext,
}: Props) {

  const [streetName, setStreetName] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  const valid =
    streetName.trim() !== "" &&
    streetNumber.trim() !== "" &&
    postalCode.trim() !== "" &&
    city.trim() !== "";

  return (
    <>
      <ProgressBar
        current={6}
        total={12}
      />

      <h2 className="text-3xl font-bold text-center mb-3">
        ¿Dónde vives?
      </h2>

      <p className="text-center text-gray-500 mb-8">
        Introduce tu dirección postal.
      </p>

      <div className="space-y-5">

        <div>
          <label className="block mb-2 font-medium">
            Dirección *
          </label>

          <input
            value={streetName}
            onChange={(e) => setStreetName(e.target.value)}
            placeholder="Calle Mayor"
            className="w-full rounded-xl border border-gray-300 p-4 text-lg outline-none focus:border-green-700"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Número *
          </label>

          <input
            value={streetNumber}
            onChange={(e) => setStreetNumber(e.target.value)}
            placeholder="25-2c"
            className="w-full rounded-xl border border-gray-300 p-4 text-lg outline-none focus:border-green-700"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Código Postal *
          </label>

          <input
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder="28013"
            className="w-full rounded-xl border border-gray-300 p-4 text-lg outline-none focus:border-green-700"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Ciudad *
          </label>

          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Madrid"
            className="w-full rounded-xl border border-gray-300 p-4 text-lg outline-none focus:border-green-700"
          />
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
                streetName: streetName.trim(),
                streetNumber: streetNumber.trim(),
                postalCode: postalCode.trim(),
                city: city.trim(),
                country: "Spain",
              })
            }
          />

        </div>

      </div>

    </>
  );

}