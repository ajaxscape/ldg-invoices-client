import React, { useContext, useState } from 'react'

export const GlobalContext = React.createContext(undefined)

export const useGlobal = () => useContext(GlobalContext)

export const GlobalProvider = ({ children }) => {
  const [menuVisible, setMenuVisible] = useState(false)
  const [syncing, setSyncing] = useState(false)
  return (
    <GlobalContext.Provider
      value={{
        menuVisible,
        setMenuVisible,
        syncing,
        setSyncing,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
