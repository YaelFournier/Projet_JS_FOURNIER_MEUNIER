
class InterfaceAffichage {
    constructor() {
        if (this.constructor === InterfaceAffichage) {
            throw new Error("Une interface ne peut pas être instanciée directement.");
        }
    }

    afficher() {
        throw new Error("Méthode afficher() non implémentée !");
    }

}
