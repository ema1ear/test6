const back = document.getElementById("legal-back");

back?.addEventListener("click", () => {
    if (document.referrer && new URL(document.referrer).origin === location.origin) {
        history.back();
        return;
    }
    location.assign(back.dataset.fallback);
});
