'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { useGetStartupData } from '@/hooks/useGetStartup';
import { getQualificationStatusText } from '@/lib/utils';

interface QualifiedStartupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startupId: number;
}

export default function QualifiedStartupDialog({ open, onOpenChange, startupId }: QualifiedStartupDialogProps) {
  const {
    data: startupData,
    isLoading,
    error
  } = useGetStartupData(startupId, open);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Pending Startup Details</DialogTitle>
          <DialogDescription>Review startup application details (ID: {startupId})</DialogDescription>
        </DialogHeader>

        {isLoading && <Spinner />}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <p className="text-red-800 text-sm">
              Error loading startup data: {error instanceof Error ? error.message : 'Unknown error'}
            </p>
            <p className="text-red-600 text-xs mt-1">Showing mock data for demonstration</p>
          </div>
        )}

        <div className="space-y-6">
          {startupData && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Basic Information</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Startup Name:</span> {startupData.name}
                    </p>
                    <p>
                      <span className="font-medium">Leader:</span> {startupData.user.firstName}{' '}
                      {startupData.user.lastName}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Application Status</h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Status:</span>{' '}
                      <span className="text-yellow-600">
                        {getQualificationStatusText(startupData.qualificationStatus)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Team Members</h3>
                <div className="space-y-1 text-sm">
                  {startupData.members && startupData.members.length > 0 ? (
                    startupData.members.map((member, index) => (
                      <p key={index}>
                        • {member.firstName} ({member.role})
                      </p>
                    ))
                  ) : (
                    <p>No team members listed</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
