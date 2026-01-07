"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Loader2 } from "lucide-react";
import { useEmailVerification } from "../../become-host.hooks";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { useTranslations } from "next-intl";

export default function EmailVerificationForm() {
  const t = useTranslations("BecomeHost.verification");
  const { step, setStep, loading, targetEmail, emailForm, otpForm, onSendOtp, onVerifyOtp, handleResendOtp } =
    useEmailVerification();

  return (
    <div className="w-full max-w-lg p-6 bg-white space-y-6 text-sm">
      <div className="text-start space-y-2">
        <h1 className="text-2xl font-bold">{t("title")}</h1>
        <p className="text-neutral">{t("description")}</p>
      </div>

      <form onSubmit={emailForm.handleSubmit(onSendOtp)}>
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-end">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="email" className="text-muted-foreground">
              {t("emailLabel")}
            </Label>
            <Input
              {...emailForm.register("email")}
              placeholder="name@example.com"
              disabled={loading || step === 2}
              className="w-full"
            />
          </div>
          {step === 1 && (
            <Button
              variant="nothing"
              className="w-full sm:w-auto bg-primary/20 text-primary font-bold"
              type="submit"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t("sendCode")}
            </Button>
          )}
          {step === 2 && (
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => setStep(1)}
              disabled={loading}
            >
              {t("change")}
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
              <p className="font-bold">{t("enterCode")}</p>
              <p className="text-neutral">
                {t("codeSentTo")} <span className="font-bold">{targetEmail}</span>
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center">
                <InputOTP
                  maxLength={6}
                  value={otpForm.watch("otp")}
                  onChange={(value) => otpForm.setValue("otp", value)}
                  disabled={loading}
                >
                  <InputOTPGroup className="gap-4">
                    <InputOTPSlot className="rounded-lg! border" index={0} />
                    <InputOTPSlot className="rounded-lg! border" index={1} />
                    <InputOTPSlot className="rounded-lg! border" index={2} />
                    <InputOTPSlot className="rounded-lg! border" index={3} />
                    <InputOTPSlot className="rounded-lg! border" index={4} />
                    <InputOTPSlot className="rounded-lg! border" index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>

              {otpForm.formState.errors.otp && (
                <p className="text-red-500 text-center">{otpForm.formState.errors.otp.message}</p>
              )}

              <div className="flex flex-col gap-2 w-full mt-4">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t("confirm")}
                </Button>
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-blue-600 hover:underline disabled:opacity-50 text-center"
                  disabled={loading}
                >
                  {t("resendQuestion")}
                </button>
              </div>
            </CardContent>
          </Card>
        </form>
      )}
    </div>
  );
}
