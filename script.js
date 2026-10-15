
/* =========================================
   MARBLE ACS — WEBSITE JAVASCRIPT
========================================= */


/* 1. MOBILE NAVIGATION */

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");

if (menuButton && navigation) {

    menuButton.addEventListener("click", () => {

        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

        menuButton.textContent = isOpen ? "✕" : "☰";

    });


    /* Close menu after clicking a navigation link */

    navigation.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            navigation.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Open navigation"
            );

            menuButton.textContent = "☰";

        });

    });

}


/* 2. AUTOMATIC FOOTER YEAR */

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


/* 3. HERO BACKGROUND VIDEO */

const heroVideo = document.querySelector(".hero-video");

if (heroVideo) {

    /* Keep the background video muted */

    heroVideo.muted = true;
    heroVideo.defaultMuted = true;

    /* Try to play the video */

    const playVideo = () => {

        const playPromise = heroVideo.play();

        if (playPromise !== undefined) {

            playPromise.catch(() => {

                /* Some browsers block autoplay.
                   The page remains usable if playback is blocked. */

            });

        }

    };

    if (heroVideo.readyState >= 2) {

        playVideo();

    } else {

        heroVideo.addEventListener(
            "canplay",
            playVideo,
            { once: true }
        );

    }

}


/* 4. CLOSE MOBILE MENU WHEN SCREEN RESIZES */

window.addEventListener("resize", () => {

    if (window.innerWidth > 680 && menuButton && navigation) {

        navigation.classList.remove("open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.setAttribute(
            "aria-label",
            "Open navigation"
        );

        menuButton.textContent = "☰";

    }

});


/* 5. SMOOTH SCROLL FOR INTERNAL LINKS */

document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

        const targetId = link.getAttribute("href");

        if (!targetId || targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});


/* =========================================
   GALLERY FILTERS
========================================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioCards = document.querySelectorAll(".portfolio-card");
const emptyMessage = document.querySelector(".gallery-empty");

if (filterButtons.length && portfolioCards.length) {

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const selectedFilter = button.dataset.filter;
            let visibleCount = 0;

            filterButtons.forEach((item) => {
                const isActive = item === button;

                item.classList.toggle("active", isActive);
                item.setAttribute("aria-pressed", String(isActive));
            });

            portfolioCards.forEach((card) => {

                const matches =
                    selectedFilter === "all" ||
                    card.dataset.category === selectedFilter;

                card.hidden = !matches;

                if (matches) {
                    visibleCount++;
                }

            });

            if (emptyMessage) {
                emptyMessage.hidden = visibleCount !== 0;
            }

        });

    });

}


/* =========================================
   GALLERY IMAGE LIGHTBOX
========================================= */

const lightbox = document.querySelector(".lightbox");
const lightboxImage = document.querySelector(".lightbox-img");
const lightboxTitle = document.querySelector(".lightbox-title");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxBackdrop = document.querySelector(".lightbox-backdrop");

let previousFocus = null;

function closeLightbox() {

    if (!lightbox || lightbox.hidden) {
        return;
    }

    lightbox.hidden = true;
    document.body.style.overflow = "";

    if (previousFocus) {
        previousFocus.focus();
    }

}

if (lightbox && lightboxImage) {

    document.querySelectorAll(".portfolio-image").forEach((button) => {

        button.addEventListener("click", () => {

            const imagePath = button.dataset.image;
            const imageTitle = button.dataset.title;

            if (!imagePath) {
                return;
            }

            previousFocus = button;

            lightboxImage.src = imagePath;
            lightboxImage.alt = imageTitle || "Marble ACS project";
            lightboxTitle.textContent = imageTitle || "";

            lightbox.hidden = false;
            document.body.style.overflow = "hidden";

            if (lightboxClose) {
                lightboxClose.focus();
            }

        });

    });

    if (lightboxClose) {
        lightboxClose.addEventListener("click", closeLightbox);
    }

    if (lightboxBackdrop) {
        lightboxBackdrop.addEventListener("click", closeLightbox);
    }

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeLightbox();
        }

    });

}
// end GALLERY IMAGE LIGHTBOX




/* =========================================
   MARBLE ACS — BLOG CATEGORY FILTERS
========================================= */

const blogFilterButtons = document.querySelectorAll(".blog-filter");
const blogCards = document.querySelectorAll(".blog-card");
const blogEmptyMessage = document.querySelector(".blog-empty");

if (blogFilterButtons.length && blogCards.length) {

    blogFilterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const selectedCategory = button.dataset.blogFilter;
            let visibleCount = 0;

            blogFilterButtons.forEach((item) => {

                const isActive = item === button;

                item.classList.toggle("active", isActive);

                item.setAttribute(
                    "aria-pressed",
                    String(isActive)
                );

            });

            blogCards.forEach((card) => {

                const matches =
                    selectedCategory === "all" ||
                    card.dataset.blogCategory === selectedCategory;

                card.hidden = !matches;

                if (matches) {
                    visibleCount++;
                }

            });

            if (blogEmptyMessage) {
                blogEmptyMessage.hidden = visibleCount > 0;
            }

        });

    });

}



/* =========================================
   MARBLE ACS — CONTACT FORM
========================================= */

// Replace with your real business email.
const MARBLE_CONTACT_EMAIL = "YOUR-EMAIL@example.com";

// Replace with your WhatsApp number in international format.
// Use digits only, without +, spaces or dashes.
const MARBLE_WHATSAPP_NUMBER = "YOUR_WHATSAPP_NUMBER";

const contactForm = document.getElementById("contactForm");
const contactStatus = document.getElementById("contactFormStatus");
const whatsappContactButton = document.getElementById("whatsappContact");

function getContactFormData() {
    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return null;
    }

    const data = new FormData(contactForm);

    return {
        name: String(data.get("name") || "").trim(),
        email: String(data.get("email") || "").trim(),
        phone: String(data.get("phone") || "").trim(),
        service: String(data.get("service") || "").trim(),
        subject: String(data.get("subject") || "").trim(),
        message: String(data.get("message") || "").trim()
    };
}

function formatContactMessage(data) {
    return [
        "Marble ACS — Project Enquiry",
        "",
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone || "Not provided"}`,
        `Service: ${data.service}`,
        `Subject: ${data.subject || "Not provided"}`,
        "",
        "Message:",
        data.message
    ].join("\n");
}

// Send the enquiry through the visitor's email application.
if (contactForm && contactStatus) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const data = getContactFormData();

        if (!data) return;

        if (
            !MARBLE_CONTACT_EMAIL ||
            MARBLE_CONTACT_EMAIL === "YOUR-EMAIL@example.com"
        ) {
            contactStatus.textContent =
                "Please configure your real business email in script.js first.";
            return;
        }

        const subject = encodeURIComponent(
            data.subject || `Project Enquiry — ${data.name}`
        );

        const body = encodeURIComponent(formatContactMessage(data));

        contactStatus.textContent =
            "Opening your email application. Please review and send the message.";

        window.location.href =
            `mailto:${MARBLE_CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    });
}

// Open WhatsApp with the enquiry prepared for the visitor.
if (whatsappContactButton && contactForm && contactStatus) {
    whatsappContactButton.addEventListener("click", () => {
        const data = getContactFormData();

        if (!data) return;

        if (
            !MARBLE_WHATSAPP_NUMBER ||
            MARBLE_WHATSAPP_NUMBER === "YOUR_WHATSAPP_NUMBER"
        ) {
            contactStatus.textContent =
                "Please configure your business WhatsApp number in script.js first.";
            return;
        }

        const message = encodeURIComponent(formatContactMessage(data));

        const whatsappUrl =
            `https://wa.me/${MARBLE_WHATSAPP_NUMBER}?text=${message}`;

        window.open(whatsappUrl, "_blank", "noopener,noreferrer");

        contactStatus.textContent =
            "WhatsApp opened with your enquiry. Review the message and send it.";
    });
}





