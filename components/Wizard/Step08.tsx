"use client";

import ProgressBar from "../ProgressBar/ProgressBar";
import Button from "../Button/Button";

import { getTranslation } from "@/lib/translations";

type Props = {
  i18n: ReturnType<typeof getTranslation>;

  formData: any;

  onBack: () => void;

  onNext: () => void;
};

export default function Step08({
  i18n,
  formData,
  onBack,
  onNext,
}: Props) {

  const contactScheduleLabel =
    formData.contactSchedule === "ANYTIME"
      ? i18n.phone.anyTime
      : formData.contactSchedule;

  return (

    <>

      <ProgressBar
        current={8}
        total={12}
      />

      <h2 className="text-3xl font-bold text-center mb-3">

        {i18n.review.title}

      </h2>

      <p className="text-center text-gray-500 mb-8">

        {i18n.review.subtitle}

      </p>

      <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6 space-y-4">

        <div className="flex justify-between">
          <span className="font-medium text-gray-500">
            {i18n.review.salutation}
          </span>
          <span>{formData.salutation}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-500">
            {i18n.review.name}
          </span>
          <span>
            {formData.firstName} {formData.lastName}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-500">
            {i18n.review.birthDate}
          </span>
          <span>{formData.birthDate}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-500">
            {i18n.review.email}
          </span>
          <span>{formData.email}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-500">
            {i18n.review.identityDocument}
          </span>
          <span>{formData.taxNumber}</span>
        </div>

        <hr />

        <div className="flex justify-between">
          <span className="font-medium text-gray-500">
            {i18n.review.address}
          </span>
          <span>
            {formData.streetName} {formData.streetNumber}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-500">
            {i18n.review.postalCode}
          </span>
          <span>{formData.postalCode}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-500">
            {i18n.review.city}
          </span>
          <span>{formData.city}</span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-500">
            {i18n.review.country}
          </span>
          <span>{formData.country}</span>
        </div>

        <hr />

        <div className="flex justify-between">
          <span className="font-medium text-gray-500">
            {i18n.review.phone}
          </span>
          <span>
            +{formData.phonePrefix.replace(/^00/, "")} {formData.phoneNumber}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium text-gray-500">
            {i18n.review.contactSchedule}
          </span>
          <span>{contactScheduleLabel}</span>
        </div>

      </div>

      <div className="mt-10 flex gap-4">

        <button
          onClick={onBack}
          className="flex-1 rounded-xl border border-gray-300 py-5 font-semibold hover:bg-gray-100 transition"
        >

          {i18n.common.back}

        </button>

        <div className="flex-1">

          <Button
            text={i18n.review.createClient}
            onClick={onNext}
          />

        </div>

      </div>

    </>

  );

}