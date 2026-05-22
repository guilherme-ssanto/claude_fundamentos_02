# Claude Code Quiz

Quiz interativo **Verdadeiro ou Falso** sobre o Claude Code, desenvolvido para educar profissionais de negócio e gestores sobre as capacidades da ferramenta de forma gamificada.

## Sobre o projeto

15 perguntas em 3 níveis de dificuldade (Iniciante → Intermediário → Avançado), com temporizador por pergunta, feedback imediato, placar final e leaderboard global em tempo real.

**Stack:** React 18 + Vite · Tailwind CSS v3 · React Router v6 · Supabase (Auth + PostgreSQL + Realtime)

## Funcionalidades

- Autenticação por e-mail/senha via Supabase Auth
- 15 perguntas sequenciais com timer de 20 segundos por questão
- Feedback imediato com explicação a cada resposta
- Score automático salvo no Supabase ao finalizar (apenas o maior score por usuário)
- Leaderboard global com atualização em tempo real via Supabase Realtime
- Tema dark com paleta de cores Anthropic/Claude
- Layout responsivo (375px a 1440px)

## Pré-requisitos

- Node.js 18+
- Conta no [Supabase](https://supabase.com) com projeto criado

## Configuração

1. Clone o repositório e instale as dependências:

```bash
npm install
```

2. Copie o arquivo de variáveis de ambiente:

```bash
cp .env.example .env.local
```

3. Preencha as variáveis no `.env.local`:

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. Execute o SQL de setup no editor SQL do Supabase (`supabase-setup.sql`).

## Comandos

```bash
npm run dev      # inicia o servidor de desenvolvimento (Vite)
npm run build    # build de produção
npm run preview  # preview do build de produção localmente
```

## Estrutura do projeto

```
src/
├── components/
│   ├── layout/      # Header, AuthButton
│   ├── quiz/        # QuestionCard, Timer, ProgressBar, FeedbackOverlay, LevelBadge
│   ├── leaderboard/ # LeaderboardTable, LeaderboardRow
│   └── ui/          # Button, Card, Badge
├── data/
│   └── questions.js # banco de 15 perguntas
├── hooks/
│   ├── useAuth.js
│   ├── useQuiz.js
│   └── useTimer.js
├── lib/
│   └── supabase.js  # cliente Supabase
└── pages/
    ├── Home.jsx       # boas-vindas + login
    ├── Quiz.jsx       # fluxo do quiz
    ├── Result.jsx     # placar final
    └── Leaderboard.jsx
```

## Fluxo da aplicação

```
/ (Home + Login)  →  /quiz (15 perguntas)  →  /result (placar)  →  /leaderboard
```

## Regras de pontuação

| Situação | Pontos |
|---|---|
| Resposta correta dentro do tempo | +1 |
| Resposta errada ou tempo esgotado | 0 |

Múltiplas tentativas são permitidas — apenas o **maior score** aparece no leaderboard.

## Deploy

O frontend é otimizado para deploy na [Vercel](https://vercel.com). Adicione as variáveis de ambiente `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` no painel do projeto.

---

Desenvolvido por [TM1](https://tm1.com.br)
