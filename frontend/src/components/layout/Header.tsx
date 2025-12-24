"use client";

import { Link, usePathname } from "@/i18n/routing";
import { useAuthStore } from "@/stores/useAuthStore";
import { motion } from "motion/react";
import { Bell, Search } from "lucide-react";
import LocaleSwitcher from "../LocaleSwitcher";
import Image from "next/image";
import logo from "../../../public/Logo.png";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";
import SearchBar from "../SearchBar";
import { UserMenu } from "../element/user-menu";
import { MenuBar } from "../element/menu-bar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { useEffect } from "react";

export const Header = () => {
  const { isAuthenticated, user } = useAuthStore();
  const t = useTranslations("Auth");
  const tHeader = useTranslations("Header");
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuthenticated && !pathname.includes("/auth")) {
      sessionStorage.setItem("prevUrl", pathname);
    }
  }, [pathname, isAuthenticated]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-gray-900 backdrop-blur-md transition-all duration-300 md:px-6"
    >
      <div className="mx-auto flex h-20 items-center justify-between gap-2">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src={logo} alt="Logo" width={100} height={100} className="h-16 w-auto" loading="eager" />
          <h1 className="hidden text-xl font-bold text-primary lg:block xl:text-2xl">HOMIGO</h1>
        </Link>

        <div className="hidden flex-1 justify-center px-8 lg:flex max-w-212.5">
          <SearchBar className="w-full" />
        </div>

        <button className="flex flex-1 items-center gap-3 rounded-full border bg-gray-100 px-4 py-2.5 text-left shadow-sm transition-all hover:shadow-md dark:bg-gray-800 lg:hidden mx-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm dark:bg-gray-700">
            <Search className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">Tìm kiếm ?</span>
          </div>
        </button>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <LocaleSwitcher />

          {isAuthenticated && user ? (
            <>
              <Button variant="ghost" size="icon" className="hidden border sm:flex">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>

              <UserMenu />
            </>
          ) : (
            <>
              <div className="hidden md:flex items-center gap-2">
                {!isAuthenticated && (
                  <Link href="/become-a-host" className="text-sm font-semibold">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="outline">{tHeader("become-host")}</Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom">
                        <p>{tHeader("tooltip")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                )}

                <Link href="/auth/login">
                  <Button variant="default">{t("login")}</Button>
                </Link>

                <Link href="/auth/register">
                  <Button variant="outline">{t("register")}</Button>
                </Link>
              </div>

              <div className="block md:hidden">
                <MenuBar />
              </div>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
};
