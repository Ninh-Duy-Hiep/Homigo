"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { LanguageSwitcher } from "./element/language-switcher";

export default function LocaleSwitcher() {
  const t = useTranslations("Common");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (nextLocale: string) => {
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <LanguageSwitcher
      local={locale}
      locales={[
        { code: "vi", label: t("vi"), isRTL: false },
        { code: "en", label: t("en"), isRTL: false },
      ]}
      onChange={onSelectChange}
      className="cursor-pointer"
    />
  );
}
