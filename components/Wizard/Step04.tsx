"use client";

import { useState } from "react";

import ProgressBar from "../ProgressBar/ProgressBar";
import Button from "../Button/Button";

type Props = {
  onBack: () => void;
  onNext: (data: {
    email: string;
    newsletter: boolean;
  }) => void;
};

export default function Step04({
  onBack,
  onNext,
}: Props) {

  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(true);

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const valid = emailValid.test(email);

  return (

    <>

      <ProgressBar
        current={4}
        total={12}
      />

      <h2 className="text-3xl font-bold text-center mb-3">
        ¿Cómo podemos contactar contigo?
      </h2>

      <p className="text-center text-gray-500 mb-8">
        Introduce el correo electrónico donde recibirás la confirmación de Ringana.
      </p>

      <div className="mb-6">

        <label className="block mb-2 font-medium">

          Email *

        </label>

        <input

          type="email"

          value={email}

          onChange={(e) => setEmail(e.target.value)}

          placeholder="nombre@email.com"

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

      <label className="flex items-start gap-3 mb-10 cursor-pointer">

        <input

          type="checkbox"

          checked={newsletter}

          onChange={(e) => setNewsletter(e.target.checked)}

          className="mt-1"

        />

        <span>

          Deseo recibir la newsletter de Ringana.

        </span>

      </label>

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

                email,

                newsletter

              })

            }

          />

        </div>

      </div>

    </>

  );

}