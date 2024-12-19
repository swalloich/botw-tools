import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PageWrapper from './Common/PageWrapper'
import Home from './pages/Home'
import Clothing from './pages/Clothing'
import Cooking from './pages/Cooking'

function App() {
  const links = [
    { to: '/', label: 'Home' },
    { to: 'clothing', label: 'Clothing' },
    { to: 'cooking', label: 'Cooking' },
  ]
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageWrapper links={links} />}>
          <Route index element={<Home />} />
          <Route path="clothing" element={<Clothing />} />
          <Route path="cooking" element={<Cooking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
