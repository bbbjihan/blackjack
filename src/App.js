import { useState } from 'react';
import './App.css';
import Choose from './components/Choose';
import Inform from './components/Inform';
import Status from './components/Status';
import Table from './components/Table';

function App() {
  const [phase, setPhase] = useState(0);
  //0: betting, 1: opened, 2: shuffling, 3: distribute, 4: result,
  const [money, setMoney] = useState(100);
  const [bet, setBet] = useState(0);
  const [deckD, setDeckD] = useState([[10,"spade"],[5,"heart"]]);
  const [deckP, setDeckP] = useState([[11,"diamond"],[8,"clover"]]);
  const [scoreD, setScoreD] = useState(15);
  const [scoreP, setScoreP] = useState(19);
  const [inform, setInform] = useState("");


  return (
    <div className="App">
      <div class="app">
        <Status money={money} setMoney={setMoney} bet={bet} setBet={setBet} phase={phase} setPhase={setPhase}/>
        <Table scoreD={scoreD} setScoreD={setScoreD} scoreP={scoreP} setScoreP={setScoreP} deckD={deckD} setDeckD={setDeckD} deckP={deckP} setDeckP={setDeckP} money={money} setMoney={setMoney} bet={bet} setBet={setBet} phase={phase} setPhase={setPhase}/>
        <Inform inform={inform} setInform={setInform} scoreD={scoreD} setScoreD={setScoreD} scoreP={scoreP} setScoreP={setScoreP} deckD={deckD} setDeckD={setDeckD} deckP={deckP} setDeckP={setDeckP} money={money} setMoney={setMoney} bet={bet} setBet={setBet} phase={phase} setPhase={setPhase}/>
        <Choose inform={inform} setInform={setInform} scoreD={scoreD} setScoreD={setScoreD} scoreP={scoreP} setScoreP={setScoreP} deckD={deckD} setDeckD={setDeckD} deckP={deckP} setDeckP={setDeckP} money={money} setMoney={setMoney} bet={bet} setBet={setBet} phase={phase} setPhase={setPhase}/>
      </div>
    </div>
  );
}

export default App;