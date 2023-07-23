import React, { useRef, useEffect } from 'react'
import { Transformer } from 'markmap-lib'
import { Markmap } from 'markmap-view'

const transformer = new Transformer()

const MarkmapHooks = ({ markmap }) => {
  const refSvg = useRef()
  const refMm = useRef()

  useEffect(() => {
    const mm = Markmap.create(refSvg.current)
    refMm.current = mm
    return () => {
      mm.destroy()
    }
  }, [])

  useEffect(() => {
    const mm = refMm.current
    // if (!mm) return
    const { root } = transformer.transform(markmap)
    mm.setData(root)
    mm.fit()
  }, [markmap])

  return (
    <>
      <svg style={{ width: '100%', minHeight: 400 }} ref={refSvg} />
    </>
  )
}

export default MarkmapHooks
