import { createContext, useContext, useState, useEffect } from 'react'
import { T } from './translation'

const LanguageContext = createContext(null)

function triggerTranslate(langCode) {
  const attempt = (tries = 0) => {
    const select = document.querySelector('.goog-te-combo')
    if (select) {
      select.value = langCode
      select.dispatchEvent(new Event('change'))
    } else if (tries < 20) {
      setTimeout(() => attempt(tries + 1), 300)
    }
  }
  attempt()
}

function restoreEnglish() {
  document.cookie =
    'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
  document.cookie =
    'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=' +
    window.location.hostname
  window.location.reload()
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const stored = localStorage.getItem('lang')
    // Guard against any unexpected stored value
    return stored === 'NP' ? 'NP' : 'EN'
  })

  useEffect(() => {
    if (lang === 'NP') triggerTranslate('ne')
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  function toggle() {
    if (lang === 'EN') {
      setLang('NP')
      localStorage.setItem('lang', 'NP')
      triggerTranslate('ne')
    } else {
      localStorage.setItem('lang', 'EN')
      restoreEnglish()
    }
  }

  // Safe lookup — always falls back to EN, then to the key itself
  const t = (key) => T?.['EN']?.[key] ?? key

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  return useContext(LanguageContext)
}