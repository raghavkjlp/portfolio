

/* ── Smooth scroll ── */
function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
}

/* ── Theme toggle ── */
function toggleTheme() {
    const body = document.body;
    body.classList.toggle("dark-mode");
    const isDark = body.classList.contains("dark-mode");
    document.getElementById("theme-icon").textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("dark-mode", isDark);
}

// Restore theme
if (localStorage.getItem("dark-mode") === "true") {
    document.body.classList.add("dark-mode");
    const icon = document.getElementById("theme-icon");
    if (icon) icon.textContent = "☀️";
}

/* ── Live clock ── */
function updateDateTime() {
    const now = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const el = document.getElementById("datetime");
    if (el) el.innerHTML = `<span class="date">${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}</span><br><span class="time">${h}:${m}</span>`;
}
setInterval(updateDateTime, 1000);
updateDateTime();

/* ── Scroll fade-in ── */
function initScrollAnimations() {
    const fadeEls = document.querySelectorAll(".fade-in");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); } });
    }, { threshold: 0.12 });
    fadeEls.forEach(el => observer.observe(el));
}

/* ── Side menu scroll indicator ── */
function initSideMenuScrollSpy() {
    const sections = document.querySelectorAll(".sections, #contact-section");
    const menuIcons = document.querySelectorAll(".side-menu-icon");
    
    const observerOptions = {
        root: null,
        rootMargin: "-25% 0px -55% 0px", // triggers when section is in the viewport middle
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                menuIcons.forEach(icon => {
                    const onclickAttr = icon.getAttribute("onclick");
                    if (onclickAttr && onclickAttr.includes(id)) {
                        icon.classList.add("active");
                    } else {
                        icon.classList.remove("active");
                    }
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

/* ── Scroll-to-Top Button ── */
function initScrollToTop() {
    const btn = document.createElement("button");
    btn.id = "scroll-to-top";
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width:20px;height:20px;"><polyline points="18 15 12 9 6 15"/></svg>`;
    btn.title = "Scroll to top";
    document.body.appendChild(btn);
    
    btn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            btn.classList.add("visible");
        } else {
            btn.classList.remove("visible");
        }
    });
}

// Start all initializations immediately on load
document.addEventListener("DOMContentLoaded", () => {
    initScrollAnimations();
    initSideMenuScrollSpy();
    initScrollToTop();
});
