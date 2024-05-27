const checkoutList = document.getElementById("checkout-list");
const checkoutTotalItem = document.querySelector(".cart-info__row:nth-child(4) span:nth-child(2)");
const checkoutPriceTotal = document.querySelector(".cart-info__row:nth-child(5) span:nth-child(2)");
const estimatedTotalElement = document.querySelector(".cart-info__row:nth-child(8) span:nth-child(2)");
const btnCheckout = document.querySelector(".cart-info__next-btn");

let productList = JSON.parse(localStorage.getItem("productsSelected"));

const handleRender = (productList) => {
    const resultSubtotal = productList.reduce((result, item) => {
        return result + item.price;
    }, 0);

    checkoutTotalItem.innerHTML = productList.length;
    checkoutPriceTotal.innerHTML = `${resultSubtotal} VND`;
    estimatedTotalElement.innerHTML = `${resultSubtotal + 10000} VND`;
    btnCheckout.innerHTML = `${resultSubtotal + 10000} VND`;
};

handleRender(productList);
