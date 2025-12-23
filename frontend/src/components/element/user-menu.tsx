import { motion } from "motion/react";
import {
  Bell,
  Heart,
  LogOut,
  MessageCircleQuestionMark,
  Plane,
  Settings,
  UserPen,
  Menu,
  House,
  type LucideIcon,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { Role } from "@/constants/enum";

type MenuItem = {
  label: string;
  icon: LucideIcon;
  href?: string;
  onClick?: () => void;
  hiddenOnDesktop?: boolean;
  danger?: boolean;
  hideWhenRole?: Role;
  separator?: boolean;
};

export function UserMenu() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  const t = useTranslations("Auth");
  const tHeader = useTranslations("Header");

  const handleLogout = () => {
    router.push("/");
    logout();
    queryClient.clear();
  };

  const menuItems: MenuItem[] = [
    { label: tHeader("trip"), icon: Plane, href: "#" },
    { label: tHeader("favoritesList"), icon: Heart, href: "#", separator: true },
    { label: tHeader("personalProfile"), icon: UserPen, href: "#" },
    {
      label: tHeader("notifications"),
      icon: Bell,
      hiddenOnDesktop: true,
    },
    { label: tHeader("settings"), icon: Settings, href: "#" },
    { label: tHeader("help"), icon: MessageCircleQuestionMark, href: "#", separator: true },
    {
      label: tHeader("become-host"),
      icon: House,
      href: "/become-a-host",
      hideWhenRole: Role.HOST,
      separator: true,
    },
    {
      label: t("logout"),
      icon: LogOut,
      onClick: handleLogout,
      danger: true,
    },
  ];

  const visibleMenuItems = menuItems.filter((item) => {
    if (item.hideWhenRole && user?.role === item.hideWhenRole) {
      return false;
    }
    return true;
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="border">
          <Menu className="h-5 w-5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-52.5 mr-8 flex flex-col gap-1">
        {visibleMenuItems.map((item, idx) => (
          <div key={idx}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={item.onClick}
              className={`flex gap-3 py-2 text-sm cursor-pointer
                ${item.hiddenOnDesktop ? "md:hidden hover:text-primary" : "hover:text-primary"}
                ${item.danger ? "text-red-500 font-semibold hover:text-red-500" : ""}
              `}
            >
              <item.icon size={20} />
              {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
            </motion.div>
            {item.separator && <div className="h-px bg-border my-1" />}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}
