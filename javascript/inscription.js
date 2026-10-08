function inscription(event) {
  event.preventDefault();

  const nom = document.getElementById("nom").value.trim();
  const prenom = document.getElementById("prenom").value.trim();
  const email = document.getElementById("email").value.trim();
  const tel = document.getElementById("tel").value.trim();
  const pass = document.getElementById("pass").value.trim();
  const confirm = document.getElementById("confirm").value.trim();

  // Regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/; 
  const telRegex = /^[0-9]{8,15}$/;

  // Vérification champs
  if (!nom || !prenom || !email || !tel || !pass || !confirm) {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  // Email valide
  if (!emailRegex.test(email)) {
    alert("Email invalide.");
    return;
  }

  // Téléphone valide
  if (!telRegex.test(tel)) {
    alert("Numéro de téléphone invalide.");
    return;
  }

  // Mot de passe sécurisé
  if (!passRegex.test(pass)) {
    alert("Mot de passe doit contenir au moins 6 caractères et 1 chiffre.");
    return;
  }

  // Confirmation mot de passe
  if (pass !== confirm) {
    alert("Les mots de passe ne correspondent pas.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Vérifier si email existe déjà
  const exists = users.find(u => u.email === email);
  if (exists) {
    alert("Ce compte existe déjà.");
    return;
  }

  // Création utilisateur
  const user = {
    nom,
    prenom,
    email,
    tel,
    pass
  };

  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));

  alert("Compte créé avec succès 🎉");

  window.location.href = "connexion.html";
}

  const menuBtn = document.getElementById("menu-btn");
  const navLinks = document.querySelector(".nav-links");

  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
