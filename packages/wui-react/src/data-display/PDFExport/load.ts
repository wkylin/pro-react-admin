/** Lazy optional peers: importing data-display never loads PDF tooling. */
export const loadPdfTools = () => Promise.all([import('html2canvas'), import('jspdf')])
