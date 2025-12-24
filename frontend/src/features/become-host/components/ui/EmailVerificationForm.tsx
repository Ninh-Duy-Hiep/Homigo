"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Loader2 } from "lucide-react";
import { useEmailVerification } from "../../hooks/useEmailVerification";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function EmailVerificationForm() {
  const { step, setStep, loading, targetEmail, emailForm, otpForm, onSendOtp, onVerifyOtp, handleResendOtp } =
    useEmailVerification();

  return (
    <div className="w-full max-w-lg p-6 bg-white space-y-6 text-sm">
      <div className="text-start space-y-2">
        <h1 className="text-2xl font-bold">Xác thực Email</h1>
        <p className="text-neutral">Vui lòng nhập email chính chủ để nhận mã xác thực bảo mật.</p>
      </div>

      <form onSubmit={emailForm.handleSubmit(onSendOtp)}>
        <div className="flex gap-4 justify-between items-end">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="email" className="text-muted-foreground">
              Địa chỉ email
            </Label>
            <Input
              {...emailForm.register("email")}
              placeholder="name@example.com"
              disabled={loading || step === 2}
              className="w-full"
            />
          </div>
          {step === 1 && (
            <Button variant="nothing" className="bg-primary/20 text-primary font-bold" type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Gửi mã
            </Button>
          )}
          {step === 2 && (
            <Button type="button" variant="outline" onClick={() => setStep(1)} disabled={loading}>
              Thay đổi
            </Button>
          )}
        </div>
        {emailForm.formState.errors.email && (
          <p className="text-red-500 mt-2">{emailForm.formState.errors.email.message}</p>
        )}
      </form>

      {step === 2 && (
        <form onSubmit={otpForm.handleSubmit(onVerifyOtp)} className="pt-4 ">
          <Card className="max-w-lg">
            <CardHeader>
              <p className="font-bold">Nhập mã xác thực</p>
              <p className="text-neutral">
                Mã đã được gửi đến <span className="font-bold">{targetEmail}</span>
              </p>
            </CardHeader>
            <CardContent>
              <InputOTP
                maxLength={6}
                value={otpForm.watch("otp")}
                onChange={(value) => otpForm.setValue("otp", value)}
                disabled={loading}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>

              {otpForm.formState.errors.otp && (
                <p className="text-red-500 text-center">{otpForm.formState.errors.otp.message}</p>
              )}

              <div className="flex flex-col gap-2 w-full">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Xác nhận
                </Button>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-blue-600 hover:underline disabled:opacity-50 text-center"
                  disabled={loading}
                >
                  Gửi lại mã?
                </button>
              </div>
            </CardContent>
          </Card>
        </form>
      )}
    </div>
  );
}
