import React from "react";
import './Inform.css';

const Inform = ({money, setMoney, bet, setBet, phase, setPhase, inform, setInform}) => {
    return(
        <div>
            <div class="informBar">
                {phase === 0 ? 
                    <div class="content">
                        배팅액을 선택하세요.
                    </div>
                    :
                    <div class="content">
                        {inform}
                    </div>
                }
            </div>
        </div>
    );
}

export default Inform;