
const produits = [
    { id: 1, nom: "Clavier", categorie: "Accessoires", prix: 120, stock: 5 },
    { id: 2, nom: "Souris", categorie: "Accessoires", prix: 80, stock: 8 },
    { id: 3, nom: "Écran", categorie: "Informatique", prix: 900, stock: 0 },
    { id: 4, nom: "Casque", categorie: "Accessoires", prix: 240, stock: 3 }
];
console.log("Catalogue des produits :");

produits.forEach(produit => {
    console.log(produit.nom, "-", produit.prix, "MAD");
});

const produitsDisponibles = produits.filter(
    produit => produit.stock > 0
);
console.log("Produits disponibles :", produitsDisponibles);
console.log("Nombre de produits disponibles :", produitsDisponibles.length);

const valeurStock = produits.reduce(
    (total, produit) => total + produit.prix * produit.stock,
    0
);
console.log("Valeur totale du stock :", valeurStock, "MAD");

if (produitsDisponibles.length > 0) {
    const produitMoinsCher = produitsDisponibles.reduce(
        (moinsCher, produit) =>
            produit.prix < moinsCher.prix ? produit : moinsCher
    );

    console.log("Produit le moins cher :", produitMoinsCher.nom);
    console.log("Prix :", produitMoinsCher.prix, "MAD");

    const { nom, prix } = produitMoinsCher;
    console.log("Destructuring :", nom, "-", prix, "MAD");
} else {
    console.log("Aucun produit disponible.");
}

const resumeCatalogue = produits.map(
    produit =>
        `${produit.nom} - ${produit.prix} MAD - ${produit.stock} unités`
);

console.log("Résumé du catalogue :");
console.log(resumeCatalogue);


function estValide(produit) {
    return (
        typeof produit.prix === "number" &&
        produit.prix >= 0 &&
        typeof produit.stock === "number" &&
        produit.stock >= 0
    );
}
