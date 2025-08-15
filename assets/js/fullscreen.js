function openFullscreen(img) {
  // Tạo overlay full màn hình
  const overlay = document.createElement("div");
  overlay.style.cssText = `
                  position: fixed;
                  top: 0;
                  left: 0;
                  width: 100vw;
                  height: 100vh;
                  background: rgba(0,0,0,0.9);
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  z-index: 9999;
                  cursor: zoom-out;
              `;

  // Tạo ảnh full size
  const fullImg = document.createElement("img");
  fullImg.src = img.src;
  fullImg.alt = img.alt;
  fullImg.style.cssText = `
                  max-width: 90vw;
                  max-height: 90vh;
                  object-fit: contain;
                  border-radius: 10px;
              `;

  overlay.appendChild(fullImg);
  document.body.appendChild(overlay);

  // Click để đóng
  overlay.onclick = () => overlay.remove();

  // ESC để đóng
  document.addEventListener("keydown", function closeOnEsc(e) {
    if (e.key === "Escape") {
      overlay.remove();
      document.removeEventListener("keydown", closeOnEsc);
    }
  });
}
let isModalOpen = false;
