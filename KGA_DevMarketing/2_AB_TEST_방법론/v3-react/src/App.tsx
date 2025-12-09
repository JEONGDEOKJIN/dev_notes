import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components';
import { SampleSizePage, AnalyzePage, ReportPage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SampleSizePage />} />
          <Route path="analyze" element={<AnalyzePage />} />
          <Route path="report" element={<ReportPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
