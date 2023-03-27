import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import '../../Atom';
import { betState, DeckState, DhandState, DscoreState, informState, moneyState, PhandState, phaseState, PscoreState } from '../../Atom';
import './Choose.css';

const Choose = () => {
    const [money, setMoney] = useRecoilState(moneyState);
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

    const cardShuffle = async() => {
        setPhase(2);
        setInform("Shuffling...");
        let shuffling = [["A","spade"],[2,"spade"],[3,"spade"],[4,"spade"],[5,"spade"],[6,"spade"],[7,"spade"],[8,"spade"],[9,"spade"],[10,"spade"],["J","spade"],["Q","spade"]];
        for(let i = shuffling.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [shuffling[i], shuffling[j]] = [shuffling[j], shuffling[i]];
        }
        deck = shuffling;
        return Promise;
    }

    const cardDraw = async(owner) => {
        if(!deck.length){
            cardShuffle();
            setTimeout(()=>{
                setPhase(3);
                let draw = deck.shift();
                if(owner === "DEALER"){
                    setDhand((prev)=>[...prev,draw]);
                }else{
                    setPhand((prev)=>[...prev,draw]);
                }
                setInform(owner + "'s draw, " + draw[0] + " " + draw[1]);
            },1000)
        }else{
            setPhase(3);
            let draw = deck.shift();
            if(owner === "DEALER"){
                setDhand((prev)=>[...prev,draw]);
            }else{
                setPhand((prev)=>[...prev,draw]);
            }
            setInform(owner + "'s draw, " + draw[0] + " " + draw[1]);
        }
    }

    const BET = async() => {
        setBet(betting);
        setMoney(money-betting);
        setBetting(10);
        cardDraw("PLAYER");
        setTimeout(()=>{
            cardDraw("DEALER");
        },2000)
        setTimeout(()=>{
            cardDraw("PLAYER");
        },3000);
        setTimeout(()=>{
            if(Pscore > 21){
                playerBurst();
            }else if(Pscore === 21){
                playerBJ();
            }else{
                setPhase(1);
                setInform("액션을 선택해주세요.");
                console.log(Phand);
            }
        },4000)
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
    
    const calculateHand = (hand) => {
        let tmp = 0;
        if(hand.length !== 0){
            for(let i = 0; i < hand.length; i++){
                if(hand[i][0] === 'A'){
                    tmp += 11;
                }else if(hand[i][0] === 'J' || hand[i][0] === 'Q' || hand[i][0] === 'K'){
                    tmp += 10;
                }else{
                    tmp += hand[i][0];
                }
            }
        }
        return tmp;
    }

    useEffect(() => {
        setDscore(calculateHand(Dhand));
        setPscore(calculateHand(Phand));
    },[Phand, Dhand, setDscore, setPscore]);

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