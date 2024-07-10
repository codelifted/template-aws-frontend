import { Locales, ScrollTop, Snackbar } from 'components'

import Routes from 'routes'
import ThemeCustomization from 'themes'

// ==============================|| APP - THEME, ROUTER, LOCAL  ||============================== //

const App = () => {
  return (
    <ThemeCustomization>
      <Locales>
        <ScrollTop>
          <>
            <Routes />
            <Snackbar />
          </>
        </ScrollTop>
      </Locales>
    </ThemeCustomization>
  )
}

export default App
