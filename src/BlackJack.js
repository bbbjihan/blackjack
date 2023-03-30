import Choose from './components/Choose';
import GameOver from './components/GameOver';
import Inform from './components/Inform';
import Status from './components/Status';
import Table from './components/Table';
import Title from './components/Title';

const BlackJack = () => {
    return (
        <div>
            <Title/>
            <Status/>
            <Table/>
            <Inform/>
            <Choose/>
            <GameOver/>
        </div>
    )
}

export default BlackJack;