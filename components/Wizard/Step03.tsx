"use client";

import { useState } from "react";

import ProgressBar from "../ProgressBar/ProgressBar";
import Button from "../Button/Button";

type Props = {
  onBack: () => void;
  onNext: (birthDate: string) => void;
};

export default function Step03({
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

  const years = [];

  for (let y = new Date().getFullYear(); y >= 1900; y--) {
    years.push(y);
  }

  return (

    <>

      <ProgressBar current={3} total={12} />

      <h2 className="text-3xl font-bold text-center mb-3">
        ¿Cuándo naciste?
      </h2>

      <p className="text-center text-gray-500 mb-8">
        Necesitamos tu fecha de nacimiento.
      </p>

      <div className="space-y-5">

        <div>

          <label className="block mb-2 font-medium">

            Día *

          </label>

          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-4"
          >

            <option value="">Selecciona...</option>

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

        <div>

          <label className="block mb-2 font-medium">

            Mes *

          </label>

          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-4"
          >

            <option value="">Selecciona...</option>

            <option value="01">Enero</option>
            <option value="02">Febrero</option>
            <option value="03">Marzo</option>
            <option value="04">Abril</option>
            <option value="05">Mayo</option>
            <option value="06">Junio</option>
            <option value="07">Julio</option>
            <option value="08">Agosto</option>
            <option value="09">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>

          </select>

        </div>

        <div>

          <label className="block mb-2 font-medium">

            Año *

          </label>

          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-4"
          >

            <option value="">Selecciona...</option>

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
          "
        >

          Atrás

        </button>

        <div className="flex-1">

          <Button

            text="Siguiente"

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