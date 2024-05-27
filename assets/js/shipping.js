const checkoutList = document.getElementById("checkout-list");
const checkoutTotal = document.getElementById("checkout-total");
const checkoutSubtotalLeft = document.querySelector(".col-4.col-xxl-5 .cart-info__row:nth-child(1) span:nth-child(2)");
const checkoutTotalItem = document.querySelector(
    ".col-4.col-xl-12 .cart-info:nth-child(1) .cart-info__row span:nth-child(2)"
);
const checkoutPriceTotal = document.querySelector(
    ".col-4.col-xl-12 .cart-info:nth-child(1) .cart-info__row:nth-child(2) span:nth-child(2)"
);
const estimatedTotalElement = document.querySelector(
    ".col-4.col-xl-12 .cart-info:nth-child(1) .cart-info__row:nth-child(5) span:nth-child(2)"
);

let productList = JSON.parse(localStorage.getItem("productsSelected"));

const productObj = {};
productList.forEach((item) => {
    productObj[item.id] = 1;
});

const handleRender = (productList) => {
    const resultSubtotal = productList.reduce((result, item) => {
        return result + item.price * productObj[item.id];
    }, 0);

    checkoutTotalItem.innerHTML = productList.length;
    checkoutPriceTotal.innerHTML = `${resultSubtotal} VND`;
    checkoutSubtotalLeft.innerHTML = `${resultSubtotal} VND`;
    checkoutTotal.innerHTML = `${resultSubtotal + 10000} VND`;
    estimatedTotalElement.innerHTML = `${resultSubtotal + 10000} VND`;

    checkoutList.innerHTML = productList
        .map((item) => {
            return `
                <article class="cart-item">
                    <a href="./product-detail-logined.html" class="">
                        <img
                            src="${item.img}"
                            alt=""
                            class="cart-item__thumb"
                        />
                    </a>
                    <div class="cart-item__content">
                        <div class="cart-item__content-left">
                            <h3 class="cart-item__title">${item.title}</h3>

                            <div class="cart-item__price-wrap">
                                ${item.price} | <span class="cart-item__status">In Stock</span>
                            </div>

                            <div class="cart-item__control cart-item__control--md-block">
                                <div class="cart-item__input">
                                    KFC
                                    <img
                                        src="./assets/icons/arrow-down-large.svg"
                                        alt=""
                                        class="icon"
                                    />
                                </div>

                                <div class="cart-item__input">
                                    <button class="cart-item__input-btn" onclick="handleMinus(${item.id})">
                                        <img
                                            src="./assets/icons/minus.svg"
                                            alt="minus"
                                            class="icon"
                                        />
                                    </button>
                                    <span>${productObj[item.id]}</span>
                                    <button class="cart-item__input-btn" onclick="handlePlus(${item.id})">
                                        <img
                                            src="./assets/icons/plus.svg"
                                            alt="plus"
                                            class="icon"
                                        />
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="cart-item__content-right">
                            <span class="cart-item__total-price">${item.price * productObj[item.id]} VND</span>
                            <div class="cart-item__control">
                                <button class="cart-item__control-btn">
                                    <img src="./assets/icons/heart-2.svg" alt="" />
                                    Save
                                </button>
                                <button
                                    onclick="handleDelete(${item.id})"
                                    class="cart-item__control-btn"
                                >
                                    <img src="./assets/icons/delete.svg" alt="" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
        `;
        })
        .join(" ");
};

handleRender(productList);

const handleDelete = (id) => {
    productList = productList.filter((item) => item.id !== id);
    handleRender(productList);
};

const handlePlus = (id) => {
    productObj[id]++;
    handleRender(productList);
};

const handleMinus = (id) => {
    productObj[id]--;
    if (productObj[id] === 0) {
        productObj[id] = 1;
    }
    handleRender(productList);
};
