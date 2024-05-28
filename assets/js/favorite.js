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
                                            onclick="handleDelete(${item.id})"
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
    if (productObj[key] > 1) {
        productObj[id]--;
        handleRender(favoriteProduct);
    }
};
