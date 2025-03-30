export class SortController {
    constructor(view, data) {
        this.view = view;
        this.data = data;

        // Modules de filtre
        this.currentSearch = "";
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


    async refreshAll(view, data) {
        this.view = view;
        this.data = data;
        await this.view.afficher();

        this.setupListeners();
    }

    updateSearch(searchTerm) {
        this.currentSearch = searchTerm;
        this.refreshDataSort();
    }

    refreshDataSort() {
        let objectsList = [];

        // Récupérer uniquement les tableaux de "characters"
        this.data.forEach((value, key) => {
            if (Array.isArray(value)) {
                objectsList = objectsList.concat(value);
            }
        });

        const searchLower = this.currentSearch.toLowerCase();

        // Filtrage des données
        let filteredData = objectsList.filter(item =>
            item.name && item.name.toLowerCase().includes(searchLower)
        );

        // Mise à jour de la pagination avec les données filtrées
        this.view.paginationObject.updateData(filteredData);

        // Ajuster la page actuelle en fonction des données filtrées
        const maxPage = Math.ceil(filteredData.length / this.view.paginationObject.objectsPerPage);
        if (this.view.paginationObject.currentPage > maxPage) {
            this.view.paginationObject.currentPage = maxPage;
        }

        // Mise à jour de la vue avec les éléments filtrés et paginés
        this.view.setData(filteredData); // Appel à `setData` avec les données filtrées
    }


}
