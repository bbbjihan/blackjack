import { atom } from "recoil";

export const phaseState = atom({
    key: 'phaseState',
    default: 0,
    //0: betting, 1: action, 2: shuffling, 3: draw, 4: result,
});

export const moneyState = atom({
    key: 'money',
    default: 100,
});
  
export const betState = atom({
    key: 'bet',
    default: 0,
});
  
export const DeckState = atom({
    key: 'Deck',
    default: [],
})
  
export const DhandState = atom({
    key: 'Dhand',
    default: [],
})
  
export const PhandState = atom({
    key: 'Phand',
    default: [],
})
  
export const DscoreState = atom({
    key: 'Dscore',
    default: 0,
})
  
export const PscoreState = atom({
    key: 'Pscore',
    default: 0,
})
  
export const informState = atom({
    key: 'inform',
    default: '',
})