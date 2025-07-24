import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ReadinessType } from '@/lib/enums';

interface CreateRnaDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onCreate?: (type: ReadinessType, description: string) => void;
}

export default function CreateRnaDialog({ open, setOpen, onCreate }: CreateRnaDialogProps) {
  const [type, setType] = useState(ReadinessType.Technology);
  const [description, setDescription] = useState('');

  const handleCreate = () => {
    if (onCreate) onCreate(type, description);
    setOpen(false);
    setDescription('');
    setType(ReadinessType.Technology);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create RNA</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-3">
            <Label htmlFor="readiness-type">Type</Label>
            <Select value={type} onValueChange={val => setType(val as ReadinessType)}>
              <SelectTrigger id="readiness-type" className='w-full'>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ReadinessType).map((rt) => (
                  <SelectItem key={rt} value={rt}>{rt}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Enter RNA description..."
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="current-level">Current Level</Label>
            <Input id="current-level" value={9} disabled className="bg-gray-50" />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleCreate}>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
