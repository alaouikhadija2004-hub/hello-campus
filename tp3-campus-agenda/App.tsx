
import { StyleSheet, Text, View, FlatList } from 'react-native';

type Evenement = {
  id: string;
  titre: string;
  categorie: string;
  capacite: number;
  inscrits: number;
};

const evenements: Evenement[] = [
  { id: 'E01', titre: 'Atelier React', categorie: 'Atelier', capacite: 25, inscrits: 25 },
  { id: 'E02', titre: 'Conférence IA', categorie: 'Conférence', capacite: 70, inscrits: 52 },
  { id: 'E03', titre: 'Sécurité mobile', categorie: 'Atelier', capacite: 20, inscrits: 17 },
  { id: 'E04', titre: 'Design UI', categorie: 'Atelier', capacite: 18, inscrits: 9 },
  { id: 'E05', titre: 'Forum projets', categorie: 'Rencontre', capacite: 50, inscrits: 49 },
  { id: 'E06', titre: 'Découverte Git', categorie: 'Atelier', capacite: 24, inscrits: 24 },
];
function placesRestantes(e: Evenement): number {
  return Math.max(0, e.capacite - e.inscrits);
}

function statutEvenement(e: Evenement): string {
  const places = placesRestantes(e);

  if (places === 0) {
    return 'Complet';
  } else if (places <= 3) {
    return 'Presque complet';
  } else {
    return 'Ouvert';
  }
}
const nombreEvenements = evenements.length;

const nombreComplets = evenements.filter(
  e => placesRestantes(e) === 0
).length;

const nombreAvecPlaces = evenements.filter(
  e => placesRestantes(e) > 0
).length;

const totalPlacesRestantes = evenements.reduce(
  (somme, e) => somme + placesRestantes(e),
  0
);
const ateliersDisponibles = evenements.filter(
  e => e.categorie === 'Atelier' && placesRestantes(e) > 0
);

type BadgeEtatProps = {
  statut: string;
};

function BadgeEtat({ statut }: BadgeEtatProps) {
  const couleur =
    statut === 'Complet'
      ? '#F8D7DA'
      : statut === 'Presque complet'
      ? '#FFE5B4'
      : '#D4EDDA';

  return (
    <View style={{ backgroundColor: couleur, padding: 6, borderRadius: 8 }}>
      <Text>{statut}</Text>
    </View>
  );
}
type CarteEvenementProps = {
  evenement: Evenement;
};

function CarteEvenement({ evenement }: CarteEvenementProps) {
  return (
   <View style={styles.carte}>
      <Text>{evenement.titre}</Text>
      <Text>{evenement.categorie}</Text>
      <Text>
        Places restantes : {placesRestantes(evenement)}
      </Text>
      <BadgeEtat statut={statutEvenement(evenement)} />
    </View>
  );
}
type BlocStatistiqueProps = {
  label: string;
  valeur: number;
};

function BlocStatistique({ label, valeur }: BlocStatistiqueProps) {
  return (
   <View style={styles.statistique}>
      <Text>{label}</Text>
      <Text>{valeur}</Text>
    </View>
  );
}
const mode =  'tous' ;
export default function App() {
    const evenementsAffiches =
    mode === 'tous'
      ? evenements
      : ateliersDisponibles;
  return (
    <View style={styles.container}>
     <Text style={styles.titre}>CampusAgenda</Text>
     <Text style={styles.sousTitre}>Événements du campus</Text>
 <View style={styles.ligneStats}>
  <BlocStatistique label="Nombre d'événements" valeur={nombreEvenements} />
  <BlocStatistique label="Événements complets" valeur={nombreComplets} />
  <BlocStatistique label="Événements avec places" valeur={nombreAvecPlaces} />
  <BlocStatistique label="Places restantes" valeur={totalPlacesRestantes} />
</View>
<Text style={styles.titreListe}>
  {mode === 'tous' ? 'Tous les événements' : 'Ateliers disponibles'}
</Text>

<FlatList
  data={evenementsAffiches}
  renderItem={({ item }) => (
    <CarteEvenement evenement={item} />
  )}
  keyExtractor={item => item.id}
  ListEmptyComponent={<Text>Aucun événement disponible</Text>}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  titreListe: {
  fontSize: 18,
  fontWeight: 'bold',
  marginTop: 10,
},
 titre: {
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center',
},
sousTitre: {
  fontSize: 16,
  color: '#666',
  textAlign: 'center',
},
  statistique: {
  backgroundColor: '#EAF2F8',
  padding: 12,
  borderRadius: 10,
  marginBottom: 8,
  width: '48%',
},
ligneStats: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  gap: 10,
},
carte: {
  backgroundColor: '#E0E0E0',
  padding: 12,
  borderRadius: 10,
  marginBottom: 10,
  borderWidth: 1,
  borderColor: '#999999',
},
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    gap: 12,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});

