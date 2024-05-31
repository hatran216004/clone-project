let dataAddressUser = [
    {
        id: "1",
        name: "John Smith",
        address: "Số 123, Đường Trần Hưng Đạo, Phường 1, Quận 1",
        city: "TP. Hồ Chí Minh",
        tel: "0376532221",
    },
    {
        id: "2",
        name: "John Wick",
        address: "Số 456, Đường Lê Lợi, Phường 2, Quận Hải Châu",
        city: "TP. Đà Nẵng",
        tel: "05312094322",
    },
];

let dataCitys = [
    "Hà Nội",
    " TP. Hồ Chí Minh",
    "Đà Nẵng",
    "Hải Phòng",
    "Cần Thơ",
    "Biên Hòa",
    "Nha Trang",
    "Huế",
    "Vinh",
    "Hải Dương",
    "Quy Nhơn",
    "Buôn Ma Thuột",
    "Nam Định",
    "Vũng Tàu",
    "Thái Nguyên ",
];

// add address
const btnAddNewAddress = document.getElementById("btn-add-new-address");
const closeBtn = document.getElementById("modal-close-btn");
const btnCancel = document.getElementById("modal-btn-cancel");
const modalSubmitAddress = document.getElementById("submit-address");
const userAddressList = document.querySelector(".user-address__list");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const addressInput = document.getElementById("address");
const submitBtn = document.getElementById("submit-address-btn");
const formInvalid = document.querySelectorAll(".form__group");
const selectDialog = document.getElementById("select-dialog");
const optInput = document.getElementById("city");
const formOptList = document.querySelector(".form__options-list");
const searchInput = document.querySelector(".form__search-input");
const searchBtn = document.querySelector(".form__search-icon");

// render select city form
const handleRenderCityForm = (dataCitys) => {
    formOptList.innerHTML = dataCitys
        .map((city) => {
            return `<li class="form___option">${city}</li>`;
        })
        .join(" ");

    const formCityOpts = document.querySelectorAll(".form___option");
    formCityOpts.forEach((opt) => {
        opt.onclick = () => {
            optInput.value = opt.innerText;
            selectDialog.classList.remove("show");
        };
    });
};

handleRenderCityForm(dataCitys);

// search opt select
const handleSearchAddress = () => {
    console.log(searchInput.value);
    let searchItems = dataCitys.filter((city) => city.toLowerCase().includes(searchInput.value.toLowerCase()));
    handleRenderCityForm(searchItems);
};
searchBtn.addEventListener("click", handleSearchAddress);

// handle form address
let currEdit = null;

const renderCardAddress = (dataCartList) => {
    let html = dataCartList
        .map((user, index) => {
            return `
            <article class="address-card">
                <div class="address-card__left">
                    <div class="address-card__choose">
                        <label class="cart-info__checkbox">
                            <input
                                type="radio"
                                name="shipping-address"
                                id=""
                                ${index === 0 && "checked"}
                                class="cart-info__checkbox-input"
                            />
                        </label>
                    </div>
                    <div class="address-card__info">
                        <h3 class="address-card__title">${user.name}</h3>
                        <p class="address-card__desc">
                            ${`${user.address}, ${user.city}`}
                        </p>
                        <ul class="address-card__list">
                            <li class="address-card__transport">Shipping</li>
                            <li class="address-card__transport">Delivery from store</li>
                        </ul>
                    </div>
                </div>
                <div class="address-card__right">
                    <div class="address-card__control">
                        <button
                            data-id=${user.id}
                            class="cart-info__edit-btn"
                        >
                            <img src="./assets/icons/edit.svg" alt="Edit" class="icon" />
                            Edit
                        </button>
                    </div>
                </div>
            </article>
        `;
        })
        .join(" ");

    userAddressList.innerHTML = html;

    // Gán sự kiện onclick cho các nút chỉnh sửa sau khi render
    const editBtns = document.querySelectorAll(".cart-info__edit-btn");

    editBtns.forEach((btn) => {
        btn.onclick = () => {
            const userId = btn.getAttribute("data-id");
            submitBtn.innerText = "Save Changes";
            handleStartEditAddress(userId);
        };
    });
};
renderCardAddress(dataAddressUser);

const showModal = (e) => {
    e.preventDefault();
    modalSubmitAddress.classList.add("show");
};

const hideModal = (e) => {
    e.preventDefault();
    modalSubmitAddress.classList.remove("show");
    optInput.value = "";

    formInvalid.forEach((item) => {
        item.classList.remove("invalid");
    });
    currEdit = null;
};

btnAddNewAddress.addEventListener("click", (e) => {
    showModal(e);
    submitBtn.innerText = "Create";
    nameInput.value = "";
    addressInput.value = "";
    phoneInput.value = "";
});
closeBtn.addEventListener("click", (e) => {
    hideModal(e);
});

btnCancel.addEventListener("click", (e) => {
    hideModal(e);
});

// submit
const handleAddAddress = () => {
    const newUserAddress = {
        id: new Date().toISOString(),
        name: nameInput.value,
        address: addressInput.value,
        city: optInput.value,
        tel: phoneInput.value,
    };
    dataAddressUser = [...dataAddressUser, newUserAddress];
    renderCardAddress(dataAddressUser);
    nameInput.value = "";
    addressInput.value = "";
    phoneInput.value = "";
};

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (currEdit) {
        handlefinishEdit(currEdit);
    } else {
        handleAddAddress();
    }
    hideModal(e);
});

const handleStartEditAddress = (userId) => {
    const foundIndex = dataAddressUser.findIndex((item) => item.id === userId);
    if (foundIndex !== -1) {
        modalSubmitAddress.classList.add("show");
        currEdit = dataAddressUser[foundIndex];
        nameInput.value = currEdit.name;
        addressInput.value = currEdit.address;
        phoneInput.value = currEdit.tel;
        optInput.value = currEdit.city;
    }
};

const handlefinishEdit = (currEdit) => {
    const foundIndexEdit = dataAddressUser.findIndex((item) => item.id === currEdit.id);
    if (foundIndexEdit !== -1) {
        dataAddressUser[foundIndexEdit].name = nameInput.value;
        dataAddressUser[foundIndexEdit].address = addressInput.value;
        dataAddressUser[foundIndexEdit].tel = phoneInput.value;
        dataAddressUser[foundIndexEdit].city = optInput.value;

        currEdit = null;
        modalSubmitAddress.classList.remove("show");
        renderCardAddress(dataAddressUser);
    }
};
