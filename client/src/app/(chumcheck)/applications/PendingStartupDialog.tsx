'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface PendingStartupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startupId: number;
}

export default function PendingStartupDialog({ open, onOpenChange, startupId }: PendingStartupDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Pending Startup Details</DialogTitle>
          <DialogDescription>
            Review startup application details (ID: {startupId})
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Basic Information</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Startup Name:</span> TechVenture Inc.</p>
                <p><span className="font-medium">Group:</span> Alpha Team</p>
                <p><span className="font-medium">Leader:</span> John Doe</p>
                <p><span className="font-medium">University:</span> Sample University</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Application Status</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Status:</span> <span className="text-yellow-600">Pending Review</span></p>
                <p><span className="font-medium">Submitted:</span> Dec 15, 2024</p>
                <p><span className="font-medium">Documents:</span> Complete</p>
                <p><span className="font-medium">Eligibility Check:</span> Passed</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Project Description</h3>
            <p className="text-sm text-muted-foreground">
              A revolutionary AI-powered platform that helps small businesses optimize their operations 
              through intelligent automation and data analytics. The solution aims to reduce operational 
              costs by 30% while improving efficiency.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Team Members</h3>
            <div className="space-y-1 text-sm">
              <p>• John Doe (Leader) - CEO & Product Manager</p>
              <p>• Jane Smith - CTO & Lead Developer</p>
              <p>• Mike Johnson - Marketing & Business Development</p>
              <p>• Sarah Wilson - UI/UX Designer</p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <button className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700">
              Approve
            </button>
            <button className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700">
              Reject
            </button>
            <button 
              onClick={() => onOpenChange(false)}
              className="px-4 py-2 text-sm border rounded hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
