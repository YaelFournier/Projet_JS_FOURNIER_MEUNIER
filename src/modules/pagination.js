export class Pagination {
    constructor(listObjects, selector, path) {
        this.listObjects = listObjects;
        this.selector = selector;
        this.path = path;
        this.total = listObjects.length;
        this.objectsPerPage = 6;
        this.totalPages = Math.ceil(this.total / this.objectsPerPage);
        this.currentPage = 1;
    }

    async updatePage() {
        // Récupérer la partie après le `#` dans l'URL
        const hash = window.location.hash;

        // Si hash contient un `?`, alors chercher les paramètres à partir de là
        if (hash.includes('?')) {
            const urlParams = new URLSearchParams(hash.split('?')[1]);
            const page = urlParams.has('page') ? parseInt(urlParams.get("page")) : 1;
            this.currentPage = isNaN(page) ? 1 : page;
        } else {
            this.currentPage = 1;
        }

        // Afficher la pagination
        this._afficher(document.querySelector(this.selector));
    }

    // Affiche les boutons de pagination
    _afficher(pagination) {
        pagination.innerHTML = `
            <li class="page-item ${this.currentPage === 1 ? "disabled" : ""}">
                <a class="page-link" href="${this.path}?page=${this.currentPage - 1}">Précédent</a>
            </li>

            <li class="page-item ${this.currentPage === this.totalPages ? "disabled" : ""}">
                <a class="page-link" href="${this.path}?page=${this.currentPage + 1}">Suivant</a>
            </li>
        `;
    }

    async afficherCharacters() {
        const slice = this.listObjects.slice(this.objectsPerPage * (this.currentPage - 1), this.objectsPerPage * this.currentPage);
        console.log(slice);
        return slice;
    }
}
