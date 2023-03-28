import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import BlackJack from './BlackJack';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div class="app">
          <Routes>
            <Route path="/" element={<BlackJack/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;