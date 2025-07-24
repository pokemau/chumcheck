'use client';

import { RNA } from '@/lib/types';
import { useState } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useGetStartupRna } from '@/hooks/useGetStartupRna';
import RnaCardsSkeletonGrid from './RnaSkeleton';
import CreateRnaDialog from './CreateRnaDialog';

interface Props {
  startupId: number;
}

export default function RnaCards({ startupId }: Props) {
  const { data: rnaData, isLoading, error } = useGetStartupRna(startupId);
  const [open, setOpen] = useState(false);

  if (isLoading) {
    return <RnaCardsSkeletonGrid />;
  }

  if (error) {
    return <h1>Something went wrong...</h1>;
  }

  return (
    <>
      <CreateRnaDialog open={open} setOpen={setOpen} />
      <Button onClick={() => setOpen(true)}>Add</Button>
      <Button>Generate</Button>
      <div className="grid grid-cols-4 gap-5">
        {Array.isArray(rnaData) ? rnaData.map((rna) => <RnaCard key={rna.id} rna={rna} />) : <h1>There are currently no RNAs created...</h1>}
      </div>
    </>
  );
}

function RnaCard({ rna }: { rna: RNA }) {
  // Helper function to get level color
  const getLevelColor = (level: number) => {
    if (level >= 8) return 'bg-green-100 text-green-800';
    if (level >= 6) return 'bg-yellow-100 text-yellow-800';
    if (level >= 4) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{rna.readinessLevel.readinessType}</CardTitle>
              <Badge className={getLevelColor(rna.readinessLevel.level)}>Level {rna.readinessLevel.level}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 leading-relaxed">{rna.rna}</p>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <form>
          <DialogHeader>
            <DialogTitle>Edit {rna.readinessLevel.readinessType}</DialogTitle>
            <DialogDescription>
              Update the readiness level and RNA description for {rna.readinessLevel.readinessType}.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor={`readiness-type-${rna.id}`}>Readiness Type</Label>
              <Input
                id={`readiness-type-${rna.id}`}
                name="readinessType"
                defaultValue={rna.readinessLevel.readinessType}
                disabled
                className="bg-gray-50"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor={`level-${rna.id}`}>Current Level</Label>
              <Input
                id={`level-${rna.id}`}
                name="level"
                type="number"
                min="1"
                max="9"
                defaultValue={rna.readinessLevel.level}
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor={`rna-${rna.id}`}>RNA Description</Label>
              <textarea
                id={`rna-${rna.id}`}
                name="rna"
                defaultValue={rna.rna}
                className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter RNA description..."
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
