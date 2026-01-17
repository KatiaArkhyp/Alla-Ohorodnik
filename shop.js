let cart = JSON.parse(localStorage.getItem('myHoneyCart')) || [];
document.addEventListener('DOMContentLoaded', updateCartUI);

function updateCartUI() {
    const list = document.getElementById('cart-items-list');
    const countLabel = document.getElementById('cart-count');
    const totalLabel = document.getElementById('total-price');
    
    countLabel.innerText = cart.length;

    if (cart.length === 0) {
        list.innerHTML = '<p class="text-center">Кошик порожній</p>';
        totalLabel.innerText = '0';
        return;
    }

    list.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        list.innerHTML += `
            <div class="cart-item d-flex justify-content-between align-items-center mb-2">
                <span>${item.name}</span>
                <div>
                    <span class="mr-3">${item.price} грн</span>
                    <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">×</button>
                </div>
            </div>
        `;
    });
    totalLabel.innerText = total;
}

window.removeFromCart = function(index) {
    cart.splice(index, 1);
    localStorage.setItem('myHoneyCart', JSON.stringify(cart));
    updateCartUI();
};

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem('myHoneyCart', JSON.stringify(cart));
    updateCartUI();
}

document.querySelectorAll('.weight-select').forEach(select => {
    select.addEventListener('change', function() {
        const card = this.closest('.shop-card');
        const selectedOption = this.options[this.selectedIndex];
        
        const newPrice = selectedOption.getAttribute('data-price');
        const newImg = selectedOption.getAttribute('data-img');
        
        const imgElement = card.querySelector('.product-image');
        const priceElement = card.querySelector('.price span');
        if (imgElement) imgElement.src = newImg;
        if (priceElement) priceElement.innerText = newPrice;
    });
});

document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.shop-card');
        const title = card.querySelector('h2').innerText;
        const weight = card.querySelector('.weight-select').value;
        const price = card.querySelector('.price span').innerText;

        addToCart(`${title} (${weight} кг)`, parseInt(price));
    });
});