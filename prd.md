# PRD — Claude Code Quiz

## 1. Visão Geral

Aplicação web de quiz no formato **Verdadeiro ou Falso** sobre o Claude Code. O objetivo é educar profissionais de negócio e gestores sobre as capacidades, benefícios e funcionamento do Claude Code, de forma progressiva e gamificada.

O quiz possui 15 perguntas distribuídas em 3 níveis de dificuldade (5 por nível), com feedback imediato, temporizador por pergunta, placar final e leaderboard global persistido em banco de dados.

---

## 2. Objetivos de Negócio

- Aumentar o conhecimento sobre Claude Code em equipes de negócio e gestão.
- Criar uma experiência engajante que incentive o aprendizado progressivo.
- Gerar um leaderboard competitivo que motive múltiplas tentativas.
- Servir como material de apoio para treinamentos e workshops sobre IA.

---

## 3. Público-Alvo

**Perfil primário:** Profissionais de negócio, gestores e executivos sem background técnico profundo.

**Características:**
- Interessados em entender o que o Claude Code faz e como ele agrega valor.
- Familiarizados com ferramentas SaaS mas sem experiência com CLIs ou APIs.
- Motivados por competição amigável (leaderboard) e reconhecimento.

---

## 4. User Stories

| ID | Como... | Quero... | Para... |
|----|---------|----------|---------|
| US-01 | Visitante | Fazer login com Google ou GitHub | Salvar meu progresso e aparecer no leaderboard |
| US-02 | Usuário logado | Iniciar o quiz | Testar meu conhecimento sobre Claude Code |
| US-03 | Usuário no quiz | Ver um timer por pergunta | Saber quanto tempo tenho para responder |
| US-04 | Usuário no quiz | Receber feedback imediato após responder | Aprender com os erros na hora |
| US-05 | Usuário no quiz | Ver minha pontuação ao final | Saber quantas acertei e em qual nível fui melhor |
| US-06 | Usuário finalizado | Ver o leaderboard global | Me comparar com outros participantes |
| US-07 | Usuário no leaderboard | Ver minha posição destacada | Entender onde estou no ranking |
| US-08 | Usuário | Fazer o quiz novamente | Tentar melhorar meu score |

---

## 5. Requisitos Funcionais

### 5.1 Autenticação
- Login via email e senha (gerenciado pelo Supabase Auth).
- Sessão persistida — o usuário não precisa logar novamente ao retornar.
- Logout disponível a qualquer momento.

### 5.2 Fluxo do Quiz
- Tela de boas-vindas com nome do usuário logado e botão "Iniciar Quiz".
- 15 perguntas em sequência obrigatória: 5 iniciante → 5 intermediário → 5 avançado.
- Cada pergunta exibe:
  - Indicador de nível (Iniciante / Intermediário / Avançado).
  - Número da pergunta atual (ex: "Pergunta 3 de 15").
  - Barra de progresso visual.
  - Temporizador regressivo de **20 segundos**.
  - Texto da afirmação.
  - Dois botões: **VERDADEIRO** e **FALSO**.
- Se o tempo esgotar sem resposta: a pergunta é computada como errada.
- Após responder, exibir feedback imediato:
  - Cor verde (acerto) ou vermelho (erro).
  - Resposta correta destacada.
  - Explicação curta (1-2 linhas) sobre o porquê.
  - Botão "Próxima Pergunta".

### 5.3 Placar Final
- Exibir ao final das 15 perguntas:
  - Score total (ex: "11 de 15 corretas").
  - Breakdown por nível (iniciante X/5, intermediário X/5, avançado X/5).
  - Mensagem personalizada conforme faixa de score:
    - 0-5: "Continue estudando — o Claude Code tem muito a oferecer!"
    - 6-10: "Bom começo! Você já conhece o essencial."
    - 11-13: "Muito bem! Você domina o Claude Code."
    - 14-15: "Perfeito! Você é um expert em Claude Code!"
  - Botões: "Ver Leaderboard" e "Tentar Novamente".
- O score é salvo automaticamente no Supabase ao finalizar.

### 5.4 Leaderboard
- Tabela com os **20 melhores scores**.
- Colunas: Posição | Avatar/Foto (OAuth) | Nome | Score | Data.
- A linha do usuário logado é destacada (mesmo que fora do top 20).
- Atualização em tempo real via Supabase Realtime.
- Botão "Voltar ao Início".

### 5.5 Regras de Score
- Resposta correta dentro do tempo: **+1 ponto**.
- Resposta errada ou tempo esgotado: **0 pontos**.
- Sem pontuação negativa.
- Múltiplas tentativas são permitidas; apenas o **maior score** é salvo no leaderboard.

---

## 6. Requisitos Não-Funcionais

| Requisito | Especificação |
|-----------|---------------|
| Performance | Primeira renderização < 2s em conexão 4G |
| Responsividade | Funcional em mobile (375px) e desktop (1440px) |
| Acessibilidade | Contraste WCAG AA, navegação por teclado |
| Disponibilidade | Dependente do plano gratuito do Supabase |
| Segurança | Apenas usuários autenticados podem salvar scores |
| SEO | Meta tags básicas (título, descrição, og:image) |

---

## 7. Banco de Perguntas

### Nível 1 — Iniciante (foco em negócio e capacidades gerais)

| # | Afirmação | Resposta | Explicação |
|---|-----------|----------|------------|
| 1 | O Claude Code é uma ferramenta que roda exclusivamente na nuvem, sem nenhuma instalação local necessária. | **FALSO** | O Claude Code é uma CLI (interface de linha de comando) que é instalada e roda localmente no terminal do usuário, conectando-se à API da Anthropic. |
| 2 | O Claude Code consegue ler, editar e criar arquivos diretamente no repositório de código do usuário. | **VERDADEIRO** | Uma das capacidades centrais do Claude Code é manipular o sistema de arquivos local com permissão do usuário. |
| 3 | O Claude Code só pode ser usado por programadores experientes com conhecimento avançado de terminal. | **FALSO** | O Claude Code foi projetado para ser acessível a qualquer perfil — gestores e não-técnicos podem usá-lo para tarefas diversas além de código. |
| 4 | O Claude Code consegue executar comandos no terminal, rodar testes automatizados e interpretar os resultados. | **VERDADEIRO** | O Claude Code pode executar comandos shell, scripts e interpretar saídas para agir de forma autônoma. |
| 5 | O Claude Code é completamente gratuito e sem limites de uso para qualquer conta Anthropic. | **FALSO** | O Claude Code requer um plano pago (Claude Pro, Team, Max ou API). O uso consome tokens da API da Anthropic. |

### Nível 2 — Intermediário (workflows, integrações, configuração)

| # | Afirmação | Resposta | Explicação |
|---|-----------|----------|------------|
| 6 | O arquivo CLAUDE.md é usado pelo Claude Code para entender o contexto, regras e convenções de um projeto específico. | **VERDADEIRO** | O CLAUDE.md funciona como uma memória persistente do projeto — instruções, padrões de código e contexto que o Claude usa em toda sessão. |
| 7 | O Claude Code não tem acesso à internet e não consegue buscar informações externas durante uma sessão. | **FALSO** | Com ferramentas como MCP (Model Context Protocol) ou Web Search, o Claude Code pode acessar informações externas durante a sessão. |
| 8 | É possível conectar o Claude Code a ferramentas externas como GitHub, Slack e bancos de dados usando o protocolo MCP. | **VERDADEIRO** | O MCP (Model Context Protocol) permite estender as capacidades do Claude Code com ferramentas e serviços externos. |
| 9 | O Claude Code sempre tem permissão automática para deletar arquivos e fazer push no Git sem pedir confirmação ao usuário. | **FALSO** | Por padrão, ações destrutivas (deletar arquivos, force push) requerem confirmação explícita do usuário antes de serem executadas. |
| 10 | O Claude Code pode operar em modo autônomo (headless), executando tarefas complexas de forma independente com supervisão mínima. | **VERDADEIRO** | O modo autônomo permite que o Claude Code execute pipelines completos de tarefas sem intervenção constante do usuário. |

### Nível 3 — Avançado (hooks, agentes, configuração avançada)

| # | Afirmação | Resposta | Explicação |
|---|-----------|----------|------------|
| 11 | Hooks no Claude Code permitem executar scripts automáticos antes ou depois de ações específicas do agente, como editar um arquivo ou fazer um commit. | **VERDADEIRO** | Hooks são scripts configurados no settings.json que disparam em eventos do ciclo de vida do agente (PreToolUse, PostToolUse, etc.). |
| 12 | O modo "Extended Thinking" do Claude melhora a qualidade do raciocínio sem consumir tokens adicionais. | **FALSO** | Extended Thinking consome tokens significativamente maiores pois o modelo gera um processo interno de raciocínio antes da resposta final. |
| 13 | O Claude Code suporta orquestração multi-agente, onde um agente principal cria e coordena subagentes para trabalhar em paralelo. | **VERDADEIRO** | O padrão de agentes aninhados (subagents) permite dividir tarefas complexas em agentes especializados que trabalham em paralelo. |
| 14 | O arquivo settings.json do Claude Code não permite configurar quais ferramentas o agente tem permissão de usar. | **FALSO** | O settings.json possui as chaves `allowedTools` e `blockedTools` que controlam exatamente quais ferramentas o agente pode ou não usar. |
| 15 | O Claude Code pode criar commits no Git, abrir pull requests, comentar em issues e interagir com o GitHub de forma autônoma. | **VERDADEIRO** | Com a ferramenta `gh` disponível no terminal ou via MCP do GitHub, o Claude Code realiza operações completas no GitHub. |

---

## 8. Arquitetura Técnica

### 8.1 Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | React 18 + Vite |
| Estilização | Tailwind CSS v3 |
| Roteamento | React Router v6 |
| Autenticação | Supabase Auth (OAuth Google + GitHub) |
| Banco de dados | Supabase (PostgreSQL) |
| Realtime | Supabase Realtime |
| Deploy | Vercel (frontend) |
| Gerenciador de pacotes | npm |

### 8.2 Estrutura de Pastas

```
claude-code-quiz/
├── public/
│   └── og-image.png
├── src/
│   ├── assets/              # Ícones, imagens, logos
│   ├── components/
│   │   ├── ui/              # Componentes genéricos (Button, Card, Badge)
│   │   ├── quiz/
│   │   │   ├── QuestionCard.jsx
│   │   │   ├── Timer.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── FeedbackOverlay.jsx
│   │   │   └── LevelBadge.jsx
│   │   ├── leaderboard/
│   │   │   ├── LeaderboardTable.jsx
│   │   │   └── LeaderboardRow.jsx
│   │   └── layout/
│   │       ├── Header.jsx
│   │       └── AuthButton.jsx
│   ├── pages/
│   │   ├── Home.jsx         # Tela de boas-vindas + login
│   │   ├── Quiz.jsx         # Fluxo principal do quiz
│   │   ├── Result.jsx       # Placar final
│   │   └── Leaderboard.jsx  # Ranking global
│   ├── data/
│   │   └── questions.js     # Banco de perguntas (array de objetos)
│   ├── hooks/
│   │   ├── useTimer.js
│   │   ├── useQuiz.js
│   │   └── useAuth.js
│   ├── lib/
│   │   └── supabase.js      # Inicialização do cliente Supabase
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

### 8.3 Modelo de Dados (Supabase)

#### Tabela: `scores`

```sql
CREATE TABLE scores (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name   text NOT NULL,
  avatar_url  text,
  score       int NOT NULL CHECK (score >= 0 AND score <= 15),
  score_ini   int NOT NULL,  -- acertos nível iniciante (0-5)
  score_int   int NOT NULL,  -- acertos nível intermediário (0-5)
  score_adv   int NOT NULL,  -- acertos nível avançado (0-5)
  created_at  timestamptz DEFAULT now()
);

-- Índice para leaderboard
CREATE INDEX idx_scores_score_desc ON scores (score DESC, created_at ASC);

-- RLS: apenas o próprio usuário pode inserir
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert own score" ON scores
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "read all scores" ON scores
  FOR SELECT TO authenticated
  USING (true);
```

#### View: `leaderboard` (melhor score por usuário)

```sql
CREATE VIEW leaderboard AS
SELECT DISTINCT ON (user_id)
  user_id,
  user_name,
  avatar_url,
  score,
  score_ini,
  score_int,
  score_adv,
  created_at
FROM scores
ORDER BY user_id, score DESC, created_at ASC;
```

### 8.4 Estrutura de Dados — Perguntas

```js
// src/data/questions.js
export const questions = [
  {
    id: 1,
    level: "iniciante",       // "iniciante" | "intermediário" | "avançado"
    statement: "O Claude Code é uma ferramenta que roda exclusivamente na nuvem...",
    answer: false,            // true = VERDADEIRO, false = FALSO
    explanation: "O Claude Code é uma CLI instalada localmente no terminal do usuário.",
  },
  // ... 14 perguntas restantes
];
```

---

## 9. Design System

### 9.1 Paleta de Cores (tema Anthropic/Claude)

| Token | Cor | Uso |
|-------|-----|-----|
| `primary` | `#D97757` (laranja coral Claude) | CTAs, destaques |
| `primary-dark` | `#B85E3F` | Hover de botões |
| `bg-base` | `#FAFAF8` | Fundo da aplicação |
| `bg-card` | `#FFFFFF` | Cards e painéis |
| `text-primary` | `#1A1A1A` | Texto principal |
| `text-muted` | `#6B6B6B` | Texto secundário, legendas |
| `success` | `#16A34A` | Feedback de acerto |
| `error` | `#DC2626` | Feedback de erro |
| `level-ini` | `#3B82F6` (azul) | Badge iniciante |
| `level-int` | `#F59E0B` (âmbar) | Badge intermediário |
| `level-adv` | `#8B5CF6` (roxo) | Badge avançado |

### 9.2 Tipografia

- **Font family:** `Inter` (Google Fonts)
- **Título principal:** `text-3xl font-bold`
- **Afirmação da pergunta:** `text-xl font-medium`
- **Explicação:** `text-sm text-muted`
- **Labels / badges:** `text-xs font-semibold uppercase tracking-wide`

### 9.3 Componentes Principais

#### Botões True/False
```
[  ✓ VERDADEIRO  ]   [  ✗ FALSO  ]
Largura: 50%         Largura: 50%
Altura: 64px         Border radius: 12px
Estado hover: escurece 10%
Estado correto: green-600 bg
Estado errado: red-600 bg
```

#### Timer
- Círculo SVG animado (stroke-dasharray).
- Cor: laranja coral acima de 8s, âmbar entre 4-8s, vermelho abaixo de 4s.
- Número no centro em `font-bold text-2xl`.

#### Progress Bar
- Barra horizontal no topo da tela.
- Largura proporcional ao número de perguntas respondidas.
- Cor: laranja coral.

---

## 10. Fluxo de Navegação

```
/                   → Home (login obrigatório para jogar)
  ↓ login OAuth
/quiz               → Fluxo das 15 perguntas
  ↓ última pergunta respondida
/result             → Placar final + save automático no Supabase
  ↓ "Ver Leaderboard"
/leaderboard        → Ranking global com Realtime
  ↓ "Voltar ao Início"
/                   → Home
```

---

## 11. Variáveis de Ambiente

```env
# .env.example
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Configurar no painel do Supabase:
- OAuth Google: Google Cloud Console → Credentials → OAuth 2.0
- OAuth GitHub: GitHub → Settings → Developer settings → OAuth Apps

---

## 12. Critérios de Aceite

| Funcionalidade | Critério |
|----------------|----------|
| Login OAuth | Usuário consegue logar com Google e GitHub sem erros |
| Timer | Countdown de 20s visível, pergunta errada automaticamente ao zerar |
| Feedback | Cor correta + explicação exibidos em < 300ms após resposta |
| Sequência | Não é possível pular perguntas ou acessar nível seguinte sem completar o anterior |
| Score save | Score salvo no Supabase ao terminar; apenas maior score fica no leaderboard |
| Leaderboard | Atualiza em tempo real; posição do usuário logado destacada |
| Responsivo | Layout funcional e legível em telas de 375px a 1440px |
| Retry | Usuário pode jogar novamente e o maior score é preservado |

---

## 13. Fora do Escopo (v1)

- Modo offline / PWA
- Internacionalização (i18n)
- Compartilhamento de resultado em redes sociais
- Modo administrador para edição de perguntas via UI
- Notificações push
- Analytics de erros por pergunta (heatmap)

---

## 14. Métricas de Sucesso

| Métrica | Meta v1 |
|---------|---------|
| Taxa de conclusão do quiz | > 70% dos usuários que iniciam terminam |
| Usuários no leaderboard | > 20 entradas na primeira semana de uso |
| Score médio | Entre 8-12 (valida que as perguntas têm dificuldade adequada) |
| Tempo médio por sessão | 5-8 minutos |

---

## 15. Dependências e Pacotes

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.26.0",
    "@supabase/supabase-js": "^2.45.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.0",
    "vite": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

*PRD gerado em: 2026-05-21 — Projeto: Claude Code Quiz v1*
