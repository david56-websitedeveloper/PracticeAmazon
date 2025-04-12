
    // DOM Elements
    const navLinks = document.getElementById("navLinks");
    const contactForm = document.getElementById("contactForm");
    const testimonialSlider = document.querySelector(".testimonial-slider");
    const testimonials = document.querySelectorAll(".testimonial");

    // Mobile Menu Toggle
    function toggleMenu() {
        navLinks.classList.toggle("active");
        document.body.classList.toggle("no-scroll");
    }

    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".navbar") && navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
            document.body.classList.remove("no-scroll");
        }
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
            
            // Close mobile menu after navigation
            if (navLinks.classList.contains("active")) toggleMenu();
        });
    });

    // Form Handling with Fetch Simulation
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            message: document.getElementById("message").value.trim()
        };

        // Validation
        if (!Object.values(formData).every(Boolean)) {
            showToast("Please fill in all fields", "error");
            return;
        }

        // Simulate API call
        try {
            contactForm.querySelector("button").disabled = true;
            showToast("Sending message...", "loading");
            
            // Simulated delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            showToast("Message sent successfully!", "success");
            contactForm.reset();
            localStorage.removeItem("draftMessage");
        } catch (error) {
            showToast("Failed to send message. Please try again.", "error");
        } finally {
            contactForm.querySelector("button").disabled = false;
        }
    });

    // Save form draft to localStorage
    contactForm.addEventListener("input", () => {
        const draft = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        };
        localStorage.setItem("draftMessage", JSON.stringify(draft));
    });

    // Load draft on page load
    window.addEventListener("load", () => {
        const draft = JSON.parse(localStorage.getItem("draftMessage"));
        if (draft) {
            document.getElementById("name").value = draft.name;
            document.getElementById("email").value = draft.email;
            document.getElementById("message").value = draft.message;
        }
    });

    // Testimonial Slider
    let currentTestimonial = 0;
    const testimonialDots = [];

    // Create dots for slider navigation
    testimonials.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => showTestimonial(index));
        testimonialSlider.appendChild(dot);
        testimonialDots.push(dot);
    });

    function showTestimonial(index) {
        testimonials[currentTestimonial].classList.remove("active");
        testimonialDots[currentTestimonial].classList.remove("active");
        currentTestimonial = (index + testimonials.length) % testimonials.length;
        testimonials[currentTestimonial].classList.add("active");
        testimonialDots[currentTestimonial].classList.add("active");
    }

    // Auto-advance testimonials
    let sliderInterval = setInterval(() => showTestimonial(currentTestimonial + 1), 5000);

    // Pause on hover
    testimonialSlider.addEventListener("mouseenter", () => clearInterval(sliderInterval));
    testimonialSlider.addEventListener("mouseleave", () => {
        sliderInterval = setInterval(() => showTestimonial(currentTestimonial + 1), 5000);
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, observerOptions);

    document.querySelectorAll("section").forEach(section => {
        section.classList.add("fade-in");
        observer.observe(section);
    });

    // Back to Top Button with Progress
    const backToTop = document.createElement("button");
    backToTop.innerHTML = `↑<svg><circle cx="20" cy="20" r="18"/></svg>`;
    backToTop.classList.add("back-to-top");
    document.body.appendChild(backToTop);

    window.addEventListener("scroll", () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.scrollY / scrollHeight) * 100;
        backToTop.style.setProperty("--progress", `${progress}%`);
        
        backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Toast Notification System
    function showToast(message, type = "info") {
        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => toast.remove(), 3000);
    }

    // Dynamic Copyright Year
    const footer = document.createElement("footer");
    footer.innerHTML = `© ${new Date().getFullYear()} MySite. All Rights Reserved.`;
    document.body.appendChild(footer);

    // Theme Switcher
    const themeButton = document.createElement("button");
    themeButton.className = "theme-toggle";
    themeButton.innerHTML = "🌓";
    document.body.appendChild(themeButton);

    themeButton.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");
        localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
    });

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") document.body.classList.add("dark-theme");





    // function toggleMenu() {
    //   const navLinks = document.getElementById("navLinks");
    //   navLinks.classList.toggle("show");
    // }
