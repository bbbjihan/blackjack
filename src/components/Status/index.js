import React from "react";
import { useRecoilValue } from "recoil";
import { betState, moneyState } from "../../Atom";
import './Status.css';

const Status = () => {
    const money = useRecoilValue(moneyState);
    const bet = useRecoilValue(betState);
    return(
        <div>
            <div className="statusBar">
                <div className="box">
                    <div className="name">BALANCE</div>
                    <div className="value">{money}</div>
                    <div className="unit">G</div>
                </div>
                <div className="box">
                    <div className="name">BETTING</div>
                    <div className="value">{bet}</div>
                    <div className="unit">G</div>
                </div>
            </div>
        </div>
    );
}

export default Status;