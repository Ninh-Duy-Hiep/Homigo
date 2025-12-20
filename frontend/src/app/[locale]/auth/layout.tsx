"use client";

import Image from "next/image";
import authBg from "../../../../public/AuthImg.jpg";
import logo from "../../../../public/Logo.png";
import { Link } from "@/i18n/routing";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start text-primary">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <Image src={logo} priority alt="Logo" width={100} className="h-20 w-auto" loading="eager"/>
            <h1 className="text-3xl font-bold text-primary">HOMIGO</h1>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>

      <div className="bg-muted relative hidden lg:block">
        <Image
          src={authBg}
          quality={75}
          fill
          sizes="(min-width: 1024px) 50vw, 0vw"
          alt="Auth background"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
