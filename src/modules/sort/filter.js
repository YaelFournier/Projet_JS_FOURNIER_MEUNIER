document.querySelector("#filterForm").addEventListener("change", () => {
    let filters = {};
    document.querySelectorAll("#filterForm input:checked").forEach(input => {
        filters[input.name] = input.value;
    });
    console.log(filters);

    document.dispatchEvent(new CustomEvent("filterUpdated", { detail: filters }));
});
