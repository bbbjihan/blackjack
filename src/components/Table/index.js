import React from "react";
import { useRecoilValue } from "recoil";
import { DhandState, DscoreState, PhandState, phaseState, PscoreState } from "../../Atom";
import './Table.css';


const Table = () => {
    const icon = (value) => {
        if (value === "spade") return "♠";
        if (value === "diamond") return "♦";
        if (value === "heart") return "♥";
        if (value === "clover") return "♣";
    }
    const number = (value) => {
        return value;
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
                                        <div className="card-side">
                                            <div className="card-number" style={Dhand[0][0] === 10 ? {'fontSize' : '20px', 'marginLeft' : '-5px'} : {}}>{number(Dhand[0][0])}</div>
                                            <div className="card-icon">{icon(Dhand[0][1])}</div>
                                        </div>
                                        <div className="card-center">{icon(Dhand[0][1])}</div>
                                    </div>
                            </div>
                            <div className="cardBack"></div>
                        </div>
                        :
                    (<div className="dealerCard">
                        {Dhand.map((card,index) => {
                            return (
                                <div className="card" key={index}>
                                    <div className={card[1]}>
                                        <div className="card-side">
                                            <div className="card-number" style={card[0] === 10 ? {'fontSize' : '20px', 'marginLeft' : '-5px'} : {}}>{number(card[0])}</div>
                                            <div className="card-icon">{icon(card[1])}</div>
                                        </div>
                                        <div className="card-center">{icon(card[1])}</div>
                                    </div>
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
                                    <div className={card[1]}>
                                        <div className="card-side">
                                            <div className="card-number" style={card[0] === 10 ? {'fontSize' : '20px', 'marginLeft' : '-5px'} : {}}>{number(card[0])}</div>
                                            <div className="card-icon">{icon(card[1])}</div>
                                        </div>
                                        <div className="card-center">{icon(card[1])}</div>
                                    </div>
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