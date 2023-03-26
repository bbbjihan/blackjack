import React from "react";
import './Status.css';

const Status = ({money, setMoney, bet, setBet, phase, setPhase}) => {
    return(
        <div>
            <div class="statusBar">
                <div class="box">
                    <div class="name">보유금</div>
                    <div class="value">{money}</div>
                    <div class="unit">G</div>
                </div>
                <div class="box">
                    <div class="name">배팅금</div>
                    <div class="value">{bet}</div>
                    <div class="unit">G</div>
                </div>
            </div>
        </div>
    );
}

export default Status;