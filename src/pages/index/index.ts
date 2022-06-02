import "../../styles/main.scss";

import Logger, { Colour } from "../../app/core/logger";

interface SidebarEntry {
    element: Element,
    icon: Element,
    description: Element,
}

/*
 * CONSTANTS
 */
const logger = new Logger("index", Colour.CADMIUM_ORANGE);

// Tiny email obfuscation thing to prevent spam.
// https://superuser.com/questions/235937/does-e-mail-address-obfuscation-actually-work
const mailPreA = "mai";
const mailPreB = "lto:";
const mailA = "stari";
const mailB = "kolomoni";
const mailDomainA = "gm";
const mailDomainB = "ail.com";
const mail = `${mailPreA}${mailPreB}${mailA}.${mailB}@${mailDomainA}${mailDomainB}`;


/*
 * Document on ready callback.
 */
const onReady = () => {
    logger.debug("Page ready!");

    /*
     * Sidebar mail obfuscation
     */
    logger.info("Setting sidebar mail href.");
    const sidebarMail = document.getElementById("sidebar-mail");
    if (sidebarMail !== null && sidebarMail instanceof HTMLAnchorElement) {
        sidebarMail.href = mail;
    }

    /*
     * Sidebar hover handlers
     */
    logger.info("Adding sidebar link hover handlers.");

    const sidebar = document.getElementById("landing-page-sidebar");
    if (sidebar === null) {
        throw new Error("Could not find sidebar!");
    }

    const sidebarEntries: SidebarEntry[] = [];

    const sidebarLinks = document.querySelectorAll(".sidebar-link");
    sidebarLinks.forEach((link: Element) => {
        const icon = link.querySelector(".icon");
        if (icon === null) {
            logger.error("Some sidebar-link didn't have an icon!");
            return;
        }

        const description = link.querySelector(".description");
        if (description === null) {
            logger.warn("Some sidebar-link didn't have a description!");
            return;
        }


        sidebarEntries.push({ element: link, icon, description });
    });


    sidebar.addEventListener("mousemove", (event: MouseEvent) => {
        const primaryTarget = event.target;
        if (primaryTarget === null || !(primaryTarget instanceof Node)) {
            return;
        }

        sidebarEntries.forEach((entry: SidebarEntry) => {
            const isOnIcon: boolean = entry.icon.contains(primaryTarget);
            const isOnElement: boolean = entry.element.contains(primaryTarget);

            if (isOnIcon && !entry.element.classList.contains("active")) {
                entry.element.classList.add("active");
            } else if (!isOnElement && entry.element.classList.contains("active")) {
                entry.element.classList.remove("active");
            }
        });
    });
};

if (document.readyState !== "loading") {
    onReady();
} else {
    document.addEventListener("DOMContentLoaded", onReady);
}
