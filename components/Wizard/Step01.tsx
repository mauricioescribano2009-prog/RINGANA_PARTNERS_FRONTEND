"use client";

import { useState } from "react";

import ProgressBar from "../ProgressBar/ProgressBar";
import Button from "../Button/Button";

type Props = {
  onNext: (salutation: "MR" | "MRS") => void;
};

export default function Step01({ onNext }: Props) {

  const [value, setValue] = useState<"MR" | "MRS" | null>(null);

  return (

    <>

      <ProgressBar
        current={1}
        total={12}
      />

      <h2 className="text-3xl font-bold text-center mb-8">
        ¿Cómo debemos dirigirnos a ti?
      </h2>

      <div className="space-y-4 mb-10">

        <button

          onClick={() => setValue("MR")}

          className={`
            w-full
            rounded-xl
            border
            p-5
            text-left
            transition
            ${
              value === "MR"
                ? "border-green-700 bg-green-50"
                : "border-gray-300"
            }
          `}
        >

          Señor

        </button>

        <button

          onClick={() => setValue("MRS")}

          className={`
            w-full
            rounded-xl
            border
            p-5
            text-left
            transition
            ${
              value === "MRS"
                ? "border-green-700 bg-green-50"
                : "border-gray-300"
            }
          `}
        >

          Señora

        </button>

      </div>

      <Button
    text="Siguiente"
    disabled={!value}
    onClick={() => value && onNext(value)}
/>

    </>

  );

}