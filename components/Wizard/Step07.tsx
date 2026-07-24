"use client";

import { useState } from "react";

import ProgressBar from "../ProgressBar/ProgressBar";
import Button from "../Button/Button";

import { getTranslation } from "@/lib/translations";

type Props = {
  i18n: ReturnType<typeof getTranslation>;

  onBack: () => void;

  onNext: (data: {
    phoneNumber: string;
    contactSchedule: string;
  }) => void;
};

export default function Step07({
  i18n,
  onBack,
  onNext,
}: Props) {

  const [phoneNumber, setPhoneNumber] = useState("");

  const [contactSchedule, setContactSchedule] =
    useState("09:00-18:00");

  const valid =
    phoneNumber.trim().length >= 9;

  return (

    <>

      <ProgressBar
        current={7}
        total={12}
      />

      <h2 className="text-3xl font-bold text-center mb-3">

        {i18n.phone.title}

      </h2>

      <p className="text-center text-gray-500 mb-8">

        {i18n.phone.subtitle}

      </p>

      <div className="space-y-5">

        <div>

          <label className="block mb-2 font-medium">

            {i18n.phone.phone} *

          </label>

          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder={i18n.phone.placeholder}
            className="w-full rounded-xl border border-gray-300 p-4 text-lg outline-none focus:border-green-700"
          />

        </div>

        <div>

          <label className="block mb-2 font-medium">

            {i18n.phone.contactSchedule}

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

            <option value="ANYTIME">
              {i18n.phone.anyTime}
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

          {i18n.common.back}

        </button>

        <div className="flex-1">

          <Button
            text={i18n.common.next}
            disabled={!valid}
            onClick={() =>
              onNext({
                phoneNumber: phoneNumber.trim(),
                contactSchedule,
              })
            }
          />

        </div>

      </div>

    </>

  );

}