import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const RouterContext = createContext(null)

export function RouterProvider({ children }) {
  // Initialise from the real browser URL so a hard-refresh lands on the right page
  const [currentPath, setCurrentPath] = useState(
    () => window.location.pathname || '/'
  )
  const [params, setParams] = useState({})

  // Listen to the browser's back / forward buttons
  useEffect(() => {
    function onPopState() {
      setCurrentPath(window.location.pathname || '/')
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const navigate = useCallback((path, newParams = {}) => {
    if (path === currentPath) return          // already here — nothing to do
    window.history.pushState({ path }, '', path)  // update the browser URL bar
    setCurrentPath(path)
    setParams(newParams)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentPath])

  // Also expose a replace function (useful for redirects without adding history entry)
  const replace = useCallback((path, newParams = {}) => {
    window.history.replaceState({ path }, '', path)
    setCurrentPath(path)
    setParams(newParams)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // go(-1) / go(1) wrappers around history.go
  const goBack    = useCallback(() => window.history.back(),    [])
  const goForward = useCallback(() => window.history.forward(), [])

  return (
    <RouterContext.Provider value={{ currentPath, params, navigate, replace, goBack, goForward }}>
      {children}
    </RouterContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRouter() {
  return useContext(RouterContext)
}