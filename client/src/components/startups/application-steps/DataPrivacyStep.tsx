'use client';

import { Label } from "@/components/ui/label";

export default function DataPrivacyStep({ currentStep }: { currentStep: number }) {
  const stepNum = 1;

  return (
    <div className={`${currentStep + 1 != stepNum ? 'hidden' : ''}`}>
      <Label className="label">
        <span className="label-text text-base">
          By accomplishing this form, the following personal information will be collected including, startup team
          members&apos; names, personal email address, mobile phone number and other relevant information. The personal
          information you will provide in this form will be used within ChumCheck Program, DASIG consortium committee
          and will not be shared with any outside parties unless you have prior written consent. Development and
          Acceleration Support for Innovation Growth (DASIG) respects your rights as a data subject under the Data
          Privacy Act.
          <br />
          <br />
          If you have further questions and concerns regarding the processing of your personal information, you are
          welcome to contact our project lead, Engr. Jurydel Rama, at jurydel.rama@cit.edu.
          <br />
          <br />
          In compliance with the Data Privacy Act (DPA) of 2012, also known as the Republic Act of 10173 (RA 10173), I
          agree and authorize the Development and Acceleration Support for Innovation Growth (DASIG) consortium members
          to use the personal information for the purpose of ChumCheck programs and initiatives. I also acknowledge and
          warrant that I have acquired the consent from all parties relevant to this consent and hold free and harmless
          and indemnify Development and Acceleration Support for Innovation Growth (DASIG) from any complaint, suit, or
          damages which any party may file or claim in relation to my consent.
        </span>
      </Label>
    </div>
  );
}
