"use client";

import { useEffect, useState } from "react";

import { getPartner } from "@/lib/getPartner";

import { LANGUAGES } from "@/lib/languages";

import { COUNTRIES } from "@/lib/countries";

import Header from "../Header/Header";
import Button from "../Button/Button";
import { getTranslation } from "@/lib/translations";

import Step01 from "./Step01";
import Step02 from "./Step02";
import Step03 from "./Step03";
import Step04 from "./Step04";
import Step05 from "./Step05";
import Step06 from "./Step06";
import Step07 from "./Step07";
import Step08 from "./Step08";

export default function Wizard() {

  const [step, setStep] = useState(0);

  const [clientCreated, setClientCreated] = useState<boolean | null>(null);
  
  const [loadingDots, setLoadingDots] = useState("");

  const [partner, setPartner] = useState<{

  country: string;
  partner_location: string;
  partner_language: string;
  partner_code: string;
  partner_name: string;
  ringana_email: string;
  n8n_credential: string;
  
} | null>(null);

useEffect(() => {

  async function loadPartner() {

    try {

      const data = await getPartner();

      console.log("PARTNER DETECTADO");

      console.log(data);

      setPartner(data);

    } catch (error) {

      console.error(error);

      alert("No se ha podido identificar el partner.");

    }

  }

  loadPartner();

}, []);


const [formData, setFormData] = useState({

  // ==========================================
  // INTERNACIONALIZACIÓN
  // ==========================================

  assistantLanguage: "es",

  countryCode: "ES",

  phonePrefix: "0034",

  // ==========================================
  // DATOS PERSONALES
  // ==========================================

  salutation: "",
  firstName: "",
  lastName: "",
  birthDate: "",

  email: "",
  newsletter: true,

  taxNumber: "",

  // ==========================================
  // DIRECCIÓN
  // ==========================================

  streetName: "",
  streetNumber: "",
  postalCode: "",
  city: "",
  country: "Spain",

  // ==========================================
  // CONTACTO
  // ==========================================

  phoneNumber: "",
  contactSchedule: "09:00-18:00",

});

const t = getTranslation(formData.assistantLanguage);

console.log("Idioma:", formData.assistantLanguage, t);

  return (
    <>

      {/* ======================================================
          BIENVENIDA
      ====================================================== */}

      {step === 0 && (
  <>
    <Header />

<h2 className="text-3xl font-bold text-center mb-3">
  {t.welcome.title}
</h2>

<p className="text-center text-gray-500 mb-8">
  {t.welcome.subtitle}
</p>

<div className="max-w-md mx-auto mb-8">

  <label className="block text-center text-lg font-semibold mb-6">
    {t.welcome.languageLabel}
  </label>

  <select
    className="w-full rounded-lg border border-gray-300 p-3 text-lg"
    value={formData.assistantLanguage}
    onChange={(e) =>
      setFormData({
        ...formData,
        assistantLanguage: e.target.value,
      })
    }
  >
    {LANGUAGES.map((language) => (
      <option
        key={language.code}
        value={language.code}
      >
        {language.label}
      </option>
    ))}
  </select>

</div>

    <Button
  text={t.common.start}
  onClick={() => setStep(1)}
/>

  </>
)}

      {/* ======================================================
          STEP 01
      ====================================================== */}

      {step === 1 && (
  <Step01
    i18n={t}
    onNext={(salutation) => {

      setFormData({
        ...formData,
        salutation,
      });

      setStep(2);

    }}
  />
)}

      {/* ======================================================
          STEP 02
      ====================================================== */}

      {step === 2 && (
        <Step02
        i18n={t}

          onBack={() => setStep(1)}
          onNext={({ firstName, lastName }) => {

            setFormData({
              ...formData,
              firstName,
              lastName,
            });

            setStep(3);

          }}
        />
      )}

      {/* ======================================================
          STEP 03
      ====================================================== */}

      {step === 3 && (
        <Step03
        i18n={t}
          onBack={() => setStep(2)}
          onNext={(birthDate) => {

            setFormData({
              ...formData,
              birthDate,
            });

            setStep(4);

          }}
        />
      )}

      {/* ======================================================
          STEP 04
      ====================================================== */}

      {step === 4 && (
        <Step04
        i18n={t}
          onBack={() => setStep(3)}
          onNext={({ email, newsletter }) => {

            setFormData({
              ...formData,
              email,
              newsletter,
            });

            setStep(5);

          }}
        />
      )}

      {/* ======================================================
          STEP 05
      ====================================================== */}

      {step === 5 && (
        <Step05
        i18n={t}
          onBack={() => setStep(4)}
          onNext={(taxNumber) => {

            setFormData({
              ...formData,
              taxNumber,
            });

            setStep(6);

          }}
        />
      )}

      {/* ======================================================
          STEP 06
      ====================================================== */}

      {step === 6 && (
        <Step06
        i18n={t}
          onBack={() => setStep(5)}
     onNext={({
  streetName,
  streetNumber,
  postalCode,
  city,
  country,
  countryCode,
  phonePrefix,
}) => {

  setFormData({
    ...formData,
    streetName,
    streetNumber,
    postalCode,
    city,
    country,
    countryCode,
    phonePrefix,
  });

  setStep(7);

}}
        />
      )}

      {/* ======================================================
          STEP 07
      ====================================================== */}

   {step === 7 && (
  <Step07
    i18n={t}
    onBack={() => setStep(6)}
    onNext={({
      phoneNumber,
      contactSchedule,
    }) => {

      setFormData({
        ...formData,
        phoneNumber,
        contactSchedule,
      });

      setStep(8);

    }}
  />
)}

      {/* ======================================================
          STEP 08
      ====================================================== */}

      {step === 8 && (
        <Step08
        i18n={t}
          formData={formData}

          onBack={() => setStep(7)}

          onNext={async () => {

            if (!partner) {

  alert("Partner no cargado.");

  return;

}

  try {

    console.log("==================================");
    console.log("FORMDATA ANTES DEL FETCH");
    console.log("==================================");

    console.table({
      country: formData.country,
      countryCode: formData.countryCode,
      phonePrefix: formData.phonePrefix,
      phoneNumber: formData.phoneNumber,
    });


    const response = await fetch("/api/create-client", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

body: JSON.stringify({

  ...formData,

  client_country: formData.country,

  country: partner.country,

  partner_code: partner.partner_code,

  partner_name: partner.partner_name,

  partner_location: partner.partner_location,

  partner_language: partner.partner_language,

  ringana_email: partner.ringana_email,

  n8n_credential: partner.n8n_credential,

}),

    });

    const result = await response.json();

    console.clear();

    console.log("RESPUESTA API");
    console.log(result);

    if (!response.ok) {

      setClientCreated(false);
      setStep(9);
      return;

    }

    const leadId = result.lead_id;

    console.log("Lead:", leadId);

    setClientCreated(null);

setStep(9);

let dots = "";

const interval = setInterval(() => {

  dots = dots.length >= 3 ? "" : dots + ".";

  setLoadingDots(dots);

}, 500);

let finished = false;

while (!finished) {

  await new Promise(resolve => setTimeout(resolve, 2000));

  const statusResponse = await fetch(
    "/api/lead-status?lead_id=" + leadId
  );

  const status = await statusResponse.json();

  console.log(status);

  if (status.status === "CLIENT_CREATION_IN_PROGRESS") {

    continue;

  }

  if (status.status === "CLIENT_CREATED") {

    setClientCreated(true);
    finished = true;
    break;

  }

  if (status.status === "CLIENT_CREATION_ERROR") {

    setClientCreated(false);
    finished = true;
    break;

  }

  console.error("Estado inesperado:", status);

}

clearInterval(interval);

setLoadingDots("");

setStep(9);

  }

  catch (error) {

    console.error(error);

    alert("Error llamando a la API.");

  }

}}
        />
      )}

      {/* ======================================================
          STEP 09
      ====================================================== */}

   {step === 9 && (
  <div className="text-center max-w-xl mx-auto">

    {clientCreated === null ? (

      <>

        <h2 className="text-3xl font-bold text-blue-600 mb-6">
          {t.status.creatingTitle}{loadingDots}
        </h2>

        <p className="text-lg text-gray-700">
          {t.status.creatingText}
        </p>

        <p className="text-gray-500 mt-4">
          {t.status.creatingInfo}
        </p>

      </>

    ) : clientCreated ? (

      <>

        <h2 className="text-3xl font-bold text-green-600 mb-6">
          {t.status.successTitle}
        </h2>

        <p className="text-lg text-gray-700">
          {t.status.successText}
        </p>

        <p className="text-gray-500 mt-4">
          {t.status.successInfo}
        </p>

      </>

    ) : (

      <>

        <h2 className="text-3xl font-bold text-red-600 mb-6">
          {t.status.errorTitle}
        </h2>

        <p className="text-lg text-gray-700">
          {t.status.errorText}
        </p>

        <p className="text-gray-500 mt-4">
          {t.status.errorInfo}
        </p>

        <p className="text-gray-500 mt-2">
          {t.status.errorContact}
        </p>

      </>

    )}

  </div>
)}

    </>
  );

}