'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface QualifiedStartupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startupId: number;
}

export default function QualifiedStartupDialog({ open, onOpenChange, startupId }: QualifiedStartupDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Qualified Startup Details</DialogTitle>
          <DialogDescription>
            View qualified startup progress and mentorship details (ID: {startupId})
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Basic Information</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Startup Name:</span> FutureTech Ventures</p>
                <p><span className="font-medium">Group:</span> Gamma Team</p>
                <p><span className="font-medium">Leader:</span> David Chen</p>
                <p><span className="font-medium">University:</span> Innovation University</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Program Status</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Status:</span> <span className="text-green-600">Qualified</span></p>
                <p><span className="font-medium">Start Date:</span> Jan 1, 2025</p>
                <p><span className="font-medium">Progress:</span> 65%</p>
                <p><span className="font-medium">Expected Completion:</span> Jun 30, 2025</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Mentorship</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Primary Mentor:</span> Dr. Emily Rodriguez</p>
                <p><span className="font-medium">Secondary Mentor:</span> Mark Thompson</p>
                <p><span className="font-medium">Next Session:</span> Dec 25, 2024</p>
                <p><span className="font-medium">Total Sessions:</span> 12/20</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Current Initiatives</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded p-3">
                <h4 className="font-medium mb-2">Product Development</h4>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Status:</span> <span className="text-blue-600">In Progress</span></p>
                  <p><span className="font-medium">Completion:</span> 70%</p>
                  <p><span className="font-medium">Due Date:</span> Jan 15, 2025</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '70%'}}></div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded p-3">
                <h4 className="font-medium mb-2">Market Research</h4>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Status:</span> <span className="text-green-600">Completed</span></p>
                  <p><span className="font-medium">Completion:</span> 100%</p>
                  <p><span className="font-medium">Completed:</span> Dec 10, 2024</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '100%'}}></div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded p-3">
                <h4 className="font-medium mb-2">Business Model</h4>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Status:</span> <span className="text-orange-600">Pending</span></p>
                  <p><span className="font-medium">Completion:</span> 30%</p>
                  <p><span className="font-medium">Due Date:</span> Feb 1, 2025</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{width: '30%'}}></div>
                  </div>
                </div>
              </div>
              
              <div className="border rounded p-3">
                <h4 className="font-medium mb-2">Financial Planning</h4>
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Status:</span> <span className="text-gray-600">Not Started</span></p>
                  <p><span className="font-medium">Completion:</span> 0%</p>
                  <p><span className="font-medium">Due Date:</span> Mar 1, 2025</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-gray-600 h-2 rounded-full" style={{width: '0%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Recent Activity</h3>
            <div className="space-y-2 text-sm bg-gray-50 p-3 rounded max-h-32 overflow-y-auto">
              <p><span className="font-medium">Dec 22:</span> Weekly mentor meeting completed</p>
              <p><span className="font-medium">Dec 20:</span> Market research initiative submitted</p>
              <p><span className="font-medium">Dec 18:</span> Product prototype demo scheduled</p>
              <p><span className="font-medium">Dec 15:</span> Team progress review meeting</p>
              <p><span className="font-medium">Dec 12:</span> Business model workshop attended</p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <button className="px-4 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700">
              View Full Report
            </button>
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
              Schedule Meeting
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
