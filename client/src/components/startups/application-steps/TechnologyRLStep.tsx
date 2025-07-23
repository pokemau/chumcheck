'use client';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UratQuestion } from '@/lib/types';

export default function TechnologyRLStep({
  currentStep,
  questions
}: {
  currentStep: number;
  questions: UratQuestion[];
}) {
  const stepNum = 4;
  const start = 0;
  const end = 3;

  questions = questions.slice(start, end);

  return (
    <div className={`${currentStep + 1 != stepNum ? 'hidden' : ''}`}>
      {questions.map((question) => (
        <div key={question.id}>
          <Label className="mb-1">{question.question}</Label>
          <Textarea name='tech'/>
        </div>
      ))}
    </div>
  );
}

