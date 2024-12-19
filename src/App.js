import { BrowserRouter, Route, Routes } from 'react-router-dom'
import PageWrapper from './common/components/PageWrapper'
import Clothing from './pages/Clothing'
import Cooking from './pages/Cooking'
import Dashboard from './pages/Dashboard'
import Inventory from './pages/Inventory'

function App() {
  const links = [
    { to: '/', label: 'Dashboard' },
    { to: 'inventory', label: 'Inventory' },
    { to: 'clothing', label: 'Clothing' },
    { to: 'cooking', label: 'Cooking' },
  ]
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageWrapper links={links} />}>
          <Route index element={<Dashboard />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="clothing" element={<Clothing />} />
          <Route path="cooking" element={<Cooking />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
