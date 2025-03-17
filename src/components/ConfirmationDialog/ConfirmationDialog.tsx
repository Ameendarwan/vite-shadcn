import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@app/components/Dialog/Dialog';
import { ReactNode, useState } from 'react';

import { Button } from '@app/components/Button/Button';
import { X } from 'lucide-react';

interface ConfirmationDialogProps {
  title?: string;
  triggerComponent: ReactNode;
  description: string;
  confirmationComponent: ReactNode;
  disabled?: boolean;
  children?: ReactNode;
  cancelButtonTitle?: string;
  handleClose?: () => void;
}

const ConfirmationDialog = ({
  description,
  triggerComponent,
  confirmationComponent,
  title = '',
  cancelButtonTitle = 'Cancel',
  disabled,
  children,
  handleClose,
}: ConfirmationDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    setIsLoading(true);
  };
  const handleDialogClose = (open: boolean) => {
    if (!open) {
      handleClose?.();
    }
  };

  return (
    <Dialog onOpenChange={handleDialogClose}>
      {!disabled && <DialogTrigger asChild>{triggerComponent}</DialogTrigger>}
      <DialogContent className="!rounded-[12px] font-mont sm:max-w-md [&>button]:hidden">
        <DialogHeader>
          <div className="flex flex-row justify-between border-b border-muted pb-4">
            <DialogTitle className="text-sm font-bold">{title}</DialogTitle>
            <DialogClose asChild>
              <X className="h-4 w-4 cursor-pointer" />
            </DialogClose>
          </div>

          <DialogDescription className="!mt-4 text-xs font-semibold text-primary">{description}</DialogDescription>
        </DialogHeader>
        {children && <>{children}</>}
        <DialogFooter className="sm:justify-between">
          <div className="flex w-full flex-row gap-2">
            <DialogClose asChild>
              <Button variant="muted" className="text-accent">
                {cancelButtonTitle}
              </Button>
            </DialogClose>
            <DialogClose onClick={handleConfirm} disabled={disabled || isLoading} asChild>
              {confirmationComponent}
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
