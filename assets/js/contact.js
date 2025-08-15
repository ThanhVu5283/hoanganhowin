function toggleContactMenu() {
  const menu = document.getElementById("contact-menu");
  if (!menu) return;

  menu.classList.toggle("active");
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

  // Add keyboard support
  contactBtn.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleContactMenu();
    }
  });

  // Close menu on escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && contactMenu.classList.contains("active")) {
      toggleContactMenu();
      contactBtn.focus();
    }
  });
}
