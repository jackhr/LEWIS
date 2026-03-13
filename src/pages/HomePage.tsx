import { Link } from "react-router-dom";
import type { ContentData, NavigationMap, SiteData } from "../types/app";

interface HomePageProps {
    site: SiteData;
    content: ContentData;
    navigation: NavigationMap;
}

export default function HomePage({ site, content, navigation }: HomePageProps) {
    return (
        <section className="page home-page page-enter">
            <div className="home-page__hero">
                <div className="page-image" aria-hidden="true">
                    <picture>
                        <source media="(max-width: 768px)" type="image/webp" srcSet="/images/home-hero-768.webp" />
                        <source type="image/webp" srcSet="/images/home-hero-1600.webp" />
                        <img src={site.images.home} alt="" fetchPriority="high" decoding="async" />
                    </picture>
                </div>
                <div className="page-veil"></div>
                <div className="home-page__content">
                    <div className="home-copy" data-reveal>
                        <h1>{content.home.headline}</h1>
                        <p>{content.home.subheadline}</p>
                        <div className="home-actions">
                            {content.home.quickLinks.map((item) => (
                                <Link
                                    key={item.key}
                                    className="card-link"
                                    to={navigation[item.key].href}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
