import { useAuth } from '../context/AuthContext.jsx'

export function useTheme() {
  const { darkMode, setDarkMode } = useAuth()

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  return { darkMode, toggleTheme }
}
