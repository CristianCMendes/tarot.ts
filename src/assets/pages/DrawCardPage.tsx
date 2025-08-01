import {Button, Grid, TextField} from "@mui/material";
import {useEffect, useState} from "react";
import type {ICard} from "../models/ICard.ts";
import {CardComponent} from "../components/CardComponent.tsx";

export function DrawCardPage() {
    const [cards, setCards] = useState<ICard[]>([]);
    const [myCards, setMyCards] = useState<ICard[]>([]);
    const [questao, setQuestao] = useState("");
    const [count, setCount] = useState(1);

    const handleGiro = () => {
        setMyCards([]);
        const cardsDisponiveis = [...cards];
        for (let i = 0; i < count; i++) {
            const randomIndex = Math.floor(Math.random() * cardsDisponiveis.length);
            const card = cardsDisponiveis[randomIndex];
            const invertido = Math.random() < 0.5;
            const cardSelecionada: ICard = {
                ...card,
                invertido
            };
            cardsDisponiveis.splice(randomIndex, 1);
            setMyCards(x => [...x, cardSelecionada]);
        }
    }

    useEffect(() => {
        import('../cards/arcanosMaiores.json').then(x => setCards(x.default))
    }, []);

    return (<Grid container>
            <Grid size={12}>
                <Grid container>
                    <Grid size={'grow'}>
                        <TextField fullWidth value={questao} onChange={e => setQuestao(e.target.value)}
                                   label={"Questao/Pergunta"}/>
                    </Grid>
                    <Grid size={{sm: 2, xs: 3}}>
                        <TextField value={count} type={'number'}
                                   onChange={e => setCount(Math.min(parseInt(e.target.value), 7))}
                                   label={"Quantidade"}/>
                    </Grid>
                    <Grid size={{sm: 2, xs: 4}}>
                        <Button size={'small'} variant={'outlined'} fullWidth sx={{height: '100%'}}
                                onClick={handleGiro}>
                            Girar Carta(s)
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container justifyContent={'center'} spacing={2} mt={1}>
                {myCards.map((myCard) => (
                    <Grid size={{sm: 4, lg: 3}}>
                        <CardComponent card={myCard}/>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    )
}