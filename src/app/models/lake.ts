export interface Lake {
  id?: string;

  nev: string;
  telepules: string;

  kepUrl: string;
  kepUtvonal: string;

  tipus: string;
  cim: string;
  leiras: string;

  terulet_ha: number | null;
  vizmelyseg: number | null;
  helyek_szama: number | null;

  sport_napijegy_ar: number | null;

  halfajok: string[];
  szabalyok: string[];
  ajanlott_modszerek: string[];

  ejszakai_horgaszat: boolean;
  csonak_hasznalat: boolean;

  megtekintesek: number;

  letrehozva: any;

  // 🆕 Manager rendszer
  managerId?: string;
  managerName?: string;
}