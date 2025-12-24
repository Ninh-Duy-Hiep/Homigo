"use client";

import { Link } from "@/i18n/routing";
import { motion } from "motion/react";
import Image from "next/image";
import logo from "../../../public/Logo.png";
import { IoMdHelpCircle } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/stores/useAuthStore";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { AiFillHome } from "react-icons/ai";

export const HostOnboardingHeader = () => {
  const { user } = useAuthStore();
  const t = useTranslations("BecomeHost.header");

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md transition-all duration-300 md:px-6"
    >
      <div className="mx-auto flex h-20 items-center justify-between gap-2">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src={logo} alt="Logo" width={100} height={100} className="h-16 w-auto" loading="eager" />
          <h1 className="text-xl font-bold text-primary lg:block xl:text-2xl">HOMIGO</h1>
        </Link>

        <div className="flex gap-4 items-center">
          <Link href="/">
            <Button variant="nothing" className="text-neutral border hover:bg-subtle">
              <AiFillHome className="w-5 h-5"/>
              {t("button")}</Button>
          </Link>
          <Link href="#" className="flex gap-1 items-center text-sm text-neutral font-semibold">
            <IoMdHelpCircle className="w-5 h-5" />
            {t("help")}
          </Link>

          {user?.avatar ? (
            <Avatar>
              <AvatarImage src={user.avatar} alt="Avatar" />
              <AvatarFallback>{user.fullName}</AvatarFallback>
            </Avatar>
          ) : (
            <FaUserCircle className="w-9 h-9 text-neutral" />
          )}
        </div>
      </div>
    </motion.header>
  );
};
