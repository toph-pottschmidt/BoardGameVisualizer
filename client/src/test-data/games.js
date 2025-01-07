import { Games, Game } from '../transformers/GameConstructor';
const basicData = [
    ["2/22/2022 13:31:10","Castles","Chris","91","Natalie","85"],
    ["2/22/2022 13:35:18","Castles","Chris","91","Natalie","90"],
];

export const basicGames = Games(basicData);