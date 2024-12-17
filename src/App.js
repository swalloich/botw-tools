import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PageWrapper from './Common/PageWrapper'
import Home from './pages/Home'
import Clothing from './pages/Clothing'
import Cooking from './pages/Cooking'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageWrapper />}>
          <Route index element={<Home />} />
          <Route path="clothing" element={<Clothing />} />
          <Route path="cooking" element={<Cooking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
