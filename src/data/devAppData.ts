import type { AppData } from "../types/app";

export const appData: AppData = {
    initialPage: "home",
    site: {
        brand: "INSITU",
        tagline: "Expert yacht rigging based in Antigua.",
        location: "Falmouth Harbour, Antigua and Barbuda",
        phone_display: "+1 268 714 4222",
        phone_href: "+12687144222",
        email: "info@insiturigging.com",
        hours: "Monday-Saturday / 8am-5pm",
        images: {
            home: "https://images.pexels.com/photos/19045780/pexels-photo-19045780.jpeg?auto=compress&cs=tinysrgb&w=1800",
            services: "https://images.pexels.com/photos/5418592/pexels-photo-5418592.jpeg?auto=compress&cs=tinysrgb&w=1800",
            about: "https://images.pexels.com/photos/32709014/pexels-photo-32709014.jpeg?auto=compress&cs=tinysrgb&w=1800",
            team: "https://images.pexels.com/photos/1340428/pexels-photo-1340428.jpeg?auto=compress&cs=tinysrgb&w=1200",
            contact: "https://images.pexels.com/photos/11955837/pexels-photo-11955837.jpeg?auto=compress&cs=tinysrgb&w=1800",
        },
    },
    navigation: {
        home: { label: "Home", href: "/" },
        services: { label: "Services", href: "/services" },
        about: { label: "About", href: "/about" },
        contact: { label: "Contact", href: "/contact" },
    },
    pages: {
        home: {
            title: "INSITU",
            description: "Expert yacht rigging based in Antigua. Specialists in standing and running rigging.",
        },
        services: {
            title: "Services - INSITU",
            description: "Standing rigging, running rigging, and deck hardware services from INSITU in Antigua.",
        },
        about: {
            title: "About - INSITU",
            description: "Learn more about INSITU, a yacht rigging company based in Falmouth Harbour, Antigua and Barbuda.",
        },
        contact: {
            title: "Contact - INSITU",
            description: "Get in touch with INSITU for yacht rigging support in Antigua.",
        },
    },
    content: {
        home: {
            headline: "Expert yacht rigging based in Antigua.",
            subheadline: "Specialists in standing + running rigging.",
            quickLinks: [
                { key: "services", label: "Services" },
                { key: "about", label: "About Us" },
                { key: "contact", label: "Contact" },
            ],
        },
        services: {
            title: "SERVICES",
            sections: [
                {
                    key: "standing",
                    title: "STANDING RIGGING",
                    intro: "We offer a range of expertise including:",
                    items: [
                        "Mast stepping / unstepping",
                        "Rig inspections",
                        "Cable replacement",
                        "Rig tuning",
                        "Mast hardware servicing",
                        "Issue diagnosis",
                    ],
                },
                {
                    key: "running",
                    title: "RUNNING RIGGING",
                    intro: "Replacing damaged textiles or supplying new, we are experienced in facilitating:",
                    items: [
                        "Line replacement",
                        "Loop / strop replacement",
                        "Standing rigging loops",
                        "Lock strops",
                        "Lifelines",
                        "Tender lifting solutions",
                        "Mooring lines",
                        "Dogbones, low friction rings and textile related hardware",
                    ],
                },
                {
                    key: "deck",
                    title: "DECK HARDWARE",
                    intro: "Working with the leading industry suppliers, we can help service or supply new:",
                    items: [
                        "Furling units",
                        "Jammers / clutches",
                        "Blocks",
                        "Pad eyes",
                        "Constrictors",
                        "Custom fittings",
                    ],
                },
            ],
        },
        about: {
            title: "ABOUT US",
            intro: [
                "Insitu is a yacht rigging company based in Falmouth Harbour, Antigua and Barbuda.",
                "We provide high-quality rigging services for racing yachts, performance cruisers, and superyachts. We bring a deep understanding of yacht rigs and sailing systems.",
                "Our work is defined by strong attention to detail, punctuality, and a commitment to safety and reliability. We work closely with owners, captains, and crews to deliver dependable rigging solutions tailored to each project.",
                "With a rigging workshop located in close proximity to the marinas in the Falmouth Harbour area, we are poised to carry out work in an efficient manner.",
            ],
            teamTitle: "TEAM",
            founderTitle: "LEWIS FITZGERALD - FOUNDER",
            teamBio: [
                "Having grown up in Antigua, Lewis returned home from the European yachting scene to found Insitu. With close to 10 years in the industry, he wants to use his knowledge and experience to cater towards the rigging needs of the yachting industry in Antigua.",
                "His experience includes a 4 year period at Rigging Projects, where he gained an extensive skillset in running and standing rigging systems.",
                "Inshore and offshore racing on Super Maxi, Maxi 72, Volvo 70, IRC52, and Fast 40 programs, with rigging support for the majority of them.",
                "Vendee Globe 2024/2025 campaign as Head of Rigging for L'Occitane en Provence.",
                "Today, he provides tailored rigging solutions in Antigua for racing teams and superyachts alike.",
            ],
        },
        contact: {
            title: "GET IN TOUCH",
            intro: [
                "Whenever you need a rig check post transatlantic, or a broken jib sheet repaired, we are here to help. No issue is too big or small.",
                "You can reach us on the details below.",
            ],
            details: [
                { label: "Phone", value: "+1 268 714 4222", href: "tel:+12687144222" },
                { label: "Email", value: "info@insiturigging.com", href: "mailto:info@insiturigging.com" },
                { label: "Hours", value: "Monday-Saturday 8am-5pm", href: null },
                { label: "Location", value: "Falmouth Harbour, Antigua and Barbuda", href: null },
            ],
        },
    },
};
