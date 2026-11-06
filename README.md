# 📖 সহজ আরবি (Sahoj Arabi) - Bangla to Arabic Learning Web App

একটি আধুনিক, ইন্টারেক্টিভ এবং ব্যবহারকারী-বান্ধব ওয়েব অ্যাপ্লিকেশন, যা বাংলা ভাষাভাষীদের ফ্রিতে আরবি ভাষা (বর্ণমালা, শব্দার্থ, বাক্যগঠন এবং কথপোকথন) সহজে শিখতে সাহায্য করবে।

---

## 🎯 ১. প্রজেক্ট ওভারভিউ (Project Overview)
* **লক্ষ্য:** বাংলাভাষীদের জন্য আরবি শেখার প্রক্রিয়াকে সহজ ও আকর্ষণীয় করা।
* **টার্গেট অডিয়েন্স:** সকল বয়সের বাংলা ভাষাভাষী (বিশেষ করে একদম শিক্ষানবিসরা)।
* **প্রযুক্তি স্ট্যাক (Tech Stack):**
  * **Frontend:** React.js (Vite), Tailwind CSS, Lucide-react (Icons)
  * **State Management:** React Hooks (`useState`, `useEffect`, `useContext`)
  * **Audio/Interactive:** Web Speech API / HTML5 Audio API, Canvas API (Alphabet Tracing)
  * **Data Storage:** LocalStorage (ফ্রি ও দ্রুত ট্র্যাকিংয়ের জন্য) / Supabase (ঐচ্ছিক)
  * **Hosting:** Vercel (Free Tier)

---

## 🌟 ২. কোর ফিচারসমূহ (Core Features)

### ক. আরবি বর্ণমালা ও উচ্চারণ (Alphabet & Phonics)
- [ ] **ইন্টারেক্টিভ বর্ণমালা গ্রিড:** সকল ২৮টি আরবি বর্ণমালার তালিকা।
- [ ] **অবস্থানগত রূপ (Positional Forms):** হরফগুলো শব্দের শুরুতে, মাঝে ও শেষে কেমন দেখায় তার ভিজ্যুয়াল প্রর্দশনী।
- [ ] **অডিও সাপোর্ট:** হরফে ক্লিক করলে সঠিক উচ্চারণ শোনার সুবিধা।
- [ ] **হরফ লেখার অনুশীলন (Tracing Canvas):** মাউস বা টাচ দিয়ে স্ক্রিনে হরফ আঁকার প্র্যাকটিস উইন্ডো।

### খ. ভোকাবুলারি বিল্ডার (Vocabulary Builder)
- [ ] **ক্যাটেগরিভিত্তিক শব্দভাণ্ডার:** দৈনন্দিন ব্যবহারের শব্দ (যেমন: পরিবার, খাবার, পশুপাখি, সময় ইত্যাদি)।
- [ ] **ফ্ল্যাশকার্ড (Flashcard System):** সামনে আরবি শব্দ ও উচ্চারণ, কার্ড ফ্লিপ করলে বাংলা অর্থ প্রকাশ পাবে।
- [ ] **শব্দ খোঁজার ফিল্টার:** ক্যাটেগরি অনুযায়ী শব্দ ফিল্টার করার সুবিধা।

### গ. পরিস্থিতিভিত্তিক কথোপকথন (Daily Conversations)
- [ ] **ডায়ালগ মডিউল:** কুশল বিনিময়, কেনাকাটা, ভ্রমণ ইত্যাদি পরিস্থিতিতে প্রয়োজনীয় আরবি বাক্যের তালিকা।
- [ ] **বাংলা অনুবাদ ও লিপ্যন্তর (Transliteration):** আরবি লেখার পাশাপাশি উচ্চারণ সুবিধার্থে বাংলা উচ্চারণ রাখা।

### ঘ. কুইজ ও গেমিফিকেশন (Quiz & Practice)
- [ ] **এমসিকিউ কুইজ (Multiple Choice Quiz):** আরবি শব্দ দেখে সঠিক বাংলা অর্থ চেনার গেম।
- [ ] **স্কোর ও পয়েন্ট:** সঠিক উত্তরের জন্য পয়েন্ট এবং ভুল উত্তরের ফিডব্যাক।

### ঙ. ইউজার প্রোগ্রেস (Progress Tracking)
- [ ] **লোকালস্টোরেজ ট্র্যাকিং:** কতটি বর্ণমালা ও শব্দ শেখা শেষ হয়েছে তার শতকারা (Percentage) হিসাব রাখা।
- [ ] **রিসোট সুবিধা:** প্রোগ্রেস সেভ রাখা বা নতুন করে শুরু করার সুবিধা।

---

## 📁 ৩. প্রজেক্ট ফোল্ডার স্ট্রাকচার (Folder Structure)

```text
sahoj-arabi/
├── public/
│   ├── audio/          # Pronunciation audio files
│   └── images/         # Static assets
├── src/
│   ├── assets/         # Icons, images
│   ├── components/     # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── Flashcard.jsx
│   │   ├── QuizCard.jsx
│   │   └── TracingCanvas.jsx
│   ├── data/           # JSON data files
│   │   ├── alphabets.json
│   │   ├── vocabulary.json
│   │   └── conversations.json
│   ├── pages/          # Application views/routes
│   │   ├── Home.jsx
│   │   ├── Alphabets.jsx
│   │   ├── Vocabulary.jsx
│   │   ├── Conversations.jsx
│   │   ├── Quiz.jsx
│   │   └── Progress.jsx
│   ├── context/        # React Context for global state/progress
│   │   └── ProgressContext.jsx
│   ├── App.jsx         # Main App Routing & Setup
│   ├── main.jsx        # Entry Point
│   └── index.css       # Tailwind Directives
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 📊 ৪. ডাটা মডেলের নমুনা (Sample JSON Data Structure)

### `src/data/alphabets.json`
```json
[
  {
    "id": 1,
    "letter": "أ",
    "name": "আলিফ (Alif)",
    "banglaSound": "আ",
    "isolated": "أ",
    "initial": "أـ",
    "medial": "ـأـ",
    "final": "ـأ",
    "audio": "/audio/alif.mp3"
  }
]
```

### `src/data/vocabulary.json`
```json
[
  {
    "id": 101,
    "category": "পরিবার (Family)",
    "arabic": "أَبٌ",
    "pronunciation": "আবুন",
    "meaning": "বাবা",
    "audio": "/audio/abun.mp3"
  }
]
```

---

## 🛠️ ৫. এআই-চালিত ইমপ্লিমেন্টেশন রোডম্যাপ (AI Implementation Prompts)

এই প্রজেক্টটি এআই টুল (যেমন: **Cursor**, **Windsurf**, বা **Bolt.new**) দিয়ে করার জন্য নিচের ধাপগুলো মেনে প্রম্পট দিন:

### 🔹 ধাপ ১: প্রজেক্ট সেটআপ ও নেভিগেশন
> **Prompt:** "Create a React + Vite application with Tailwind CSS for an Arabic learning app in Bangla called 'Sahoj Arabi'. Implement a clean, modern responsive layout with a top Navbar containing links to Home, Alphabets, Vocabulary, Conversations, Quiz, and Progress. Use React Router for navigation."

### 🔹 ধাপ ২: আরবি বর্ণমালা পেজ ও অডিও
> **Prompt:** "Build the `Alphabets.jsx` component. Display Arabic letters from `alphabets.json` in a responsive grid. Clicking a card should expand it to show its initial, medial, and final forms. Add a button that plays the pronunciation sound using standard Web Audio or dynamic HTML audio element."

### 🔹 ধাপ ৩: ভোকাবুলারি ও ফ্ল্যাশকার্ড
> **Prompt:** "Build the `Vocabulary.jsx` page with category filters (e.g., Family, Food). Render items using a 3D flip `Flashcard.jsx` component. The front side displays the Arabic word and pronunciation, while flipping shows the Bangla meaning."

### 🔹 ধাপ ৪: কুইজ সিস্টেম
> **Prompt:** "Create a dynamic `Quiz.jsx` system that randomly picks 5 words from `vocabulary.json` and presents multiple-choice questions (Bangla options for an Arabic word). Track score and display a summary at the end."

### 🔹 ধাপ ৫: লোকাল প্রোগ্রেস সেভিং
> **Prompt:** "Implement a React Context (`ProgressContext.jsx`) that uses `localStorage` to save completed lessons and quiz high scores. Show a progress bar on the Home and Progress pages."

---

## 🚀 ৬. লোকাল রান ও ডিপ্লয়মেন্ট (Setup & Deployment)

### লোকালে চালানোর নিয়ম:
1. রিপোজিটরি ক্লোন করুন:  
   `git clone https://github.com/your-username/sahoj-arabi.git`
2. ডিপেন্ডেন্সি ইনস্টল করুন:  
   `npm install`
3. প্রোজেক্ট স্টার্ট করুন:  
   `npm run dev`

### ফ্রিতে লাইভ করার নিয়ম (Vercel):
1. প্রজেক্টটি গিটহাবে পুশ করুন।
2. [Vercel](https://vercel.com/)-এ লগইন করে গিটহাব রিপোজিটরি ইম্পোর্ট করুন।
3. **Deploy** বাটনে ক্লিক করুন—অ্যাপটি কিছুক্ষণের মধ্যে লাইভ হয়ে যাবে।

---
*প্রজেক্টটি ওপেন সোর্স এবং সবার আরবি শেখার সুবিধার্থে নিবেদিত।*
