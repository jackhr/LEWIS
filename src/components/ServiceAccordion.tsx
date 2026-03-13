import type { ServiceSection } from "../types/app";

interface ChevronProps {
    className?: string;
}

interface ServiceAccordionProps {
    sections: ServiceSection[];
    openService: string;
    onToggleService: (sectionKey: string) => void;
}

function Chevron({ className }: ChevronProps) {
    return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
            <path
                d="M6 9.5 12 15.5 18 9.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function ServiceAccordion({ sections, openService, onToggleService }: ServiceAccordionProps) {
    return (
        <div className="service-accordion">
            {sections.map((section) => {
                const isOpen = openService === section.key;
                const itemClass = isOpen ? "accordion-item is-open" : "accordion-item";
                const panelStyle = {
                    maxHeight: isOpen ? "1200px" : "0px",
                };

                return (
                    <section key={section.key} className={itemClass}>
                        <button
                            className="accordion-trigger"
                            type="button"
                            aria-expanded={isOpen}
                            onClick={() => onToggleService(section.key)}
                        >
                            <span className="accordion__label">{section.title}</span>
                            <Chevron className="accordion__icon" />
                        </button>
                        <div className="accordion-panel" style={panelStyle}>
                            <div className="accordion-panel__inner">
                                <p>{section.intro}</p>
                                <ul>
                                    {section.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                );
            })}
        </div>
    );
}
