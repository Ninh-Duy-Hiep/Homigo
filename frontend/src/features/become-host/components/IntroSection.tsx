import { Card, CardContent } from "@/components/ui/card";
import { RiKeyFill } from "react-icons/ri";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { IoShieldCheckmark } from "react-icons/io5";
import { PiPiggyBankFill } from "react-icons/pi";
import { MdOutlineSupportAgent } from "react-icons/md";
import { motion, Variants } from "motion/react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4,
    },
  },
};

const itemScale: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function IntroSection() {
  const tModal = useTranslations("BecomeHost.modal");
  const tSecurity = useTranslations("BecomeHost.security");

  return (
    <div className="mt-5 lg:mt-0">
      <motion.div initial="initial" animate="animate" variants={fadeInUp}>
        <Card className="w-full max-w-md mx-auto p-6 flex flex-col items-center gap-4">
          <div className="flex items-center justify-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full border border-none flex items-center justify-center">
              <RiKeyFill className="w-11 h-11 text-primary" />
            </div>
          </div>

          <CardContent className="px-3 text-center space-y-2">
            <h1 className="text-2xl font-extrabold">{tModal("title")}</h1>
            <p className="text-sm text-muted-foreground">{tModal("description")}</p>

            <div className="flex flex-col gap-2 mt-10">
              <Link href="/auth/login" className="w-full bg-primary rounded-md">
                <Button>{tModal("button1")}</Button>
              </Link>
              <Link href="/">
                <Button variant="link" className="text-muted-foreground">
                  {tModal("button2")}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex justify-between items-center mt-12 text-sm px-4 text-muted-foreground"
      >
        <motion.div variants={itemScale} className="flex flex-col justify-center items-center">
          <IoShieldCheckmark className="w-6 h-6" />
          <p>{tSecurity("title1")}</p>
        </motion.div>

        <motion.div variants={itemScale} className="flex flex-col justify-center items-center">
          <PiPiggyBankFill className="w-6 h-6" />
          <p>{tSecurity("title2")}</p>
        </motion.div>

        <motion.div variants={itemScale} className="flex flex-col justify-center items-center">
          <MdOutlineSupportAgent className="w-6 h-6" />
          <p>{tSecurity("title3")}</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
