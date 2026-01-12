// Show cart items
function displayCart() {
    const orderList = document.getElementById('order-items-list');
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');

    // Get cart from localStorage
    let cart = localStorage.getItem('cart') || '';
    if(cart === '') {
        orderList.innerHTML = '<p>Your cart is empty!</p>';
        subtotalEl.innerText = 'Rs.0';
        taxEl.innerText = 'Rs.0';
        totalEl.innerText = 'Rs.0';
        return;
    }

    const items = cart.split(',').filter(i => i !== '');
    orderList.innerHTML = '';
    let subtotal = 0;

    items.forEach((entry, index) => {
        let parts = entry.split('-');
        let name = parts[0];
        let price = parseInt(parts[1]);
        subtotal += price;

        // Add item to order list
        orderList.innerHTML += `<p>${name} - Rs.${price} 
        <button onclick="removeItem(${index})">Remove</button></p>`;
    });

    // Calculate tax and total
    let tax = Math.round(subtotal * 0.13);
    let deliveryFee = 100;
    let total = subtotal + tax + deliveryFee;

    // Update HTML
    subtotalEl.innerText = `Rs.${subtotal}`;
    taxEl.innerText = `Rs.${tax}`;
    totalEl.innerText = `Rs.${total}`;
}

// Remove an item from cart
function removeItem(index){
    let cart = localStorage.getItem('cart') || '';
    let items = cart.split(',').filter(i => i !== '');
    items.splice(index,1); // remove item
    localStorage.setItem('cart', items.join(','));
    displayCart(); // refresh display
}

// Call displayCart on page load
displayCart();

// Optional: Place order
function placeOrder(){
    alert("Order placed successfully!");
    localStorage.removeItem('cart'); // clear cart after order
    displayCart();
}

// Optional: Apply promo (dummy example)
function applyPromo(){
    alert("Promo applied!");
}

function placeOrder(){
    // Optional: You can validate cart first
    let cart = localStorage.getItem('cart') || '';
    if(cart === ''){
        alert("Your cart is empty!");
        return;
    }

    // Optionally save the order somewhere (for later)
    localStorage.setItem('lastOrder', cart);

    // Clear current cart
    localStorage.removeItem('cart');

    document.getElementById('tracking-section').style.display = 'block';
startTracking();


function startTracking() {
    let progressBar = document.getElementById('progress-bar');
    let statusText = document.getElementById('status-text');
    let width = 10; 

    
    let interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval); 
            statusText.innerText = "Order Delivered! Enjoy your meal 🍴";
        } else {
            width += 30; 
            progressBar.style.width = width + '%';

           
            if (width === 40) {
                statusText.innerText = "Chef is preparing your food... ";
            } else if (width === 70) {
                statusText.innerText = "Rider is picking up your order...";
            } else if (width >= 100) {
                statusText.innerText = "Rider is near your location!";
            }
        }
    }, 2000); 
}
}