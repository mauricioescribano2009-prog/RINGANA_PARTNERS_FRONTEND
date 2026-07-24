"use client";

import { useState } from "react";

import ProgressBar from "../ProgressBar/ProgressBar";
import Button from "../Button/Button";

import { getTranslation } from "@/lib/translations";

type Props = {
  i18n: ReturnType<typeof getTranslation>;

  onBack: () => void;
  onNext: (birthDate: string) => void;
};

export default function Step03({
  i18n,
  onBack,
  onNext,
}: Props) {

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const valid =
    day !== "" &&
    month !== "" &&
    year !== "";

  const years: number[] = [];

  for (let y = new Date().getFullYear(); y >= 1900; y--) {
    years.push(y);
  }

  return (

    <>

      <ProgressBar
        current={3}
        total={12}
      />

      <h2 className="text-3xl font-bold text-center mb-3">
        {i18n.birth.title}
      </h2>

      <p className="text-center text-gray-500 mb-8">
        {i18n.birth.subtitle}
      </p>

      <div className="space-y-5">

        {/* Día */}

        <div>

          <label className="block mb-2 font-medium">

            {i18n.birth.day} *

          </label>

          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-4"
          >

            <option value="">

              {i18n.birth.select}

            </option>

            {Array.from({ length: 31 }, (_, i) => (

              <option
                key={i + 1}
                value={i + 1}
              >

                {i + 1}

              </option>

            ))}

          </select>

        </div>

        {/* Mes */}

        <div>

          <label className="block mb-2 font-medium">

            {i18n.birth.month} *

          </label>

          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-4"
          >

            <option value="">

              {i18n.birth.select}

            </option>

            {i18n.birth.months.map((monthName, index) => (

              <option
                key={index}
                value={String(index + 1).padStart(2, "0")}
              >

                {monthName}

              </option>

            ))}

          </select>

        </div>

        {/* Año */}

        <div>

          <label className="block mb-2 font-medium">

            {i18n.birth.year} *

          </label>

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-4"
          >

            <option value="">

              {i18n.birth.select}

            </option>

            {years.map((y) => (

              <option
                key={y}
                value={y}
              >

                {y}

              </option>

            ))}

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

            onClick={() => {

              const birthDate =
                `${year}-${month}-${day.padStart(2, "0")}`;

              onNext(birthDate);

            }}

          />

        </div>

      </div>

    </>

  );

}