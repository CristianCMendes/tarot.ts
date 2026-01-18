import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	ButtonGroup,
	Grid,
	TextField,
	Typography
} from "@mui/material";
import {useEffect, useState} from "react";
import type {ICard} from "../models/ICard.ts";
import {CardComponent} from "../components/CardComponent.tsx";
import {GoogleGenAI} from "@google/genai";
import {AddCard, Assistant, AutoAwesome} from "@mui/icons-material";

type ITarotResponse = {
	data: {
		title: string,
		resume: string,
		detailed: string,
		cards: {
			detail: string,
			card: string
		}[],
		drawPrompt: string
	}
}


export function DrawCardPage() {
	const [cards, setCards] = useState<ICard[]>([]);
	const [myCards, setMyCards] = useState<ICard[]>([]);
	const [questao, setQuestao] = useState("");
	const [count, setCount] = useState(3);
	const [aiText, setAiText] = useState<ITarotResponse["data"] | null>(null);
	const [aiLoading, setAiLoading] = useState(false);
	const [aiImageLoading, setAiImageLoading] = useState(false);
	const [aiImage, setAiImage] = useState<string | null>(null);
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
				invertido: invertido
			};
			cardsDisponiveis.splice(randomIndex, 1);
			setMyCards(x => [...x, cardSelecionada]);
		}
	}

	const base64ToBlob = (base64: string) => {
		// Decode the base64 string to binary data
		const binary = atob(base64);
		const array = [];
		for (let i = 0; i < binary.length; i++) {
			array.push(binary.charCodeAt(i));
		}
		return new Blob([new Uint8Array(array)], {type: 'image/png'});
	};

	const requestAiDefinition = () => {
		setAiText(null)
		setAiImage(null)
		setAiLoading(true)
		const requestContent = {
			question: questao,
			cards: myCards.map(x => ({
				name: x.nome,
				inverted: x.invertido
			})),
			outputFormat: {
				data: {
					title: 'string(not null) -> um titulo para a resposta',
					resume: "string(not null) -> um resumo curto das cartas e o que elas representam de acordo com a pergunta do usuario",
					detailed: "string(not null) -> uma definição completa das cartas e o que elas representam de acordo com a pergunta do usuario",
					cards: [
						{
							card: "string(not null) -> nome da carta, caso esteja invertido adicione '(invertido)'",
							detail: "string(not null) -> o que a carta representa de acordo com a pergunta do usuario"
						}
					],
					drawPrompt: 'string(not null) -> uma descrição detalhada para gerar uma imagem da combinação de cartas(EM INGLES), não cite o nome das cartas, crie um nome para essa carta composta, instrua o modelo a usar o nome que você deu para a carta'
				}
			}
		}

		ai.models.generateContent({
			model: import.meta.env.VITE_GEMINI_MODEL_TEXT ?? "gemini-2.5-flash-lite",
			contents: [{
				parts: [{
					text: `O usuario está tentando descobrir o significado de um conjunto de cartas de tarot você deve ler o json a seguir para modelar a resposta`
				},
					{text: JSON.stringify(requestContent, null, 0)},
					{text: `A resposta deve ser em json com apenas uma linha, não faça o beautify do json`},
				]
			}],
			config: {
				temperature: 0.35,
			}
		}).then(x => {
			const txt = x.text?.replace('\n', '').replace('```json', '').replace('```', '')
			const parsed = JSON.parse(txt ?? "") as ITarotResponse
			setAiText(parsed.data ?? null)
		}).finally(() => {
			setAiLoading(false)

		})
	}
	const requestAiImage = () => {
		if (aiText == null) return;
		setAiImageLoading(true)
		ai.models.generateImages({
			model: import.meta.env.VITE_GEMINI_MODEL_IMAGE ?? "imagen-4.0-generate-001",
			prompt: `Generate a single card. The image must resemble this: '${aiText.drawPrompt}'. The artstyle should be similar to classic tarot cards but without any words and no roman numeral, with intricate details and vibrant colors. The card should have a mystical and enchanting atmosphere, with symbolic elements that evoke a sense of wonder and spirituality. The composition should be balanced and harmonious, drawing the viewer's eye to the central figure or symbol on the card. Use a rich color palette with deep blues, purples, and golds to create a sense of depth and richness. The overall style should be reminiscent of traditional tarot card illustrations, with a modern twist that makes it visually striking and unique.`,
			config: {
				numberOfImages: 1,
				imageSize: "1k",
				outputCompressionQuality: 40,
				aspectRatio: "3:4",
			}
		}).then(x => {
			if (x.generatedImages != null && x.generatedImages.length > 0) {
				const i = x.generatedImages[0].image
				if (i == null || i.imageBytes == null) return;
				const blob = base64ToBlob(i.imageBytes);
				const url = URL.createObjectURL(blob);
				setAiImage(url);
			}
		}).finally(() => setAiImageLoading(false))
	}


	useEffect(() => {
		import('../cards/arcanosMaiores.json').then(x => setCards(x.default))
	}, []);


	return (
		<Grid size={12}>
			<Grid container>
				<Grid size={12}>
					<Grid container rowSpacing={1.5}>
						<Grid container size={12} spacing={1}>
							<Grid size={{xs: 12, md: 8}}>
								<TextField fullWidth value={questao} onChange={e => setQuestao(e.target.value)}
								           label={"Questao/Pergunta"}/>
							</Grid>
							<Grid container size={{xs: 12, md: 4}} spacing={0} component={ButtonGroup}>
								<Grid size={{xs: 4, md: 3}}>
									<TextField value={count}
									           type={'number'}
									           slotProps={{
										           input: {
											           sx: {
												           borderTopRightRadius: 0,
												           borderBottomRightRadius: 0
											           }
										           }
									           }}
									           fullWidth
									           onChange={e => setCount(Math.max(Math.min(parseInt(e.target.value), 7), 1))}
									           label={"Cartas"}/>
								</Grid>
								<Grid size={{xs: 8, md: 9}}>
									<Button size={'small'} variant={'outlined'}
									        fullWidth
									        sx={{height: '100%'}}
									        endIcon={<AddCard/>}
									        onClick={handleGiro}>
										Girar Carta(s)
									</Button>
								</Grid>
							</Grid>
						</Grid>
						<Grid size={12} container>
							<Grid component={ButtonGroup} size={12}>
								<Button disabled={myCards.length == 0} endIcon={<Assistant/>}
								        fullWidth variant={'outlined'}
								        onClick={requestAiDefinition}
								        loading={aiLoading}>Solicitar definição de IA (Gemini)
								</Button>
								<Button disabled={aiText == null}
								        loading={aiImageLoading}
								        endIcon={<AutoAwesome/>}
								        onClick={requestAiImage}>Imagem por IA</Button>
							</Grid>
						</Grid>
					</Grid>

				</Grid>
				{aiText != null && <Grid size={12} container my={1}>
					<Grid size={12}>
						<Typography>Definição por IA:</Typography>
						<Typography variant={"h6"} mt={1}>{aiText.title}</Typography>
						{aiImage != null && <Grid size={12} justifyContent={'center'} container>
							{aiText.drawPrompt}
							<img width={`35%`} src={aiImage} alt={"AI Generated Tarot Card"}/>
						</Grid>}
						<Accordion>
							<AccordionSummary>Resposta detalhada</AccordionSummary>
							<AccordionDetails>{aiText.detailed}</AccordionDetails>
						</Accordion>
						<Accordion>
							<AccordionSummary>Resumo</AccordionSummary>
							<AccordionDetails>{aiText.resume}</AccordionDetails>
						</Accordion>
						{aiText.cards.map((cardAi) => (
							<Accordion>
								<AccordionSummary>{cardAi.card}</AccordionSummary>
								<AccordionDetails>{cardAi.detail}</AccordionDetails>
							</Accordion>
						))}
					</Grid>
				</Grid>}

				<Grid size={12}>
					<Grid container justifyContent={'center'} spacing={2} mt={1}>
						{myCards.map((myCard) => (
							<Grid size={{sm: 4, lg: 3}} key={myCard.nome}>
								<CardComponent card={myCard}/>
							</Grid>
						))}
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	)
}