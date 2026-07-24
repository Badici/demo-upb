/** Local faculty logos from `public/logo-facultati`. */

const BASE = "/logo-facultati";

export const FACULTY_LOGO_BY_ABBR: Record<string, string> = {
  FIIR: `${BASE}/Facultatea-de-Inginerie-Industriala-si-Robotica.jpg.jpeg`,
  FIIB: `${BASE}/Logo-Chimie_aprilie-2022-1021x1024-1.jpeg.jpeg`,
  FE: `${BASE}/energetica.png.png`,
  FISB: `${BASE}/facultate_ISB_2018-41x41.jpg`,
  FILS: `${BASE}/fils.jpg.jpeg`,
  FAC: `${BASE}/facultatea_automatica_2018-47x47.jpg`,
  DFPCDS: `${BASE}/LOGO-DPPD.png.png`,
  FT: `${BASE}/FTP.png.png`,
  FSA: `${BASE}/fsa.png.png`,
  FETTI: `${BASE}/elth.png.png`,
  FIA: `${BASE}/facultatea_AERO_2018.jpg.jpeg`,
  FIM: `${BASE}/fim.jpg.jpeg`,
  FIMM: `${BASE}/fimm.png.png`,
  FIMTC: `${BASE}/simm-48x48.png`,
  FAIMA: `${BASE}/faima-47x47.jpg`,
  FSEFI: `${BASE}/rsz_1facultatea_de_Stiinte_educatie_fizica_si_informatica.png.png`,
  FMT: `${BASE}/FMT-1.png.png`,
  FECIC: `${BASE}/calculatoare-pitesti-Custom.jpg.jpeg`,
  FSESSP: `${BASE}/logo-fsessp-Custom.png.png`,
  FSED: `${BASE}/FSE.png.png`,
  FTLIA: `${BASE}/CP.png.png`,
};

export function resolveFacultyLogo(
  abbreviation: string,
  fallbackUrl?: string,
): string {
  return (
    FACULTY_LOGO_BY_ABBR[abbreviation.toUpperCase()] ??
    fallbackUrl ??
    `${BASE}/sigla-TRUPB-46x46.png`
  );
}
