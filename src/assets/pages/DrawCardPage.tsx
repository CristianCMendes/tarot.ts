import {Button, Grid, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import type {ICard} from "../models/ICard.ts";
import {CardComponent} from "../components/CardComponent.tsx";
import {GoogleGenAI} from "@google/genai";
import {AddCard, Assistant} from "@mui/icons-material";

export function DrawCardPage() {
    const [cards, setCards] = useState<ICard[]>([]);
    const [myCards, setMyCards] = useState<ICard[]>([]);
    const [questao, setQuestao] = useState("");
    const [count, setCount] = useState(3);
    const [aiText, setAiText] = useState("");
    const [aiLoading, setAiLoading] = useState(false);
    const ai = new GoogleGenAI({apiKey: import.meta.env.VITE_GEMINI_API_KEY});

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

    const requestAiDefinition = () => {
        setAiText('')
        setAiLoading(true)
        ai.models.generateContent({
            model: "gemini-1.5-flash",
            contents: [{
                "parts": [{
                    "text": `O usuario está tentando descobrir o significado de um conjunto de cartas, Questao: ${questao} você deve ser o mais claro possivel`
                }, {
                    text: " * " + myCards.map(x => x.nome).join(" * ")
                },
                    {text: "Adicione um <br/> sempre que for quebrar linha, quebre linha sempre que for falar de uma carta,"}],
            }],
            config: {
                temperature: 0.25
            }
        }).then(x => {
            setAiText(x.text ?? "")
        }).finally(() => {
            setAiLoading(false)
        })
    }

    useEffect(() => {
        import('../cards/arcanosMaiores.json').then(x => setCards(x.default))
    }, []);

    return (
        <Grid size={12}>
            <Grid container>
                <Grid size={12}>
                    <Grid container rowSpacing={1.5}>
                        <Grid size={{sm: 8, xs: 12}}>
                            <TextField fullWidth value={questao} onChange={e => setQuestao(e.target.value)}
                                       label={"Questao/Pergunta"}/>
                        </Grid>
                        <Grid size={{sm: 2, xs: 4}}>
                            <TextField value={count} type={'number'} fullWidth
                                       onChange={e => setCount(Math.max(Math.min(parseInt(e.target.value), 7), 1))}
                                       label={"Cartas"}/>
                        </Grid>
                        <Grid size={{sm: 2, xs: 8}}>
                            <Button size={'small'} variant={'outlined'} fullWidth sx={{height: '100%'}}
                                    endIcon={<AddCard/>}
                                    onClick={handleGiro}>
                                Girar Carta(s)
                            </Button>
                        </Grid>
                        <Grid size={12}>
                            <Button disabled={myCards.length == 0} endIcon={<Assistant/>}
                                    fullWidth variant={'outlined'}
                                    onClick={requestAiDefinition}
                                    loading={aiLoading}>Solicitar
                                definição de IA (Gemini)</Button>
                        </Grid>
                    </Grid>
                </Grid>
                {aiText != '' && <Grid size={12}>
                    <Grid container>
                        <Grid>
                            <Typography>Definição por IA:</Typography>
                            {aiText.split("<br/>").map((chunk) => {
                                return <Typography>{chunk}</Typography>
                            })}
                        </Grid>
                    </Grid>
                </Grid>}
                <Grid size={12}>
                    <Grid container justifyContent={'center'} spacing={2} mt={1}>
                        {myCards.map((myCard) => (
                            <Grid size={{sm: 4, lg: 3}}>
                                <CardComponent card={myCard}/>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}