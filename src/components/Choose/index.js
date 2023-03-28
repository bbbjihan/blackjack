import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import '../../Atom';
import { betState, DeckState, DhandState, DscoreState, informState, moneyState, PhandState, phaseState, PscoreState } from '../../Atom';
import './Choose.css';

const Choose = () => {
    const setInform = useSetRecoilState(informState);
    const [betting, setBetting] = useState(10);
    const [bet, setBet] = useRecoilState(betState);
    const [money, setMoney] = useRecoilState(moneyState);
    const [phase, setPhase] = useRecoilState(phaseState);
    const [Deck, setDeck] = useRecoilState(DeckState);
    const [Phand, setPhand] = useRecoilState(PhandState);
    const [Dhand, setDhand] = useRecoilState(DhandState);
    const [Pscore, setPscore] = useRecoilState(PscoreState);
    const [Dscore, setDscore] = useRecoilState(DscoreState);

    const wait = (Sec) => new Promise((resolve) => setTimeout(resolve, Sec * 1000));

    const BET = () => {
        setPhand([]);
        setDhand([]);
        setPscore(0);
        setDscore(0);
        setBet(betting);
        setMoney(money - betting);
        setBetting(10);
        setPhase(2);
        setController("DrawPhase");
    }

    const cardShuffle = () => {
        console.log("cardShuffle");
        setPhase(2);
        setInform("Shuffling...");
        let shuffling = [["A","spade"],[2,"spade"],[3,"spade"],[4,"spade"],[5,"spade"],[6,"spade"],[7,"spade"],[8,"spade"],[9,"spade"],[10,"spade"],["J","spade"],["Q","spade"],["K","spade"],["A","diamond"],[2,"diamond"],[3,"diamond"],[4,"diamond"],[5,"diamond"],[6,"diamond"],[7,"diamond"],[8,"diamond"],[9,"diamond"],[10,"diamond"],["J","diamond"],["Q","diamond"],["K","diamond"],["A","heart"],[2,"heart"],[3,"heart"],[4,"heart"],[5,"heart"],[6,"heart"],[7,"heart"],[8,"heart"],[9,"heart"],[10,"heart"],["J","heart"],["Q","heart"],["K","heart"],["A","clover"],[2,"clover"],[3,"clover"],[4,"clover"],[5,"clover"],[6,"clover"],[7,"clover"],[8,"clover"],[9,"clover"],[10,"clover"],["J","clover"],["Q","clover"],["K","clover"]];
        for(let i = shuffling.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * (i + 1));
            [shuffling[i], shuffling[j]] = [shuffling[j], shuffling[i]];
        }
        setDeck(shuffling);
        return shuffling;
    }

    const playerDraw = (deck) => {
        console.log("playerDraw");
        let tmp = [...deck];
        let draw = tmp.shift();
        console.log(draw);
        setPhand((prev)=>[...prev,draw]);
        setDeck(tmp);
        setInform("PLAYER, " + draw[0] + " " + draw[1]);
        return tmp;
    }

    const dealerDraw = (deck) => {
        console.log("dealerDraw");
        let tmp = [...deck];
        let draw = tmp.shift();
        console.log(draw);
        setDhand((prev)=>[...prev,draw]);
        setDeck(tmp);
        setInform("DEALER, " + draw[0] + " " + draw[1]);
        return tmp;
    }

    const DrawPhase = async() => {
        console.log("DrawPhase");
        let deck = [...Deck];
        if(!deck.length){
            deck = cardShuffle();
            await wait(1);
        }
        deck = playerDraw(deck);
        await wait(1);
        if(!deck.length){
            deck = cardShuffle();
            await wait(1);
        }
        deck = dealerDraw(deck);
        await wait(1);
        if(!deck.length){
            deck = cardShuffle();
            await wait(1);
        }
        deck = playerDraw(deck);
        await wait(1);
        setController("ActionPhase");
    }

    const ActionPhase = () => {
        console.log("ActionPhase");
        setPhase(11);
        if(Pscore === 21){
            setController("DealerOpen");
        }else if(Pscore > 21){
            setController("PlayerBust");
        }else{
            setInform("액션을 선택하세요.");
            setPhase(1);
        }
    }

    const HIT = async() => {
        console.log("HIT");
        setPhase(11);
        setInform("HIT, playerDraw");
        await wait(1);
        let deck = [...Deck];
        if(!deck.length){
            deck = cardShuffle();
            await wait(1);
        }
        deck = playerDraw(deck);
        await wait(1);
        setController("PlayerCheck");
    }

    const playerCheck = () => {
        console.log("PlayerCheck");
        if(Pscore === 21){
            setController("DealerOpen");
        }else if(Pscore > 21){
            setController("PlayerBust");
        }else{
            setInform("액션을 선택하세요.");
            setPhase(1);
            setController("");
        }
    }

    const STAND = () => {
        console.log("STAND");
        setController("DealerOpen");
    }

    const DealerOpen = async() => {
        console.log("DealerOpen");
        setPhase(11);
        setInform("STAND, DEALER OPEN.");
        await wait(0.5);
        setInform("STAND, DEALER OPEN..");
        await wait(0.5);
        setInform("STAND, DEALER OPEN...");
        await wait(0.5);
        setPhase(4);
        let deck = [...Deck];
        if(!deck.length){
            deck = cardShuffle();
            await wait(1);
        }
        deck = dealerDraw(deck);
        setController("DealerCheck");
    }

    const DealerCheck = async() => {
        console.log("DealerCheck");
        if(Dscore < 17){
            console.log("<17, Redraw.");
            setController("");
            await wait(1);
            let deck = [...Deck];
            if(!deck.length){
                deck = cardShuffle();
                await wait(1);
            }
            deck = dealerDraw(deck);
            setController("DealerCheck");
        }else if(Dscore > 21){
            await wait(1);
            setController("DealerBust");
        }else{
            await wait(1);
            setController("WhoWin");
        }
    }

    const whoWin = () => {
        console.log("WhoWin");
        if(Dscore === 21){
            setController("DealerBJ");
        }else if(Pscore === 21){
            setController("PlayerBJ");
        }else{
            if(Pscore > Dscore){
                setController("PlayerWin");
            }else{
                setController("DealerWin");
            }
        }
    }

    const playerBust = async() => {
        console.log("playerBust");
        let deck = [...Deck];
        if(!deck.length){
            deck = cardShuffle();
            await wait(1);
        }
        deck = dealerDraw(deck);
        setInform("PLAYER BUST.");
        setPhase(5);
        setBet(0);
    }

    const dealerBust = () => {
        console.log("dealerBust");
        let earning = bet * 2;
        setInform("DEALER BUST. +" + earning + " G.");
        setMoney(money + earning);
        setBet(0);
        setPhase(6);
    }

    const playerWin = () => {
        console.log("playerWin");
        let earning = bet * 2;
        setInform("PLAYER WIN. +" + earning + " G.");
        setMoney(money + earning);
        setBet(0);
        setPhase(7);
    }

    const dealerWin = () => {
        console.log("dealerWin");
        setInform("DEALER WIN.");
        setBet(0);  
        setPhase(8);
    }

    const playerBJ = () => {
        console.log("palyerBJ");
        let earning = bet * 2.5;
        setInform("PLAYER BLACKJACK. +" + earning + " G.");
        setMoney(money + earning);
        setBet(0);  
        setPhase(9);
    }

    const dealerBJ = () => {
        console.log("dealerBJ");
        setInform("DEALER BLACK JACK.");
        setBet(0);  
        setPhase(10);
    }

    const [controller, setController] = useState("");

    useEffect(()=>{
        if(controller === "DrawPhase"){
            DrawPhase();
        }else if(controller === "ActionPhase"){
            ActionPhase();
        }else if(controller === "PlayerCheck"){
            playerCheck();
        }else if(controller === "DealerOpen"){
            DealerOpen();
        }else if(controller === "DealerCheck"){
            DealerCheck();
        }else if(controller === "PlayerBust"){
            playerBust();
        }else if(controller === "DealerBust"){
            dealerBust();
        }else if(controller === "PlayerWin"){
            playerWin();
        }else if(controller === "DealerWin"){
            dealerWin();
        }else if(controller === "PlayerBJ"){
            playerBJ();
        }else if(controller === "DealerBJ"){
            dealerBJ();
        }else if(controller === "WhoWin"){
            whoWin();
        }
    },[controller]);

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

    const betUP = () => {
        if(betting <= money - 10) setBetting(betting + 10);
    }

    const betDW = () => {
        if(betting >= 20) setBetting(betting - 10);
    }

    return(
        <div>
            <div class="chooseBar">
                {phase === 0 || (phase > 4 && phase < 11)?
                    <div class="betPhase">
                        <div class="betAdjust" onClick={betUP}>↑</div>
                        <div class="betAdjust" onClick={betDW}>↓</div>
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