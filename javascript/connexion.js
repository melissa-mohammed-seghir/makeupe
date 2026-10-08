document.addEventListener("DOMContentLoaded", () => {

  /* ================= LOGIN ================= */
  function login(event) {
    event.preventDefault();

    const nomOuEmail = document.getElementById("nom").value.trim();
    const pass = document.getElementById("pass").value.trim();
    const remember = document.querySelector("input[type='checkbox']")?.checked;

    if (!nomOuEmail || !pass) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const userFound = users.find(u =>
      (u.email === nomOuEmail || u.nom === nomOuEmail) &&
      u.pass === pass
    );

    if (!userFound) {
      alert("Nom ou mot de passe incorrect.");
      return;
    }

    localStorage.setItem("user", JSON.stringify(userFound));

    if (remember) {
      localStorage.setItem("remember", nomOuEmail);
    } else {
      localStorage.removeItem("remember");
    }

    alert("Connexion réussie. Bienvenue " + userFound.nom);

    window.location.href = "../index.html";
  }

  window.login = login;

  /* ================= MENU BURGER ================= */
  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.getElementById("nav-links");

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

});