"use client";

import ProgressBar from "../ProgressBar/ProgressBar";
import Button from "../Button/Button";

type StepLayoutProps = {

  step: number;

  totalSteps: number;

  title: string;

  subtitle?: string;

  children: React.ReactNode;

  onBack?: () => void;

  onNext: () => void;

  nextDisabled?: boolean;

  nextText?: string;

};

export default function StepLayout({

  step,

  totalSteps,

  title,

  subtitle,

  children,

  onBack,

  onNext,

  nextDisabled = false,

  nextText = "Siguiente",

}: StepLayoutProps) {

  return (

    <>

      <ProgressBar

        current={step}

        total={totalSteps}

      />

      <h2 className="text-3xl font-bold text-center mb-3">

        {title}

      </h2>

      {subtitle && (

        <p className="text-center text-gray-500 mb-8">

          {subtitle}

        </p>

      )}

      <div className="mb-10">

        {children}

      </div>

      <div className="flex gap-4">

        {onBack && (

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

            Atrás

          </button>

        )}

        <div className="flex-1">

          <Button

            text={nextText}

            onClick={onNext}

            disabled={nextDisabled}

          />

        </div>

      </div>

    </>

  );

}