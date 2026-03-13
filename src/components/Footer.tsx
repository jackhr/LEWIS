import { NavLink } from "react-router-dom";
import type { NavigationMap, PageKey, SiteData } from "../types/app";

interface FooterProps {
    site: SiteData;
    navigation: NavigationMap;
}

export default function Footer({ site, navigation }: FooterProps) {
    return (
        <footer className="site-footer">
            <div className="site-footer__inner">
                <div className="site-footer__contact">
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                    <a href={`tel:${site.phone_href}`}>{site.phone_display}</a>
                    <span>{site.location}</span>
                    <span>{site.hours}</span>
                </div>

                <div className="site-footer__logo" aria-label={`${site.brand} logo`}>
                    <img src="/favicon.svg" alt={`${site.brand} logo`} loading="lazy" decoding="async" />
                </div>

                <div className="site-footer__nav">
                    {(Object.entries(navigation) as Array<[PageKey, NavigationMap[PageKey]]>).map(([key, item]) => (
                        <NavLink key={key} to={item.href}>
                            {item.label}
                        </NavLink>
                    ))}
                </div>
            </div>
        </footer>
    );
}
