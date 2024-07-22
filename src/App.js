import './App.css';
import Router from './components/Router/Router.js';
import CustomThemeProvider from './context/ThemeContext.js';

function App() {
  return (
    <CustomThemeProvider>
      <div>
        <Router />
      </div>
      </CustomThemeProvider>
  );
}

export default App;
