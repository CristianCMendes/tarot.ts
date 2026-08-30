import type { ICard } from "../models/ICard";
import arcanosMaiores from "./arcanosMaiores.json";
import pokemonCards from "./pokemon.json";

export interface IDeck {
    id: string;
    nome: string;
    descricao: string;
    cards: ICard[];
}

export const DECKS: IDeck[] = [
    {
        id: "arcanos-maiores",
        nome: "Arcanos Maiores",
        descricao: "Baralho clássico de Tarot com os 22 Arcanos Maiores",
        cards: arcanosMaiores as ICard[],
    },
    {
        id: "pokemon",
        nome: "Pokémon",
        descricao: "Baralho especial inspirado no universo Pokémon (Gengar, Mimikyu, Pikachu)",
        cards: pokemonCards as ICard[],
    },
];

export const getDeckById = (id: string): IDeck => {
    return DECKS.find((deck) => deck.id === id) || DECKS[0];
};
