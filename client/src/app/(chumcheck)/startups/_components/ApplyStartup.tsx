'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import DataPrivacyStep from './application-steps/DataPrivacyStep';
import { useActionState, useEffect, useState } from 'react';
import EligibilityStep from './application-steps/EligibilityStep';
import ProjectDetailsStep from './application-steps/ProjectDetailsStep';
import { applyStartup } from '@/lib/actions';
import { CalculatorQuestionsApiRes, UratQuestion } from '@/lib/types';
import TechnologyRLStep from './application-steps/TechnologyRLStep';
import CalculatorStep from './application-steps/CalculatorStep';
import { useRouter } from 'next/navigation';

export default function ApplyStartup({
  uratQuestions,
  calculatorQuestions
}: {
  uratQuestions: UratQuestion[];
  calculatorQuestions: CalculatorQuestionsApiRes[];
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [state, action] = useActionState(applyStartup, undefined);

  const router = useRouter();

  function nextStep() {
    setCurrentStep((prev: number) => prev + 1);
  }

  function prevStep() {
    setCurrentStep((prev: number) => prev - 1);
  }

  const steps = [
    'Data Privacy and Consent',
    'Eligibility and Agreement',
    'Project Details',
    'Technology Readiness Level',
    'Calculator'
  ];

  useEffect(() => {
    if (state?.success) {
      setIsOpen(false);
      setCurrentStep(0);
      router.refresh();
    }
  }, [state, router]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Apply</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] h-[85vh] flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle>{steps[currentStep]}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <form action={action} className="flex flex-col flex-1 min-h-0">
          <div className="flex-1 overflow-y-auto pr-2">
            <DataPrivacyStep currentStep={currentStep} />
            <EligibilityStep currentStep={currentStep} />
            <ProjectDetailsStep currentStep={currentStep} />
            <TechnologyRLStep currentStep={currentStep} questions={uratQuestions} />
            <CalculatorStep currentStep={currentStep} questions={calculatorQuestions} />
          </div>

          <DialogFooter className="flex-shrink-0 mt-4">
            {currentStep > 0 && (
              <Button type="button" onClick={prevStep}>
                Previous
              </Button>
            )}

            {currentStep < steps.length - 1 && (
              <Button type="button" onClick={nextStep}>
                Next
              </Button>
            )}

            {currentStep == steps.length - 1 && <Button type="submit">Submit</Button>}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
