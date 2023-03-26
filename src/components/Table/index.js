import React from "react";
import './Table.css';


const Table = ({money, setMoney, bet, setBet, phase, setPhase, deckD, deckP, scoreD, scoreP}) => {
    const icon = (value) => {
        if (value === "spade") return "♠";
        if (value === "diamond") return "◆";
        if (value === "heart") return "♥";
        if (value === "clover") return "♣";
    }
    const number = (value) => {
        if (value === 11) return "J";
        if (value === 12) return "Q";
        if (value === 13) return "K";
        if (value === 1) return "A";
        return value;
    }
    return(
        <div>
            <div class="dealer">
                <div class="status">
                    <div class="dealertag">DEALER</div>
                    <div class="dealerScore">{phase !== 1 ? 0 : scoreD}</div>
                </div>
                {phase !== 1 || deckD.length === 0?
                    <></>
                :
                    <div class="dealerCard">
                        {deckD.map((card,index) => {
                            return (
                                <div class="card">
                                    <div class={card[1]}>
                                        <div class="card-number">{number(card[0])}</div>
                                        <div class="card-icon">
                                            {icon(card[1])}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                }
            </div>

            <div class="player">
                <div class="status">
                    <div class="playertag">PLAYER</div>
                    <div class="playerScore">{phase !== 1 ? 0 :scoreP}</div>
                </div>
                {phase !== 1 || deckP.length === 0?
                    <></>
                :
                    <div class="playerCard">
                        {deckP.map((card,index) => {
                            return (
                                <div class="card">
                                    <div class={card[1]}>
                                        <div class="card-number">{number(card[0])}</div>
                                        <div class="card-icon">
                                            {icon(card[1])}
                                        </div>
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