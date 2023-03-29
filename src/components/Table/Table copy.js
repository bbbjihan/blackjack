import React from "react";
import './Table.css';


const Table = ({money, setMoney, bet, setBet, phase, setPhase}) => {
    return(
        <div>
            <div className="dealer">
                <div className="dealertag">DEALER</div>
                <div className="dealerCard">
                    <div className="card">
                        <div className="spades">
                            <div className="card-number">10</div>
                            <div className="card-icon">&#9824;</div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="heart">
                            <div className="card-number">10</div>
                            <div className="card-icon">♥</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="player">
                <div className="playertag">PLAYER</div>
                <div className="playerCard">
                    <div className="card">
                        <div className="spades">
                            <div className="card-number">10</div>
                            <div className="card-icon">&#9824;</div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="heart">
                            <div className="card-number">10</div>
                            <div className="card-icon">♥</div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="heart">
                            <div className="card-number">3</div>
                            <div className="card-icon">♥</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;