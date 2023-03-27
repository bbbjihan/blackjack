import React from "react";
import { useRecoilValue } from "recoil";
import { informState, phaseState } from "../../Atom";
import './Inform.css';

const Inform = () => {
    const phase = useRecoilValue(phaseState);
    const inform = useRecoilValue(informState);
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