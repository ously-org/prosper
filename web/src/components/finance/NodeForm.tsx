import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { FinancialNode } from '@/lib/finance/models';

interface NodeFormProps {
  parentId: string;
  onAddNode: (node: FinancialNode) => void;
}

export const NodeForm: React.FC<NodeFormProps> = ({ parentId, onAddNode }) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newNode = new FinancialNode({
      id: crypto.randomUUID(),
      name,
      date: new Date(date),
      assets: [],
      expenses: [],
      parentId
    });

    onAddNode(newNode);
    setOpen(false);
    setName('');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Add Event</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-900 text-white border-slate-800">
        <DialogHeader>
          <DialogTitle>Add Financial Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3 bg-slate-800 border-slate-700"
              placeholder="e.g. Buy Car, Career Change"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="col-span-3 bg-slate-800 border-slate-700"
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit">Create Node</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
