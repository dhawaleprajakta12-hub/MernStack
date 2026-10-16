const services = [
    {
        id: 1,
        name: "Dry Cleaning",
        price: 200,
        image: "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=700&q=80",
        text: "Fresh and clean clothes ready for your next wear."
    },
    {
        id: 2,
        name: "Home Cleaning",
        price: 450,
        image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=700&q=80",
        text: "A quick cleaning service for rooms, floors and more."
    },
    {
        id: 3,
        name: "Car Wash",
        price: 300,
        image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=700&q=80",
        text: "Exterior wash and a simple interior clean for your car."
    },
    {
        id: 4,
        name: "Salon at Home",
        price: 550,
        image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=700&q=80",
        text: "Basic grooming and salon service at your doorstep."
    }
];

let cart = [];
let skipped = [];

const serviceList = document.getElementById("serviceList");
const cartItems = document.getElementById("cartItems");
const totalAmount = document.getElementById("totalAmount");
const itemCount = document.getElementById("itemCount");

function showServices() {
    serviceList.innerHTML = "";

    services.forEach(function(service) {
        const card = document.createElement("div");
        card.className = "service-item" + (skipped.includes(service.id) ? " skipped" : "");

        card.innerHTML = `
            <img class="service-image" src="${service.image}" alt="${service.name}">
            <div class="service-info">
                <h3>${service.name}</h3>
                <p>${service.text}</p>
                <div class="price">₹${service.price.toFixed(2)}</div>
                <div class="service-actions">
                    <button class="skip-btn">Skip Item</button>
                    <button class="add-btn">Add Item</button>
                </div>
            </div>
        `;

        card.querySelector(".skip-btn").addEventListener("click", function() {
            if (!skipped.includes(service.id)) {
                skipped.push(service.id);
            }
            showServices();
        });

        card.querySelector(".add-btn").addEventListener("click", function() {
            addToCart(service.id);
        });

        serviceList.appendChild(card);
    });
}

function addToCart(serviceId) {
    const service = services.find(function(item) {
        return item.id === serviceId;
    });

    if (!service) {
        return;
    }

    const alreadyAdded = cart.some(function(item) {
        return item.id === serviceId;
    });

    if (!alreadyAdded) {
        cart.push(service);
        updateCart();
    }
}

function removeFromCart(serviceId) {
    cart = cart.filter(function(item) {
        return item.id !== serviceId;
    });
    updateCart();
}

function updateCart() {
    itemCount.textContent = cart.length;
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <div class="empty-icon">+</div>
                <h3>No Items Added</h3>
                <p>Add a service from the right side to see it here.</p>
            </div>
        `;
        totalAmount.textContent = "₹0";
        return;
    }

    let total = 0;

    cart.forEach(function(item) {
        total += item.price;

        const row = document.createElement("div");
        row.className = "cart-item";
        row.innerHTML = `
            <div>
                <div class="cart-name">${item.name}</div>
                <button class="remove-btn">Remove</button>
            </div>
            <div class="cart-price">₹${item.price.toFixed(2)}</div>
        `;

        row.querySelector(".remove-btn").addEventListener("click", function() {
            removeFromCart(item.id);
        });

        cartItems.appendChild(row);
    });

    totalAmount.textContent = "₹" + total.toFixed(2);
}

document.getElementById("bookingForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const bookingMessage = document.getElementById("bookingMessage");

    if (cart.length === 0) {
        bookingMessage.style.color = "#c0392b";
        bookingMessage.textContent = "Please add at least one service first.";
        return;
    }

    bookingMessage.style.color = "#2f855a";
    bookingMessage.textContent = "Booking submitted successfully!";
    this.reset();
});

document.getElementById("logoutBtn").addEventListener("click", function() {
    alert("You have been logged out.");
});

showServices();
updateCart();
