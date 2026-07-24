"use client";

import ProgressBar from "../ProgressBar/ProgressBar";
import Button from "../Button/Button";

import { getTranslation } from "@/lib/translations";

type Props = {
  i18n: ReturnType<typeof getTranslation>;

  onNext: (salutation: "MR" | "MRS") => void;
};

import { useState } from "react";

export default function Step01({
  i18n,
  onNext,
}: Props) {

  const [value, setValue] = useState<"MR" | "MRS" | null>(null);

  return (

    <>

      <ProgressBar
        current={1}
        total={12}
      />

      <h2 className="text-3xl font-bold text-center mb-8">
        {i18n.salutation.title}
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

          {i18n.salutation.mr}

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

          {i18n.salutation.mrs}

        </button>

      </div>

      <Button
        text={i18n.common.next}
        disabled={!value}
        onClick={() => value && onNext(value)}
      />

    </>

  );

}