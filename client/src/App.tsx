import { Button, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { HashRouter,BrowserRouter } from 'react-router-dom'
import IndexRouter from './Router/IndexRouter'

type ThemeSystemProps = {
  children: React.ReactNode
}
// move to own component
const ThemeSystem: React.FC<ThemeSystemProps> = ({children}) => {
  const [isDark, setDark] = useState(false);

  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode: isDark ? 'dark' : 'light'
      }
    })
  }, [isDark])

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  )
}

function App() {
  return (

    <ThemeSystem>
      <CssBaseline >
      <BrowserRouter>
        <IndexRouter />
      </BrowserRouter>
      </CssBaseline>
    </ThemeSystem>

  );
}

export default App;
