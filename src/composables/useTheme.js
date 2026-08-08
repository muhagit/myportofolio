import { ref } from 'vue'

const theme = ref('dark')

function getSafeLocalStorage(key) {
  try {
    return localStorage.getItem(key)
  } catch (e) {
    console.warn('localStorage is not accessible:', e)
    return null
  }
}

function setSafeLocalStorage(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch (e) {
    console.warn('localStorage is not accessible:', e)
  }
}

export function useTheme() {
  const initTheme = () => {
    const saved = getSafeLocalStorage('portfolio-theme')
    if (saved === 'light' || saved === 'dark') {
      theme.value = saved
    } else {
      theme.value = 'dark' // default to dark
    }
    applyTheme(theme.value)
  }

  const applyTheme = (val) => {
    if (typeof document !== 'undefined') {
      if (val === 'light') {
        document.documentElement.classList.add('light')
      } else {
        document.documentElement.classList.remove('light')
      }
    }
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    setSafeLocalStorage('portfolio-theme', theme.value)
    applyTheme(theme.value)
  }

  return {
    theme,
    initTheme,
    toggleTheme
  }
}
