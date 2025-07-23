'use client';

export default function EligibilityStep({ currentStep }: { currentStep: number }) {
  const stepNum = 2;

  return (
    <div className={`${currentStep + 1 != stepNum ? 'hidden' : ''}`}>
      <p className="text-base">
        I confirm that I have read, understood, and agree to comply with the eligibility criteria and rules of the
        competition. Additionally, I will review the eligibility requirements and agreement.
      </p>
    </div>
  );
}
