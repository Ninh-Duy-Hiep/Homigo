import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  cancelText: string;
  onClose: () => void;
  action: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
}

export function ConfirmModal({ open, title, description, cancelText, action, onClose }: ConfirmModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2 sm:justify-end">
          <Button variant="outline" onClick={onClose}>
            {cancelText}
          </Button>
          <Button asChild={!!action.href} onClick={action.onClick}>
            {action.href ? <Link href={action.href}>{action.label}</Link> : action.label}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
