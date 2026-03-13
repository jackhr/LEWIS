export type PageKey = "home" | "services" | "about" | "contact";

export interface SiteImages {
    home: string;
    services: string;
    about: string;
    team: string;
    contact: string;
}

export interface SiteData {
    brand: string;
    tagline: string;
    siteUrl: string;
    locale: string;
    defaultKeywords: string[];
    location: string;
    phone_display: string;
    phone_href: string;
    email: string;
    hours: string;
    images: SiteImages;
}

export interface NavigationItem {
    label: string;
    href: string;
}

export type NavigationMap = Record<PageKey, NavigationItem>;

export interface PageMeta {
    title: string;
    description: string;
    canonicalPath: string;
    ogImage: string;
    ogImageAlt: string;
    keywords: string[];
}

export type PagesMap = Record<PageKey, PageMeta>;

export interface QuickLink {
    key: PageKey;
    label: string;
}

export interface ServiceSection {
    key: string;
    title: string;
    intro: string;
    items: string[];
}

export interface ContactDetail {
    label: string;
    value: string;
    href: string | null;
}

export interface ContentData {
    home: {
        headline: string;
        subheadline: string;
        quickLinks: QuickLink[];
    };
    services: {
        title: string;
        sections: ServiceSection[];
    };
    about: {
        title: string;
        intro: string[];
        teamTitle: string;
        founderTitle: string;
        teamBio: string[];
    };
    contact: {
        title: string;
        intro: string[];
        details: ContactDetail[];
    };
}

export interface AppData {
    initialPage: PageKey;
    site: SiteData;
    navigation: NavigationMap;
    pages: PagesMap;
    content: ContentData;
}
