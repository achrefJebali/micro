export enum Niveau {
  JUNIOR = 'JUNIOR',
  SENIOR = 'SENIOR',
  EXPERT = 'EXPERT'
}

export interface DetailEquipe {
  id?: number;
  salle: string;
  thematique: string;
}

export interface Etudiant {
  id?: number;
  nom: string;
  prenom: string;
  option: string;
}

export interface Team {
  idEquipe?: number;
  nomEquipe: string;
  niveau: Niveau;
  nbMembres: number;
  ageMoyen: number;
  projetsLivres: number;
  prochaineEvolution: boolean;
  detailEquipe?: DetailEquipe;
  etudiants?: Etudiant[];
}
