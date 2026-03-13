import type { ContentData, SiteData } from "../types/app";

interface AboutPageProps {
    site: SiteData;
    content: ContentData;
}

export default function AboutPage({ site, content }: AboutPageProps) {
    return (
        <section className="page about-page page-enter">
            <section className="about-hero">
                <div className="page-image" style={{ backgroundImage: `url('${site.images.about}')` }}></div>
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
                        <img
                            src={site.images.team}
                            alt="Lewis Fitzgerald working aloft on a yacht rig"
                            loading="lazy"
                            decoding="async"
                        />
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
