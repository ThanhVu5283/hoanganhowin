function scrollToProducts() {
  const productsSection = document.getElementById("products");

  if (!productsSection) return;

  // Enhanced smooth scroll with mobile support
  const headerHeight = document.querySelector(".main-header").offsetHeight;
  const targetPosition = productsSection.offsetTop - headerHeight - 20;

  // Use smooth scroll with fallback for older browsers
  if ("scrollBehavior" in document.documentElement.style) {
    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  } else {
    // Fallback smooth scroll for older browsers
    smoothScrollTo(targetPosition, 800);
  }
}

function smoothScrollTo(targetPosition, duration) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}
function addScrollEffects() {
  // Enhanced scroll effects with mobile optimization
  let ticking = false;

  function updateScrollEffects() {
    const scrollY = window.pageYOffset;
    const header = document.querySelector(".main-header");

    // Header background opacity based on scroll
    if (header) {
      const opacity = Math.min(scrollY / 100, 1);
      header.style.background = `rgba(255, 255, 255, ${0.95 + opacity * 0.05})`;
    }

    // Parallax effect for hero section (disabled on mobile for performance)
    if (window.innerWidth > 768) {
      const hero = document.querySelector(".hero");
      if (hero && scrollY < window.innerHeight) {
        hero.style.transform = `translateY(${scrollY * 0.5}px)`;
      }
    }

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    },
    { passive: true }
  );
}
