import { Link, NavLink } from "react-router-dom";
import type { NavigationMap, PageKey, SiteData } from "../types/app";

interface HeaderProps {
    site: SiteData;
    navigation: NavigationMap;
    menuOpen: boolean;
    onToggleMenu: () => void;
    onNavigate: () => void;
}

export default function Header({ site, navigation, menuOpen, onToggleMenu, onNavigate }: HeaderProps) {
    const navClass = menuOpen ? "site-nav is-open" : "site-nav";
    const toggleClass = menuOpen ? "nav-toggle is-open" : "nav-toggle";

    return (
        <header className="site-header">
            <div className="site-header__inner">
                <Link className="brand" to={navigation.home.href} onClick={onNavigate}>
                    {site.brand}
                </Link>
                <button
                    className={toggleClass}
                    type="button"
                    aria-expanded={menuOpen}
                    aria-controls="site-navigation"
                    aria-label="Toggle navigation"
                    onClick={onToggleMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <nav id="site-navigation" className={navClass} aria-label="Primary">
                    {(Object.entries(navigation) as Array<[PageKey, NavigationMap[PageKey]]>).map(([key, item]) => (
                        <NavLink key={key} to={item.href} onClick={onNavigate}>
                            {item.label}
                        </NavLink>
                    ))}
                </nav>
            </div>
        </header>
    );
}
