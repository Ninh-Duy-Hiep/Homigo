"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "../../../public/Logo.png";
import { useTranslations } from "next-intl";
import { FOOTER_LINKS } from "@/constants/footer-data";

export default function Footer() {
  const tFooter = useTranslations("Footer");
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border-t py-6 text-sm text-muted-foreground bg-white/80 mt-5"
    >
      <div className="grid grid-cols-1 gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-10 text-center sm:text-start">
        <div>
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image src={logo} alt="Logo" width={50} height={50} className="h-12 w-auto" loading="eager" />
            <h1 className="text-xl font-bold text-primary">HOMIGO</h1>
          </Link>
          <p className="text-neutral">{tFooter("title")}</p>
        </div>
        {FOOTER_LINKS.map((section) => (
          <div key={section.title}>
            <h3 className="mb-4 font-semibold uppercase text-gray-800">{tFooter(section.title)}</h3>

            <ul className="space-y-2 text-muted-foreground">
              {section.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:underline hover:text-foreground transition-colors">
                    {tFooter(link.label)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="text-center mt-10">© {new Date().getFullYear()} Homigo. All rights reserved.</p>
    </motion.footer>
  );
}
