document.querySelector("#pagination").addEventListener("click", (event) => {
    if (event.target.dataset.page) {
        const page = parseInt(event.target.dataset.page);
        console.log(page);
        document.dispatchEvent(new CustomEvent("pageUpdated", { detail: page }));
    }
});
