import React from "react";
import './Table.css';


const Table = ({money, setMoney, bet, setBet, phase, setPhase}) => {
    return(
        <div>
            <div class="dealer">
                <div class="dealertag">DEALER</div>
                <div class="dealerCard">
                    <div class="card">
                        <div class="spades">
                            <div class="card-number">10</div>
                            <div class="card-icon">&#9824;</div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="heart">
                            <div class="card-number">10</div>
                            <div class="card-icon">♥</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="player">
                <div class="playertag">PLAYER</div>
                <div class="playerCard">
                    <div class="card">
                        <div class="spades">
                            <div class="card-number">10</div>
                            <div class="card-icon">&#9824;</div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="heart">
                            <div class="card-number">10</div>
                            <div class="card-icon">♥</div>
                        </div>
                    </div>
                    <div class="card">
                        <div class="heart">
                            <div class="card-number">3</div>
                            <div class="card-icon">♥</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;