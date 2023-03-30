import React from "react";
import { useRecoilValue } from "recoil";
import { DhandState, DscoreState, PhandState, phaseState, PscoreState } from "../../Atom";
import './Table.css';

const Table = () => {

    const getCardImage = (cardNumber, cardSuit) => {
        let N = '';
        if(cardNumber === 10) N = 0;
        else N = `${cardNumber}`;
        let S = '';
        if(cardSuit === 'clover') S = 'C';
        else if(cardSuit === 'spade') S = 'S';
        else if(cardSuit === 'heart') S = 'H';
        else if(cardSuit === 'diamond') S = 'D';
        return N + S;
    }
    const phase = useRecoilValue(phaseState);
    const Dhand = useRecoilValue(DhandState);
    const Phand = useRecoilValue(PhandState);
    const Dscore = useRecoilValue(DscoreState);
    const Pscore = useRecoilValue(PscoreState);
    return(
        <div>
            <div className="dealer">
                <div className="status">
                    <div className="dealertag">DEALER</div>
                    <div className="dealerScore">
                        {Dscore.map((e,i)=>{
                            if(i === Dscore.length -1){
                                return e;
                            }else{
                                return(e + " / ");
                            }
                        })}</div>
                </div>
                {phase === 0 ?
                    <></>
                :
                    phase === 1 || phase === 11 ?
                        <div className="dealerCard">
                            <div className="card">
                                    <div className={Dhand[0][1]}>
                                        <img height="100px" margin="10px" src={require(`../../image/cards/${getCardImage(Dhand[0][0],Dhand[0][1])}.png`)} alt={getCardImage(Dhand[0][0],Dhand[0][1])}/>
                                    </div>
                            </div>
                            <div className="card">
                                <img height="100px" margin="10px" src={require(`../../image/cards/back.png`)} alt='back'/>
                            </div>
                        </div>
                        :
                    (<div className="dealerCard">
                        {Dhand.map((card,index) => {
                            return (
                                <div className="card" key={index}>
                                    <img height="100px" margin="10px" src={require(`../../image/cards/${getCardImage(card[0],card[1])}.png`)} alt={getCardImage(card[0],card[1])}/>
                                </div>
                            );
                        })}
                    </div>)
                }
            </div>

            <div className="player">
                <div className="status">
                    <div className="playertag">PLAYER</div>
                    <div className="playerScore">{Pscore.map((e,i)=>{
                            if(i === Pscore.length -1){
                                return e;
                            }else{
                                return(e + " / ");
                            }
                        })}
                    </div>
                </div>
                {phase === 0 || Phand.length === 0?
                    <></>
                :
                    <div className="playerCard">
                        {Phand.map((card,index) => {
                            return (
                                <div className="card" key={index}>
                                    <img height="100px" margin="10px" src={require(`../../image/cards/${getCardImage(card[0],card[1])}.png`)} alt={getCardImage(card[0],card[1])}/>
                                </div>
                            );
                        })}
                    </div>
                }
            </div>
        </div>
    );
}

export default Table;