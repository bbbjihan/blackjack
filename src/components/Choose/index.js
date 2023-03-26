import { useState } from 'react';
import './Choose.css';

const Choose = ({money, setMoney, bet, setBet, phase, setPhase, inform, setInform, scoreD, setScoreD, scoreP, setScoreP, deckD, setDeckD, deckP, setDeckP}) => {
    const [betting, setBetting] = useState(10);
    const [deck, setDeck] = useState([[10,"spade"],[5,"heart"],[11,"diamond"],[8,"clover"]]);

    const cardShuffle = () => {
        let shuffling = [[1,"spade"],[2,"spade"],[3,"spade"],[4,"spade"],[5,"spade"],[6,"spade"],[7,"spade"],[8,"spade"],[9,"spade"],[10,"spade"],[11,"spade"],[12,"spade"],[13,"spade"],[1,"diamond"],[2,"diamond"],[3,"diamond"],[4,"diamond"],[5,"diamond"],[6,"diamond"],[7,"diamond"],[8,"diamond"],[9,"diamond"],[10,"diamond"],[11,"diamond"],[12,"diamond"],[13,"diamond"],[1,"heart"],[2,"heart"],[3,"heart"],[4,"heart"],[5,"heart"],[6,"heart"],[7,"heart"],[8,"heart"],[9,"heart"],[10,"heart"],[11,"heart"],[12,"heart"],[13,"heart"],[1,"clover"],[2,"clover"],[3,"clover"],[4,"clover"],[5,"clover"],[6,"clover"],[7,"clover"],[8,"clover"],[9,"clover"],[10,"clover"],[11,"clover"],[12,"clover"],[13,"clover"]];
        for(let i = shuffling.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [shuffling[i], shuffling[j]] = [shuffling[j], shuffling[i]];
        }
        setDeck((prev) => {return[...shuffling]});
    }

    const betAdjustUP = () => {
        if(betting <= money - 10) setBetting((prev) => {return (prev + 10)});
    }

    const betAdjustDW = () => {
        if(betting >= 20) setBetting((prev) => {return (prev - 10)});
    }

    const BET = () => {
        setBet(betting);
        setBetting(10);
        getScore(setScoreD,deckD);
        getScore(setScoreP,deckP);
        Promise.resolve()
            .then(cardShuffle)
            .then(function(){
                setPhase(1);
                setInform("액션을 선택해주세요.")
            })
    }

    const getScore = (setScore, deck) => {
        let tmpSum = 0;
        deck.forEach((x)=>{
            tmpSum += x[0];
        })
        setScore(tmpSum);
    }

    const distD = () => {
        let tmpDeck = deck;
        setDeckD((prev)=>{return[...prev] + [tmpDeck.pop()]});
        setDeck(tmpDeck);
        getScore(setScoreD, deckD);
    }

    const distP = () => {
        
    }
    
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