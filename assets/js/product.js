function createProductCard(product, index) {
  const card = document.createElement("div");
  card.className = "product-card";
  card.onclick = () => openProductModal(product);

  // Enhanced accessibility
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  card.setAttribute("aria-label", `Xem chi tiết ${product.name}`);

  // Add keyboard support
  card.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProductModal(product);
    }
  });

  card.innerHTML = `
              <div class="product-image">
                  <span style="font-size: 4rem;" aria-hidden="true">
                      <img src="${product.image}" alt="${product.name}" style="max-height: 200px; width: auto; height: auto; border-radius: 10px; display: block; margin: 0 auto;">
                  </span>
              </div>
              <div class="product-info">
                  <h3 class="product-name">${product.name}</h3>
                  <div class="product-price">
                      <span class="current-price">${product.price} VNĐ</span>
              </div>
          `;

  return card;
}

function animateProductCards(container) {
  const cards = container.querySelectorAll(".product-card");
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.transition = "all 0.5s ease-out";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });
}
