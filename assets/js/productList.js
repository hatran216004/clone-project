import { productList, categoryProduct } from "./data.js";
import { hanldeUpdateLiked, updateListLiked } from "./header.js";

const totleProduct = document.getElementById("totle-product");

const renderProduct = () => {
    const productListFromLocalStorage = JSON.parse(localStorage.getItem("productList")) || productList;

    const productListElement = document.getElementById("product-list");
    const html = productListFromLocalStorage
        .map((product) => {
            return `
                <div class="col">
                    <article class="product-card">
                        <div class="product-card__img-wrap">
                            <a href="./product-detail-logined.html">
                                <img
                                    src="${product.img}"
                                    alt=""
                                    class="product-card__thumb"
                                />
                            </a>
                            <button class="like-btn product-card__like-btn ${product.isLiked ? "like-btn--liked" : ""}">
                                <img src="${product.liked}" alt="" class="like-btn__icon--liked" />
                                <img src="${product.like}" alt="" class="like-btn__icon icon" />
                            </button>
                        </div>
                        <h3 class="line-clamp">
                            <a href="./product-detail-logined.html" class="product-card__title">
                            ${product.title}
                            </a>
                        </h3>
                        <p class="product-card__brand">${product.brand}</p>
                        <div class="product-card__row">
                            <span class="product-card__price">${product.price} VND</span>
                            <img src="${product.star}" alt="" class="product-card__start" />
                            <span class="product-card__rate">${product.rate}</span>
                        </div>
                    </article>
                </div>`;
        })
        .join(" ");

    productListElement.innerHTML = html;
};
renderProduct();

function attachProductClickEvents() {
    const productElement = document.querySelectorAll(".product-card");
    const productListFromLocalStorage = JSON.parse(localStorage.getItem("productList"));

    productElement.forEach((product, index) => {
        product.onclick = () => {
            localStorage.setItem("selectedProduct", JSON.stringify(productListFromLocalStorage[index]));
        };
    });
}
attachProductClickEvents();

// category filter
const categoryElement = document.getElementById("category");

categoryElement.innerHTML = categoryProduct
    .map((item) => {
        return `
            <div class="col">
                <a href="#!">
                    <article class="cate-item">
                        <img
                            src="${item.img}"
                            alt=""
                            class="cate-item__thumb"
                        />
                        <div class="cate-item__info">
                            <h3 class="cate-item__title">${item.title}</h3>
                            <p class="cate-item__desc">${item.description}</p>
                        </div>
                    </article>
                </a>
            </div>
        `;
    })
    .join(" ");

const cateElements = document.querySelectorAll(".cate-item");

// Biến để theo dõi danh mục đang được áp dụng hiện tại
let currentCategory = null;

cateElements.forEach((item, index) => {
    item.onclick = () => {
        const selectedCategory = categoryProduct[index].category;

        if (selectedCategory !== currentCategory) {
            const productCate = productList.filter((product) => product.category === selectedCategory);
            localStorage.setItem("productList", JSON.stringify(productCate));
            currentCategory = selectedCategory; // Cập nhật danh mục hiện tại
            renderProduct();
            attachProductClickEvents();
        } else {
            // Nếu danh mục được chọn trùng với danh mục hiện tại, trả về danh sách sản phẩm ban đầu
            localStorage.setItem("productList", JSON.stringify(productList));
            currentCategory = null; // Đặt lại danh mục hiện tại
            renderProduct();
            hanldeUpdateLiked();
            updateListLiked();
        }
    };
});

const likeBtns = document.querySelectorAll(".like-btn.product-card__like-btn");

likeBtns.forEach((item, index) => {
    item.onclick = () => {
        const prodLocal = JSON.parse(localStorage.getItem("productList"));
        if (!prodLocal[index].isLiked) {
            item.classList.add("like-btn--liked");
            prodLocal[index].isLiked = true;
        } else {
            item.classList.remove("like-btn--liked");
            prodLocal[index].isLiked = false;
        }

        localStorage.setItem("productList", JSON.stringify(prodLocal));
        hanldeUpdateLiked();
        updateListLiked();
    };
});
