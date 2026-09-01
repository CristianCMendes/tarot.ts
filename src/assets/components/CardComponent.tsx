import type {ICard} from "../models/ICard.ts";
import {Card, CardContent, CardMedia, Divider, Typography} from "@mui/material";
import {useEffect, useState} from "react";

interface CardComponentProps {
    card: ICard
}

export function CardComponent(props: CardComponentProps) {
    const {card} = props;
    const [img, setImg] = useState<string>();

    useEffect(() => {
        const imagePath = (card.invertido && card.imagem_invertida) 
            ? card.imagem_invertida 
            : (card.imagem || `/img/${card.numero}.jpg`);
            
        fetch(imagePath)
            .then(x => x.blob())
            .then(x => URL.createObjectURL(x))
            .then(x => setImg(x))
            .catch(() => setImg(imagePath));

    }, [card.numero, card.imagem, card.imagem_invertida, card.invertido]);


    const invertidoSx = (card.invertido && !card.imagem_invertida) ? {
        transform: 'rotate(180deg)'
    } : {};

    return (<Card variant={'outlined'}>
        <CardContent>
            <Typography variant={'subtitle1'}>{card.nome}{card.invertido ? "(Invertida)" : ""}</Typography>
            <Divider sx={{m: 0.5}}/>
            <Typography variant={'body2'}>{card.invertido ? card.descricao_invertida : card.descricao}</Typography>
            <Divider sx={{m: 0.5}}/>
        </CardContent>
        <CardMedia component={"img"} image={img} style={{...invertidoSx}}/>
        <CardContent>
            <Typography variant={'caption'}>{card.interpretacao}</Typography>
        </CardContent>

    </Card>)
}