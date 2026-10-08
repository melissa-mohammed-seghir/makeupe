const orderList = document.getElementById("order-list");
const orderTotal = document.getElementById("order-total");
const form = document.getElementById("checkout-form");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {

  orderList.innerHTML = "";

  let total = 0;

  if (cart.length === 0) {
    orderList.innerHTML = `
      <p>
        Votre panier est vide 
        <i class="fa-solid fa-cart-shopping"></i>
      </p>
    `;
    orderTotal.textContent = "0.00";
    return;
  }

  cart.forEach((item, index) => {

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <span>${item.name} - ${item.price} $</span>

      <button class="remove-btn" data-index="${index}">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    orderList.appendChild(div);

    total += Number(item.price);
  });

  orderTotal.textContent = total.toFixed(2);
}

/* delete (version propre sans onclick) */
orderList.addEventListener("click", (e) => {
  const btn = e.target.closest(".remove-btn");

  if (!btn) return;

  const index = btn.dataset.index;

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
});

form.addEventListener("submit", function(e) {

  e.preventDefault();

  alert("Commande envoyée avec succès");

  localStorage.removeItem("cart");

  cart = [];

  renderCart();

  window.location.href = "index.html";
});

renderCart();