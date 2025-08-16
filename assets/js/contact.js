function toggleContactMenu() {
  const menu = document.getElementById("contact-menu");
  if (!menu) return;

  const isActive = menu.classList.toggle("active");
  
  // Update ARIA attribute
  const contactBtn = document.querySelector(".contact-main-btn");
  if (contactBtn) {
    contactBtn.setAttribute("aria-expanded", isActive.toString());
  }
}

function initializeContactMenu() {
  // Enhanced contact menu with better mobile support
  const contactBtn = document.querySelector(".contact-main-btn");
  const contactMenu = document.getElementById("contact-menu");

  if (!contactBtn || !contactMenu) return;

  // Add ARIA attributes for accessibility
  contactBtn.setAttribute("aria-haspopup", "true");
  contactBtn.setAttribute("aria-expanded", "false");
  contactMenu.setAttribute("role", "menu");

  // Click event for toggle button
  contactBtn.addEventListener("click", function(event) {
    event.stopPropagation();
    toggleContactMenu();
  });

  // Add keyboard support
  contactBtn.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleContactMenu();
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (event) {
    if (contactMenu.classList.contains("active")) {
      // Check if click is outside both button and menu
      if (!contactBtn.contains(event.target) && !contactMenu.contains(event.target)) {
        contactMenu.classList.remove("active");
        contactBtn.setAttribute("aria-expanded", "false");
      }
    }
  });

  // Prevent menu from closing when clicking inside it
  contactMenu.addEventListener("click", function(event) {
    event.stopPropagation();
  });

  // Close menu on escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && contactMenu.classList.contains("active")) {
      contactMenu.classList.remove("active");
      contactBtn.setAttribute("aria-expanded", "false");
      contactBtn.focus();
    }
  });
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeContactMenu);
