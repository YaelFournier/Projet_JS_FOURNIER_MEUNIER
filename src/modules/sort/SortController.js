export class SortController {
    constructor(view, data) {
        this.view = view;
        this.data = data;

        // modules de filtre
        this.currentSearch = "";
        this.currentFilters = {};
        this.currentPage = 1;
    }

    setupListeners() {
        const searchInput = document.getElementById("searchInput");
        if (searchInput) {
            searchInput.addEventListener("input", (event) => {
                const searchTerm = event.target.value;
                console.log(searchTerm);
                this.updateSearch(searchTerm);
            });
        }
    }

    updateSearch(searchTerm) {
        this.currentSearch = searchTerm;
        this.refreshDataSort();
    }

    updateFilters(filters) {
        this.currentFilters = filters;
        this.refreshDataSort();
    }

    updatePage(pageNumber) {
        this.currentPage = pageNumber;
        this.refreshDataSort();
    }

    async refreshAll(view, data) {
        this.view = view;
        this.data = data;
        await this.view.afficher();

        this.setupListeners();

        if (document.getElementById("filterForm") != null) {
            console.log("filterForm");
            document.addEventListener("filterUpdated", (event) => this.updateFilters(event.detail));
        } else if (document.getElementById("pagination") != null) {
            console.log("pagination");
            document.addEventListener("pageUpdated", (event) => this.updatePage(event.detail));
        }
    }

    refreshDataSort() {
        console.log(this.data);

        let charactersList = [];

        // Récupérer uniquement les tableaux de "characters"
        this.data.forEach((value, key) => {
            if (key === "characters") {
                if (Array.isArray(value)) {
                    charactersList = charactersList.concat(value);
                } else {
                    console.warn(`Données ignorées pour '${key}' car ce n'est pas un tableau.`);
                }
            }
        });

        console.log("Données filtrables :", charactersList);

        const searchLower = this.currentSearch.toLowerCase();

        // Filtrage des données
        let filteredData = charactersList.filter(item => {
            return (
                item.name &&
                item.name.toLowerCase().includes(searchLower) &&
                this.applyFilters(item)
            );
        });

        // Pagination
        let paginatedData = this.applyPagination(filteredData);
        console.log("paginatedData", paginatedData);
        // Mise à jour de la vue
        this.view.setData(paginatedData);
    }



    applyFilters(item) {
        return Object.entries(this.currentFilters).every(([key, value]) => item[key] === value);
    }

    applyPagination(data) {
        const itemsPerPage = 6;
        const start = (this.currentPage - 1) * itemsPerPage;
        return data.slice(start, start + itemsPerPage);
    }
}
