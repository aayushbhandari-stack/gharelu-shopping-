document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("searchInput");


    if (searchInput) {

        searchInput.addEventListener(
            "keypress",
            function (event) {

                if (event.key === "Enter") {

                    searchProducts();

                }

            }
        );

    }

});
document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("searchInput");


    if (searchInput) {

        searchInput.addEventListener(
            "keypress",
            function (event) {

                if (event.key === "Enter") {

                    searchProducts();

                }

            }
        );

    }

});

// ======================================
// SHOPPING CART
// ======================================


// Get cart from localStorage

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ======================================
// ADD TO CART
// ======================================

function addToCart(name, price, image) {

    // Check if product already exists

    const existingProduct = cart.find(
        product => product.name === name
    );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({

            name: name,

            price: price,

            image: image,

            quantity: 1

        });

    }


    // Save cart

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // Update cart

    updateCartCount();


    alert(name + " added to cart!");

}


// ======================================
// UPDATE CART COUNT
// ======================================

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");


    if (!cartCount) return;


    let totalItems = 0;


    cart.forEach(product => {

        totalItems += product.quantity;

    });


    cartCount.textContent = totalItems;

}


// ======================================
// DISPLAY CART
// ======================================

function displayCart() {

    const container =
        document.getElementById("cartContainer");


    const totalElement =
        document.getElementById("cartTotal");


    if (!container) return;


    container.innerHTML = "";


    // Empty cart

    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <i class="fa-solid fa-cart-shopping"></i>

                <h2>Your cart is empty</h2>

                <p>Add some products to your cart.</p>

                <a href="categories.html">
                    Continue Shopping
                </a>

            </div>

        `;


        if (totalElement) {

            totalElement.textContent = "Rs. 0";

        }

        return;

    }


    let total = 0;


    // Display products

    cart.forEach((product, index) => {

        const productTotal =
            product.price * product.quantity;


        total += productTotal;


        container.innerHTML += `

            <div class="cart-item">


                <img
                    src="${product.image}"
                    alt="${product.name}"
                >


                <div class="cart-product-info">

                    <h3>
                        ${product.name}
                    </h3>

                    <p>
                        Rs. ${product.price.toLocaleString()}
                    </p>

                </div>


                <div class="quantity">


                    <button
                        onclick="decreaseQuantity(${index})">

                        −

                    </button>


                    <span>
                        ${product.quantity}
                    </span>


                    <button
                        onclick="increaseQuantity(${index})">

                        +

                    </button>


                </div>


                <div class="product-total">

                    Rs.
                    ${productTotal.toLocaleString()}

                </div>


                <button
                    class="remove-btn"
                    onclick="removeFromCart(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>


            </div>

        `;

    });


    // Show total

    totalElement.textContent =
        "Rs. " + total.toLocaleString();

}


// ======================================
// INCREASE QUANTITY
// ======================================

function increaseQuantity(index) {

    cart[index].quantity += 1;


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();

    updateCartCount();

}


// ======================================
// DECREASE QUANTITY
// ======================================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity -= 1;

    } else {

        cart.splice(index, 1);

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();

    updateCartCount();

}


// ======================================
// REMOVE PRODUCT
// ======================================

function removeFromCart(index) {

    cart.splice(index, 1);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    displayCart();

    updateCartCount();

}


// ======================================
// CHECKOUT
// ======================================

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    alert(
        "Thank you for shopping with Gharelu Shopping!"
    );

}


// ======================================
// RUN WHEN PAGE LOADS
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        updateCartCount();

        displayCart();

    }
);