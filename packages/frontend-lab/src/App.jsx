import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Counter from './pages/counter'
import TodoList from './pages/todolist'
import Accordion from './pages/accordion'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/counter' element={<Counter />} />
        <Route path='/todolist' element={<TodoList />} />
        <Route path='/accordion' element={<Accordion />} />
      </Routes>
    </BrowserRouter>
  )
}
