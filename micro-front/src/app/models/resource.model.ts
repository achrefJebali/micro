export enum Format {
  PDF = 'PDF',
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
  AUDIO = 'AUDIO',
  TEXT = 'TEXT',
  OTHER = 'OTHER'
}

export enum Type {
  COURS = 'COURS',
  EXERCICE = 'EXERCICE',
  TRAVAIL_PRATIQUE = 'TRAVAIL_PRATIQUE',
  PROJET = 'PROJET',
  DOCUMENTATION = 'DOCUMENTATION',
  AUTRE = 'AUTRE'
}

export interface Resource {
  idRessource?: number;
  titre: string;
  url: string;
  format: Format;
  type: Type;
}
