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
    let dealerScore = 0;
    let playerScore = 0;

    const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));

    const cardShuffle = async() => {
        setPhase(2);
        setInform("Shuffling...");
        let shuffling = [["A","spade"],[2,"spade"],[3,"spade"],[4,"spade"],[5,"spade"],[6,"spade"],[7,"spade"],[8,"spade"],[9,"spade"],[10,"spade"],["J","spade"],["Q","spade"],["K","spade"],["A","diamond"],[2,"diamond"],[3,"diamond"],[4,"diamond"],[5,"diamond"],[6,"diamond"],[7,"diamond"],[8,"diamond"],[9,"diamond"],[10,"diamond"],["J","diamond"],["Q","diamond"],["K","diamond"],["A","heart"],[2,"heart"],[3,"heart"],[4,"heart"],[5,"heart"],[6,"heart"],[7,"heart"],[8,"heart"],[9,"heart"],[10,"heart"],["J","heart"],["Q","heart"],["K","heart"],["A","clover"],[2,"clover"],[3,"clover"],[4,"clover"],[5,"clover"],[6,"clover"],[7,"clover"],[8,"clover"],[9,"clover"],[10,"clover"],["J","clover"],["Q","clover"],["K","clover"]];
        for(let i = shuffling.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [shuffling[i], shuffling[j]] = [shuffling[j], shuffling[i]];
        }
        return shuffling;
    }

    const cardDraw = async(owner) => {
        setPhase(3);
        const draw = deck.shift();
        if(owner === "DEALER"){
            setDhand((prev)=>[...prev,draw]);
            if(draw[0] === 'A'){
                dealerScore += 11;
            }else if(draw[0] === 'J' || draw[0] === 'Q' || draw[0] === 'K'){
                dealerScore += 10;
            }else{
                dealerScore += draw[0];
            }
        }else{
            setPhand((prev)=>[...prev,draw]);
            if(draw[0] === 'A'){
                playerScore += 11;
            }else if(draw[0] === 'J' || draw[0] === 'Q' || draw[0] === 'K'){
                playerScore += 10;
            }else{
                playerScore += draw[0];
            }
        }
        setInform(owner + "'s draw, " + draw[0] + " " + draw[1]);
    }

    const BET = async() => {
        setBet(betting);
        setMoney(money - betting);
        setBetting(10);
        if(!deck.length){
            deck = await cardShuffle()
            .then(await wait(1000));
        }
        await cardDraw("PLAYER");
        await wait(1000);
        if(!deck.length){
            deck = await cardShuffle()
            .then(await wait(1000));
        }
        await cardDraw("DEALER");
        await wait(1000);
        if(!deck.length){
            deck = await cardShuffle()
            .then(await wait(1000));
        }
        await cardDraw("PLAYER");
        await wait(1000);
        await actionPhase();
        console.log(playerScore);
    }

    const actionPhase = async() => {
        if(playerScore > 21){
            playerBurst();
            setPhase(5);
        }else if(playerScore === 21){
            setPhase(11);
            setInform("PLAYER BLACK JACK.");
            await wait(1000);
            dealerOpen();
        }else{
            setPhase(1);
            setInform("액션을 선택해주세요.");
            setDeck(deck);
        }
    }

    const HIT = async() => {

    }

    const STAND = async() => {
        setPhase(4);
        deck = Deck;
        playerScore = Pscore;
        dealerScore = Dscore;
        console.log(Deck, playerScore, dealerScore);
        if(!deck.length){
            deck = await cardShuffle()
            .then(await wait(1000));
        }
        cardDraw("DEALER");
        await wait(1000);
    }

    const dealerOpen = async() => {
        setPhase(4);
        if(!deck.length){
            deck = await cardShuffle()
            .then(await wait(1000));
        }
        await cardDraw("DEALER");
        await wait(1000);
        while(dealerDrawFlag() === 0){
            if(!deck.length){
                deck = await cardShuffle()
                .then(await wait(1000));
            }
            await cardDraw("DEALER");
            await wait(1000);
        }
        if(dealerScore === 21) dealerBJ();
        else if(playerScore === 21) playerBJ();
        else if(dealerDrawFlag() === 1) dealerBurst();
        else whoWin();
    }

    const dealerDrawFlag = () => {
        if(dealerScore < 17){
            return 0;
        }else if(dealerScore > 21){
            return 1;
        }else{
            return 2;
        }
    }

    const whoWin = () => {
        let D = 21 - dealerScore;
        let P = 21 - playerScore;
        if(P < D){
            playerWin();
        }else{
            dealerWin();
        }
    }

    const playerBurst = () => {
        setInform("PLAYER BURST.");
        setPhase(5);
    }

    const dealerBurst = () => {
        setInform("DEALER BURST.");
        setPhase(6);
    }

    const playerWin = () => {
        setInform("PLAYER WIN.");
        setPhase(7);
    }

    const dealerWin = () => {
        setInform("DEALER WIN.");
        setPhase(8);
    }

    const playerBJ = () => {
        setInform("PLAYER BLACK JACK.");
        setPhase(9);
    }

    const dealerBJ = () => {
        setInform("DEALER BLACK JACK.");
        setPhase(10);
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
                        <div class="button" onClick={HIT}>HIT</div>
                        <div class="button" onClick={STAND}>STAND</div>
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