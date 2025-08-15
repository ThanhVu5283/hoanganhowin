const paginationState = {};

// Initialize pagination for all categories
// Initialize pagination for all categories
Object.keys(productsData).forEach((category) => {
  const itemsPerPage = getItemsPerPage();
  paginationState[category] = {
    currentPage: 1,
    itemsPerPage: itemsPerPage,
    totalItems: productsData[category].length,
    totalPages: Math.ceil(productsData[category].length / itemsPerPage),
  };
});
// Update pagination when screen size changes
function updatePaginationForScreenSize() {
  const newItemsPerPage = getItemsPerPage();

  Object.keys(productsData).forEach((category) => {
    const state = paginationState[category];
    if (state.itemsPerPage !== newItemsPerPage) {
      state.itemsPerPage = newItemsPerPage;
      state.totalPages = Math.ceil(state.totalItems / newItemsPerPage);

      // Reset to page 1 if current page is beyond new total pages
      if (state.currentPage > state.totalPages) {
        state.currentPage = 1;
      }

      loadCategoryProducts(category);
      generatePageDots(category);
    }
  });
}
// Function to determine items per page based on screen size
function getItemsPerPage() {
  const screenWidth = window.innerWidth;
  if (screenWidth <= 768) {
    return 1; // Mobile: 1 product
  } else if (screenWidth <= 1024) {
    return 2; // Tablet: 2 products
  } else {
    return 3; // Desktop: 3 products
  }
}
document.addEventListener("DOMContentLoaded", function () {
  initializeWebsite();
});

function initializeWebsite() {
  // Load products for each category
  loadAllCategoryProducts();

  // Initialize search functionality
  initializeSearch();

  // Add scroll effects
  addScrollEffects();

  // Initialize contact menu
  initializeContactMenu();

  // Initialize responsive features
  initializeResponsiveFeatures();
}

function loadAllCategoryProducts() {
  // Load products for all categories using pagination
  Object.keys(productsData).forEach((category) => {
    loadCategoryProducts(category);
    generatePageDots(category);
  });
}

function loadCategoryProducts(category) {
  const products = productsData[category] || [];
  const categoryGrid = document.querySelector(`#${category}-grid`);

  if (!categoryGrid) return;

  const state = paginationState[category];
  const startIndex = (state.currentPage - 1) * state.itemsPerPage;
  const endIndex = startIndex + state.itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  categoryGrid.innerHTML = "";

  currentProducts.forEach((product, index) => {
    const productCard = createProductCard(product, index);
    categoryGrid.appendChild(productCard);
  });

  // Update pagination controls
  updatePaginationControls(category);
  updatePageDots(category);

  // Add animation with stagger effect
  animateProductCards(categoryGrid);
}

function changePage(category, direction) {
  const state = paginationState[category];
  const newPage = state.currentPage + direction;

  if (newPage >= 1 && newPage <= state.totalPages) {
    state.currentPage = newPage;
    loadCategoryProducts(category);
  }
}

function goToPage(category, pageNumber) {
  const state = paginationState[category];
  if (pageNumber >= 1 && pageNumber <= state.totalPages) {
    state.currentPage = pageNumber;
    loadCategoryProducts(category);
  }
}

function generatePageDots(category) {
  const state = paginationState[category];
  const dotsContainer = document.getElementById(`${category}-dots`);

  if (!dotsContainer) return;

  dotsContainer.innerHTML = "";

  for (let i = 1; i <= state.totalPages; i++) {
    const dot = document.createElement("div");
    dot.className = "page-dot";
    if (i === state.currentPage) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => goToPage(category, i));

    dotsContainer.appendChild(dot);
  }
}

function updatePageDots(category) {
  const state = paginationState[category];
  const dotsContainer = document.getElementById(`${category}-dots`);

  if (!dotsContainer) return;

  const dots = dotsContainer.querySelectorAll(".page-dot");
  dots.forEach((dot, index) => {
    if (index + 1 === state.currentPage) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

function updatePaginationControls(category) {
  const state = paginationState[category];
  const pageInfo = document.getElementById(`${category}-page-info`);
  const prevBtn = document.getElementById(`${category}-prev`);
  const nextBtn = document.getElementById(`${category}-next`);

  if (pageInfo) {
    pageInfo.textContent = `Trang ${state.currentPage} / ${state.totalPages}`;
  }

  if (prevBtn) {
    prevBtn.disabled = state.currentPage === 1;
  }

  if (nextBtn) {
    nextBtn.disabled = state.currentPage === state.totalPages;
  }
}
