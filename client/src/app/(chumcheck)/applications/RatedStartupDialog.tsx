'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface RatedStartupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startupId: number;
}

export default function RatedStartupDialog({ open, onOpenChange, startupId }: RatedStartupDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Rated Startup Details</DialogTitle>
          <DialogDescription>
            View startup evaluation and rating details (ID: {startupId})
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Basic Information</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Startup Name:</span> InnovateLab Solutions</p>
                <p><span className="font-medium">Group:</span> Beta Team</p>
                <p><span className="font-medium">Leader:</span> Alice Johnson</p>
                <p><span className="font-medium">University:</span> Tech University</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Rating Summary</h3>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Overall Score:</span> <span className="text-blue-600 font-semibold">8.5/10</span></p>
                <p><span className="font-medium">Rated Date:</span> Dec 20, 2024</p>
                <p><span className="font-medium">Reviewer:</span> Dr. Smith</p>
                <p><span className="font-medium">Status:</span> <span className="text-blue-600">Rated</span></p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Evaluation Breakdown</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p><span className="font-medium">Innovation:</span> 9/10</p>
                <p><span className="font-medium">Market Potential:</span> 8/10</p>
                <p><span className="font-medium">Technical Feasibility:</span> 9/10</p>
              </div>
              <div className="space-y-2">
                <p><span className="font-medium">Team Capability:</span> 8/10</p>
                <p><span className="font-medium">Business Model:</span> 7/10</p>
                <p><span className="font-medium">Scalability:</span> 9/10</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Reviewer Comments</h3>
            <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded">
              &quot;Excellent technical solution with strong market potential. The team demonstrates 
              solid understanding of the problem space and has a clear roadmap for implementation. 
              Recommend for advancement to qualification phase.&quot;
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">Strengths & Areas for Improvement</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-green-600 mb-1">Strengths:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Strong technical expertise</li>
                  <li>Clear value proposition</li>
                  <li>Well-defined target market</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-orange-600 mb-1">Areas for Improvement:</h4>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Revenue model needs refinement</li>
                  <li>Go-to-market strategy</li>
                  <li>Financial projections</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
              Qualify
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
