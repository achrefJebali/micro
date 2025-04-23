export enum Statut {

  DISPONIBLE = 'DISPONIBLE',
  NONCOMMENCE = 'NONCOMMENCE',
  ENCOURS = 'ENCOURS',
  TERMINE = 'TERMINE'
}

export interface Formation {
  id?: number;
  nomFormation: string;
  description: string;
  dateFormation: Date;
  nombrePlace: number;
  statut: Statut;
  prix: number;
}
