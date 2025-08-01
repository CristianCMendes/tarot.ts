import {Button, Grid, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import type {ICard} from "../models/ICard.ts";
import {CardComponent} from "../components/CardComponent.tsx";

export function DrawCardPage() {
    const [cards, setCards] = useState<ICard[]>([]);
    const [myCards, setMyCards] = useState<ICard[]>([]);
    const [count, setCount] = useState(1);

    const handleRolada = () => {
        setMyCards([]);
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * cards.length);
            const card = cards[randomIndex];
            const invertido = Math.random() < 0.5;
            const cardSelecionada: ICard = {
                ...card,
                invertido
            };
            setMyCards(x => [...x, cardSelecionada]);
        }
    }

    useEffect(() => {
        import('../cards/arcanosMaiores.json').then(x => setCards(x.default))
    }, []);

    return (<Grid container>
        <Grid size={12}>
            <Grid container>
                <Grid>
                    <TextField value={count} type={'number'}
                               onChange={e => setCount(Math.min(parseInt(e.target.value), 7))}
                               label={"Quantidade"}/>
                </Grid>
                <Grid>
                    <Button sx={{height: '100%'}} onClick={handleRolada}>
                        Girar Carta(s)
                    </Button>
                </Grid>
            </Grid>
        </Grid>
        <Grid container>
            {myCards.map((myCard) => (
                <CardComponent card={myCard}/>
            ))}
        </Grid>
        {/*<Grid container>*/}
        {/*    {cards.map(x => <CardComponent card={x}/>)}*/}
        {/*</Grid>*/}
    </Grid>)
}