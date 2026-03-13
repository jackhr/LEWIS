import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { appData } from "./data/devAppData";
import { useReveal } from "./hooks/useReveal";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import { updateSeo } from "./seo";
import type { NavigationMap, PageKey } from "./types/app";

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

export default function App() {
    const data = appData;
    const { site, navigation, content } = data;
    const location = useLocation();
    const pageKey = pageFromPath(location.pathname, navigation);
    const [menuOpen, setMenuOpen] = useState(false);

    useReveal(pageKey);

    useEffect(() => {
        updateSeo(data, pageKey);
    }, [data, pageKey]);

    useEffect(() => {
        document.body.classList.toggle("menu-open", menuOpen);

        return () => {
            document.body.classList.remove("menu-open");
        };
    }, [menuOpen]);

    useEffect(() => {
        setMenuOpen(false);
        document.body.classList.remove("menu-open");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [location.pathname]);

    function toggleMenu(): void {
        setMenuOpen((current) => !current);
    }

    function closeMenu(): void {
        setMenuOpen(false);
        document.body.classList.remove("menu-open");
    }

    return (
        <div className="app">
            <Header
                site={site}
                navigation={navigation}
                menuOpen={menuOpen}
                onToggleMenu={toggleMenu}
                onNavigate={closeMenu}
            />
            <main id="main-content" className="app__view">
                <Routes>
                    <Route path="/" element={<HomePage site={site} content={content} navigation={navigation} />} />
                    <Route path="/services" element={<ServicesPage site={site} content={content} />} />
                    <Route path="/about" element={<AboutPage site={site} content={content} />} />
                    <Route path="/contact" element={<ContactPage site={site} content={content} />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
            <Footer site={site} navigation={navigation} />
        </div>
    );
}
