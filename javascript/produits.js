const buttons = document.querySelectorAll(".filter-buttons button");

const cartBox = document.getElementById("cart");
const totalDisplay = document.getElementById("total");

const modal = document.getElementById("productModal");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const closeBtn = document.querySelector(".close");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ================= PRODUCTS DATA ================= */

const produits = [
  { categorie: "face", nom: "Fond de teint", prix: 20, image: "../images/produits/foundation.jpeg" },
  { categorie: "face", nom: "Spray Fixateur", prix: 15, image: "../images/produits/setting spray.jpeg" },
  { categorie: "face", nom: "Palette de Blush", prix: 12, image: "../images/produits/blush palette.jpeg" },
  { categorie: "face", nom: "poudre", prix: 18, image: "../images/produits/powder.jpeg" },

  { categorie: "lips", nom: "Lipstick", prix: 10, image: "../images/produits/lipstick.jpeg" },
  { categorie: "lips", nom: "Gloss", prix: 9, image: "../images/produits/lipstick FENTY.jpeg" },
  { categorie: "lips", nom: "Lip Liner", prix: 8, image: "../images/produits/lipliner.jpeg" },
  { categorie: "lips", nom: "Tint", prix: 11, image: "../images/produits/liquid matte.jpeg" },

  { categorie: "eyes", nom: "Mascara", prix: 14, image: "../images/produits/mascara.jpeg" },
  { categorie: "eyes", nom: "Eyeliner", prix: 12, image: "../images/produits/eyeliner.jpg" },
  { categorie: "eyes", nom: "Palette", prix: 25, image: "../images/produits/eye shadow palette.jpeg" },
  { categorie: "eyes", nom: "Faux cils", prix: 16, image: "../images/produits/fake lashes.jpeg" },

  { categorie: "skin", nom: "Créme", prix: 22, image: "../images/produits/moisturizer.jpeg" },
  { categorie: "skin", nom: "Sérum", prix: 30, image: "../images/produits/Peptide Serum.jpeg" },
  { categorie: "skin", nom: "Gel Nettoyant", prix: 17, image: "../images/produits/cleanser.jpeg" },
  { categorie: "skin", nom: " Huile Nourrisssante", prix: 19, image: "../images/produits/Get Even Rose Oil.jpeg" }
];

/* ================= SAVE CART ================= */

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* ================= DISPLAY PRODUCTS ================= */

const productsContainer = document.getElementById("products");

function afficherProduits() {

  productsContainer.innerHTML = "";

  produits.forEach(p => {

    productsContainer.innerHTML += `
      <div class="card" data-name="${p.categorie}">
        <img src="${p.image}" alt="${p.nom}">
        <h3>${p.nom}</h3>
        <p class="price">${p.prix} $</p>
        <button class="add">Add</button>
      </div>
    `;
  });

  activerEvents();
}

/* ================= FILTER ================= */

buttons.forEach(btn => {
  btn.addEventListener("click", () => {

    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const value = btn.dataset.name;

    document.querySelectorAll(".card").forEach(card => {
      card.style.display =
        value === "all" || card.dataset.name === value
          ? "block"
          : "none";
    });

  });
});

/* ================= CART ================= */

function updateCart() {

  cartBox.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    cartBox.innerHTML = `
      <p><i class="fa-solid fa-cart-shopping"></i> Panier vide</p>
    `;
    totalDisplay.textContent = "0.00";
    return;
  }

  cart.forEach((item, index) => {

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <span><i class="fa-solid fa-bag-shopping"></i> ${item.name} - ${item.price} $</span>
      <button class="delete-btn" data-index="${index}">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    cartBox.appendChild(div);

    total += Number(item.price);
  });

  totalDisplay.textContent = total.toFixed(2);
}

/* ================= DELETE ITEM ================= */

cartBox.addEventListener("click", (e) => {

  const btn = e.target.closest(".delete-btn");
  if (!btn) return;

  cart.splice(btn.dataset.index, 1);

  saveCart();
  updateCart();
});

/* ================= EVENTS (ADD + MODAL) ================= */

function activerEvents() {

  document.querySelectorAll(".add").forEach(btn => {

    btn.addEventListener("click", e => {

      const card = e.target.closest(".card");

      cart.push({
        name: card.querySelector("h3").textContent,
        price: Number(card.querySelector(".price").textContent.replace("$", ""))
      });

      saveCart();
      updateCart();

      alert("Produit ajouté au panier");
    });

  });

  document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("click", e => {

      if (e.target.closest(".add")) return;

      modalImg.src = card.querySelector("img").src;
      modalTitle.textContent = card.querySelector("h3").textContent;
      modalPrice.textContent = card.querySelector(".price").textContent;

      modal.style.display = "flex";
    });

  });
}

/* ================= MODAL CLOSE ================= */

closeBtn.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

/* ================= INIT ================= */

afficherProduits();
updateCart();