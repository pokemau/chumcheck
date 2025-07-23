'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProjectDetailsStep({ currentStep }: { currentStep: number }) {
  const stepNum = 3;

  return (
    <div className={`${currentStep + 1 != stepNum ? 'hidden' : ''}`}>
      <Label className="mb-1">Startup Name</Label>
      <Input name="startupName" />
    </div>
  );
}

