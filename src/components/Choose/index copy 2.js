import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import '../../Atom';
import { betState, DeckState, DhandState, DscoreState, informState, moneyState, PhandState, phaseState, PscoreState } from '../../Atom';
import './Choose.css';

const Choose = () => {
    const money = useRecoilValue(moneyState);
    const setBet = useSetRecoilState(betState);
    const [phase, setPhase] = useRecoilState(phaseState);
    const setInform = useSetRecoilState(informState);
    const [Dscore, setDscore] = useRecoilState(DscoreState);
    const [Pscore, setPscore] = useRecoilState(PscoreState);
    const [Dhand, setDhand] = useRecoilState(DhandState);
    const [Phand, setPhand] = useRecoilState(PhandState);
    const [Deck, setDeck] = useRecoilState(DeckState);
    const [betting, setBetting] = useState(10);
    let deck = [];

    const cardShuffle = () => {
        setPhase(2);
        setInform("Shuffling...");
        let shuffling = [[1,"spade"],[2,"spade"],[3,"spade"],[4,"spade"],[5,"spade"],[6,"spade"],[7,"spade"],[8,"spade"],[9,"spade"],[10,"spade"],[11,"spade"],[12,"spade"],[13,"spade"],[1,"diamond"],[2,"diamond"],[3,"diamond"],[4,"diamond"],[5,"diamond"],[6,"diamond"],[7,"diamond"],[8,"diamond"],[9,"diamond"],[10,"diamond"],[11,"diamond"],[12,"diamond"],[13,"diamond"],[1,"heart"],[2,"heart"],[3,"heart"],[4,"heart"],[5,"heart"],[6,"heart"],[7,"heart"],[8,"heart"],[9,"heart"],[10,"heart"],[11,"heart"],[12,"heart"],[13,"heart"],[1,"clover"],[2,"clover"],[3,"clover"],[4,"clover"],[5,"clover"],[6,"clover"],[7,"clover"],[8,"clover"],[9,"clover"],[10,"clover"],[11,"clover"],[12,"clover"],[13,"clover"]];
        for(let i = shuffling.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [shuffling[i], shuffling[j]] = [shuffling[j], shuffling[i]];
        }
        return shuffling;
    }

    const cardDraw = (owner) => {
        if(!deck.length){
            deck = cardShuffle();
            setTimeout(()=>{
                setPhase(3);
                let draw = deck.shift();
                if(owner === "DEALER"){
                    setDhand((prev)=>[...prev,draw]);
                    setDscore((prev)=>prev + draw[0]);
                }else{
                    setPhand((prev)=>[...prev,draw]);
                    setPscore((prev)=>prev + draw[0]);
                }
                setInform(owner + "'s draw, " + draw[0] + " " + draw[1]);
            },1000)
        }else{
            setPhase(3);
            let draw = deck.shift();
            if(owner === "DEALER"){
                setDhand((prev)=>[...prev,draw]);
                setDscore((prev)=>prev + draw[0]);
            }else{
                setPhand((prev)=>[...prev,draw]);
                setPscore((prev)=>prev + draw[0]);
            }
            setInform(owner + "'s draw, " + draw[0] + " " + draw[1]);
        }
    }

    const BET = () => {
        setBet(betting);
        setBetting(10);
        cardDraw("PLAYER");
        setTimeout(()=>{
            cardDraw("PLAYER");
            setTimeout(()=>{
                actionPhase();
            },1000)
        },2000);
    }

    const actionPhase = () => {
        if(Pscore > 21){
            playerBurst();
        }else if(Pscore === 21){
            playerBJ();
        }else{
            setPhase(1);
            setInform(Pscore);
        }
    }

    const playerBurst = () => {
        setInform("PLAYER BURST.");
    }

    const playerBJ = () => {
        setInform("PLAYER BLACK JACK.");
    }

    const betAdjustUP = () => {
        if(betting <= money - 10) setBetting((prev) => {return (prev + 10)});
    }

    const betAdjustDW = () => {
        if(betting >= 20) setBetting((prev) => {return (prev - 10)});
    }
 
    useEffect(() => {
        let tmp = 0;
        if(Dhand.length !== 0){
            for(let i = 0; i < Dhand.length; i++){
                let num = Dhand[i][0];
                if(num > 10){
                    tmp += 10;
                }else if(num === 1){
                    tmp += 11;
                }else{
                    tmp += num;
                }
            }
        }
        setDscore(tmp);
    }, [Dhand, setDscore]);

    useEffect(()=>{
        let tmp = 0;
        if(Phand.length !== 0){
            for(let i = 0; i < Phand.length; i++){
                let num = Phand[i][0];
                if(num > 10){
                    tmp += 10;
                }else if(num === 1){
                    tmp += 11;
                }else{
                    tmp += num;
                }
            }
        }
        setPscore(tmp);
    }, [Phand, setPscore]);

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