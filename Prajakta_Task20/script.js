const services = [
  { id: 1, name: "Dry Cleaning", price: 200, image: "assets/dry-cleaning.svg" },
  { id: 2, name: "Wash & Fold", price: 100, image: "assets/wash-fold.svg" },
  { id: 3, name: "Ironing", price: 120, image: "assets/ironing.svg" },
  { id: 4, name: "Shoe Cleaning", price: 250, image: "assets/shoe-cleaning.svg" },
  { id: 5, name: "Leather Cleaning", price: 350, image: "assets/leather.svg" },
  { id: 6, name: "Curtain Cleaning", price: 300, image: "assets/curtain.svg" }
];

let cart = [];
const serviceList = document.getElementById("serviceList");
const cartItems = document.getElementById("cartItems");
const totalAmount = document.getElementById("totalAmount");
const cartCount = document.getElementById("cartCount");

function showServices() {
  serviceList.innerHTML = "";
  services.forEach(service => {
    const row = document.createElement("div");
    row.className = "service-row";
    row.innerHTML = `
      <img src="${service.image}" alt="${service.name}">
      <div>
        <div class="service-name">${service.name}</div>
        <div class="service-price">₹${service.price}.00</div>
      </div>
      <div class="service-actions">
        <button class="remove-btn" onclick="removeService(${service.id})">Remove Item</button>
        <button class="add-btn" onclick="addService(${service.id})">Add Item</button>
      </div>`;
    serviceList.appendChild(row);
  });
}

function addService(id) {
  const service = services.find(item => item.id === id);
  if (!service) return;
  cart.push(service);
  updateCart();
}

function removeService(id) {
  const index = cart.findIndex(item => item.id === id);
  if (index !== -1) cart.splice(index, 1);
  updateCart();
}

function removeCartItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">No items added</p>';
  } else {
    cart.forEach((item, index) => {
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `<span>${item.name}</span><span>₹${item.price}.00</span><button onclick="removeCartItem(${index})">×</button>`;
      cartItems.appendChild(div);
    });
  }
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalAmount.textContent = `₹${total}`;
  cartCount.textContent = cart.length;
}

document.getElementById("bookServiceBtn").addEventListener("click", () => {
  document.getElementById("services").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("bookingForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const message = document.getElementById("bookingMessage");

  if (cart.length === 0) {
    message.style.color = "#d7546c";
    message.textContent = "Please add at least one service before booking.";
    return;
  }

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const serviceNames = cart.map(item => item.name).join(", ");

  // EmailJS can be connected here. Replace the three values with your EmailJS details.
  // emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", { name, email, phone, services: serviceNames, total });

  message.style.color = "#2e9b68";
  message.textContent = `Thank you ${name}! Your booking for ${serviceNames} is received. We will get back to you soon.`;
  console.log("Booking details:", { name, email, phone, services: serviceNames, total });
  this.reset();
  cart = [];
  updateCart();
});

document.getElementById("newsletterForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const name = document.getElementById("subscriberName").value.trim();
  document.getElementById("newsletterMessage").textContent = `Thanks ${name}! You are subscribed.`;
  this.reset();
});

showServices();
updateCart();
