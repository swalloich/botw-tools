import { BrowserRouter, Route, Routes } from 'react-router'
import PageWrapper from './common/components/PageWrapper'
import Clothing from './pages/Clothing'
import Cooking from './pages/Cooking'
import Dashboard from './pages/Dashboard'
import Items from './pages/Items'

function App() {
  const links = [
    { to: '/', label: 'Dashboard' },
    { to: 'items', label: 'items' },
    { to: 'clothing', label: 'Clothing' },
    { to: 'cooking', label: 'Cooking' },
  ]
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageWrapper links={links} />}>
          <Route index element={<Dashboard />} />
          <Route path="items" element={<Items />} />
          <Route path="clothing" element={<Clothing />} />
          <Route path="cooking" element={<Cooking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
