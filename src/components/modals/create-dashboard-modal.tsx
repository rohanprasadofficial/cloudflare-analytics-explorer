import { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Field, FieldLabel } from '@/components/ui/field';

interface CreateDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string, description?: string) => void;
}

export function CreateDashboardModal({
  isOpen,
  onClose,
  onConfirm,
}: CreateDashboardModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleConfirm = () => {
    if (name.trim()) {
      onConfirm(name.trim(), description.trim() || undefined);
      setName('');
      setDescription('');
      onClose();
    }
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>New Dashboard</AlertDialogTitle>
          <AlertDialogDescription>
            Create a new dashboard to visualize your analytics data.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-4 py-4">
          <Field>
            <FieldLabel htmlFor="dashboard-name">Name</FieldLabel>
            <Input
              id="dashboard-name"
              placeholder="My Dashboard"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="dashboard-description">
              Description (optional)
            </FieldLabel>
            <Textarea
              id="dashboard-description"
              placeholder="Dashboard description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </Field>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={!name.trim()}>
            Create
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
