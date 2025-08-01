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
        fetch(`/img/${card.numero}.jpg`)
            .then(x => x.blob())
            .then(x => URL.createObjectURL(x))
            .then(x => setImg(x));

    }, [card.numero]);


    const invertidoSx = card.invertido ? {
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