"use client";

import { useState } from "react";

import ProgressBar from "../ProgressBar/ProgressBar";
import Button from "../Button/Button";

import { COUNTRIES } from "@/lib/countries";
import { getTranslation } from "@/lib/translations";

type Props = {
  i18n: ReturnType<typeof getTranslation>;

  onBack: () =>void;

  onNext: (data: {
    streetName: string;
    streetNumber: string;
    postalCode: string;
    city: string;
    country: string;
    countryCode: string;
    phonePrefix: string;
  }) => void;
};

export default function Step06({
  i18n,
  onBack,
  onNext,
}: Props) {

  const [streetName, setStreetName] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");

  const DEFAULT_COUNTRY =
    COUNTRIES.find(c => c.code === "ES")!;

  const [countryCode, setCountryCode] =
    useState(DEFAULT_COUNTRY.code);

  const selectedCountry =
    COUNTRIES.find(c => c.code === countryCode)!;

   const sortedCountries = [...COUNTRIES].sort((a, b) =>
  i18n.countries[a.code as keyof typeof i18n.countries].localeCompare(
    i18n.countries[b.code as keyof typeof i18n.countries],
    i18n.locale,
    { sensitivity: "base" }
  )
);

  const valid =
    streetName.trim() !== "" &&
    streetNumber.trim() !== "" &&
    postalCode.trim() !== "" &&
    city.trim() !== "" &&
    countryCode !== "";

  return (

    <>

      <ProgressBar
        current={6}
        total={12}
      />

      <h2 className="text-3xl font-bold text-center mb-3">

        {i18n.address.title}

      </h2>

      <p className="text-center text-gray-500 mb-8">

        {i18n.address.subtitle}

      </p>

      <div className="space-y-5">

        <div>

          <label className="block mb-2 font-medium">

            {i18n.address.streetName} *

          </label>

          <input
            value={streetName}
            onChange={(e) => setStreetName(e.target.value)}
            placeholder={i18n.address.streetPlaceholder}
            className="w-full rounded-xl border border-gray-300 p-4 text-lg outline-none focus:border-green-700"
          />

        </div>

        <div>

          <label className="block mb-2 font-medium">

            {i18n.address.streetNumber} *

          </label>

          <input
            value={streetNumber}
            onChange={(e) => setStreetNumber(e.target.value)}
            placeholder={i18n.address.numberPlaceholder}
            className="w-full rounded-xl border border-gray-300 p-4 text-lg outline-none focus:border-green-700"
          />

        </div>

        <div>

          <label className="block mb-2 font-medium">

            {i18n.address.postalCode} *

          </label>

          <input
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            placeholder={i18n.address.postalPlaceholder}
            className="w-full rounded-xl border border-gray-300 p-4 text-lg outline-none focus:border-green-700"
          />

        </div>

        <div>

          <label className="block mb-2 font-medium">

            {i18n.address.city} *

          </label>

          <input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder={i18n.address.cityPlaceholder}
            className="w-full rounded-xl border border-gray-300 p-4 text-lg outline-none focus:border-green-700"
          />

        </div>

        <div>

          <label className="block mb-2 font-medium">

            {i18n.address.country} *

          </label>

          <select
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-4 text-lg outline-none focus:border-green-700"
          >

    {sortedCountries.map(country => (

  <option
    key={country.code}
    value={country.code}
  >

    {i18n.countries[country.code as keyof typeof i18n.countries]}

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

          {i18n.common.back}

        </button>

        <div className="flex-1">

          <Button
            text={i18n.common.next}
            disabled={!valid}
            onClick={() =>
              onNext({
                streetName: streetName.trim(),
                streetNumber: streetNumber.trim(),
                postalCode: postalCode.trim(),
                city: city.trim(),
                country: selectedCountry.name,
                countryCode: selectedCountry.code,
                phonePrefix: selectedCountry.phonePrefix,
              })
            }
          />

        </div>

      </div>

    </>

  );

}