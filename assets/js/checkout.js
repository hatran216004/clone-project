const checkoutList = document.getElementById("checkout-list");
const checkoutSubtotalLeft = document.getElementById("checkout-subtotal-left");
const checkoutTotal = document.getElementById("checkout-total");
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
const productMap = {};

productList.forEach((item) => {
    if (productObj[item.id]) {
        productObj[item.id]++;
    } else {
        productObj[item.id] = 1;
    }
});

productList.forEach((item) => {
    if (!productMap[item.id]) {
        productMap[item.id] = { ...item };
    } else {
        productMap[item.id] = { ...productMap[item.id], ...item };
    }
});

// Chuyển đổi productMap thành mảng các mục đã gộp
let mergedProductList = Object.values(productMap);

const handleRender = (mergedProductList) => {
    if (mergedProductList.length === 0) {
        const rowsElement = document.querySelectorAll(".col-4.col-xxl-5 .cart-info__row");
        const separateElement = document.querySelector(".col-4.col-xxl-5 .cart-info__separate");
        rowsElement.forEach((item) => {
            item.classList.add("d-none");
        });
        separateElement.classList.add("d-none");
        checkoutList.innerHTML = `<img class="empty__cart-img" src="./assets/images/empty-cart.jpg" alt="" />`;

        checkoutList.style.display = "flex";
        checkoutList.style.justifyContent = "center";

        checkoutTotalItem.innerHTML = 0;
        checkoutPriceTotal.innerHTML = 0;
        checkoutSubtotalLeft.innerHTML = 0;
        checkoutTotal.innerHTML = 0;
        estimatedTotalElement.innerHTML = 0;
        return;
    }

    const resultSubtotal = mergedProductList.reduce((result, item) => {
        return result + item.price * productObj[item.id];
    }, 0);

    const result = mergedProductList.reduce((result, item) => {
        return (result += productObj[item.id]);
    }, 0);

    checkoutTotalItem.innerHTML = result;
    checkoutSubtotalLeft.innerHTML = `${resultSubtotal} VND`;
    checkoutPriceTotal.innerHTML = `${resultSubtotal} VND`;
    checkoutTotal.innerHTML = `${resultSubtotal + 10000} VND`;
    estimatedTotalElement.innerHTML = `${resultSubtotal + 10000} VND`;

    checkoutList.innerHTML = mergedProductList
        .map((item, index) => {
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
                                    onclick="handleShowModalDelete(${item.id}, ${index})"
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

handleRender(mergedProductList);

const handlePlus = (id) => {
    productObj[id]++;
    handleRender(mergedProductList);
};

const handleMinus = (id) => {
    if (productObj[id] > 1) {
        productObj[id]--;
        handleRender(mergedProductList);
    }
};

// hide when click overlay
const overlayElement = document.querySelector(".modal__overlay");
const modalElements = document.querySelectorAll(".modal");

overlayElement.addEventListener("click", () => {
    modalElements[index].classList.remove("show");
});

// modal delete item
let currDelete = null;
const modalDelete = document.getElementById("delete-comfirm");
const btnDeleteConfirm = document.getElementById("btn-confirm-delete");
const btnCancelDelete = document.getElementById("btn-cancel-delete");

const hideModalDelete = () => {
    modalDelete.classList.remove("show");
    currDelete = null;
};

btnCancelDelete.addEventListener("click", hideModalDelete);

const handleShowModalDelete = (id) => {
    modalDelete.classList.add("show");
    currDelete = mergedProductList.find((item) => item.id === id);
};

const handleConfirmDelete = () => {
    mergedProductList = mergedProductList.filter((item) => item.id !== currDelete.id);

    // update quantity product at header
    const foundIndex = productList.findIndex((item) => item.id === currDelete.id);
    if (foundIndex !== -1) {
        productList.splice(foundIndex, productObj[productList[foundIndex].id]);
        localStorage.setItem("productsSelected", JSON.stringify(productList));
        updateDropDownCart();
    }

    // delete and render
    handleRender(mergedProductList);
    hideModalDelete();
};
btnDeleteConfirm.addEventListener("click", handleConfirmDelete);

// update header
const updateDropDownCart = () => {
    const productsSelected = JSON.parse(localStorage.getItem("productsSelected")) || [];

    const cartCountElement = document.getElementById("totle-product");
    const titleCart = document.getElementById("act-dropdow__title--cart");
    const cartDropdownElement = document.getElementById("dropdown-list-cart");
    const subtotalDropdown = document.getElementById("dropdown-subtotal");
    const totalDropdown = document.getElementById("dropdown-total");

    // subtotal price
    const subTotalValue = productsSelected.reduce((result, item) => {
        return result + item.price;
    }, 0);

    cartCountElement.innerHTML = productsSelected.length || 0;
    subtotalDropdown.innerHTML = `${subTotalValue} VND`;
    totalDropdown.innerHTML = `${subTotalValue + 10000} VND`;

    titleCart.innerHTML = `You have ${productsSelected.length} items`;

    cartDropdownElement.innerHTML = productsSelected
        .map((item) => {
            return ` 
                <div class="col">
                    <article class="cart-preview-item">
                        <div class="cart-preview-item__img-wrap">
                            <img
                                src="${item.img}"
                                alt="${item.title}"
                                class="cart-preview-item__thumb"
                            />
                        </div>
                        <h3 class="cart-preview-item__title line-clamp">${item.title}</h3>
                        <span class="cart-preview-item__price">${item.price * 0.9} VND</span>
                    </article>
                </div>
            `;
        })
        .join(" ");
};
