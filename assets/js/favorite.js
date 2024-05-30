const cartListElement = document.querySelector(".cart-info__list");
const cartInfoDescElement = document.querySelector(".cart-info__desc");
const btnConfirmDelete = document.getElementById("btn-delete");

const productList = JSON.parse(localStorage.getItem("productList"));
let favoriteProduct = [];
productList.forEach((item) => {
    if (item.isLiked) {
        favoriteProduct.push(item);
    }
});

const productObj = {};
favoriteProduct.forEach((item) => {
    productObj[item.id] = 1;
});

const handleRender = (favoriteProduct) => {
    if (favoriteProduct.length === 0) {
        cartListElement.innerHTML = `<img class="empty__cart-img" src="./assets/images/empty-cart.jpg" alt="" />`;
        cartListElement.style.display = "flex";
        cartListElement.style.justifyContent = "center";
        return;
    }

    const result = favoriteProduct.reduce((result, item) => {
        return (result += productObj[item.id]);
    }, 0);

    cartInfoDescElement.innerHTML = `${result} items`;
    const html = favoriteProduct
        .map((item) => {
            return `
                    <article class="cart-item">
                        <label class="cart-info__checkbox">
                            <input
                                type="checkbox"
                                name="shipping-address"
                                id=""
                                class="cart-info__checkbox-input"
                            />
                        </label>
                        <a href="./product-detail-logined.html" class="">
                            <img
                                src="${item.img}"
                                alt=""
                                class="cart-item__thumb"
                            />
                        </a>
                        <div class="cart-item__content">
                            <div class="cart-item__content-left">
                                <h3 class="cart-item__title">
                                    ${item.title}
                                </h3>
    
                                <div class="cart-item__price-wrap">
                                    ${item.price} | <span class="cart-item__status">In Stock</span>
                                </div>
    
                                <div class="cart-item__control-wrap">
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
    
                                    <div class="cart-item__control">
                                        <button class="cart-item__control-btn">
                                            <img src="./assets/icons/heart-2.svg" alt="" />
                                            Save
                                        </button>
                                        <button
                                            onclick="handleShowModalDelete(${item.id})"
                                            class="cart-item__control-btn"
                                        >
                                            <img src="./assets/icons/delete.svg" alt="" />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
    
                            <div class="cart-item__content-right">
                                <span class="cart-item__total-price">${item.price * productObj[item.id]} VND</span>
                                <button class="cart-item__checkout-btn btn btn--primary btn--rounded">
                                    Check Out
                                </button>
                            </div>
                        </div>
                    </article>
        `;
        })
        .join(" ");

    cartListElement.innerHTML = html;
};
handleRender(favoriteProduct);

const handleDelete = (id) => {
    favoriteProduct = favoriteProduct.filter((item) => item.id !== id);
    handleRender(favoriteProduct);
};

const handlePlus = (id) => {
    productObj[id]++;
    handleRender(favoriteProduct);
};

const handleMinus = (id) => {
    if (productObj[id] > 1) {
        productObj[id]--;
        handleRender(favoriteProduct);
    }
};

// hide when click overlay
const overlayElements = document.querySelectorAll(".modal__overlay");
const modalElements = document.querySelectorAll(".modal");

overlayElements.forEach((item, index) => {
    item.addEventListener("click", () => {
        modalElements[index].classList.remove("show");
    });
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
    currDelete = favoriteProduct.find((item) => item.id === id);
};

const handleConfirmDelete = () => {
    favoriteProduct = favoriteProduct.filter((item) => item.id !== currDelete.id);

    const foundIndex = productList.findIndex((item) => item.id === currDelete.id);
    if (foundIndex !== -1) {
        productList[foundIndex].isLiked = false;
        localStorage.setItem("productList", JSON.stringify(productList));
        hanldeUpdateLiked();
    }

    // delete and render
    handleRender(favoriteProduct);
    hideModalDelete();
};
btnDeleteConfirm.addEventListener("click", handleConfirmDelete);

// update quantity heart
const hanldeUpdateLiked = () => {
    const productList = JSON.parse(localStorage.getItem("productList")) || [];
    const heartElement = document.getElementById("product-heart");

    const totalHeart = productList.reduce((result, item) => {
        if (item.isLiked) {
            return result + 1;
        } else {
            return result + 0;
        }
    }, 0);

    heartElement.innerHTML = totalHeart || 0;
};
