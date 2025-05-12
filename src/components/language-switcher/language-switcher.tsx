'use client';

import { usePathname, useRouter } from "@/src/i18n/navigation";
import { routing } from "@/src/i18n/routing";
import { Select } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { startTransition } from "react";

export default function LanguageSwitcher() {
    const t = useTranslations("LanguageSwitcher");
    const currLocale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();

    function switchLocale(locale: string) {
        startTransition(() => {
            router.replace(
                // @ts-expect-error -- TypeScript will validate that only known `params`
                // are used in combination with a given `pathname`. Since the two will
                // always match for the current route, we can skip runtime checks.
                { pathname, params },
                { locale }
            );
        });
    }

    return (
        <Select
            options={routing.locales.map((l) => (
                { value: l, label: t(`locale_${l}`) }
            ))}
            defaultValue={currLocale}
            onSelect={switchLocale}
        />
    )
}