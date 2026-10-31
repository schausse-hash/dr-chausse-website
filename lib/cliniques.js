// Cliniques où pratique le Dr Chaussé.
// Utilisé par la section « Où me trouver » et par le formulaire de contact.
// La clé (cle) choisit le courriel de destination côté serveur (app/api/contact/route.js).
export const CLINIQUES = [
  {
    cle: "st-joseph",
    nom: "Clinique dentaire Boulevard St-Joseph",
    ville: "Montréal (Plateau Mont-Royal)",
    adresse: "1277 Bd Saint-Joseph E, Montréal, QC H2J 1L9",
    tel: "514-521-4141",
    site: "cliniquedentaireboulevardsaintjoseph.ca",
    email: "info@cliniquedentaireboulevardsaintjoseph.ca",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2795.6!2d-73.5739!3d45.5322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91a4e1b3b3b3b%3A0x0!2s1277+Bd+Saint-Joseph+E%2C+Montr%C3%A9al!5e0!3m2!1sfr!2sca!4v1700000000000",
  },
  {
    cle: "st-luc",
    nom: "Centre Dentaire St-Luc",
    ville: "Saint-Jean-sur-Richelieu",
    adresse: "413 Boul. Saint-Luc, Saint-Jean-sur-Richelieu, QC J2W 2A3",
    tel: "450 349-3368",
    email: "centredentairest-luc@videotron.ca",
    site: "centredentairest-luc.com",
    mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2810.4!2d-73.2637!3d45.3078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc924b1b1b1b1b1%3A0x0!2s413+Boul.+Saint-Luc%2C+Saint-Jean-sur-Richelieu!5e0!3m2!1sfr!2sca!4v1700000000001",
  },
  {
    cle: "rosemont",
    nom: "Dentistes Cité Rosemont",
    ville: "Montréal (Rosemont)",
    adresse: "4994, rue Beaubien Est, bureau 110, Montréal, QC H1T 1V4",
    tel: "514 725-6060",
    email: "info@dentisterosemont.ca",
    site: "dentisterosemont.ca",
    mapSrc: "https://maps.google.com/maps?q=4994+rue+Beaubien+Est%2C+Montr%C3%A9al%2C+QC+H1T+1V4&hl=fr&z=15&output=embed",
  },
  {
    cle: "bedard-couture",
    nom: "Clinique Dentaire Bédard Couture",
    ville: "Longueuil (Place Désormeaux)",
    adresse: "2877, chemin de Chambly, Longueuil, QC J4L 1M8",
    tel: "450 651-9935",
    email: "info@cdplacedesormeaux.ca",
    site: "dentiste-denturologiste.ca",
    mapSrc: "https://maps.google.com/maps?q=2877+chemin+de+Chambly%2C+Longueuil%2C+QC+J4L+1M8&hl=fr&z=15&output=embed",
  },
]
