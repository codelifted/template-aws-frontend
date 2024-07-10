export type ThemeDirection = 'ltr' | 'rtl'
export type ThemeMode = 'light' | 'dark'
export type FontFamily =
  | `'Inter', sans-serif`
  | `'Poppins', sans-serif`
  | `'Roboto', sans-serif`
  | `'Public Sans', sans-serif`
export type PresetColor =
  | 'default'
  | 'theme1'
  | 'theme2'
  | 'theme3'
  | 'theme4'
  | 'theme5'
  | 'theme6'
  | 'theme7'
  | 'theme8'
export type I18n = 'en' | 'fr' | 'ro' | 'zh' // 'en' - English, 'fr' - French, 'ro' - Romanian, 'zh' - Chinese

// ==============================|| CONFIG TYPES  ||============================== //

export type DefaultConfigProps = {
  defaultPath: string
  workspace: string
  fontFamily: FontFamily
  i18n: I18n
  miniDrawer: boolean
  drawerOpen: boolean
  container: boolean
  mode: ThemeMode
  presetColor: PresetColor
  themeDirection: ThemeDirection
}

export type CustomizationProps = {
  defaultPath: string
  workspace: string
  fontFamily: FontFamily
  i18n: I18n
  miniDrawer: boolean
  drawerOpen: boolean
  container: boolean
  mode: ThemeMode
  presetColor: PresetColor
  themeDirection: ThemeDirection
  onChangeWorkspace: (id: string) => void
  onChangeContainer: VoidFunction
  onChangeMode: (mode: ThemeMode) => void
  onChangePresetColor: (theme: PresetColor) => void
  onChangeDirection: (direction: ThemeDirection) => void
  onChangeMiniDrawer: (miniDrawer: boolean) => void
  onChangeDrawerOpen: (drawerOpen: boolean) => void
  onChangeFontFamily: (fontFamily: FontFamily) => void
}
