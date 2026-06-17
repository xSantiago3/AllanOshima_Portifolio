import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { I18nProvider } from "@/components/providers/I18nProvider";
import { HtmlLang } from "@/components/providers/HtmlLang";
import { getDictionary, isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const d = getDictionary(locale);
  return {
    title: { absolute: d.meta.title },
    description: d.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { pt: "/pt", en: "/en", "x-default": "/pt" },
    },
    openGraph: {
      title: d.meta.title,
      description: d.meta.description,
      url: `/${locale}`,
      siteName: "Allan Oshima",
      locale: locale === "pt" ? "pt_BR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: d.meta.title,
      description: d.meta.description,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <I18nProvider locale={locale} dict={dict}>
      <HtmlLang locale={locale} />
      {children}
    </I18nProvider>
  );
}
