function initializeSearch() {
  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const searchResults = document.getElementById("search-results");
  const mobileSearchTrigger = document.getElementById("mobileSearchTrigger");
  const mobileSearchInput = document.getElementById("mobileSearchInput");
  const mobileSearchBtn = document.getElementById("mobileSearchBtn");
  const mobileSearchResults = document.getElementById("mobile-search-results");
  const mobileCloseBtn = document.getElementById("mobileCloseBtn");
  const mobileOverlay = document.getElementById("mobileSearchOverlay");

  if (!searchInput || !searchBtn || !searchResults) return;

  let searchTimeout;

  // DESKTOP SEARCH
  searchInput.addEventListener("input", function () {
    const query = this.value.trim();
    clearTimeout(searchTimeout);

    if (query.length >= 1) {
      searchResults.innerHTML =
        '<div style="padding: 10px; text-align: center; color: #6b7280;">Đang tìm kiếm...</div>';
      searchResults.style.display = "block";

      searchTimeout = setTimeout(() => {
        performSearch(query, searchResults);
      }, 300);
    } else {
      searchResults.innerHTML = "";
      searchResults.style.display = "none";
    }
  });

  searchBtn.addEventListener("click", function () {
    const query = searchInput.value.trim();
    if (query) {
      performSearch(query, searchResults);
    }
  });

  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      const query = this.value.trim();
      if (query) {
        performSearch(query, searchResults);
      }
    }
    if (event.key === "Escape") {
      searchResults.style.display = "none";
      this.blur();
    }
  });

  // MOBILE SEARCH - GIỐNG DESKTOP
  if (mobileSearchInput && mobileSearchResults) {
    mobileSearchInput.addEventListener("input", function () {
      const query = this.value.trim();
      clearTimeout(searchTimeout);

      if (query.length >= 1) {
        mobileSearchResults.innerHTML =
          '<div style="padding: 10px; text-align: center; color: #6b7280;">Đang tìm kiếm...</div>';
        mobileSearchResults.style.display = "block";

        searchTimeout = setTimeout(() => {
          performSearch(query, mobileSearchResults);
        }, 300);
      } else {
        mobileSearchResults.innerHTML = "";
        mobileSearchResults.style.display = "none";
      }
    });

    mobileSearchInput.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        const query = this.value.trim();
        if (query) {
          performSearch(query, mobileSearchResults);
        }
      }
      if (event.key === "Escape") {
        mobileSearchResults.style.display = "none";
        this.blur();
      }
    });
  }

  // Mobile search trigger
  if (mobileSearchTrigger) {
    mobileSearchTrigger.addEventListener("click", openMobileSearch);
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener("click", closeMobileSearch);
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener("click", closeMobileSearch);
  }

  if (mobileSearchBtn) {
    mobileSearchBtn.addEventListener("click", performMobileSearch);
  }

  // Click outside to close
  document.addEventListener("click", function (event) {
    const searchBox = document.querySelector(".search-box");
    const mobileSearchBox = document.querySelector(".mobile-search-box");

    if (
      !searchBox?.contains(event.target) &&
      !event.target.closest("#mobileSearchTrigger")
    ) {
      searchResults.style.display = "none";
    }

    if (!mobileSearchBox?.contains(event.target)) {
      if (mobileSearchResults) {
        mobileSearchResults.style.display = "none";
      }
    }
  });
}
// Mobile Search Functions
function openMobileSearch() {
  const overlay = document.getElementById("mobileSearchOverlay");
  const container = document.getElementById("mobileSearchContainer");
  const trigger = document.getElementById("mobileSearchTrigger");
  const input = document.getElementById("mobileSearchInput");

  if (overlay && container && trigger && input) {
    trigger.classList.add("active");
    overlay.classList.add("active");
    container.classList.add("active");
    document.body.style.overflow = "hidden";

    // Focus on input after animation
    setTimeout(() => {
      input.focus();
    }, 400);
  }
}

function closeMobileSearch() {
  const overlay = document.getElementById("mobileSearchOverlay");
  const container = document.getElementById("mobileSearchContainer");
  const trigger = document.getElementById("mobileSearchTrigger");
  const input = document.getElementById("mobileSearchInput");
  const mobileResults = document.getElementById("mobile-search-results");

  if (overlay && container && trigger && input) {
    trigger.classList.remove("active");
    overlay.classList.remove("active");
    container.classList.remove("active");
    document.body.style.overflow = "";

    // Clear input and hide results
    input.value = "";
    if (mobileResults) {
      mobileResults.innerHTML = "";
      mobileResults.style.display = "none";
    }
  }
}

function performMobileSearch() {
  const input = document.getElementById("mobileSearchInput");
  const mobileResults = document.getElementById("mobile-search-results");
  const query = input ? input.value.trim() : "";

  if (query) {
    // Sử dụng function search chung với mobile results container
    performSearch(query, mobileResults);
  }
}
function performSearch(query, resultsContainer = null) {
  const allProducts = Object.values(productsData).flat();
  const searchResults =
    resultsContainer || document.getElementById("search-results");

  // Normalize Vietnamese text for better search
  function normalizeVietnamese(str) {
    return str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
      .replace(/đ/g, "d")
      .replace(/Đ/g, "d");
  }

  const normalizedQuery = normalizeVietnamese(query);

  // Enhanced search algorithm
  const results = allProducts.filter((product) => {
    const normalizedName = normalizeVietnamese(product.name);
    const normalizedDesc = normalizeVietnamese(product.description);

    // Search in name, description, and specs
    const nameMatch = normalizedName.includes(normalizedQuery);
    const descMatch = normalizedDesc.includes(normalizedQuery);

    // Search in specs
    const specsMatch = Object.values(product.specs).some((spec) =>
      normalizeVietnamese(spec).includes(normalizedQuery)
    );

    return nameMatch || descMatch || specsMatch;
  });

  // Sort results by relevance
  results.sort((a, b) => {
    const aName = normalizeVietnamese(a.name);
    const bName = normalizeVietnamese(b.name);

    // Prioritize exact matches in name
    const aExact = aName.includes(normalizedQuery);
    const bExact = bName.includes(normalizedQuery);

    if (aExact && !bExact) return -1;
    if (!aExact && bExact) return 1;

    // Then by name length (shorter names first)
    return a.name.length - b.name.length;
  });

  searchResults.innerHTML = "";

  if (results.length > 0) {
    // Nếu có kết quả, scroll to products và highlight
    setTimeout(() => {
      scrollToProducts();
    }, 500);

    results.slice(0, 8).forEach((product) => {
      const resultItem = document.createElement("div");
      resultItem.className = "search-result-item";
      resultItem.style.cssText = `
                      padding: 12px 16px;
                      border-bottom: 1px solid #e5e7eb;
                      cursor: pointer;
                      transition: background-color 0.2s ease;
                      display: flex;
                      align-items: center;
                      gap: 12px;
                      min-height: 48px;
                  `;

      resultItem.innerHTML = `
                      <span style="font-size: 1.5rem;"><img src="${product.image}" alt="${product.name}" style="max-height: 40px; width: auto; height: auto; border-radius: 6px; display: block;"></span>
                      <div style="flex: 1;">
                          <div style="font-weight: 500; color: #374151; margin-bottom: 4px;">${product.name}</div>
                          <div style="font-size: 0.9rem; color: #6b7280;">${product.price} VNĐ</div>
                      </div>
                  `;

      resultItem.addEventListener("click", () => {
        openProductModal(product);
        searchResults.style.display = "none";
        closeMobileSearch(); // Close mobile search if open
      });

      resultItem.addEventListener("mouseenter", () => {
        resultItem.style.backgroundColor = "#f3f4f6";
      });

      resultItem.addEventListener("mouseleave", () => {
        resultItem.style.backgroundColor = "";
      });

      searchResults.appendChild(resultItem);
    });

    if (results.length > 8) {
      const moreItem = document.createElement("div");
      moreItem.style.cssText =
        "padding: 12px 16px; text-align: center; color: #6b7280; font-size: 0.9rem;";
      moreItem.textContent = `Và ${results.length - 8} sản phẩm khác...`;
      searchResults.appendChild(moreItem);
    }
  } else {
    const noResults = document.createElement("div");
    noResults.style.cssText =
      "padding: 20px; text-align: center; color: #6b7280;";
    noResults.innerHTML = `
                  <div style="font-size: 2rem; margin-bottom: 8px;">🔍</div>
                  <div>Không tìm thấy sản phẩm nào</div>
                  <div style="font-size: 0.9rem; margin-top: 4px;">Thử tìm kiếm với từ khóa khác</div>
              `;
    searchResults.appendChild(noResults);
  }

  searchResults.style.display = "block";
}
