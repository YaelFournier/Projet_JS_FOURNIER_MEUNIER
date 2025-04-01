// Interface que les pages implémentent pour avoir les méthodes afficher et setData
export class InterfaceAffichage {
    constructor() {
        if (this.constructor === InterfaceAffichage) {
            throw new Error("Une interface ne peut pas être instanciée directement.");
        }
    }

    afficher() {
        throw new Error("Méthode afficher() non implémentée !");
    }

    // Méthode pour la pagination
    setData(data) {
        throw new Error("Méthode setData(data) non implémentée !");
    }

}
