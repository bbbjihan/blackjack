import Choose from './components/Choose';
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
        </div>
    )
}

export default BlackJack;