'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Spinner } from '@/components/ui/shadcn-io/spinner';
import { User } from '@/lib/types';
import { getQualificationStatusText } from '@/lib/utils';
import {
  getStartupById,
  rejectStartup,
  approveStartup
} from '@/services/server/startup.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface RatedStartupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startupId: number;
  mentors: User[];
}

export default function RatedStartupDialog({ open, onOpenChange, startupId, mentors }: RatedStartupDialogProps) {
  const queryClient = useQueryClient();
  const [selectedMentorId, setSelectedMentorId] = useState<string>(mentors.length > 0 ? mentors[0].id.toString() : '');
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

  // Mutation for rejecting startup
  const rejectMutation = useMutation({
    mutationFn: () => rejectStartup(startupId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['startup', startupId] });
      queryClient.invalidateQueries({ queryKey: ['startups'] });
      onOpenChange(false);
    },
    onError: (error) => {
      console.error('Failed to reject startup:', error);
    }
  });

  // Mutation for approving startup
  const approveMutation = useMutation({
    mutationFn: () => approveStartup(startupId, parseInt(selectedMentorId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['startup', startupId] });
      queryClient.invalidateQueries({ queryKey: ['startups'] });
      onOpenChange(false);
    },
    onError: (error) => {
      console.error('Failed to approve startup:', error);
    }
  });

  const handleReject = () => {
    rejectMutation.mutate();
  };

  const handleApprove = () => {
    approveMutation.mutate();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Rated Startup Details</DialogTitle>
          <DialogDescription>View startup evaluation and rating details (ID: {startupId})</DialogDescription>
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

        {/* Show reject mutation error */}
        {rejectMutation.error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <p className="text-red-800 text-sm">
              Failed to reject startup:{' '}
              {rejectMutation.error instanceof Error ? rejectMutation.error.message : 'Unknown error'}
            </p>
          </div>
        )}

        {/* Show approve mutation error */}
        {approveMutation.error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
            <p className="text-red-800 text-sm">
              Failed to approve startup:{' '}
              {approveMutation.error instanceof Error ? approveMutation.error.message : 'Unknown error'}
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

          <div className="space-y-4 pt-4 border-t">
            {/* Mentor Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Assign Mentor</label>
              <Select value={selectedMentorId} onValueChange={setSelectedMentorId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a mentor" />
                </SelectTrigger>
                <SelectContent>
                  {mentors.map((mentor) => (
                    <SelectItem key={mentor.id} value={mentor.id.toString()}>
                      {mentor.firstName} {mentor.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2">
              <Button
                variant="destructive"
                disabled={isLoading || rejectMutation.isPending || approveMutation.isPending}
                onClick={handleReject}
              >
                {rejectMutation.isPending ? (
                  <>
                    <Spinner className="w-4 h-4 mr-2" />
                    Rejecting...
                  </>
                ) : (
                  'Reject'
                )}
              </Button>
              <Button
                disabled={isLoading || rejectMutation.isPending || approveMutation.isPending}
                onClick={handleApprove}
              >
                {approveMutation.isPending ? (
                  <>
                    <Spinner className="w-4 h-4 mr-2" />
                    Approving...
                  </>
                ) : (
                  'Approve'
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
