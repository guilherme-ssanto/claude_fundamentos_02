export const questions = [
  // Nível 1 — Iniciante
  {
    id: 1,
    level: 'iniciante',
    statement: 'O Claude Code é uma ferramenta que roda exclusivamente na nuvem, sem nenhuma instalação local necessária.',
    answer: false,
    explanation: 'O Claude Code é uma CLI (interface de linha de comando) que é instalada e roda localmente no terminal do usuário, conectando-se à API da Anthropic.',
  },
  {
    id: 2,
    level: 'iniciante',
    statement: 'O Claude Code consegue ler, editar e criar arquivos diretamente no repositório de código do usuário.',
    answer: true,
    explanation: 'Uma das capacidades centrais do Claude Code é manipular o sistema de arquivos local com permissão do usuário.',
  },
  {
    id: 3,
    level: 'iniciante',
    statement: 'O Claude Code só pode ser usado por programadores experientes com conhecimento avançado de terminal.',
    answer: false,
    explanation: 'O Claude Code foi projetado para ser acessível a qualquer perfil — gestores e não-técnicos podem usá-lo para tarefas diversas além de código.',
  },
  {
    id: 4,
    level: 'iniciante',
    statement: 'O Claude Code consegue executar comandos no terminal, rodar testes automatizados e interpretar os resultados.',
    answer: true,
    explanation: 'O Claude Code pode executar comandos shell, scripts e interpretar saídas para agir de forma autônoma.',
  },
  {
    id: 5,
    level: 'iniciante',
    statement: 'O Claude Code é completamente gratuito e sem limites de uso para qualquer conta Anthropic.',
    answer: false,
    explanation: 'O Claude Code requer um plano pago (Claude Pro, Team, Max ou API). O uso consome tokens da API da Anthropic.',
  },

  // Nível 2 — Intermediário
  {
    id: 6,
    level: 'intermediário',
    statement: 'O arquivo CLAUDE.md é usado pelo Claude Code para entender o contexto, regras e convenções de um projeto específico.',
    answer: true,
    explanation: 'O CLAUDE.md funciona como uma memória persistente do projeto — instruções, padrões de código e contexto que o Claude usa em toda sessão.',
  },
  {
    id: 7,
    level: 'intermediário',
    statement: 'O Claude Code não tem acesso à internet e não consegue buscar informações externas durante uma sessão.',
    answer: false,
    explanation: 'Com ferramentas como MCP (Model Context Protocol) ou Web Search, o Claude Code pode acessar informações externas durante a sessão.',
  },
  {
    id: 8,
    level: 'intermediário',
    statement: 'É possível conectar o Claude Code a ferramentas externas como GitHub, Slack e bancos de dados usando o protocolo MCP.',
    answer: true,
    explanation: 'O MCP (Model Context Protocol) permite estender as capacidades do Claude Code com ferramentas e serviços externos.',
  },
  {
    id: 9,
    level: 'intermediário',
    statement: 'O Claude Code sempre tem permissão automática para deletar arquivos e fazer push no Git sem pedir confirmação ao usuário.',
    answer: false,
    explanation: 'Por padrão, ações destrutivas (deletar arquivos, force push) requerem confirmação explícita do usuário antes de serem executadas.',
  },
  {
    id: 10,
    level: 'intermediário',
    statement: 'O Claude Code pode operar em modo autônomo (headless), executando tarefas complexas de forma independente com supervisão mínima.',
    answer: true,
    explanation: 'O modo autônomo permite que o Claude Code execute pipelines completos de tarefas sem intervenção constante do usuário.',
  },

  // Nível 3 — Avançado
  {
    id: 11,
    level: 'avançado',
    statement: 'Hooks no Claude Code permitem executar scripts automáticos antes ou depois de ações específicas do agente, como editar um arquivo ou fazer um commit.',
    answer: true,
    explanation: 'Hooks são scripts configurados no settings.json que disparam em eventos do ciclo de vida do agente (PreToolUse, PostToolUse, etc.).',
  },
  {
    id: 12,
    level: 'avançado',
    statement: 'O modo "Extended Thinking" do Claude melhora a qualidade do raciocínio sem consumir tokens adicionais.',
    answer: false,
    explanation: 'Extended Thinking consome tokens significativamente maiores pois o modelo gera um processo interno de raciocínio antes da resposta final.',
  },
  {
    id: 13,
    level: 'avançado',
    statement: 'O Claude Code suporta orquestração multi-agente, onde um agente principal cria e coordena subagentes para trabalhar em paralelo.',
    answer: true,
    explanation: 'O padrão de agentes aninhados (subagents) permite dividir tarefas complexas em agentes especializados que trabalham em paralelo.',
  },
  {
    id: 14,
    level: 'avançado',
    statement: 'O arquivo settings.json do Claude Code não permite configurar quais ferramentas o agente tem permissão de usar.',
    answer: false,
    explanation: 'O settings.json possui as chaves `allowedTools` e `blockedTools` que controlam exatamente quais ferramentas o agente pode ou não usar.',
  },
  {
    id: 15,
    level: 'avançado',
    statement: 'O Claude Code pode criar commits no Git, abrir pull requests, comentar em issues e interagir com o GitHub de forma autônoma.',
    answer: true,
    explanation: 'Com a ferramenta `gh` disponível no terminal ou via MCP do GitHub, o Claude Code realiza operações completas no GitHub.',
  },
]
