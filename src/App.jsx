import { useEffect, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import alphabets from './data/alphabets.json'
import Alphabets from './pages/Alphabets.jsx'
import TracingCanvas from './components/TracingCanvas.jsx'
import { speakArabic } from './utils/speech.js'
import {
  ArrowRight, BookOpen, Check, ChevronDown, CircleHelp, Compass, Flame,
  Home as HomeIcon, Languages, Menu, MessageCircle,
  RotateCcw, Sparkles, Trophy, Volume2, X,
} from 'lucide-react'

const navItems = [
  { to: '/', label: 'হোম', en: 'Home', icon: HomeIcon },
  { to: '/alphabets', label: 'বর্ণমালা', en: 'Alphabets', icon: Languages },
  { to: '/TracingCanvas', label: 'ট্রেসিং', en: 'Tracing', icon: Sparkles },
  { to: '/vocabulary', label: 'শব্দভাণ্ডার', en: 'Vocabulary', icon: BookOpen },
  { to: '/conversations', label: 'কথোপকথন', en: 'Conversations', icon: MessageCircle },
  { to: '/quiz', label: 'কুইজ', en: 'Quiz', icon: CircleHelp },
  { to: '/progress', label: 'আমার অগ্রগতি', en: 'Progress', icon: Trophy },
]

const words = [
  { arabic: 'بَيْتٌ', sound: 'বাইতুন', meaning: 'বাড়ি', category: 'দৈনন্দিন' },
  { arabic: 'مَاءٌ', sound: 'মাউন', meaning: 'পানি', category: 'দৈনন্দিন' },
  { arabic: 'كِتَابٌ', sound: 'কিতাবুন', meaning: 'বই', category: 'দৈনন্দিন' },
  { arabic: 'أُمٌّ', sound: 'উম্মুন', meaning: 'মা', category: 'পরিবার' },
  { arabic: 'أَبٌ', sound: 'আবুন', meaning: 'বাবা', category: 'পরিবার' },
  { arabic: 'أَخٌ', sound: 'আখুন', meaning: 'ভাই', category: 'পরিবার' },
  { arabic: 'تُفَّاحٌ', sound: 'তুফফাহুন', meaning: 'আপেল', category: 'খাবার' },
  { arabic: 'خُبْزٌ', sound: 'খুবজুন', meaning: 'রুটি', category: 'খাবার' },
  { arabic: 'حَلِيبٌ', sound: 'হালীবুন', meaning: 'দুধ', category: 'খাবার' },
]

const dialogues = [
  { title: 'সালাম ও পরিচয়', tag: 'শুরু করা', icon: '👋', lines: [['السَّلَامُ عَلَيْكُمْ', 'আসসালামু আলাইকুম', 'আপনার ওপর শান্তি বর্ষিত হোক'], ['وَعَلَيْكُمُ السَّلَامُ', 'ওয়া আলাইকুমুস সালাম', 'আপনার ওপরও শান্তি বর্ষিত হোক'], ['مَا اسْمُكَ؟', 'মা ইসমুকা?', 'আপনার নাম কী?']] },
  { title: 'ক্যাফেতে অর্ডার', tag: 'খাবার', icon: '☕', lines: [['أُرِيدُ قَهْوَةً', 'উরীদু কাহওয়াতান', 'আমি কফি চাই'], ['مِنْ فَضْلِكَ', 'মিন ফাদলিকা', 'দয়া করে'], ['شُكْرًا', 'শুকরান', 'ধন্যবাদ']] },
  { title: 'পথ জিজ্ঞেস করা', tag: 'ভ্রমণ', icon: '🧭', lines: [['أَيْنَ الْمَسْجِدُ؟', 'আইনাল মাসজিদু?', 'মসজিদ কোথায়?'], ['هُنَاكَ', 'হুনাকা', 'ওইখানে'], ['قَرِيبٌ مِنْ هُنَا', 'কারীবুন মিন হুনা', 'এখান থেকে কাছে']] },
]

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem('sahoj-arabi-progress')) || { learned: [], bestScore: 0 }
  } catch {
    return { learned: [], bestScore: 0 }
  }
}

function App() {
  const [progress, setProgress] = useState(readProgress)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    localStorage.setItem('sahoj-arabi-progress', JSON.stringify(progress))
  }, [progress])

  useEffect(() => setMenuOpen(false), [location.pathname])

  const toggleLearned = (letter) => setProgress((current) => ({
    ...current,
    learned: current.learned.includes(letter)
      ? current.learned.filter((item) => item !== letter)
      : [...current.learned, letter],
  }))

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="sticky top-0 z-30 border-b border-[#e7e9e1] bg-[#f6f7f2]/95 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[1320px] items-center justify-between gap-5 px-5 sm:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="সহজ আরবি হোম">
            <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-moss text-[25px] font-bold text-white font-arabic">ض</span>
            <span className="leading-tight"><span className="block text-[17px] font-extrabold">সহজ আরবি</span><span className="mt-1 block text-[10px] font-semibold tracking-[.04em] text-[#7b8781]">শিখুন নিজের গতিতে</span></span>
          </Link>
          <nav className="hidden items-center gap-1 xl:flex" aria-label="প্রধান নেভিগেশন">
            {navItems.map((item) => <NavItem key={item.to} item={item} />)}
          </nav>
          <div className="hidden items-center gap-2 rounded-full border border-[#e4e8dd] bg-white px-3 py-2 sm:flex">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-[#fff1d2] text-[#c88925]"><Flame size={15} fill="currentColor" /></span>
            <span className="text-[12px] font-bold">৩ দিন</span>
          </div>
          <button className="grid h-10 w-10 place-items-center rounded-xl border border-[#e4e8dd] bg-white xl:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'} aria-expanded={menuOpen}>
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
        {menuOpen && <nav className="border-t border-[#e7e9e1] bg-paper px-5 py-3 xl:hidden" aria-label="মোবাইল নেভিগেশন">
          <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-1 sm:grid-cols-3">{navItems.map((item) => <NavItem key={item.to} item={item} />)}</div>
        </nav>}
      </header>

      <main className="mx-auto max-w-[1320px] px-5 pb-16 pt-8 sm:px-8 sm:pt-10">
        <Routes>
          <Route path="/" element={<Home progress={progress} />} />
          <Route path="/alphabets" element={<Alphabets progress={progress} onToggle={toggleLearned} />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/TracingCanvas" element={<TracingCanvas />} />
          <Route path="/conversations" element={<Conversations />} />
          <Route path="/quiz" element={<Quiz progress={progress} setProgress={setProgress} />} />
          <Route path="/progress" element={<Progress progress={progress} />} />
          <Route path="*" element={<Home progress={progress} />} />
        </Routes>
      </main>
      <footer className="border-t border-[#e7e9e1]">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-2 px-5 py-5 text-[11px] text-[#89928c] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>সহজ আরবি <span className="px-1">·</span> প্রতিদিন একটু করে, আরবির আরও কাছে</span>
          <span>আপনার শেখার অগ্রগতি এই ডিভাইসেই সংরক্ষিত</span>
        </div>
      </footer>
    </div>
  )
}

function NavItem({ item }) {
  const Icon = item.icon
  return <NavLink to={item.to} end={item.to === '/'} className={({ isActive }) => `flex min-h-10 items-center gap-2 rounded-xl px-3 text-[12px] font-semibold transition-colors ${isActive ? 'bg-[#e9eee2] text-moss' : 'text-[#68736d] hover:bg-[#edf0e9] hover:text-ink'}`}>
    <Icon size={15} strokeWidth={1.8} /><span>{item.label}</span>
  </NavLink>
}

function PageHeading({ eyebrow, title, description, children }) {
  return <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
    <div><p className="mb-2 text-[11px] font-bold tracking-[.1em] text-moss">{eyebrow}</p><h1 className="text-[26px] font-extrabold leading-snug sm:text-[32px]">{title}</h1>{description && <p className="mt-2 max-w-[580px] text-[13px] leading-7 text-[#738078]">{description}</p>}</div>
    {children}
  </div>
}

function Home({ progress }) {
  const learnedCount = progress.learned.length
  return <div className="page-enter">
    <div className="mb-7 flex items-end justify-between gap-4">
      <div><p className="mb-2 text-[12px] font-semibold text-[#7d8981]">শুক্রবার, ৬ নভেম্বর</p><h1 className="text-[25px] font-extrabold sm:text-[31px]">আসসালামু আলাইকুম <span className="text-[#d59b49]">☀</span></h1><p className="mt-2 text-[13px] text-[#758078]">আজ একটু শিখুন, কাল আরও সাবলীল হোন।</p></div>
      <Link to="/progress" className="hidden items-center gap-2 text-[12px] font-bold text-moss sm:flex">আমার অগ্রগতি <ArrowRight size={15} /></Link>
    </div>

    <section className="relative isolate mb-6 overflow-hidden rounded-[22px] bg-[#164e40] text-white">
      <img src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&w=1400&q=85" alt="খোলা আরবি বইয়ের পাতা" className="absolute inset-y-0 right-0 -z-10 h-full w-[62%] object-cover object-center opacity-55" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#164e40] via-[#164e40]/95 to-[#164e40]/15" />
      <div className="max-w-[660px] px-6 py-8 sm:px-10 sm:py-11">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-semibold"><Sparkles size={13} className="text-lime" />আপনার শেখার যাত্রা</div>
        <p className="mb-1 text-[12px] font-semibold text-[#d7e5d6]">চালিয়ে যান · পাঠ ০২</p>
        <h2 className="text-[25px] font-extrabold leading-snug sm:text-[31px]">আরবি বর্ণমালার<br className="sm:hidden" /> সঙ্গে পরিচয়</h2>
        <p className="mt-3 max-w-[410px] text-[12px] leading-6 text-white/75">আরবি শেখার প্রথম ধাপ, ২৮টি সুন্দর হরফের সঙ্গে আজ পরিচিত হোন।</p>
        <div className="mt-6 flex items-center gap-4">
          <Link to="/alphabets" className="inline-flex h-11 items-center gap-2 rounded-xl bg-lime px-5 text-[12px] font-extrabold text-ink transition-transform hover:-translate-y-0.5">পাঠ শুরু করুন <ArrowRight size={15} /></Link>
          <span className="text-[11px] font-medium text-white/75">১০ মিনিট · সহজ</span>
        </div>
      </div>
      <div className="absolute bottom-5 right-6 hidden h-[94px] w-[94px] rotate-[-8deg] items-center justify-center rounded-full border border-white/25 bg-white/10 font-arabic text-[53px] text-white/90 lg:flex">ع</div>
    </section>

    <div className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
      <Stat icon={Languages} label="শেখা হরফ" value={`${learnedCount} / ২৮`} tint="green" />
      <Stat icon={BookOpen} label="শব্দভাণ্ডার" value="১২ শব্দ" tint="yellow" />
      <Stat icon={Flame} label="শেখার ধারা" value="৩ দিন" tint="orange" />
      <Stat icon={Trophy} label="সেরা স্কোর" value={`${progress.bestScore} / ৫`} tint="blue" />
    </div>

    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      <section>
        <div className="mb-4 flex items-center justify-between"><h2 className="text-[17px] font-extrabold">আজকের শেখা</h2><span className="text-[11px] text-[#8a948e]">আপনার জন্য বাছাই করা</span></div>
        <div className="divide-y divide-[#e9ebe5] border-y border-[#e9ebe5]">
          <LessonRow icon={Languages} tint="green" title="আরবি বর্ণমালা" subtitle="হরফ চিনুন, উচ্চারণ শিখুন" meta="২৮টি হরফ" to="/alphabets" />
          <LessonRow icon={BookOpen} tint="pink" title="প্রতিদিনের ১০টি শব্দ" subtitle="ঘর, পরিবার ও পরিচিত জিনিস" meta="১০ মিনিট" to="/vocabulary" />
          <LessonRow icon={MessageCircle} tint="blue" title="সালাম ও পরিচয়" subtitle="সহজ কথোপকথনে শুরু হোক" meta="৩টি বাক্য" to="/conversations" />
        </div>
      </section>
      <aside className="border-t border-[#e9ebe5] pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
        <h2 className="mb-4 text-[17px] font-extrabold">এই সপ্তাহ</h2>
        <div className="flex items-end justify-between gap-2 border-b border-[#e9ebe5] pb-5">
          {[['শনি', 32], ['রবি', 64], ['সোম', 44], ['মঙ্গল', 79], ['বুধ', 54], ['বৃহঃ', 92], ['শুক্র', 22]].map(([day, height], index) => <div key={day} className="flex flex-1 flex-col items-center gap-2"><div className="flex h-[80px] items-end"><span className={`w-5 rounded-t-md ${index === 5 ? 'bg-moss' : 'bg-[#dfe8d4]'}`} style={{ height: `${height}%` }} /></div><span className={`text-[9px] ${index === 5 ? 'font-bold text-moss' : 'text-[#909991]'}`}>{day}</span></div>)}
        </div>
        <div className="mt-5 flex items-start gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#fff1d2] text-[#c88925]"><Flame size={17} /></span><div><p className="text-[12px] font-bold">দারুণ ধারাবাহিকতা!</p><p className="mt-1 text-[11px] leading-5 text-[#849088]">আর ৪ দিন শিখলেই এক সপ্তাহ পূর্ণ হবে।</p></div></div>
      </aside>
    </div>
  </div>
}

function Stat({ icon: Icon, label, value, tint }) {
  const colors = { green: 'bg-[#e5efdc] text-moss', yellow: 'bg-[#fff1d2] text-[#bf882d]', orange: 'bg-[#fbe6d9] text-[#c97542]', blue: 'bg-[#dfeaf1] text-[#547c8f]' }
  return <div className="flex min-h-[92px] items-center gap-3 border-b border-[#e6e9e1] py-3 sm:border sm:bg-white/65 sm:px-4"><span className={`grid h-10 w-10 shrink-0 place-items-center rounded-[13px] ${colors[tint]}`}><Icon size={18} /></span><div><p className="text-[10px] text-[#8a948e]">{label}</p><p className="mt-1 text-[15px] font-extrabold">{value}</p></div></div>
}

function LessonRow({ icon: Icon, tint, title, subtitle, meta, to }) {
  const colors = { green: 'bg-[#e5efdc] text-moss', pink: 'bg-[#f7e6e4] text-[#b4695f]', blue: 'bg-[#dfeaf1] text-[#547c8f]' }
  return <Link to={to} className="group flex items-center gap-3 py-4 sm:gap-4"><span className={`grid h-11 w-11 shrink-0 place-items-center rounded-[14px] ${colors[tint]}`}><Icon size={19} /></span><span className="min-w-0 flex-1"><span className="block truncate text-[13px] font-bold">{title}</span><span className="mt-1 block truncate text-[11px] text-[#859088]">{subtitle}</span></span><span className="hidden text-[10px] text-[#8a948e] sm:block">{meta}</span><ArrowRight size={16} className="text-[#9da69f] transition-transform group-hover:translate-x-1 group-hover:text-moss" /></Link>
}

function Vocabulary() {
  const [category, setCategory] = useState('সব')
  const [revealed, setRevealed] = useState([])
  const categories = ['সব', 'দৈনন্দিন', 'পরিবার', 'খাবার']
  const shown = category === 'সব' ? words : words.filter((word) => word.category === category)
  return <div className="page-enter">
    <PageHeading eyebrow="শব্দভাণ্ডার · ফ্ল্যাশকার্ড" title="শব্দে শব্দে শিখুন" description="আরবি শব্দটি দেখে মনে মনে অর্থ ভাবুন, তারপর কার্ড উল্টে উত্তর মিলিয়ে নিন।" />
    <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="শব্দের বিভাগ">{categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`min-h-9 rounded-full px-4 text-[11px] font-bold transition-colors ${category === item ? 'bg-moss text-white' : 'border border-[#e1e5dc] bg-white/70 text-[#718078] hover:border-moss'}`}>{item}</button>)}</div>
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{shown.map((word) => {
      const isRevealed = revealed.includes(word.arabic)
      return <button key={word.arabic} onClick={() => setRevealed((items) => isRevealed ? items.filter((item) => item !== word.arabic) : [...items, word.arabic])} className={`group flex min-h-[185px] flex-col items-center justify-center border p-5 text-center transition-colors ${isRevealed ? 'border-[#ccdbc0] bg-[#edf3e8]' : 'border-[#e7e9e1] bg-white/75 hover:border-[#cbd8c2] hover:bg-white'}`}>
        <span className="mb-4 self-start rounded-full bg-[#edf0e8] px-2.5 py-1 text-[9px] font-semibold text-[#78847b]">{word.category}</span>
        <span className="font-arabic text-[38px] leading-none text-moss" dir="rtl">{word.arabic}</span>
        <span className="mt-3 text-[11px] text-[#78847b]">{isRevealed ? <><b className="text-ink">{word.meaning}</b> <span>· {word.sound}</span></> : word.sound}</span>
        <span className="mt-3 text-[9px] font-bold text-moss">{isRevealed ? 'আবার লুকান' : 'অর্থ দেখতে ট্যাপ করুন'} <RotateCcw size={11} className="ml-1 inline" /></span>
      </button>
    })}</div>
  </div>
}

function Conversations() {
  const [open, setOpen] = useState(0)
  return <div className="page-enter">
    <PageHeading eyebrow="কথোপকথন · শুনুন ও বলুন" title="বাস্তব জীবনের আরবি" description="পরিচিত পরিস্থিতির ছোট সংলাপ দিয়ে শুরু করুন। আরবি, বাংলা উচ্চারণ ও অর্থ একসঙ্গে দেখুন।" />
    <div className="space-y-3">{dialogues.map((dialogue, index) => <section key={dialogue.title} className="border border-[#e7e9e1] bg-white/70">
      <button onClick={() => setOpen(open === index ? -1 : index)} className="flex min-h-[76px] w-full items-center gap-4 px-4 py-3 text-left sm:px-5"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-[14px] bg-[#e8efe2] text-[20px]">{dialogue.icon}</span><span className="flex-1"><span className="block text-[13px] font-bold">{dialogue.title}</span><span className="mt-1 block text-[10px] text-[#849088]">{dialogue.lines.length}টি বাক্য <span className="px-1">·</span> {dialogue.tag}</span></span><span className="grid h-8 w-8 place-items-center rounded-full bg-[#f0f2ed] text-[#68766e]"><ChevronDown size={16} className={`transition-transform ${open === index ? 'rotate-180' : ''}`} /></span></button>
      {open === index && <div className="divide-y divide-[#edf0e9] border-t border-[#e9ece5] px-4 sm:px-5">{dialogue.lines.map(([arabic, pronunciation, meaning]) => <div key={arabic} className="grid gap-1 py-4 sm:grid-cols-[1fr_auto] sm:items-center"><div><p className="font-arabic text-[23px] leading-snug text-moss" dir="rtl">{arabic}</p><p className="mt-1 text-[10px] text-[#738078]">{pronunciation} <span className="px-1 text-[#bbc1ba]">·</span> {meaning}</p></div><button onClick={() => speakArabic(arabic)} className="mt-2 inline-flex h-8 w-fit items-center gap-1.5 rounded-lg border border-[#e5e9e1] px-2.5 text-[10px] font-semibold text-[#65736a] sm:mt-0" aria-label={`উচ্চারণ শুনুন: ${arabic}`}><Volume2 size={13} /> শুনুন</button></div>)}</div>}
    </section>)}</div>
  </div>
}

function Quiz({ progress, setProgress }) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [choice, setChoice] = useState(null)
  const [finished, setFinished] = useState(false)
  const questions = [words[0], words[3], words[6], words[2], words[7]]
  const question = questions[questionIndex]
  const distractors = words.filter((word) => word.meaning !== question.meaning).slice(questionIndex, questionIndex + 3).map((word) => word.meaning)
  const options = [...distractors]
  options.splice((questionIndex * 2 + 1) % 4, 0, question.meaning)
  const answer = (option) => {
    if (choice !== null) return
    setChoice(option)
    if (option === question.meaning) setScore((value) => value + 1)
  }
  const next = () => {
    if (questionIndex === questions.length - 1) {
      setFinished(true)
      setProgress((current) => ({ ...current, bestScore: Math.max(current.bestScore, score) }))
    } else {
      setQuestionIndex((index) => index + 1)
      setChoice(null)
    }
  }
  const restart = () => { setQuestionIndex(0); setScore(0); setChoice(null); setFinished(false) }
  return <div className="page-enter mx-auto max-w-[700px]">
    <PageHeading eyebrow="অনুশীলন · ছোট্ট কুইজ" title="শব্দের মানে বলুন" description="আরবি শব্দটি দেখে সঠিক বাংলা অর্থটি বেছে নিন।" />
    {finished ? <section className="border border-[#e5e9e1] bg-white/75 px-6 py-12 text-center sm:px-10"><span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#e6efdc] text-moss"><Trophy size={25} /></span><h2 className="mt-5 text-[21px] font-extrabold">কুইজ শেষ!</h2><p className="mt-2 text-[13px] text-[#738078]">৫টির মধ্যে <b className="text-moss">{score}টি</b> সঠিক উত্তর দিয়েছেন।</p><button onClick={restart} className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl bg-moss px-5 text-[12px] font-bold text-white"><RotateCcw size={15} />আবার খেলুন</button></section> : <section className="border border-[#e5e9e1] bg-white/75 p-5 sm:p-8">
      <div className="mb-7 flex items-center justify-between"><span className="text-[11px] font-bold text-[#7a867d]">প্রশ্ন {questionIndex + 1} <span className="font-normal">/ {questions.length}</span></span><span className="h-1.5 w-28 overflow-hidden rounded-full bg-[#e8ece4]"><span className="block h-full rounded-full bg-moss transition-all" style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></span></div>
      <div className="border-y border-[#e9ece5] py-8 text-center"><p className="text-[10px] font-semibold text-[#8a948e]">এই শব্দটির বাংলা অর্থ কী?</p><p className="mt-4 font-arabic text-[55px] leading-none text-moss" dir="rtl">{question.arabic}</p><p className="mt-3 text-[12px] text-[#748078]">{question.sound}</p></div>
      <div className="mt-6 grid gap-2 sm:grid-cols-2">{options.map((option, index) => {
        const correct = choice !== null && option === question.meaning
        const wrong = choice === option && choice !== question.meaning
        return <button key={`${option}-${index}`} onClick={() => answer(option)} className={`flex min-h-12 items-center justify-between border px-4 text-left text-[12px] font-semibold transition-colors ${correct ? 'border-moss bg-[#edf3e8] text-moss' : wrong ? 'border-[#d68c7d] bg-[#fbefec] text-[#a75243]' : 'border-[#e7e9e1] hover:border-moss hover:bg-[#f5f7f2]'}`}><span>{option}</span>{correct && <Check size={16} />}{wrong && <X size={16} />}</button>
      })}</div>
      {choice !== null && <div className={`mt-4 flex items-center justify-between gap-3 text-[11px] ${choice === question.meaning ? 'text-moss' : 'text-[#a75243]'}`}><span>{choice === question.meaning ? 'একদম ঠিক!' : `সঠিক উত্তর: ${question.meaning}`}</span><button onClick={next} className="inline-flex h-10 items-center gap-2 rounded-xl bg-moss px-4 font-bold text-white">{questionIndex === questions.length - 1 ? 'ফলাফল দেখুন' : 'পরের প্রশ্ন'} <ArrowRight size={14} /></button></div>}
    </section>}
  </div>
}

function Progress({ progress }) {
  const percentage = Math.round(progress.learned.length / alphabets.length * 100)
  return <div className="page-enter">
    <PageHeading eyebrow="আমার শেখার খাতা" title="আপনার অগ্রগতি" description="ছোট ছোট শেখাই একদিন বড় অভ্যাস হয়ে ওঠে। এখানেই আপনার শেখার হিসাব।">
      <button onClick={() => { if (window.confirm('আপনার শেখার অগ্রগতি মুছে ফেলবেন?')) localStorage.removeItem('sahoj-arabi-progress'); window.location.reload() }} className="inline-flex h-10 items-center gap-2 self-start border border-[#e2e6dd] px-3 text-[10px] font-bold text-[#738078] hover:border-[#c5cec0] sm:self-auto"><RotateCcw size={13} /> অগ্রগতি মুছুন</button>
    </PageHeading>
    <div className="grid gap-8 border-y border-[#e7e9e1] py-8 lg:grid-cols-[1fr_1fr]">
      <section><div className="flex items-center justify-between"><h2 className="text-[15px] font-extrabold">বর্ণমালা</h2><span className="text-[12px] font-bold text-moss">{progress.learned.length} / ২৮</span></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-[#e7ebe3]"><div className="h-full rounded-full bg-moss transition-all" style={{ width: `${percentage}%` }} /></div><p className="mt-3 text-[11px] text-[#849088]">{percentage}% সম্পন্ন · {28 - progress.learned.length}টি হরফ বাকি</p></section>
      <section className="grid grid-cols-2 gap-4"><div className="border-l-2 border-[#d8ef78] pl-4"><p className="text-[10px] text-[#89938c]">কুইজের সেরা স্কোর</p><p className="mt-2 text-[25px] font-extrabold">{progress.bestScore}<span className="text-[14px] font-medium text-[#89938c]"> / ৫</span></p></div><div className="border-l-2 border-[#edc99a] pl-4"><p className="text-[10px] text-[#89938c]">শেখা হরফ</p><p className="mt-2 text-[25px] font-extrabold">{progress.learned.length}<span className="text-[14px] font-medium text-[#89938c]"> / ২৮</span></p></div></section>
    </div>
    <div className="mt-8"><h2 className="mb-4 text-[15px] font-extrabold">আপনার শেখা হরফ</h2><div className="flex flex-wrap gap-2">{progress.learned.length ? alphabets.filter(({ letter }) => progress.learned.includes(letter)).map(({ letter, name }) => <span key={letter} className="inline-flex min-w-[100px] items-center gap-2 border border-[#e4e9de] bg-white/70 px-3 py-2"><span className="font-arabic text-[23px] text-moss" dir="rtl">{letter}</span><span className="text-[10px] font-semibold">{name}</span></span>) : <div className="flex w-full items-center gap-4 border border-dashed border-[#dce2d7] px-5 py-6"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#e8efe2] text-moss"><Compass size={18} /></span><div><p className="text-[12px] font-bold">এখনও কোনো হরফ চিহ্নিত হয়নি</p><p className="mt-1 text-[10px] text-[#849088]">বর্ণমালা থেকে একটি হরফ শিখে এখানে ফিরে আসুন।</p></div><Link to="/alphabets" className="ml-auto hidden items-center gap-1 text-[10px] font-bold text-moss sm:flex">শুরু করুন <ArrowRight size={13} /></Link></div>}</div></div>
  </div>
}

export default App