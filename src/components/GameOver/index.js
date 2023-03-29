import { useRecoilState, useSetRecoilState } from 'recoil';
import { DeckState, DhandState, DscoreState, GameOverState, moneyState, PhandState, phaseState, PscoreState } from '../../Atom';
import './GameOver.css';

const GameOver = () => {
    const [gameOver, setGameOver] = useRecoilState(GameOverState);
    const setMoney = useSetRecoilState(moneyState);
    const setPhase = useSetRecoilState(phaseState);
    const setDeck = useSetRecoilState(DeckState);
    const setPhand = useSetRecoilState(PhandState);
    const setDhand = useSetRecoilState(DhandState);
    const setPscore = useSetRecoilState(PscoreState);
    const setDscore = useSetRecoilState(DscoreState);
    const RESTART = () => {
        setMoney(100);
        setPhase(0);
        setDeck([]);
        setPhand([]);
        setDhand([]);
        setPscore([]);
        setDscore([]);
        setGameOver(false);
    }
    return(
        <div>
            {gameOver ?
                <div className="wrapper">
                    <div className="Modal">
                        <div className="ModalTitle">
                            GAME OVER
                        </div>
                        <div className="ModalContent">
                            ALL-IN, RESTART ?
                        </div>
                        <div className="ModalButtonLine">
                            <div className="ModalButton" onClick={RESTART}>YES</div>
                        </div>
                    </div>
                </div>
                :
                <></>            
            }
        </div>
    )
}

export default GameOver;