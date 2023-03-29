import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import BlackJack from './BlackJack';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="app">
          <Routes>
            <Route path="/blackjack/" element={<BlackJack/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;