import type { ContentData, NavigationMap, PageKey, SiteData } from "../types/app";

interface HomePageProps {
    site: SiteData;
    content: ContentData;
    navigation: NavigationMap;
    onNavigate: (pageKey: PageKey) => void;
}

export default function HomePage({ site, content, navigation, onNavigate }: HomePageProps) {
    return (
        <section className="page home-page page-enter">
            <div className="home-page__hero">
                <div className="page-image" style={{ backgroundImage: `url('${site.images.home}')` }}></div>
                <div className="page-veil"></div>
                <div className="home-page__content">
                    <div className="home-copy" data-reveal>
                        <h1>{content.home.headline}</h1>
                        <p>{content.home.subheadline}</p>
                        <div className="home-actions">
                            {content.home.quickLinks.map((item) => (
                                <a
                                    key={item.key}
                                    className="card-link"
                                    href={navigation[item.key].href}
                                    onClick={(event) => {
                                        event.preventDefault();
                                        onNavigate(item.key);
                                    }}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
