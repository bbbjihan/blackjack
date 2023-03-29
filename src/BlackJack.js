import Choose from './components/Choose';
import GameOver from './components/GameOver';
import Inform from './components/Inform';
import Status from './components/Status';
import Table from './components/Table';

const BlackJack = () => {
    return (
        <div>
            <Status/>
            <Table/>
            <Inform/>
            <Choose/>
            <GameOver/>
        </div>
    )
}

export default BlackJack;