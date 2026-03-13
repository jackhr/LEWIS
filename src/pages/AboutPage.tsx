import type { ContentData, SiteData } from "../types/app";

interface AboutPageProps {
    site: SiteData;
    content: ContentData;
}

export default function AboutPage({ site, content }: AboutPageProps) {
    return (
        <section className="page about-page page-enter">
            <section className="about-hero">
                <div className="page-image" aria-hidden="true">
                    <picture>
                        <source media="(max-width: 768px)" type="image/webp" srcSet="/images/about-background-900.webp" />
                        <source type="image/webp" srcSet="/images/about-background-1600.webp" />
                        <img src={site.images.about} alt="" loading="eager" decoding="async" />
                    </picture>
                </div>
                <div className="page-veil"></div>
                <div className="about-hero__content">
                    <div className="about-hero__copy" data-reveal>
                        <h1>{content.about.title}</h1>
                        {content.about.intro.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </section>
            <section className="team-section">
                <div className="team-grid">
                    <div className="team-image" data-reveal>
                        <picture>
                            <source media="(max-width: 768px)" type="image/webp" srcSet="/images/team-image-600.webp" />
                            <source type="image/webp" srcSet="/images/team-image-1000.webp" />
                            <img
                                src={site.images.team}
                                alt="Lewis Fitzgerald working aloft on a yacht rig"
                                loading="lazy"
                                decoding="async"
                            />
                        </picture>
                    </div>
                    <div className="team-copy" data-reveal>
                        <div className="team-copy__eyebrow">{content.about.teamTitle}</div>
                        <h2>{content.about.founderTitle}</h2>
                        {content.about.teamBio.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </section>
        </section>
    );
}
