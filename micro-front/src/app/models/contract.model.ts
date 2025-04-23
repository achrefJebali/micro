export enum Specialite {
  IA = 'IA',
  CLOUD = 'CLOUD',
  SECURITY = 'SECURITY',
  RESEAUX = 'RESEAUX',
  WEB = 'WEB'
}

export interface HistoriqueModification {
  id?: number;
  date: Date;
  description: string;
  contrat?: Contract;
}

export interface Contract {
  idContrat?: number;
  dateDebutContrat: Date;
  dateFinContrat: Date;
  specialite: Specialite;
  archive: boolean;
  montantContrat: number;
  nom: string;
  historiques?: HistoriqueModification[];
}
