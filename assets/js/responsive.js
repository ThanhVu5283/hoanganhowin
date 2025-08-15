function initializeResponsiveFeatures() {
  const screenWidth = window.innerWidth;

  // Adjust layout based on screen size
  if (screenWidth < 768) {
    // Mobile adjustments
    adjustMobileLayout();
  } else if (screenWidth < 1024) {
    // Tablet adjustments
    adjustTabletLayout();
  } else {
    // Desktop adjustments
    adjustDesktopLayout();
  }
}

function adjustMobileLayout() {
  // Mobile-specific adjustments
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.padding = "1rem";
  }

  // Adjust search input for mobile
  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.style.fontSize = "16px"; // Prevent zoom on iOS
  }

  // Ensure touch targets are at least 44px
  const buttons = document.querySelectorAll("button, .hero-btn, .contact-item");
  buttons.forEach((button) => {
    const computedStyle = window.getComputedStyle(button);
    const height = parseInt(computedStyle.height);
    if (height < 44) {
      button.style.minHeight = "44px";
    }
  });
}

function adjustTabletLayout() {
  // Tablet-specific adjustments
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.padding = "2rem 1.5rem";
  }
}

function adjustDesktopLayout() {
  // Desktop-specific adjustments
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.padding = "3rem 2rem";
  }
}

// Enhanced error handling and performance monitoring
window.addEventListener("error", function (event) {
  console.error("JavaScript Error:", event.error);
});

// Performance monitoring
if ("performance" in window) {
  window.addEventListener("load", function () {
    setTimeout(function () {
      const perfData = performance.getEntriesByType("navigation")[0];
      console.log(
        "Page Load Time:",
        perfData.loadEventEnd - perfData.loadEventStart,
        "ms"
      );
    }, 0);
  });
}

// Handle resize for responsive adjustments
// Handle resize for responsive adjustments
let resizeTimeout;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(function () {
    initializeResponsiveFeatures();
    updatePaginationForScreenSize(); // Add this line
  }, 250);
});

// Modal keyboard support
document.addEventListener("keydown", function (event) {
  const modal = document.getElementById("productModal");
  if (modal && modal.classList.contains("active") && event.key === "Escape") {
    closeModal();
  }
});
