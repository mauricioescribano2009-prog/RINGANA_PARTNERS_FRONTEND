"use client";

import { useState } from "react";

import Header from "../Header/Header";
import Button from "../Button/Button";

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

  const [formData, setFormData] = useState({
    salutation: "",
    firstName: "",
    lastName: "",
    birthDate: "",

    email: "",
    newsletter: true,

    taxNumber: "",

    streetName: "",
    streetNumber: "",
    postalCode: "",
    city: "",
    country: "Spain",

    phonePrefix: "0034",
    phoneNumber: "",
    contactSchedule: "09:00-18:00",
  });

  return (
    <>

      {/* ======================================================
          BIENVENIDA
      ====================================================== */}

      {step === 0 && (
        <>
          <Header />

          <Button
            text="Comenzar"
            onClick={() => setStep(1)}
          />
        </>
      )}

      {/* ======================================================
          STEP 01
      ====================================================== */}

      {step === 1 && (
        <Step01
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
          onBack={() => setStep(5)}
          onNext={({
            streetName,
            streetNumber,
            postalCode,
            city,
            country,
          }) => {

            setFormData({
              ...formData,
              streetName,
              streetNumber,
              postalCode,
              city,
              country,
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
          onBack={() => setStep(6)}
          onNext={({
            phonePrefix,
            phoneNumber,
            contactSchedule,
          }) => {

            setFormData({
              ...formData,
              phonePrefix,
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
          formData={formData}

          onBack={() => setStep(7)}

          onNext={async () => {

            try {

              const response = await fetch("/api/create-client", {

                method: "POST",

                headers: {
                  "Content-Type": "application/json",
                },

                body: JSON.stringify(formData),

              });

              const result = await response.json();

              console.clear();

              console.log("RESPUESTA API");

              console.log(result);

              setClientCreated(result.clientCreated);

              setStep(9);

            } catch (error) {

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

    {clientCreated ? (
      <>

        <h2 className="text-3xl font-bold text-green-600 mb-6">
          ✅ Cliente creado correctamente
        </h2>

        <p className="text-lg text-gray-700">
          Tu solicitud se ha enviado correctamente a Ringana.
        </p>

        <p className="text-gray-500 mt-4">
          En breve recibirás un correo electrónico con las instrucciones para completar tu registro.
        </p>

      </>
    ) : (
      <>

        <h2 className="text-3xl font-bold text-red-600 mb-6">
          ❌ No ha sido posible crear el cliente
        </h2>

        <p className="text-lg text-gray-700">
          No hemos podido completar tu registro.
        </p>

        <p className="text-gray-500 mt-4">
          Es posible que el correo electrónico ya exista o que alguno de los datos introducidos necesite revisión.
        </p>

        <p className="text-gray-500 mt-2">
          Si el problema persiste, ponte en contacto con Candela.
        </p>

      </>
    )}

  </div>
)}

    </>
  );

}