import type { SiteData } from "../types/app";

interface FooterProps {
    site: SiteData;
}

export default function Footer({ site }: FooterProps) {
    return (
        <footer className="site-footer">
            <div className="site-footer__inner">
                <div className="site-footer__contact">
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                    <a href={`tel:${site.phone_href}`}>{site.phone_display}</a>
                </div>
                <div className="site-footer__meta">
                    <span>{site.location}</span>
                    <span>{site.hours}</span>
                    <span>
                        {new Date().getFullYear()} {site.brand}
                    </span>
                </div>
            </div>
        </footer>
    );
}
