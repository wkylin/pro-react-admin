export const loadMermaid = async (): Promise<import('mermaid').Mermaid> => (await import('mermaid')).default
export const loadMarkmap = async (): Promise<
  [Pick<typeof import('markmap-lib'), 'Transformer'>, Pick<typeof import('markmap-view'), 'Markmap'>]
> => Promise.all([import('markmap-lib'), import('markmap-view')])
