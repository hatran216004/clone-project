/**
 * 1. Báo lỗi khi blur ra khỏi input - OK
 * 2. Xóa báo lỗi khi nhập input - OK
 * 3. Xử lý áp dụng nhiều rule cho 1 trường - OK
 * 4. Loại bỏ hành vi submit mặc định và validate các thẻ input khi submit form - OK
 * 5. Lấy ra value của form khi submit - OK
 * 6. Sử dụng submit mặc định của trình duyệt nếu không dùng js - OK
 * 7. Xử lý lấy dữ liệu radio, checkbox,... - OK
 */

function Validator(options) {
    function getParent(element, selector) {
        // Nếu element có thẻ cha thì lặp
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    // object lưu tất cả các rule của tất cả các selector
    // key là selector, value là mảng các test
    var selectorRules = {};

    function validate(inputElement, rule) {
        var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);

        var errorMessage;

        // Mảng gồm các function test
        var rules = selectorRules[rule.selector];

        for (var i = 0; i < rules.length; i++) {
            switch (inputElement.type) {
                case "checkbox":
                case "radio":
                    errorMessage = rules[i](formElement.querySelector(rule.selector + ":checked"));
                    break;
                default:
                    errorMessage = rules[i](inputElement.value);
            }
            // nếu có lỗi thì break, nếu undefind thì lặp đến rule tiếp theo
            if (errorMessage) break;
        }

        var getParentElement = getParent(inputElement, options.formGroupSelector);

        if (errorMessage) {
            errorElement.innerText = errorMessage;
            getParentElement.classList.add("invalid");
        } else {
            errorElement.innerText = "";
            getParentElement.classList.remove("invalid");
        }

        // trả về true nếu không có lỗi
        // trả về false nếu có lỗi
        return !errorMessage;
    }

    // Lấy ra form cần validate
    var formElement = document.querySelector(options.form);
    if (formElement) {
        // Bỏ hành vi submit form mặc định khi submit form
        formElement.onsubmit = function (e) {
            e.preventDefault();

            // Không có lỗi
            var isFormValid = true;

            options.rules.forEach((rule) => {
                var inputElement = formElement.querySelector(rule.selector);
                var isValid = validate(inputElement, rule);
                // Nếu 1 input trong form có lỗi => form có lỗi
                if (!isValid) {
                    isFormValid = false;
                }
            });

            // Nếu form không lỗi
            if (isFormValid) {
                // Trường hợp submit với javascript
                if (typeof options.onSubmit === "function") {
                    // Lấy các thẻ input bằng attribute name
                    var enableInputs = formElement.querySelectorAll("[name]:not([disabled])");
                    var formValues = Array.from(enableInputs).reduce((values, input) => {
                        switch (input.type) {
                            case "radio":
                                values[input.name] = formElement.querySelector(
                                    `input[name= "${input.name}"]:checked`
                                ).value;
                                break;
                            // case "checkbox":
                            // Nếu checkbox không được check thì return
                            // if (!input.matches(":checked")) {
                            //     return values;
                            // }
                            // if (!Array.isArray(values[input.name])) {
                            //     values[input.name] = [];
                            // }
                            // values[input.name].push(input.value);
                            // break;
                            case "checkbox":
                                if (!Array.isArray(values[input.name])) {
                                    values[input.name] = [];
                                }
                                if (input.matches(":checked")) {
                                    values[input.name].push(input.value);
                                }
                                break;
                            case "file":
                                values[input.name] = input.files;
                                break;
                            default:
                                values[input.name] = input.value;
                        }
                        return values;
                    }, {});
                    options.onSubmit(formValues);
                }
                // Trường hợp submit với hành vi mặc định
                else {
                    formElement.submit();
                }
            }
        };

        // Lặp qua mỗi rule và xử lý
        options.rules.forEach((rule) => {
            // Lưu lại các rule cho mỗi input
            /* Nếu selectorRules[rule.selector] không là mảng
             => gán cho nó thành mảng với phần tử đầu tiên là rule đầu tiên */
            if (Array.isArray(selectorRules[rule.selector])) {
                selectorRules[rule.selector].push(rule.test);
            } else {
                selectorRules[rule.selector] = [rule.test];
            }

            var inputElements = formElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach((inputElement) => {
                // Xử lý khi blur ra khỏi input
                inputElement.onblur = () => {
                    validate(inputElement, rule);
                };

                // Xử lý khi đang nhập input
                inputElement.oninput = () => {
                    var getParentElement = getParent(inputElement, options.formGroupSelector);
                    var errorElement = getParentElement.querySelector(options.errorSelector);
                    errorElement.innerText = "";
                    getParentElement.classList.remove("invalid");
                };
            });
        });
    }
}

Validator.isRequired = (selector, message) => {
    return {
        selector,
        test: (value) => {
            return value.trim() ? undefined : message || "Please enter this field !";
        },
    };
};

Validator.isEmail = (selector, message) => {
    return {
        selector,
        test: (value) => {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : message || "Please enter this field !";
        },
    };
};

Validator.minLength = (selector, min, message) => {
    return {
        selector,
        test: (value) => {
            return value.length >= min ? undefined : message || `Needs at least ${min} charactors long !`;
        },
    };
};

Validator.isComfirmed = (selector, getConfirmValue, message) => {
    return {
        selector,
        test: (value) => {
            return value === getConfirmValue() ? undefined : message || "Value does not match !";
        },
    };
};

Validator.isRequiredCheckbox = (selector, message) => {
    return {
        selector,
        test: (value) => {
            return value ? undefined : message || "Please enter this field !";
        },
    };
};
