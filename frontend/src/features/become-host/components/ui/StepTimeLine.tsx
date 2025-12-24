import { motion } from "motion/react";
import { steps } from "../../types";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface StepTimeLineProps {
  currentStep: number;
}

export function StepTimeLine({ currentStep }: StepTimeLineProps) {
  const t = useTranslations("BecomeHost.steps");
  const tTimeline = useTranslations("BecomeHost.timeline");

  return (
    <div className="col-span-2 bg-linear-to-b from-primary/5 to-white px-35 py-10">
      <h1 className="text-4xl font-extrabold">{tTimeline("title")}</h1>
      <p className="mt-3 text-sm font-semibold text-muted-foreground">
        {tTimeline.rich("description", {
          primary: (chunks) => <span className="text-primary">{chunks}</span>,
        })}
      </p>
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        const isActive = currentStep === index;
        return (
          <div key={index} className="relative flex gap-4 mt-10">
            <div className="flex flex-col items-center">
              <motion.div
                initial={false}
                animate={{
                  scale: 1.1,
                  backgroundColor: isActive ? "var(--primary)" : "#fff",
                  color: isActive ? "#fff" : "var(--neutral)",
                }}
                className={cn(
                  "z-10 w-8 h-8 rounded-full flex items-center justify-center shadow-primary font-bold",
                  isActive ? "shadow-md" : "border"
                )}
              >
                {index + 1}
              </motion.div>

              {!isLast && (
                <div className="w-0.5 h-16 bg-slate-100 relative">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    className="absolute top-0 left-0 w-full"
                  />
                </div>
              )}
            </div>

            <div className="pt-1 pb-8">
              <h3 className={cn("text-lg font-bold transition-colors text-slate-900", isActive ? "text-primary" : "")}>
                {t(step.title)}
              </h3>
              {step.description && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-sm text-neutral mt-1"
                >
                  {t(step.description)}
                </motion.p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
