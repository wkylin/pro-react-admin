import Component, { type InteractiveBookProps } from '@wui/media/InteractiveBook'
import pageTurnSound from '@assets/audio/page-turn.mp3'
import './pdfWorker'
export default function InteractiveBook(props: InteractiveBookProps) {
  return <Component pageTurnSound={pageTurnSound} {...props} />
}
export type { BookPage, InteractiveBookProps } from '@wui/media/InteractiveBook'
