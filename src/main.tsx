import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux/es/exports'
import { store } from './redux/store.ts'
import theme from './helpers/mainTheme.ts'
import { ThemeProvider } from '@mui/material/styles';
ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <Provider store={store}>
    <ThemeProvider theme={theme}>
    <App />

    </ThemeProvider>
  </Provider>
)
