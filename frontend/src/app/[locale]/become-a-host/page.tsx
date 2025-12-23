import Footer from "@/components/layout/Footer";
import { HostOnboardingHeader } from "@/components/layout/HostOnboardingHeader";
import RegisterHost from "@/features/become-host/components/RegisterHost";

import { getTranslations } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BecomeHost.intro" });

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function BecomeHostPage() {
  return <RegisterHost header={<HostOnboardingHeader />} footer={<Footer />} />;
}
