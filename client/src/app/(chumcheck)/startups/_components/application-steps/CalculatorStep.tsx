'use client';

import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CalculatorQuestionsApiRes } from '@/lib/types';

export default function CalculatorStep({
  currentStep,
  questions
}: {
  currentStep: number;
  questions: CalculatorQuestionsApiRes[];
}) {
  const stepNum = 5;
  const [formValues, setFormValues] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {};
    questions.forEach((question) => {
      if (question.questions.length > 0) {
        defaults[question.category] = question.questions[0].id.toString();
      }
    });
    return defaults;
  });

  if (currentStep + 1 !== stepNum) {
    return null;
  }

  const handleValueChange = (questionId: string, value: string) => {
    setFormValues((prev) => ({
      ...prev,
      [questionId]: value
    }));
  };

  return (
    <div>
      {questions.map((question) => (
        <div key={question.category}>
          <Label className="mb-1">{question.category}</Label>

          <RadioGroup
            value={formValues[question.category] || ''}
            onValueChange={(value) => handleValueChange(question.category, value)}
            name={`${question.category}`}
          >
            {question.questions.map((q) => (
              <div key={q.id} className="flex items-center gap-3">
                <RadioGroupItem value={q.id.toString()} id={`radio-${q.id}`} />
                <Label htmlFor={`radio-${q.id}`}>{q.question}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
}
