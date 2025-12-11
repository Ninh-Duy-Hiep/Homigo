"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "../types";

const userSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  userName: z.string().min(1, "Username is required"),
  email: z.string().email().optional().or(z.literal("")),
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userToEdit?: User | null;
  onSubmit: (values: UserFormValues) => Promise<void>;
}

export function UserFormDialog({ open, onOpenChange, userToEdit, onSubmit }: UserFormDialogProps) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      fullName: "",
      userName: "",
      email: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (userToEdit) {
        form.reset({
          fullName: userToEdit.fullName || "",
          userName: userToEdit.userName,
          email: userToEdit.email || "",
        });
      } else {
        form.reset({ fullName: "", userName: "", email: "" });
      }
    }
  }, [open, userToEdit, form]);

  const handleSubmit = async (values: UserFormValues) => {
    await onSubmit(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{userToEdit ? "Edit User" : "Create New User"}</DialogTitle>
          <DialogDescription>
            {userToEdit ? "Make changes to user profile here." : "Add a new user to the system."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" {...form.register("fullName")} />
            {form.formState.errors.fullName && (
              <p className="text-red-500 text-xs">{form.formState.errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="userName">Username</Label>
            <Input id="userName" {...form.register("userName")} />
            {form.formState.errors.userName && (
              <p className="text-red-500 text-xs">{form.formState.errors.userName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...form.register("email")} />
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
