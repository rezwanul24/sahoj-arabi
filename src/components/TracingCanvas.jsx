import { useCallback, useEffect, useRef, useState } from 'react'
import { RotateCcw } from 'lucide-react'
import alphabets from '../data/alphabets.json'

function TracingCanvas() {
  const [selectedLetter, setSelectedLetter] = useState(alphabets[0].letter)
  const canvasRef = useRef(null)
  const strokesRef = useRef([])
  const activeStrokeRef = useRef(null)
  const activePointerIdRef = useRef(null)

  const redrawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const bounds = canvas.getBoundingClientRect()
    if (!bounds.width || !bounds.height) return

    const pixelRatio = window.devicePixelRatio || 1
    const pixelWidth = Math.round(bounds.width * pixelRatio)
    const pixelHeight = Math.round(bounds.height * pixelRatio)
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
      canvas.width = pixelWidth
      canvas.height = pixelHeight
    }

    const context = canvas.getContext('2d')
    if (!context) return

    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    context.clearRect(0, 0, bounds.width, bounds.height)
    context.fillStyle = '#fff'
    context.fillRect(0, 0, bounds.width, bounds.height)

    const fontSize = Math.min(bounds.width * 0.72, bounds.height * 0.78)
    context.save()
    context.direction = 'rtl'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.font = `${fontSize}px "Noto Naskh Arabic", serif`
    context.fillStyle = 'rgba(57, 103, 78, 0.16)'
    context.fillText(selectedLetter, bounds.width / 2, bounds.height / 2)
    context.restore()

    context.lineWidth = 6
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.strokeStyle = '#39674e'

    strokesRef.current.forEach((stroke) => {
      if (!stroke.length) return

      context.beginPath()
      context.moveTo(stroke[0].x * bounds.width, stroke[0].y * bounds.height)
      stroke.slice(1).forEach(({ x, y }) => {
        context.lineTo(x * bounds.width, y * bounds.height)
      })
      if (stroke.length === 1) {
        context.lineTo(stroke[0].x * bounds.width + 0.1, stroke[0].y * bounds.height)
      }
      context.stroke()
    })
  }, [selectedLetter])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const resizeObserver = new ResizeObserver(redrawCanvas)
    resizeObserver.observe(canvas)
    redrawCanvas()

    return () => resizeObserver.disconnect()
  }, [redrawCanvas])

  const getCanvasPoint = (event) => {
    const bounds = canvasRef.current.getBoundingClientRect()
    return {
      x: Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width)),
      y: Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height)),
    }
  }

  const startStroke = (event) => {
    if (activePointerIdRef.current !== null) return

    event.preventDefault()
    activePointerIdRef.current = event.pointerId
    event.currentTarget.setPointerCapture(event.pointerId)
    const stroke = [getCanvasPoint(event)]
    activeStrokeRef.current = stroke
    strokesRef.current = [...strokesRef.current, stroke]
    redrawCanvas()
  }

  const continueStroke = (event) => {
    if (event.pointerId !== activePointerIdRef.current) return

    event.preventDefault()
    activeStrokeRef.current.push(getCanvasPoint(event))
    redrawCanvas()
  }

  const finishStroke = (event) => {
    if (event.pointerId !== activePointerIdRef.current) return

    activePointerIdRef.current = null
    activeStrokeRef.current = null
  }

  const clearCanvas = () => {
    strokesRef.current = []
    activeStrokeRef.current = null
    activePointerIdRef.current = null
    redrawCanvas()
  }

  const changeLetter = (event) => {
    strokesRef.current = []
    activeStrokeRef.current = null
    activePointerIdRef.current = null
    setSelectedLetter(event.target.value)
  }

  const selectedAlphabet = alphabets.find(({ letter }) => letter === selectedLetter)

  return (
    <section className="w-full max-w-3xl">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-ink">হরফ লিখে অনুশীলন</h2>
          <p className="mt-1 text-sm text-[#738078]">হালকা হরফের ওপর আঙুল বা মাউস দিয়ে লিখুন।</p>
        </div>
        <label className="flex items-center gap-2 text-sm font-semibold text-ink">
          হরফ বাছুন
          <select
            value={selectedLetter}
            onChange={changeLetter}
            className="min-h-10 rounded-lg border border-[#dce2d7] bg-white px-3 text-base"
            aria-label="অনুশীলনের জন্য আরবি হরফ বাছুন"
          >
            {alphabets.map(({ id, letter, name }) => (
              <option key={id} value={letter}>{letter} — {name}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#dce2d7] bg-white">
        <canvas
          ref={canvasRef}
          className="block h-[300px] w-full touch-none sm:h-[380px]"
          onPointerDown={startStroke}
          onPointerMove={continueStroke}
          onPointerUp={finishStroke}
          onPointerCancel={finishStroke}
          role="img"
          aria-label={`${selectedAlphabet.name} হরফ লেখার অনুশীলনের ক্যানভাস`}
        />
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="text-xs text-[#738078]">নির্বাচিত হরফ: <span className="font-arabic text-lg text-moss" dir="rtl">{selectedLetter}</span></p>
        <button
          type="button"
          onClick={clearCanvas}
          className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-[#dce2d7] bg-white px-4 text-sm font-semibold text-ink transition-colors hover:bg-[#f0f5eb]"
        >
          <RotateCcw size={15} />মুছুন
        </button>
      </div>
    </section>
  )
}

export default TracingCanvas
