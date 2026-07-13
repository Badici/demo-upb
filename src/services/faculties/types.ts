export type UniversityCenter = 'bucharest' | 'pitesti';

export type Faculty = {
  id: string;
  name: string;
  abbreviation: string;
  logoUrl: string;
  logoAlt: string;
  website: string;
  universityCenter: UniversityCenter;
};

export type FacultiesByCenter = {
  bucharest: Faculty[];
  pitesti: Faculty[];
};
