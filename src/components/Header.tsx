import type { NavigationMap, PageKey, SiteData } from "../types/app";

interface HeaderProps {
    site: SiteData;
    navigation: NavigationMap;
    pageKey: PageKey;
    menuOpen: boolean;
    onToggleMenu: () => void;
    onNavigate: (pageKey: PageKey) => void;
}

export default function Header({ site, navigation, pageKey, menuOpen, onToggleMenu, onNavigate }: HeaderProps) {
    const navClass = menuOpen ? "site-nav is-open" : "site-nav";
    const toggleClass = menuOpen ? "nav-toggle is-open" : "nav-toggle";

    return (
        <header className="site-header">
            <div className="site-header__inner">
                <a
                    className="brand"
                    href={navigation.home.href}
                    onClick={(event) => {
                        event.preventDefault();
                        onNavigate("home");
                    }}
                >
                    {site.brand}
                </a>
                <button
                    className={toggleClass}
                    type="button"
                    aria-expanded={menuOpen}
                    aria-label="Toggle navigation"
                    onClick={onToggleMenu}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <nav className={navClass}>
                    {(Object.entries(navigation) as Array<[PageKey, NavigationMap[PageKey]]>).map(([key, item]) => (
                        <a
                            key={key}
                            href={item.href}
                            aria-current={pageKey === key ? "page" : undefined}
                            onClick={(event) => {
                                event.preventDefault();
                                onNavigate(key);
                            }}
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
}
