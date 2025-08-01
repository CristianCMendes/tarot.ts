import type {ICard} from "../models/ICard.ts";
import {Card, CardContent, CardMedia, Typography} from "@mui/material";
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
        <CardMedia component={"img"} image={img} style={{...invertidoSx}}>
        </CardMedia>
        <CardContent>
            <Typography>{card.nome}{card.invertido ? "(Invertida)" : ""}</Typography>

        </CardContent>
    </Card>)
}