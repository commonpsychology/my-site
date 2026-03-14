import { createContext, useContext, useState, useCallback } from 'react'

const RouterContext = createContext(null)

export function RouterProvider({ children }) {
  const [currentPath, setCurrentPath] = useState('/')
  const [params, setParams] = useState({})

  const navigate = useCallback((path, p = {}) => {
    setCurrentPath(path)
    setParams(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <RouterContext.Provider value={{ currentPath, params, navigate }}>
      {children}
    </RouterContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useRouter() {
  return useContext(RouterContext)
}