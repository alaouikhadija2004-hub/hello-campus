import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function App() {
  // 02 Données de départ
  const produits = [
    { id: 1, nom: "Clavier", categorie: "Accessoires", prix: 120, stock: 5 },
    { id: 2, nom: "Souris", categorie: "Accessoires", prix: 80, stock: 8 },
    { id: 3, nom: "Écran", categorie: "Informatique", prix: 900, stock: 0 },
    { id: 4, nom: "Casque", categorie: "Accessoires", prix: 240, stock: 3 },
  ];

  // 1. Disponibilité (stock > 0)
  const produitsDisponibles = produits.filter(p => p.stock > 0);

  // 2. Valeur totale du stock avec reduce()
  const valeurStock = produits.reduce((total, p) => total + (p.prix * p.stock), 0);

  // 3. Produit disponible le moins cher
  let produitMoinsCher = null;
  if (produitsDisponibles.length > 0) {
    produitMoinsCher = produitsDisponibles.reduce((min, p) => p.prix < min.prix ? p : min);
  }

  // 4. Résumé avec map()
  const resumeCatalogue = produits.map(p => `${p.nom} - ${p.prix} MAD - ${p.stock} unités`);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>CampusStock - Catalogue</Text>
      
      <View style={styles.card}>
        <Text style={styles.label}>Valeur totale du stock :</Text>
        <Text style={styles.value}>{valeurStock} MAD</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Produits disponibles :</Text>
        <Text style={styles.value}>{produitsDisponibles.length} produits</Text>
      </View>

      {produitMoinsCher && (
        <View style={styles.card}>
          <Text style={styles.label}>Produit le moins cher :</Text>
          <Text style={styles.value}>{produitMoinsCher.nom} ({produitMoinsCher.prix} MAD)</Text>
        </View>
      )}

      <Text style={styles.subtitle}>Résumé du catalogue :</Text>
      {resumeCatalogue.map((ligne, index) => (
        <Text key={index} style={styles.item}>{ligne}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#444',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginTop: 5,
  },
  item: {
    fontSize: 14,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
    color: '#333',
  },
});
