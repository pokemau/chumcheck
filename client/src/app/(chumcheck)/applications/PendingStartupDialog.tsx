'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { getQualificationStatusText } from '@/lib/utils';
import { getStartupById, setStartupToRated } from '@/services/server/startup.service';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startupId: number;
}

export default function PendingStartupDialog({ open, onOpenChange, startupId }: Props) {
  const queryClient = useQueryClient();

  const {
    data: startupData,
    isLoading,
    error
  } = useQuery({
    queryKey: ['startup', startupId],
    queryFn: () => getStartupById(startupId),
    enabled: open && startupId > 0,
    staleTime: 5 * 60 * 1000
  });

  // Mutation for updating startup status
  const saveRatingMutation = useMutation({
    mutationFn: () => setStartupToRated(startupId),
    onSuccess: () => {
      // Refetch the specific startup data
      queryClient.invalidateQueries({ queryKey: ['startup', startupId] });
      // Refetch the startups list (for the pending tab)
      queryClient.invalidateQueries({ queryKey: ['startups'] });
      // Close the dialog
      onOpenChange(false);
    },
    onError: (error) => {
      console.error('Failed to save rating:', error);
      // You can add toast notification here
    }
  });

  const handleSaveRating = () => {
    saveRatingMutation.mutate();
  };

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

        {/* Show mutation error */}
        {saveRatingMutation.error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <p className="text-red-800 text-sm">
              Failed to save rating:{' '}
              {saveRatingMutation.error instanceof Error ? saveRatingMutation.error.message : 'Unknown error'}
            </p>
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

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <Button disabled={isLoading || saveRatingMutation.isPending} onClick={handleSaveRating}>
              {saveRatingMutation.isPending ? (
                <>
                  <Spinner className="w-4 h-4 mr-2" />
                  Saving...
                </>
              ) : (
                'Save Rating'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
