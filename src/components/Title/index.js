import './Title.css'

const Title = () => {
    return(
        <div>
            <div className="BG">
                <img src={require('../../image/cards/blackjack.png')} alt='back' class="BGimage"/>
            </div>
            <div className="Title">
                BLACK JACK
            </div>
        </div>
    )
}

export default Title;