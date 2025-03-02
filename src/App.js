import { BrowserRouter, Route, Routes } from 'react-router'
import PageWrapper from './common/components/PageWrapper'
import Armor from './pages/Armor'
import Cooking from './pages/Cooking'
import Dashboard from './pages/Dashboard'
import Items from './pages/Items'
import { ArmorProvider } from './common/components/ArmorProvider'
import { ItemProvider } from './common/components/ItemProvider'

function App() {
  const links = [
    { to: '/', label: 'Dashboard' },
    { to: 'items', label: 'Items' },
    { to: 'armor', label: 'Armor' },
    { to: 'cooking', label: 'Cooking' },
  ]
  return (
    <ArmorProvider>
      <ItemProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PageWrapper links={links} />}>
              <Route index element={<Dashboard />} />
              <Route path="items" element={<Items />} />
              <Route path="armor" element={<Armor />} />
              <Route path="cooking" element={<Cooking />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ItemProvider>
    </ArmorProvider>
  );
}

export default App;
