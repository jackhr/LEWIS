import { useState } from "react";
import ServiceAccordion from "../components/ServiceAccordion";
import type { ContentData, SiteData } from "../types/app";

interface ServicesPageProps {
    site: SiteData;
    content: ContentData;
}

export default function ServicesPage({ site, content }: ServicesPageProps) {
    const firstServiceKey = content.services.sections[0]?.key ?? "";
    const [openService, setOpenService] = useState<string>(firstServiceKey);

    return (
        <section className="page services-page page-enter">
            <div className="services-page__hero">
                <div className="page-image" aria-hidden="true">
                    <picture>
                        <source media="(max-width: 768px)" type="image/webp" srcSet="/images/services-background-768.webp" />
                        <source type="image/webp" srcSet="/images/services-background-1600.webp" />
                        <img src={site.images.services} alt="" loading="eager" decoding="async" />
                    </picture>
                </div>
                <div className="page-veil"></div>
                <div className="services-page__content">
                    <div data-reveal>
                        <h1 className="services-title">{content.services.title}</h1>
                    </div>
                    <ServiceAccordion
                        sections={content.services.sections}
                        openService={openService}
                        onToggleService={(sectionKey) => {
                            setOpenService((current) => (current === sectionKey ? "" : sectionKey));
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
