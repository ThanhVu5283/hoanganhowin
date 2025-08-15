function loadHTML(id, file) {
  fetch(file)
    .then((response) => {
      if (!response.ok) throw new Error("Không thể load " + file);
      return response.text();
    })
    .then((data) => {
      document.getElementById(id).innerHTML = data;
    })
    .catch((err) => console.error(err));
}

document.addEventListener("DOMContentLoaded", () => {
  loadHTML("header", "assets/html/header.html");
  loadHTML("hero", "assets/html/hero.html");
  loadHTML("products", "assets/html/products.html");
  loadHTML("footer", "assets/html/footer.html");
});
