import { useState } from 'react'
import { Check, Volume2 } from 'lucide-react'
import alphabets from '../data/alphabets.json'
import { speakArabic } from '../utils/speech.js'

function playPronunciation(alphabet) {
  if (alphabet.audio) {
    const audio = new Audio(alphabet.audio)
    audio.play().catch(() => speakArabic(alphabet.letter))
    return
  }
  speakArabic(alphabet.letter)
}

function Alphabets({ progress, onToggle }) {
  const [selected, setSelected] = useState(null)
  const selectedAlphabet = alphabets.find(({ letter }) => letter === selected)

  return (
    <div className="page-enter">
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-[11px] font-bold text-moss">পাঠ ০১ · ভিত্তি গড়ুন</p>
          <h1 className="text-[26px] font-extrabold leading-snug sm:text-[32px]">আরবি বর্ণমালা</h1>
          <p className="mt-2 max-w-[580px] text-[13px] leading-7 text-[#738078]">২৮টি হরফের সঙ্গে পরিচিত হোন। একটি হরফ বেছে নিলে তার অবস্থানভেদে রূপ দেখতে পাবেন।</p>
        </div>
        <span className="inline-flex items-center gap-2 self-start rounded-full bg-[#e7eee0] px-3 py-2 text-[11px] font-bold text-moss sm:self-auto">
          <Check size={14} />{progress.learned.length} / ২৮ শিখেছেন
        </span>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-[#e7e9e1] py-3 text-[10px] text-[#87918a]">
        <span className="font-bold text-ink">হরফ বেছে নিন</span>
        <span>আলাদা: ب</span><span>শুরু: بـ</span><span>মাঝে: ـبـ</span><span>শেষ: ـب</span>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
        {alphabets.map((alphabet) => {
          const learned = progress.learned.includes(alphabet.letter)
          const expanded = selected === alphabet.letter
          return (
            <article key={alphabet.id} className={`min-w-0 border transition-colors ${expanded ? 'border-moss bg-[#edf3e8]' : learned ? 'border-[#d9e7ce] bg-[#f0f5eb]' : 'border-[#e8eae4] bg-white/70 hover:border-[#c5d5ba] hover:bg-white'}`}>
              <button
                type="button"
                onClick={() => setSelected(expanded ? null : alphabet.letter)}
                className="relative flex min-h-[132px] w-full flex-col items-center justify-center p-3 text-center"
                aria-expanded={expanded}
                aria-controls={`alphabet-detail-${alphabet.id}`}
              >
                <span className="absolute right-3 top-3 text-[9px] text-[#a2aaa4]">{String(alphabet.id).padStart(2, '0')}</span>
                <span className="font-arabic text-[47px] leading-[1.25] text-moss" dir="rtl">{alphabet.letter}</span>
                <span className="mt-1 text-[11px] font-bold">{alphabet.name}</span>
                <span className="mt-1 text-[10px] text-[#87918a]">বাংলা: {alphabet.banglaSound}</span>
                {learned && <Check size={13} className="absolute bottom-2 right-2 text-moss" />}
              </button>
              {expanded && (
                <div id={`alphabet-detail-${alphabet.id}`} className="border-t border-[#dce7d4] px-3 pb-3 pt-2">
                  <div className="grid grid-cols-2 gap-x-2 gap-y-2">
                    <Form label="আলাদা" value={alphabet.isolated} />
                    <Form label="শুরু" value={alphabet.initial} />
                    <Form label="মাঝে" value={alphabet.medial} />
                    <Form label="শেষ" value={alphabet.final} />
                  </div>
                  <button
                    type="button"
                    onClick={() => playPronunciation(alphabet)}
                    className="mt-3 inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-moss px-3 text-[10px] font-bold text-white hover:bg-[#205844]"
                    aria-label={`${alphabet.name} উচ্চারণ শুনুন`}
                  >
                    <Volume2 size={14} />উচ্চারণ শুনুন
                  </button>
                  <button
                    type="button"
                    onClick={() => onToggle(alphabet.letter)}
                    className="mt-2 inline-flex h-8 w-full items-center justify-center gap-1.5 text-[10px] font-semibold text-[#65736a] hover:text-moss"
                  >
                    {learned ? 'শেখা হয়েছে' : 'শিখেছি হিসেবে চিহ্নিত'} {learned && <Check size={12} />}
                  </button>
                </div>
              )}
            </article>
          )
        })}
      </div>
      {selectedAlphabet && <p className="sr-only" aria-live="polite">{selectedAlphabet.name} নির্বাচিত</p>}
    </div>
  )
}

function Form({ label, value }) {
  return (
    <div className="flex min-w-0 items-center justify-between gap-1 border-b border-[#e2e9dd] pb-1">
      <span className="text-[9px] text-[#839087]">{label}</span>
      <span className="font-arabic text-[21px] leading-none text-ink" dir="rtl">{value}</span>
    </div>
  )
}

export default Alphabets