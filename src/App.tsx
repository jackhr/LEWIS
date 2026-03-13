import { startTransition, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { appData } from "./data/devAppData";
import { useReveal } from "./hooks/useReveal";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import type { NavigationMap, PageKey, PagesMap } from "./types/app";

function normalizePath(pathname: string): string {
    const normalized = pathname.replace(/\/+$/, "");
    return normalized === "" ? "/" : normalized;
}

function pageFromPath(pathname: string, navigation: NavigationMap): PageKey {
    const file = normalizePath(pathname);
    const entry = (Object.entries(navigation) as Array<[PageKey, NavigationMap[PageKey]]>).find(
        ([, item]) => item.href === file
    );

    return entry ? entry[0] : "home";
}

function updateMeta(pages: PagesMap, pageKey: PageKey): void {
    const page = pages[pageKey] || pages.home;
    document.title = page.title;
    document.body.className = `page-${pageKey}`;

    const description = document.querySelector('meta[name="description"]');
    if (description) {
        description.setAttribute("content", page.description);
    }

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.setAttribute("content", page.title);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
        ogDescription.setAttribute("content", page.description);
    }
}

export default function App() {
    const data = appData;
    const { site, navigation, pages, content } = data;
    const firstServiceKey = content.services.sections[0]?.key ?? "";
    const initialPage: PageKey = navigation[data.initialPage]
        ? data.initialPage
        : pageFromPath(window.location.pathname, navigation);
    const [pageKey, setPageKey] = useState<PageKey>(initialPage);
    const [menuOpen, setMenuOpen] = useState(false);
    const [openService, setOpenService] = useState<string>(firstServiceKey);

    useReveal(pageKey);

    useEffect(() => {
        updateMeta(pages, pageKey);
    }, [pages, pageKey]);

    useEffect(() => {
        document.body.classList.toggle("menu-open", menuOpen);

        return () => {
            document.body.classList.remove("menu-open");
        };
    }, [menuOpen]);

    useEffect(() => {
        const onPopState = () => {
            const nextPage = pageFromPath(window.location.pathname, navigation);
            setPageKey(nextPage);
            setMenuOpen(false);
            document.body.classList.remove("menu-open");
            updateMeta(pages, nextPage);
        };

        window.addEventListener("popstate", onPopState);

        return () => {
            window.removeEventListener("popstate", onPopState);
        };
    }, [navigation, pages]);

    useEffect(() => {
        if (pageKey !== "services" && firstServiceKey !== "") {
            setOpenService(firstServiceKey);
        }
    }, [firstServiceKey, pageKey]);

    function navigate(nextPageKey: PageKey): void {
        if (!navigation[nextPageKey]) {
            return;
        }

        setMenuOpen(false);
        document.body.classList.remove("menu-open");

        startTransition(() => {
            setPageKey(nextPageKey);
        });

        const href = navigation[nextPageKey].href;
        if (normalizePath(window.location.pathname) !== href) {
            window.history.pushState({ pageKey: nextPageKey }, "", href);
        }

        updateMeta(pages, nextPageKey);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function toggleMenu(): void {
        setMenuOpen((current) => !current);
    }

    let page = (
        <HomePage
            site={site}
            content={content}
            navigation={navigation}
            onNavigate={navigate}
        />
    );

    if (pageKey === "services") {
        page = (
            <ServicesPage
                site={site}
                content={content}
                openService={openService}
                onToggleService={(sectionKey) => {
                    setOpenService((current) => (current === sectionKey ? "" : sectionKey));
                }}
            />
        );
    } else if (pageKey === "about") {
        page = <AboutPage site={site} content={content} />;
    } else if (pageKey === "contact") {
        page = <ContactPage site={site} content={content} />;
    }

    return (
        <div className="app">
            <Header
                site={site}
                navigation={navigation}
                pageKey={pageKey}
                menuOpen={menuOpen}
                onToggleMenu={toggleMenu}
                onNavigate={navigate}
            />
            <div className="app__view">{page}</div>
            <Footer site={site} />
        </div>
    );
}
