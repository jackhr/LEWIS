import ServiceAccordion from "../components/ServiceAccordion";
import type { ContentData, SiteData } from "../types/app";

interface ServicesPageProps {
    site: SiteData;
    content: ContentData;
    openService: string;
    onToggleService: (sectionKey: string) => void;
}

export default function ServicesPage({ site, content, openService, onToggleService }: ServicesPageProps) {
    return (
        <section className="page services-page page-enter">
            <div className="services-page__hero">
                <div className="page-image" style={{ backgroundImage: `url('${site.images.services}')` }}></div>
                <div className="page-veil"></div>
                <div className="services-page__content">
                    <div data-reveal>
                        <h1 className="services-title">{content.services.title}</h1>
                    </div>
                    <ServiceAccordion
                        sections={content.services.sections}
                        openService={openService}
                        onToggleService={onToggleService}
                    />
                </div>
            </div>
        </section>
    );
}
