// count cart

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

export const hanldeUpdateLiked = () => {
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

export const updateListLiked = () => {
    const productHeartList = document.getElementById("dropdown-list-heart");
    const titleFavorite = document.getElementById("act-dropdow__title--favorite");

    const productList = JSON.parse(localStorage.getItem("productList"));
    const heartArr = productList.filter((product) => product.isLiked === true);
    titleFavorite.innerHTML = `You have ${heartArr.length} items`;
    productHeartList.innerHTML = heartArr
        .map((item) => {
            return `
            <div class="col">
                <article class="cart-preview-item">
                    <div class="cart-preview-item__img-wrap">
                        <img
                            src="${item.img}"
                            alt=""
                            class="cart-preview-item__thumb"
                        />
                    </div>
                    <h3 class="cart-preview-item__title line-clamp">${item.title}</h3>
                    <span class="cart-preview-item__price">${item.price} VND</span>
                </article>
            </div>
        `;
        })
        .join(" ");
};

document.addEventListener("DOMContentLoaded", () => {
    updateDropDownCart();
    hanldeUpdateLiked();
    updateListLiked();
});

export default updateDropDownCart;
