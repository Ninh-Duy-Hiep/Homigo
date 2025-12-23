import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { Link } from "@/i18n/routing";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";

export function MenuBar() {
  const t = useTranslations("Auth");
  const tHeader = useTranslations("Header");

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <Menu className="w-5 h-5" />
        </MenubarTrigger>
        <MenubarContent className="mr-2 min-w-30">
          <MenubarItem>
            <Link href="/auth/login">{t("login")}</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="/auth/register">{t("register")}</Link>
          </MenubarItem>
          <MenubarItem>
            <Link href="#">{tHeader("become-host")}</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
