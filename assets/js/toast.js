function toast({ title = "", message = "", type = "info", duration = 3000 }) {
    const main = document.getElementById("toast");

    if (!main) return;

    const icons = {
        success: "fas fa-check-circle",
        info: "fas fa-info-circle",
        warning: "fas fa-exclamation-circle",
        error: "fas fa-exclamation-circle",
    };
    const icon = icons[type];
    const delay = duration / 1000;
    const fadeOutTime = duration / 1000;

    const toast = document.createElement("div");
    toast.classList.add("toast", `toast--${type}`);
    toast.style.animation = `slideInleft ease 0.3s, fadeOut linear ${fadeOutTime}s ${delay}s forwards`;

    toast.innerHTML = `
        <div class="toast__icon">
            <i class="${icon}"></i>
        </div>
        <div class="toast__body">
            <h3 class="toast__title">${title}</h3>
            <p class="toast__message">${message}</p>
        </div>
        <div class="toast__close">
            <i class="fa-solid fa-xmark"></i>
        </div>
    `;

    main.appendChild(toast);

    // Auto remove toast
    const autoRemoveId = setTimeout(() => {
        main.removeChild(toast);
    }, duration + fadeOutTime * 1000);

    // Remove toast when click
    toast.onclick = (e) => {
        if (e.target.closest(".toast__close")) {
            main.removeChild(toast);
            clearTimeout(autoRemoveId);
        }
    };
}
