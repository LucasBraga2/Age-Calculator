import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AgeCalculatorPage } from './pages/AgeCalculatorPage';
import { CountdownPage } from './pages/CountdownPage';
import './index.css';

function App() {
  return (
    <div className="bg-white rounded-3xl sm:rounded-[60px] p-8 sm:p-12 max-w-xl mx-auto mt-16 shadow-lg">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* A rota / vai renderizar a página da calculadora de idade */}
          <Route index element={<AgeCalculatorPage />} />
          
          {/* A rota /countdown vai renderizar a página de contagem regressiva */}
          <Route path="countdown" element={<CountdownPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;