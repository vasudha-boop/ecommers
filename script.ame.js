script.js
let users = JSON.parse(localStorage.getItem('users')) || {};
let currentUser = localStorage.getItem('currentUser');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateUI() {
  document.getElementById('authSection').style.display = currentUser ? 'none' : 'block';
  document.getElementById('products').style.display = currentUser ? 'block' : 'none';
  document.getElementById('logoutBtn').style.display = currentUser ? 'inline' : 'none';
  document.getElementById('loginBtn').style.display = currentUser ? 'none' : 'inline';
  document.getElementById('cartCount').textContent = cart.length;
}

document.getElementById('signup').onclick = () => {
  const user = username.value.trim();
  const pass = password.value.trim();
  if (!user || !pass) return alert("Enter username & password");
  if (users[user]) return alert("User already exists!");
  users[user] = pass;
  localStorage.setItem('users', JSON.stringify(users));
  alert("Signup successful!");
};

document.getElementById('login').onclick = () => {
  const user = username.value.trim();
  const pass = password.value.trim();
  if (users[user] && users[user] === pass) {
    currentUser = user;
    localStorage.setItem('currentUser', user);
    updateUI();
  } else alert("Invalid credentials");
};

document.getElementById('logoutBtn').onclick = () => {
  localStorage.removeItem('currentUser');
  currentUser = null;
  updateUI();
};

function addToCart(item, price) {
  if (!currentUser) return alert("Please log in first!");
  cart.push({ item, price });
  localStorage.setItem('cart', JSON.stringify(cart));
  document.getElementById('cartCount').textContent = cart.length;
}

document.getElementById('cartBtn').onclick = () => {
  const cartList = document.getElementById('cartList');
  cartList.innerHTML = '';
  let total = 0;
  cart.forEach(c => {
    const li = document.createElement('li');
    li.textContent = `${c.item} - $${c.price}`;
    cartList.appendChild(li);
    total += c.price;
  });
  document.getElementById('total').textContent = total;
  document.getElementById('cartSection').style.display = 'block';
  document.getElementById('products').style.display = 'none';
};

document.getElementById('checkoutBtn').onclick = () => {
  document.getElementById('paymentSection').style.display = 'block';
  document.getElementById('cartSection').style.display = 'none';
};

document.getElementById('payNowBtn').onclick = () => {
  document.getElementById('paymentMessage').textContent = "✅ Payment successful! (Simulated)";
  cart = [];
  localStorage.removeItem('cart');
  document.getElementById('cartCount').textContent = 0;
};

updateUI();
