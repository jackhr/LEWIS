import type { AppData, PageKey } from "./types/app";

const STRUCTURED_DATA_ID = "structured-data";
const SITE_DOMAIN_FALLBACK = "https://insiturigging.com";

function normalizedSiteUrl(siteUrl: string): string {
    const trimmed = siteUrl.trim();
    return trimmed === "" ? SITE_DOMAIN_FALLBACK : trimmed.replace(/\/+$/, "");
}

function toAbsoluteUrl(siteUrl: string, path: string): string {
    return new URL(path, `${normalizedSiteUrl(siteUrl)}/`).toString();
}

function resolvedSiteUrl(defaultSiteUrl: string): string {
    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical instanceof HTMLLinkElement && canonical.href.trim() !== "") {
        try {
            return normalizedSiteUrl(new URL(canonical.href).origin);
        } catch {
            return normalizedSiteUrl(defaultSiteUrl);
        }
    }

    return normalizedSiteUrl(defaultSiteUrl);
}

function findOrCreateMeta(selector: string, attribute: "name" | "property", value: string): HTMLMetaElement {
    const existing = document.head.querySelector(selector);
    if (existing instanceof HTMLMetaElement) {
        return existing;
    }

    const meta = document.createElement("meta");
    meta.setAttribute(attribute, value);
    document.head.appendChild(meta);
    return meta;
}

function setMetaByName(name: string, content: string): void {
    const meta = findOrCreateMeta(`meta[name="${name}"]`, "name", name);
    meta.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string): void {
    const meta = findOrCreateMeta(`meta[property="${property}"]`, "property", property);
    meta.setAttribute("content", content);
}

function setCanonical(url: string): void {
    const existing = document.head.querySelector('link[rel="canonical"]');
    let canonical = existing instanceof HTMLLinkElement ? existing : null;

    if (!canonical) {
        canonical = document.createElement("link");
        canonical.setAttribute("rel", "canonical");
        document.head.appendChild(canonical);
    }

    canonical.setAttribute("href", url);
}

function setAlternate(hreflang: string, url: string): void {
    const selector = `link[rel="alternate"][hreflang="${hreflang}"]`;
    const existing = document.head.querySelector(selector);
    let alternate = existing instanceof HTMLLinkElement ? existing : null;

    if (!alternate) {
        alternate = document.createElement("link");
        alternate.setAttribute("rel", "alternate");
        alternate.setAttribute("hreflang", hreflang);
        document.head.appendChild(alternate);
    }

    alternate.setAttribute("href", url);
}

function pageSchemaType(pageKey: PageKey): "WebPage" | "CollectionPage" | "AboutPage" | "ContactPage" {
    if (pageKey === "services") {
        return "CollectionPage";
    }

    if (pageKey === "about") {
        return "AboutPage";
    }

    if (pageKey === "contact") {
        return "ContactPage";
    }

    return "WebPage";
}

function buildStructuredData(data: AppData, pageKey: PageKey): Record<string, unknown> {
    const { site, pages, navigation, content } = data;
    const page = pages[pageKey] ?? pages.home;
    const siteUrl = normalizedSiteUrl(site.siteUrl);
    const pageUrl = toAbsoluteUrl(siteUrl, page.canonicalPath);
    const organizationId = `${siteUrl}/#organization`;
    const websiteId = `${siteUrl}/#website`;
    const webpageId = `${pageUrl}#webpage`;
    const pageImageUrl = toAbsoluteUrl(siteUrl, page.ogImage);

    const breadcrumbItems: Array<{ "@type": "ListItem"; position: number; name: string; item: string }> = [
        {
            "@type": "ListItem",
            position: 1,
            name: navigation.home.label,
            item: toAbsoluteUrl(siteUrl, navigation.home.href),
        },
    ];

    if (pageKey !== "home") {
        breadcrumbItems.push({
            "@type": "ListItem",
            position: 2,
            name: navigation[pageKey].label,
            item: pageUrl,
        });
    }

    const graph: Record<string, unknown>[] = [
        {
            "@type": "ProfessionalService",
            "@id": organizationId,
            name: site.brand,
            url: siteUrl,
            description: site.tagline,
            areaServed: "Antigua and Barbuda",
            telephone: site.phone_href,
            email: site.email,
            address: {
                "@type": "PostalAddress",
                addressLocality: "Falmouth Harbour",
                addressCountry: "AG",
            },
            openingHours: "Mo-Sa 08:00-17:00",
            serviceType: content.services.sections.map((section) => section.title),
        },
        {
            "@type": "WebSite",
            "@id": websiteId,
            url: siteUrl,
            name: site.brand,
            inLanguage: "en",
        },
        {
            "@type": pageSchemaType(pageKey),
            "@id": webpageId,
            url: pageUrl,
            name: page.title,
            description: page.description,
            isPartOf: { "@id": websiteId },
            about: { "@id": organizationId },
            inLanguage: "en",
            primaryImageOfPage: {
                "@type": "ImageObject",
                url: pageImageUrl,
            },
        },
        {
            "@type": "BreadcrumbList",
            itemListElement: breadcrumbItems,
        },
    ];

    if (pageKey === "services") {
        graph.push({
            "@type": "Service",
            name: "Yacht rigging services",
            provider: { "@id": organizationId },
            areaServed: "Antigua and Barbuda",
            serviceType: content.services.sections.map((section) => section.title),
        });
    }

    if (pageKey === "about") {
        graph.push({
            "@type": "Person",
            name: "Lewis Fitzgerald",
            jobTitle: "Founder",
            worksFor: { "@id": organizationId },
        });
    }

    if (pageKey === "contact") {
        graph.push({
            "@type": "ContactPoint",
            contactType: "customer support",
            telephone: site.phone_href,
            email: site.email,
            areaServed: "AG",
            availableLanguage: ["en"],
        });
    }

    return {
        "@context": "https://schema.org",
        "@graph": graph,
    };
}

function setStructuredData(data: AppData, pageKey: PageKey): void {
    const schema = buildStructuredData(data, pageKey);
    const existing = document.getElementById(STRUCTURED_DATA_ID);
    let script = existing instanceof HTMLScriptElement ? existing : null;

    if (!script) {
        script = document.createElement("script");
        script.id = STRUCTURED_DATA_ID;
        script.type = "application/ld+json";
        document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(schema);
}

function updatePageClass(pageKey: PageKey): void {
    const classPrefix = "page-";
    const pageClass = `${classPrefix}${pageKey}`;
    const currentClasses = [...document.body.classList];
    currentClasses
        .filter((value) => value.startsWith(classPrefix) && value !== pageClass)
        .forEach((value) => document.body.classList.remove(value));

    document.body.classList.add(pageClass);
}

export function updateSeo(data: AppData, pageKey: PageKey): void {
    const page = data.pages[pageKey] ?? data.pages.home;
    const siteUrl = resolvedSiteUrl(data.site.siteUrl);
    const pageUrl = toAbsoluteUrl(siteUrl, page.canonicalPath);
    const ogImageUrl = toAbsoluteUrl(siteUrl, page.ogImage);
    const keywords = [...data.site.defaultKeywords, ...page.keywords].join(", ");

    document.title = page.title;
    document.documentElement.setAttribute("lang", "en");
    updatePageClass(pageKey);

    setCanonical(pageUrl);
    setAlternate("en", pageUrl);
    setAlternate("x-default", pageUrl);
    setMetaByName("description", page.description);
    setMetaByName("keywords", keywords);
    setMetaByName("robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
    setMetaByName("author", data.site.brand);
    setMetaByName("theme-color", "#000000");
    setMetaByProperty("og:title", page.title);
    setMetaByProperty("og:description", page.description);
    setMetaByProperty("og:type", pageKey === "home" ? "website" : "article");
    setMetaByProperty("og:url", pageUrl);
    setMetaByProperty("og:site_name", data.site.brand);
    setMetaByProperty("og:locale", data.site.locale);
    setMetaByProperty("og:image", ogImageUrl);
    setMetaByProperty("og:image:alt", page.ogImageAlt);
    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", page.title);
    setMetaByName("twitter:description", page.description);
    setMetaByName("twitter:image", ogImageUrl);
    setMetaByName("twitter:image:alt", page.ogImageAlt);
    setStructuredData(data, pageKey);
}
