document.addEventListener("DOMContentLoaded", () => {

  /* ================= MENU MOBILE ================= */

  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }


  /* ================= PRODUITS POPULAIRES ================= */

  const Products = [
    {
      nom: "Lipstick",
      prix: 10,
      image: "images/produits/lipstick.jpeg"
    },
    {
      nom: "Eyeliner",
      prix: 13,
      image: "images/produits/eyeliner.jpg"
    },
    {
      nom: "Lip Liner",
      prix: 8,
      image: "images/produits/lipliner.jpeg"
    },
    {
      nom: "Tint",
      prix: 11,
      image: "images/produits/liquid matte.jpeg"
    }
  ];


  const homeContainer = document.getElementById("home-products");

  if (homeContainer) {

    Products.forEach(p => {

      homeContainer.innerHTML += `
        <div class="product-card">

          <img src="${p.image}" alt="${p.nom}">

          <h3>${p.nom}</h3>

          <p>${p.prix} $</p>

          <button class="add-home"
            data-name="${p.nom}"
            data-price="${p.prix}">
            Ajouter au panier
          </button>

        </div>
      `;

    });

    activateHomeCart();
  }


  /* ================= PANIER ================= */

  function activateHomeCart() {

    document.querySelectorAll(".add-home").forEach(button => {

      button.addEventListener("click", () => {

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push({
          name: button.dataset.name,
          price: Number(button.dataset.price)
        });

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Produit ajouté au panier");

      });

    });

  }


  /* ================= MODAL ================= */

  const modal = document.getElementById("productModal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalPrice = document.getElementById("modalPrice");
  const closeBtn = document.querySelector(".close");


  const cards = document.querySelectorAll(".product-card");

  cards.forEach(card => {

    card.addEventListener("click", (e) => {

      if (e.target.closest(".add-home")) return;

      modalImg.src = card.querySelector("img").src;

      modalTitle.textContent =
        card.querySelector("h3").textContent;

      modalPrice.textContent =
        card.querySelector("p").textContent;

      modal.style.display = "flex";

    });

  });


  /* ================= FERMER MODAL ================= */

  if (closeBtn) {

    closeBtn.onclick = () => {
      modal.style.display = "none";
    };

  }


  window.onclick = (e) => {

    if (e.target === modal) {
      modal.style.display = "none";
    }

  };

});