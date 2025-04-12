document.addEventListener("DOMContentLoaded", () => {
  // Enhanced Hero Slider
  let currentSlide = 0;
  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".slider-dots");

  // Create slider dots
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.className = "dot" + (index === 0 ? " active" : "");
    dot.addEventListener("click", () => slideTo(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function slideTo(index) {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  function nextSlide() {
    slideTo(currentSlide + 1);
  }

  function prevSlide() {
    slideTo(currentSlide - 1);
  }

  document.querySelector(".next").addEventListener("click", nextSlide);
  document.querySelector(".prev").addEventListener("click", prevSlide);

  // Auto-slide every 7 seconds
  let slideInterval = setInterval(nextSlide, 7000);

  // Pause on hover
  const heroSlider = document.querySelector(".hero-slider");
  heroSlider.addEventListener("mouseenter", () => clearInterval(slideInterval));
  heroSlider.addEventListener("mouseleave", () => {
    slideInterval = setInterval(nextSlide, 7000);
  });

  // Enhanced Product Loading
  const products = [
    {
      id: 1,
      name: "Smart Watch Series 5",
      price: 199.99,
      image: "watch.jpg",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Noise-Canceling Headphones",
      price: 299.99,
      image: "headphones.jpg",
      rating: 4.6,
    },
  ];

  const productGrid = document.querySelector(".product-grid");
  productGrid.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-rating">${product.rating} ★</div>
            </div>
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `
    )
    .join("");

  // Enhanced Cart Functionality
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.createElement("div");
  cartCount.className = "cart-count";
  document.querySelector("header").appendChild(cartCount);

  window.addToCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    showCartNotification(`Added ${product.name} to cart`);
  };

  function updateCartCount() {
    cartCount.textContent = `🛒 ${cart.length} Items`;
  }

  function showCartNotification(message) {
    const notification = document.createElement("div");
    notification.className = "cart-notification";
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2000);
  }

  // Mobile Menu Improvements
  const menuToggle = document.createElement("div");
  menuToggle.className = "menu-toggle";
  menuToggle.innerHTML = "☰";
  document.querySelector("header").prepend(menuToggle);

  menuToggle.addEventListener("click", () => {
    const nav = document.querySelector("nav");
    nav.classList.toggle("active");
    menuToggle.textContent = nav.classList.contains("active") ? "✕" : "☰";
  });

  // Viewport Height Fix for Mobile
  function setViewportHeight() {
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight * 0.01}px`
    );
  }
  window.addEventListener("resize", setViewportHeight);
  setViewportHeight();
});
