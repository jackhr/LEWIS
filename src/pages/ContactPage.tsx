import type { ContentData, SiteData } from "../types/app";

interface ContactPageProps {
    site: SiteData;
    content: ContentData;
}

export default function ContactPage({ site, content }: ContactPageProps) {
    return (
        <section className="page contact-page page-enter">
            <div className="contact-page__hero">
                <div className="page-image" aria-hidden="true">
                    <picture>
                        <source media="(max-width: 768px)" type="image/webp" srcSet="/images/contact-background-900.webp" />
                        <source type="image/webp" srcSet="/images/contact-background-1400.webp" />
                        <img src={site.images.contact} alt="" loading="eager" decoding="async" />
                    </picture>
                </div>
                <div className="page-veil"></div>
                <div className="contact-page__content">
                    <div className="contact-card" data-reveal>
                        <h1>{content.contact.title}</h1>
                        {content.contact.intro.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                        <div className="contact-details">
                            {content.contact.details.map((detail) => (
                                <div key={detail.label} className="contact-detail">
                                    <span className="contact-detail__label">{detail.label}</span>
                                    {detail.href ? (
                                        <a href={detail.href}>{detail.value}</a>
                                    ) : (
                                        <span className="contact-detail__value">{detail.value}</span>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="contact-actions">
                            <a className="button-link" href={`tel:${site.phone_href}`}>
                                Call
                            </a>
                            <a className="button-link" href={`mailto:${site.email}`}>
                                Email
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
