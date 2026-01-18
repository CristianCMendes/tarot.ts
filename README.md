# Aplicação de Tarot

Uma aplicação de leitura de Tarot baseada em React que permite aos usuários tirarem e interpretarem cartas de Tarot com
descrições e significados detalhados.

## Tecnologias Utilizadas

- React 19.1.1
- TypeScript 5.9.3 (apenas para o build)
- TypeScript/native-preview
- Material-UI (MUI) 7.2.0
- React Router DOM 7.7.1 (não utilizado oficialmente, porém instalado para fins futuros...)
- Vite 7.0.6

## Funcionalidades

- Interface com tema escuro
- Tiragem interativa de cartas
- Interpretação de cartas com significados normais e invertidos
- Design responsivo

## Instalação

1. Clone o repositório
2. Instale as dependências:
3. Inclua a variavel de ambiente VITE_GEMINI_API_KEY (ex.: crie um arquivo ".env.local" na raiz do projeto e inclua
   VITE_GEMINI_API_KEY=SUA_CHAVE)
4. Inicie o projeto: npm run dev
5. Divirta-se

Nota: caso deseje definir um modelo para usar com o gemini defina usando as variaveis: VITE_GEMINI_MODEL_TEXT e
VITE_GEMINI_MODEL_IMAGE