import { createContext, ReactNode } from 'react'

import config from 'config'
import useLocalStorage from 'hooks/useLocalStorage'

import {
  CustomizationProps,
  FontFamily,
  PresetColor,
  ThemeDirection,
  ThemeMode,
} from 'types'

// initial state
const initialState: CustomizationProps = {
  ...config,
  onChangeContainer: () => {},
  onChangeWorkspace: (id: string) => {},
  onChangeMode: (mode: ThemeMode) => {},
  onChangePresetColor: (theme: PresetColor) => {},
  onChangeDirection: (direction: ThemeDirection) => {},
  onChangeMiniDrawer: (miniDrawer: boolean) => {},
  onChangeDrawerOpen: (drawerOpen: boolean) => {},
  onChangeFontFamily: (fontFamily: FontFamily) => {},
}

// ==============================|| CONFIG CONTEXT & PROVIDER ||============================== //

const ConfigContext = createContext(initialState)

type ConfigProviderProps = {
  children: ReactNode
}

function ConfigProvider({ children }: ConfigProviderProps) {
  const [config, setConfig] = useLocalStorage(
    'react-template-config',
    initialState
  )

  const onChangeWorkspace = (id: string) => {
    setConfig({
      ...config,
      workspace: id,
    })
  }
  const onChangeContainer = () => {
    setConfig({
      ...config,
      container: !config.container,
    })
  }

  const onChangeMode = (mode: ThemeMode) => {
    setConfig({
      ...config,
      mode,
    })
  }

  const onChangePresetColor = (theme: PresetColor) => {
    setConfig({
      ...config,
      presetColor: theme,
    })
  }

  const onChangeDirection = (direction: ThemeDirection) => {
    setConfig({
      ...config,
      themeDirection: direction,
    })
  }

  const onChangeMiniDrawer = (miniDrawer: boolean) => {
    setConfig({
      ...config,
      miniDrawer,
    })
  }

  const onChangeDrawerOpen = (drawerOpen: boolean) => {
    setConfig({
      ...config,
      drawerOpen,
    })
  }

  const onChangeFontFamily = (fontFamily: FontFamily) => {
    setConfig({
      ...config,
      fontFamily,
    })
  }

  return (
    <ConfigContext.Provider
      value={{
        ...config,
        onChangeWorkspace,
        onChangeContainer,
        onChangeMode,
        onChangePresetColor,
        onChangeDirection,
        onChangeMiniDrawer,
        onChangeDrawerOpen,
        onChangeFontFamily,
      }}>
      {children}
    </ConfigContext.Provider>
  )
}

export { ConfigProvider, ConfigContext }
