import { useEffect, useState } from 'react';
import './Choose.css';

const Choose = ({money, setMoney, bet, setBet, phase, setPhase, inform, setInform, scoreD, setScoreD, scoreP, setScoreP, deckD, setDeckD, deckP, setDeckP}) => {
    const [betting, setBetting] = useState(10);
    let deck = [];
    const setDeck = (obj) => {deck = obj;}

    const cardShuffle = () => {
        setPhase(2);
        setInform("Shuffling...");
        let shuffling = [[1,"spade"],[2,"spade"],[3,"spade"],[4,"spade"],[5,"spade"],[6,"spade"],[7,"spade"],[8,"spade"],[9,"spade"],[10,"spade"],[11,"spade"],[12,"spade"],[13,"spade"],[1,"diamond"],[2,"diamond"],[3,"diamond"],[4,"diamond"],[5,"diamond"],[6,"diamond"],[7,"diamond"],[8,"diamond"],[9,"diamond"],[10,"diamond"],[11,"diamond"],[12,"diamond"],[13,"diamond"],[1,"heart"],[2,"heart"],[3,"heart"],[4,"heart"],[5,"heart"],[6,"heart"],[7,"heart"],[8,"heart"],[9,"heart"],[10,"heart"],[11,"heart"],[12,"heart"],[13,"heart"],[1,"clover"],[2,"clover"],[3,"clover"],[4,"clover"],[5,"clover"],[6,"clover"],[7,"clover"],[8,"clover"],[9,"clover"],[10,"clover"],[11,"clover"],[12,"clover"],[13,"clover"]];
        for(let i = shuffling.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [shuffling[i], shuffling[j]] = [shuffling[j], shuffling[i]];
        }
        setDeck(shuffling);
        return Promise.resolve();
    }

    const cardDraw = (decks, setDecks, hand = [], setHand, turn) => {
        setPhase(3);
        let tmp = decks;
        let draw = tmp.shift();
        setHand((prev) => [...prev,draw]);
        setInform(turn + " Draw, " + draw[0] + " " + draw[1]);
        setDecks(tmp);
    }

    const BET = async() => {
        setBet(betting);
        setBetting(10);
        await cardShuffle();
        setTimeout(async function(){
            await cardDraw(deck, setDeck, deckD, setDeckD, "DEALER");
        }, 1000);
        setTimeout(async function(){
            await cardDraw(deck, setDeck, deckP, setDeckP, "PLAYER");
        }, 2000);
        setTimeout(async function(){
            await cardDraw(deck, setDeck, deckD, setDeckD, "DEALER");
        }, 3000);
        setTimeout(async function(){
            await cardDraw(deck, setDeck, deckP, setDeckP, "PLAYER");
        }, 4000);
        setTimeout(function(){
            setPhase(1);
            setInform("액션을 선택하세요.");
        }, 5000);
    };

    const betAdjustUP = () => {
        if(betting <= money - 10) setBetting((prev) => {return (prev + 10)});
    }

    const betAdjustDW = () => {
        if(betting >= 20) setBetting((prev) => {return (prev - 10)});
    }
 
    useEffect(() => {
        let tmp = 0;
        if(deckD.length !== 0){
            for(let i = 0; i < deckD.length; i++){
                tmp += deckD[i][0];
            }
        }
        setScoreD(tmp);
    }, [deckD, setScoreD]);

    useEffect(()=>{
        let tmp = 0;
        if(deckP.length !== 0){
            for(let i = 0; i < deckP.length; i++){
                tmp += deckP[i][0];
            }
        }
        setScoreP(tmp);
    }, [deckP, setScoreP]);

    return(
        <div>
            <div class="chooseBar">
                {phase === 0 ?
                    <div class="betPhase">
                        <div class="betAdjust" onClick={betAdjustUP}>↑</div>
                        <div class="betAdjust" onClick={betAdjustDW}>↓</div>
                        <div class="betting">{betting} G</div>
                        <div class="button" onClick={BET}>BET</div>
                    </div>
                    :
                    phase === 1 ?
                    (
                    <div class="openedPhase">
                        <div class="button">HIT</div>
                        <div class="button">STAND</div>
                        <div class="button">SPLIT</div>
                    </div>
                    )
                    :
                    ""
                }
            </div>
        </div>
    );
}

export default Choose;