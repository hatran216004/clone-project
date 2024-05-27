import { productList } from "./data.js";

const renderProduct = () => {
    const productListElement = document.getElementById("product-list");
    const html = productList
        .map((product) => {
            return `
                <div class="col">
                    <article class="product-card">
                        <div class="product-card__img-wrap">
                            <a href="./sign-in.html">
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
