import { useEffect } from "react";

export function useReveal(pageKey: string): void {
    useEffect(() => {
        const nodes = Array.from(document.querySelectorAll("[data-reveal]"));

        if (!nodes.length) {
            return undefined;
        }

        if (!("IntersectionObserver" in window)) {
            nodes.forEach((node) => node.classList.add("is-visible"));
            return undefined;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.14,
                rootMargin: "0px 0px -10% 0px",
            }
        );

        nodes.forEach((node) => observer.observe(node));

        return () => {
            observer.disconnect();
        };
    }, [pageKey]);
}
