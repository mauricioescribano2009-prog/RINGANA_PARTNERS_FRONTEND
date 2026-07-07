"use client";

import { useState } from "react";

import ProgressBar from "../ProgressBar/ProgressBar";
import Button from "../Button/Button";

type Props = {
  onBack: () => void;
  onNext: (data: {
    firstName: string;
    lastName: string;
  }) => void;
};

export default function Step02({
  onBack,
  onNext,
}: Props) {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const isValid =
    firstName.trim() !== "" &&
    lastName.trim() !== "";

  return (

    <>

      <ProgressBar
        current={2}
        total={12}
      />

      <h2 className="text-3xl font-bold text-center mb-3">
        ¿Cómo te llamas?
      </h2>

      <p className="text-center text-gray-500 mb-8">
        Introduce tu nombre y tus apellidos.
      </p>

      {/* Nombre */}

      <div className="mb-5">

        <label className="block mb-2 text-sm font-medium">

          Nombre *

        </label>

        <input

          value={firstName}

          onChange={(e) => setFirstName(e.target.value)}

          placeholder="Nombre"

          className="
            w-full
            rounded-xl
            border
            border-gray-300
            p-4
            text-lg
            outline-none
            focus:border-green-700
          "

        />

      </div>

      {/* Apellidos */}

      <div className="mb-10">

        <label className="block mb-2 text-sm font-medium">

          Apellidos *

        </label>

        <input

          value={lastName}

          onChange={(e) => setLastName(e.target.value)}

          placeholder="Apellidos"

          className="
            w-full
            rounded-xl
            border
            border-gray-300
            p-4
            text-lg
            outline-none
            focus:border-green-700
          "

        />

      </div>

      <div className="flex gap-4">

        <button

          onClick={onBack}

          className="
            flex-1
            rounded-xl
            border
            border-gray-300
            py-5
            font-semibold
            transition
            hover:bg-gray-100
          "

        >

          Atrás

        </button>

        <div className="flex-1">

          <Button

            text="Siguiente"

            disabled={!isValid}

            onClick={() =>
              onNext({
                firstName: firstName.trim(),
                lastName: lastName.trim(),
              })
            }

          />

        </div>

      </div>

    </>

  );

}