import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Choose from './components/Choose';
import Inform from './components/Inform';
import Status from './components/Status';
import Table from './components/Table';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div class="app">
          <Routes>
            <Route path="/" element={<Status/>}/>
            <Route path="/" element={<Table/>}/>
            <Route path="/" element={<Inform/>}/>
            <Route path="/" element={<Choose/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;