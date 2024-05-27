import updateDropDownCart from "./header.js";

const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

const addToCartBtn = document.querySelector(".btn.btn--primary.prod-info__add-to-cart");

if (selectedProduct) {
    document.querySelector(".prod-preview__img").src = selectedProduct.img;
    document.querySelector(".prod-info__heading").innerHTML = selectedProduct.title;
    document.querySelector(".prod-info__price").innerHTML = `${selectedProduct.price} VND`;
    document.querySelector(".prod-info__totle-price").innerHTML = `${selectedProduct.price * 0.9} VND`;
}

const tags = document.querySelectorAll(".form__tag.prod-info__tag");
tags.forEach((tag) => {
    tag.onclick = (e) => {
        e.preventDefault();
        const prodTag = document.querySelector(".form__tag.prod-info__tag.active");
        prodTag.classList.remove("active");
        tag.classList.add("active");
    };
});

addToCartBtn.onclick = (e) => {
    e.preventDefault();
    const productsSelected = JSON.parse(localStorage.getItem("productsSelected")) || [];
    productsSelected.push(selectedProduct);

    localStorage.setItem("productsSelected", JSON.stringify(productsSelected));
    updateDropDownCart();
};
