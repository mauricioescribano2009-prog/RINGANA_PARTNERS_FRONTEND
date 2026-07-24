"use client";

import { useState } from "react";

import ProgressBar from "../ProgressBar/ProgressBar";
import Button from "../Button/Button";

import { getTranslation } from "@/lib/translations";

type Props = {
  i18n: ReturnType<typeof getTranslation>;

  onBack: () => void;
  onNext: (taxNumber: string) => void;
};

export default function Step05({
  i18n,
  onBack,
  onNext,
}: Props) {

  const [taxNumber, setTaxNumber] = useState("");

  const valid = taxNumber.trim().length >= 8;

  return (

    <>

      <ProgressBar
        current={5}
        total={12}
      />

      <h2 className="text-3xl font-bold text-center mb-3">

        {i18n.tax.title}

      </h2>

      <p className="text-center text-gray-500 mb-8">

        {i18n.tax.subtitle}

      </p>

      <div className="mb-10">

        <label className="block mb-2 font-medium">

          {i18n.tax.label} *

        </label>

        <input

          value={taxNumber}

          onChange={(e) =>
            setTaxNumber(
              e.target.value.toUpperCase()
            )
          }

          placeholder={i18n.tax.placeholder}

          className="
            w-full
            rounded-xl
            border
            border-gray-300
            p-4
            text-lg
            uppercase
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

          {i18n.common.back}

        </button>

        <div className="flex-1">

          <Button

            text={i18n.common.next}

            disabled={!valid}

            onClick={() =>
              onNext(
                taxNumber.trim()
              )
            }

          />

        </div>

      </div>

    </>

  );

}