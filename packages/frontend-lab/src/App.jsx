import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Counter from './pages/counter'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/counter" element={<Counter />} />
      </Routes>
    </BrowserRouter>
  )
}