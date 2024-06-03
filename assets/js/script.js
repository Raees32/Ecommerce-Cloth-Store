// 'use strict';



// /**
//  * add event on element
//  */

// const addEventOnElem = function (elem, type, callback) {
//   if (elem.length > 1) {
//     for (let i = 0; i < elem.length; i++) {
//       elem[i].addEventListener(type, callback);
//     }
//   } else {
//     elem.addEventListener(type, callback);
//   }
// }



// /**
//  * navbar toggle
//  */

// const navbar = document.querySelector("[data-navbar]");
// const navbarLinks = document.querySelectorAll("[data-nav-link]");
// const navTogglers = document.querySelectorAll("[data-nav-toggler]");
// const overlay = document.querySelector("[data-overlay]");

// const toggleNavbar = function () {
//   navbar.classList.toggle("active");
//   overlay.classList.toggle("active");
//   document.body.classList.toggle("active");
// }

// addEventOnElem(navTogglers, "click", toggleNavbar);

// const closeNavbar = function () {
//   navbar.classList.remove("active");
//   overlay.classList.remove("active");
//   document.body.classList.remove("active");
// }

// addEventOnElem(navbarLinks, "click", closeNavbar);



// /**
//  * header & back top btn active when window scroll down to 100px
//  */

// const header = document.querySelector("[data-header]");
// const backTopBtn = document.querySelector("[data-back-top-btn]");

// const showElemOnScroll = function () {
//   if (window.scrollY > 100) {
//     header.classList.add("active");
//     backTopBtn.classList.add("active");
//   } else {
//     header.classList.remove("active");
//     backTopBtn.classList.remove("active");
//   }
// }

// addEventOnElem(window, "scroll", showElemOnScroll);



// /**
//  * product filter
//  */

// const filterBtns = document.querySelectorAll("[data-filter-btn]");
// const filterBox = document.querySelector("[data-filter]");

// let lastClickedFilterBtn = filterBtns[0];

// const filter = function () {
//   lastClickedFilterBtn.classList.remove("active");
//   this.classList.add("active");
//   lastClickedFilterBtn = this;

//   filterBox.setAttribute("data-filter", this.dataset.filterBtn)
// }

// addEventOnElem(filterBtns, "click", filter);
const API_URL = 'http://192.168.0.140:5000/api/cart';

// Fetch all cart items
const fetchCartItems = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch cart items');
    }
    const cartItems = await response.json();
    // Do something with the cartItems data, like updating the UI
  } catch (error) {
    console.error('Error fetching cart items:', error);
  }
};

// Add new item to the cart
const addToCart = async (itemData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemData)
    });
    if (!response.ok) {
      throw new Error('Failed to add item to cart');
    }
    const newItem = await response.json();
    // Do something with the newItem data, like updating the UI
  } catch (error) {
    console.error('Error adding item to cart:', error);
  }
};

// Remove item from the cart
const removeFromCart = async (itemId) => {
  try {
    const response = await fetch(`${API_URL}/${itemId}`, {
      method: 'DELETE'
    });
    if (!response.ok) {
      throw new Error('Failed to remove item from cart');
    }
    const result = await response.json();
    // Do something with the result, like updating the UI
  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};

// Add event listeners to "Add to Cart" buttons
document.querySelectorAll('.card-action-btn.add-to-cart').forEach(button => {
  button.addEventListener('click', async () => {
    const listItem = button.closest('.product-card');
    const title = listItem.querySelector('.card-title').textContent;
    const price = parseFloat(listItem.querySelector('.card-price .price').getAttribute('value'));
    const image = listItem.querySelector('.card-banner img').getAttribute('src');

    const itemData = {
      name: title,
      price,
      quantity: 1, // Assuming default quantity is 1
      image
    };
    await addToCart(itemData); // Await the addToCart function call
  });
});

// Example usage
document.addEventListener('DOMContentLoaded', () => {
  // Fetch cart items when the page loads
  fetchCartItems();

  // Example: Remove item from cart
  const itemIdToRemove = '123'; // Replace with actual item ID
  removeFromCart(itemIdToRemove);
});