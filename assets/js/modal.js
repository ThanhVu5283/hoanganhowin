function openProductModal(product) {
  const modal = document.getElementById("productModal");

  if (!modal) return;

  // Populate modal content
  document.getElementById("modal-product-name").textContent = product.name;
  document.getElementById("modal-price").textContent = product.price + " VNĐ";
  document.getElementById(
    "modal-image"
  ).innerHTML = `<span style="font-size: 6rem;"><img src="${product.image}" alt="${product.name}" style="max-height: 400px; width: auto; height: auto; border-radius: 10px; transition: transform 0.3s ease; cursor: zoom-in; display: block; margin: 0 auto;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'" onclick="openFullscreen(this)"></span>`; // Populate specs
  const specsContainer = document.getElementById("modal-specs");
  specsContainer.innerHTML = "";
  Object.entries(product.specs).forEach(([key, value]) => {
    const specItem = document.createElement("div");
    specItem.className = "spec-item";
    specItem.innerHTML = `
                      <div class="spec-label">${key}</div>
                      <div class="spec-value">${value}</div>
                  `;
    specsContainer.appendChild(specItem);
  });

  // THÊM PHẦN NÀY - Populate accessories
  const accessoriesContainer = document.getElementById("modal-accessories");
  if (accessoriesContainer) {
    accessoriesContainer.innerHTML = "";
    if (product.accessories && Object.keys(product.accessories).length > 0) {
      Object.entries(product.accessories).forEach(([key, value]) => {
        const accessoryItem = document.createElement("div");
        accessoryItem.className = "spec-item";
        accessoryItem.innerHTML = `
                              <div class="spec-label">${key}</div>
                              <div class="spec-value">${value}</div>
                          `;
        accessoriesContainer.appendChild(accessoryItem);
      });
      // Hiển thị section accessories
      const accessoriesSection = document.getElementById(
        "modal-accessories-section"
      );
      if (accessoriesSection) {
        accessoriesSection.style.display = "block";
      }
    } else {
      // Ẩn section accessories nếu không có data
      const accessoriesSection = document.getElementById(
        "modal-accessories-section"
      );
      if (accessoriesSection) {
        accessoriesSection.style.display = "none";
      }
    }
  }

  // Show description
  document.getElementById("modal-description").textContent =
    product.description;
  document.getElementById("mobile-product-name").textContent = product.name;

  // 2. Mobile Product Image
  document.getElementById(
    "mobile-image"
  ).innerHTML = `<span style="font-size: 4rem;"><img src="${product.image}" alt="${product.name}" style="max-height: 300px; width: auto; height: auto; border-radius: 10px; cursor: zoom-in; display: block; margin: 0 auto;" onclick="openFullscreen(this)"></span>`;

  // 3. Mobile Price
  document.getElementById("mobile-price").textContent = product.price + " VNĐ";

  // 4. Mobile Description
  document.getElementById("mobile-description").textContent =
    product.description;

  // 5. Mobile Specs
  const mobileSpecsContainer = document.getElementById("mobile-specs");
  if (mobileSpecsContainer) {
    mobileSpecsContainer.innerHTML = "";
    Object.entries(product.specs).forEach(([key, value]) => {
      const specItem = document.createElement("div");
      specItem.className = "mobile-spec-item";
      specItem.innerHTML = `
                          <div class="mobile-spec-label">${key}</div>
                          <div class="mobile-spec-value">${value}</div>
                      `;
      mobileSpecsContainer.appendChild(specItem);
    });
  }

  // 6. Mobile Accessories
  const mobileAccessoriesContainer =
    document.getElementById("mobile-accessories");
  if (mobileAccessoriesContainer) {
    mobileAccessoriesContainer.innerHTML = "";
    if (product.accessories && Object.keys(product.accessories).length > 0) {
      Object.entries(product.accessories).forEach(([key, value]) => {
        const accessoryItem = document.createElement("div");
        accessoryItem.className = "mobile-spec-item";
        accessoryItem.innerHTML = `
                              <div class="mobile-spec-label">${key}</div>
                              <div class="mobile-spec-value">${value}</div>
                          `;
        mobileAccessoriesContainer.appendChild(accessoryItem);
      });
      // Hiển thị section accessories trên mobile
      const mobileAccessoriesSection = document.getElementById(
        "mobile-accessories-section"
      );
      if (mobileAccessoriesSection) {
        mobileAccessoriesSection.style.display = "block";
      }
    } else {
      // Ẩn section accessories nếu không có data
      const mobileAccessoriesSection = document.getElementById(
        "mobile-accessories-section"
      );
      if (mobileAccessoriesSection) {
        mobileAccessoriesSection.style.display = "none";
      }
    }
  }

  // Set modal open state BEFORE showing modal
  isModalOpen = true;

  // Add a state to browser history to handle back button
  if (window.history && window.history.pushState) {
    window.history.pushState({ modal: true }, "", window.location.href);
  }

  // Show modal with enhanced animation
  modal.classList.add("active");
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";

  // Focus management for accessibility
  const closeButton = modal.querySelector(".modal-close");
  if (closeButton) {
    closeButton.focus();
  }
}

function closeModal() {
  const modal = document.getElementById("productModal");
  if (!modal) return;

  const container = modal.querySelector(".modal-container");

  // Add closing animation
  if (container) {
    container.style.transform = "translateY(60px) scale(0.95)";
  }

  setTimeout(() => {
    modal.classList.remove("active");
    modal.style.display = "none";
    document.body.style.overflow = "auto";

    // Set modal closed state
    isModalOpen = false;
  }, 300);
}

// Handle browser back/forward buttons
window.addEventListener("popstate", function (event) {
  if (isModalOpen) {
    // If modal is open and user pressed back, close the modal
    closeModal();
    // Don't let the browser navigate back further
    if (event.state && event.state.modal) {
      // Push current state back to maintain proper history
      window.history.pushState(null, "", window.location.href);
    }
  }
});
