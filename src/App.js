import './App.css';
import Choose from './components/Choose';
import Inform from './components/Inform';
import Status from './components/Status';
import Table from './components/Table';

function App() {
  return (
    <div className="App">
      <div class="app">
        <Status/>
        <Table/>
        <Inform/>
        <Choose/>
      </div>
    </div>
  );
}

export default App;