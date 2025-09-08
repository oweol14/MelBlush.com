// Get cart from localStorage or initialize empty
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add item to cart
function addToCart(product, price) {
  const item = cart.find(i => i.product === product);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ product, price, quantity: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(product + " added to cart!");
}

// Display cart in cart.html
function displayCart() {
  const tableBody = document.querySelector("#cartTable tbody");
  if (!tableBody) return;

  tableBody.innerHTML = "";
  let grandTotal = 0;

  cart.forEach((item, index) => {
    const total = item.price * item.quantity;
    grandTotal += total;

    const row = `
      <tr>
        <td>${item.product}</td>
        <td>₱${item.price.toLocaleString()}</td>
        <td>
          <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
        </td>
        <td>₱${total.toLocaleString()}</td>
        <td><button onclick="removeItem(${index})">Remove</button></td>
      </tr>
    `;
    tableBody.innerHTML += row;
  });

  document.getElementById("grandTotal").innerText = "Grand Total: ₱" + grandTotal.toLocaleString();
}

function updateQuantity(index, quantity) {
  cart[index].quantity = parseInt(quantity);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty. Please add some products first!");
    return;
  }

  alert("Salamat sa iyong pagbili! 🎉 Your order has been placed.");
  cart = []; // Clear cart
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

// Run on cart page
window.onload = displayCart;
