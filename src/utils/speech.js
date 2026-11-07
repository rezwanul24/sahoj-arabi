export const speechDefaults = {
  lang: 'ar-SA',
  rate: 0.8,
  pitch: 1,
  volume: 1,
}

export function speakArabic(text, options = {}) {
  if (
    typeof window === 'undefined'
    || !('speechSynthesis' in window)
    || !('SpeechSynthesisUtterance' in window)
  ) return false

  const settings = { ...speechDefaults, ...options }
  const synthesis = window.speechSynthesis
  const utterance = new SpeechSynthesisUtterance(text)
  const language = settings.lang.toLowerCase()
  const voices = synthesis.getVoices()
  const voice = voices.find((item) => item.lang.toLowerCase() === language)
    || voices.find((item) => item.lang.toLowerCase().startsWith('ar'))

  utterance.lang = settings.lang
  utterance.rate = settings.rate
  utterance.pitch = settings.pitch
  utterance.volume = settings.volume
  if (voice) utterance.voice = voice

  synthesis.cancel()
  synthesis.speak(utterance)
  return true
}