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
            <div class="dealer">
                <div class="status">
                    <div class="dealertag">DEALER</div>
                    <div class="dealerScore">{phase === 0 ? 0 : Dscore}</div>
                </div>
                {phase === 0 ?
                    <></>
                :
                    phase === 1 || phase === 11 ?
                        <div class="dealerCard">
                            <div class="card">
                                    <div class={Dhand[0][1]}>
                                        <div class="card-side">
                                            <div class="card-number" style={Dhand[0][0] === 10 ? {'fontSize' : '20px', 'margin-left' : '-5px'} : {}}>{number(Dhand[0][0])}</div>
                                            <div class="card-icon">{icon(Dhand[0][1])}</div>
                                        </div>
                                        <div class="card-center">{icon(Dhand[0][1])}</div>
                                    </div>
                            </div>
                            <div class="cardBack"></div>
                        </div>
                        :
                    (<div class="dealerCard">
                        {Dhand.map((card,index) => {
                            return (
                                <div class="card" key={index}>
                                    <div class={card[1]}>
                                        <div class="card-side">
                                            <div class="card-number" style={card[0] === 10 ? {'fontSize' : '20px', 'margin-left' : '-5px'} : {}}>{number(card[0])}</div>
                                            <div class="card-icon">{icon(card[1])}</div>
                                        </div>
                                        <div class="card-center">{icon(card[1])}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>)
                }
            </div>

            <div class="player">
                <div class="status">
                    <div class="playertag">PLAYER</div>
                    <div class="playerScore">{phase === 0 ? 0 :Pscore}</div>
                </div>
                {phase === 0 || Phand.length === 0?
                    <></>
                :
                    <div class="playerCard">
                        {Phand.map((card,index) => {
                            return (
                                <div class="card" key={index}>
                                    <div class={card[1]}>
                                        <div class="card-side">
                                            <div class="card-number" style={card[0] === 10 ? {'fontSize' : '20px', 'margin-left' : '-5px'} : {}}>{number(card[0])}</div>
                                            <div class="card-icon">{icon(card[1])}</div>
                                        </div>
                                        <div class="card-center">{icon(card[1])}</div>
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