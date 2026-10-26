# 📚 BookByte

Aplicação web para **catalogar, organizar e acompanhar o acervo pessoal de livros** em um único lugar, com cadastro rápido via integração com a API Open Library.

Desenvolvido pelo time **BugOps** como projeto acadêmico.

🔗 **Produção:** https://bookbyte-iota.vercel.app

---

## Sumário

1. [Sobre o projeto](#sobre-o-projeto)
2. [Funcionalidades](#funcionalidades)
3. [Fora do escopo](#fora-do-escopo)
4. [Arquitetura](#arquitetura)
5. [Tecnologias](#tecnologias)
6. [Estrutura do repositório](#estrutura-do-repositório)
7. [Como executar](#como-executar)
8. [Operação e deploy](#operação-e-deploy)
9. [Padrões de versionamento](#padrões-de-versionamento)
10. [Metodologia de trabalho](#metodologia-de-trabalho)
11. [Cronograma](#cronograma)
12. [Riscos e mitigações](#riscos-e-mitigações)
13. [Documentação do projeto](#documentação-do-projeto)
14. [Time](#time)

---

## Sobre o projeto

Leitores que acumulam livros ao longo dos anos perdem o controle do acervo: compram títulos repetidos, esquecem o que já leram, abandonam leituras no meio e não lembram para quem emprestaram. Planilhas e cadernos exigem digitação manual e costumam ser abandonados em poucas semanas.

O BookByte resolve isso oferecendo um lugar único e simples para registrar o que se lê. A integração com a **Open Library** elimina o maior atrito das soluções manuais: digitar título, autor, editora, ano e capa a cada livro.

### Perfis de usuário atendidos

| Perfil | Dor principal |
|---|---|
| Leitor de acervo grande | Compra livros repetidos por não saber o que já possui |
| Leitor casual | Abandona livros no meio e não retoma |
| Estudante | Mistura leitura acadêmica com leitura pessoal |
| Colecionador | Não consegue localizar um título no meio de centenas |
| Leitor com pouco tempo | Lê em sessões curtas e perde o fio da leitura |
| Organizador de clube de leitura | Não mantém histórico do que o grupo já leu |

---

## Funcionalidades

- Cadastro e autenticação de usuários
- Busca de livros por título ou autor via API Open Library
- Inclusão de livros no acervo com dados preenchidos automaticamente
- Cadastro manual como alternativa quando a API não retorna o livro
- Edição e exclusão de itens do acervo
- Status de leitura: **quero ler**, **lendo**, **lido**, **abandonado**
- Registro de progresso da leitura
- Listas e categorias personalizadas
- Busca, filtros e ordenação dentro do acervo
- Interface responsiva (desktop e mobile)

### Fluxo principal

1. O usuário se cadastra e acessa a aplicação.
2. Busca um livro por título ou autor.
3. A aplicação consulta a Open Library e retorna os resultados já preenchidos.
4. O usuário adiciona o livro ao acervo, definindo status e lista.
5. Atualiza progresso e status ao longo do tempo.
6. Consulta, filtra e organiza o acervo.

---

## Fora do escopo

- Aplicativo mobile nativo
- Recursos sociais (feed, seguidores, comentários, chat)
- Venda, troca ou empréstimo de livros pela plataforma
- Leitura do conteúdo dos livros dentro da aplicação
- Sincronização com e-readers ou serviços de assinatura

> Alterações de escopo só entram após discussão em reunião do time e avaliação do impacto no cronograma.

---

## Arquitetura

A aplicação é uma **SPA (Single Page Application)** que consome uma **API própria**, a qual se comunica com a API Open Library e com o banco de dados relacional.

```
┌──────────────┐     ┌────────────────┐     ┌──────────────────┐
│  SPA (Vue)   │ ──► │  API própria   │ ──► │  MySQL           │
│  Tailwind    │     │  (back-end)    │     └──────────────────┘
└──────────────┘     │                │     ┌──────────────────┐
                     │                │ ──► │  API Open Library│
                     └────────────────┘     └──────────────────┘
```

Os dados vindos da Open Library são **armazenados localmente após a primeira consulta**, reduzindo a dependência da API externa.

Detalhes da separação em camadas estão no documento *Arquitetura em Camadas* (ver [Documentação](#documentação-do-projeto)).

---

## Tecnologias

| Camada | Tecnologia | Motivo |
|---|---|---|
| Front-end | Vue.js + Vite | Curva de aprendizado acessível, build rápido, experiência prévia do time |
| Estilização | Tailwind CSS | Agiliza a interface e mantém consistência visual |
| Banco de dados | MySQL | SGBD relacional, domínio consolidado pela maioria do time |
| Administração do banco | Beekeeper Studio | Cliente gráfico para gestão e consulta |
| Dados dos livros | API Open Library | Base pública e gratuita de dados bibliográficos |
| Versionamento | Git / GitHub | Branches com revisão por merge request |
| Hospedagem (front-end) | Vercel | Deploy do front-end |
| IDE | Livre escolha | Sem padronização obrigatória |

---

## Estrutura do repositório

```
bookbyte/
├── frontend/     # SPA em Vue.js + Vite + Tailwind
└── ...           # demais módulos (back-end, scripts de banco) conforme evolução
```

> Ajuste esta seção conforme a estrutura final de pastas do repositório.

---

## Como executar

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão LTS recomendada) e npm
- [MySQL](https://www.mysql.com/) em execução local ou remoto
- Git

### 1. Clonar o repositório

```bash
git clone https://github.com/Leonardolucas09/bookbyte.git
cd bookbyte
```

### 2. Front-end

```bash
cd frontend
npm install
npm run dev
```

A aplicação fica disponível no endereço exibido pelo Vite (por padrão `http://localhost:5173`).

Scripts usuais de um projeto Vite:

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Pré-visualização do build |

### 3. Banco de dados

1. Crie um banco no MySQL (ex.: `bookbyte`).
2. Execute os scripts de criação das tabelas (modelagem definida no marco M2).
3. Configure as credenciais nas variáveis de ambiente do back-end.

### 4. Variáveis de ambiente

Crie um arquivo `.env` (nunca versionado) com valores equivalentes a:

```env
# Banco de dados
DB_HOST=localhost
DB_PORT=3306
DB_NAME=bookbyte
DB_USER=seu_usuario
DB_PASSWORD=sua_senha

# Autenticação
JWT_SECRET=troque_por_um_segredo_forte

# Front-end
VITE_API_URL=http://localhost:3000
```

> Os nomes acima são ilustrativos. Alinhe-os com o que o código realmente utiliza.

---

## Operação e deploy

- **Produção:** https://bookbyte-iota.vercel.app
- **Branch de produção:** `production` — o que está nela é o que vai ao ar.
- O deploy é tratado como **marco antecipado**, e não como tarefa de última hora, por ser um ponto de pouca experiência do time.
- Fluxo recomendado de publicação:
  1. Mudanças entram na `production` somente via merge request revisado.
  2. A Vercel gera o build a partir da branch.
  3. Após o deploy, validar o fluxo principal (cadastro → busca → adicionar livro → atualizar status).
- **Contingência da Open Library:** se a API estiver instável ou limitada, usar o cadastro manual; livros já consultados ficam salvos no banco.
- **Banco de dados:** administração e consultas via Beekeeper Studio. Nunca expor credenciais no repositório.

---

## Padrões de versionamento

### Fonte única do código

O repositório Git é a **única fonte de verdade**. Nada de código circulando por fora (zip, chat, etc.).

### Branches

| Branch | Uso |
|---|---|
| `production` | Código estável, publicado em produção |
| `feature/<descricao-curta>` | Novas funcionalidades |
| `fix/<descricao-curta>` | Correções de bugs |
| `docs/<descricao-curta>` | Documentação |
| `chore/<descricao-curta>` | Configuração, dependências, ajustes |

Exemplos: `feature/busca-open-library`, `fix/filtro-status`, `docs/readme`.

### Commits

Padrão sugerido: [Conventional Commits](https://www.conventionalcommits.org/pt-br/).

```
<tipo>(<escopo opcional>): <descrição no imperativo>
```

Tipos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`.

Exemplos:

```
feat(acervo): adiciona filtro por status de leitura
fix(auth): corrige validação de e-mail no cadastro
docs: atualiza instruções de execução no README
```

Boas práticas: commits pequenos e focados, uma ideia por commit, mensagens claras.

### Merge request (pull request)

1. Crie a branch a partir da `production` atualizada.
2. Faça os commits e envie a branch ao remoto.
3. Abra o merge request descrevendo **o que mudou, por quê e como testar**.
4. **Outro membro do time** (nunca o próprio autor) revisa e aprova.
5. Resolva os comentários, faça o merge e apague a branch.

Checklist do autor antes de abrir o MR:

- [ ] A aplicação roda localmente sem erros
- [ ] O fluxo afetado foi testado manualmente
- [ ] Sem credenciais, `.env` ou arquivos desnecessários no commit
- [ ] Descrição do MR preenchida

### Decisões e conflitos

Decisões técnicas são tomadas por **debate e consenso**; não havendo consenso, a decisão final é do **líder** do time.

---

## Metodologia de trabalho

- Desenvolvimento em **ciclos curtos**, com reuniões periódicas de alinhamento
- **Retrospectiva** ao final de cada ciclo para ajustar o que não funcionou
- Divisão em frentes de **front-end, back-end e banco**, com apoio cruzado quando necessário
- Registro das decisões e tarefas distribuídas em ciclos curtos
- Nivelamento técnico por troca entre os membros, pareamento e estudo individual

---

## Cronograma

| Marco | Entrega |
|---|---|
| M1 | Requisitos definidos, personas e Team Charter aprovados |
| M2 | Modelagem do banco e protótipo das telas concluídos |
| M3 | Ambiente configurado e estrutura base no repositório |
| M4 | Back-end com CRUD e integração da API Open Library funcionando |
| M5 | Front-end integrado ao back-end, fluxo principal completo |
| M6 | Testes, ajustes finais e entrega (**17/11/2026**) |

---

## Riscos e mitigações

| Risco | Impacto | Mitigação |
|---|---|---|
| Tempo disponível reduzido dos integrantes | Alto | Escopo enxuto e priorização do fluxo principal |
| Conhecimento de front-end concentrado em poucos membros | Médio | Tailwind para reduzir esforço de estilização e pareamento nas telas |
| Instabilidade ou limitação da Open Library | Médio | Cadastro manual e armazenamento local após a primeira consulta |
| Pouca experiência prática com deploy | Médio | Publicação como marco antecipado |
| Conciliação do projeto com trabalho e faculdade | Alto | Reuniões fixas, registro de decisões e tarefas em ciclos curtos |

---

## Documentação do projeto

| Documento | Link |
|---|---|
| Visão de Produto | https://docs.google.com/document/d/15S31L1ONLScEGqvqBGgOmT_9sipL6fPj6v4e49J_q_0/edit?usp=sharing |
| Especificação de Casos de Uso | https://docs.google.com/document/d/1QBQwCiY3fIzlXZYBg4sEDA3OQ7dntxvpSUDZqX7hdPg/edit?tab=t.0 |
| Arquitetura em Camadas | https://docs.google.com/document/d/1L_cnwlD0RAqCGPZghjCRIOOxLtLdpaZMVShV0AIwSok/edit?usp=sharing |
| Jornada de Usuário | https://excalidraw.com/#json=58I9aZa86xTlc9-8bzJYU,zdwUxYjGZ7222-NijW1nOQ |
| Documento de Realização de Casos de Uso (RCU) | Disponível no SharePoint do time |

---

## Recursos

O projeto não possui orçamento dedicado. Todas as ferramentas são gratuitas, de licença livre ou estudantil. Os recursos humanos são os quatro integrantes do time, com orientação do professor responsável pela disciplina.

---

## Time

**BugOps** — 4 integrantes, com acompanhamento do professor responsável pela disciplina.

| Nome | Frente |
|---|---|
| _leonardo Lucas de Oliveira_ | _Líder / Dev Full Stack_ |
| _Camila Isperling Machado_ | _Vice-Líder / Dev Back-end_ |
| _Taina Miria Luiz da Rosa_ | _Dev Front-end_ |
| _Taina Bueno_ | _Dev Back-end / Requisitos_ |

---

## Licença

Projeto acadêmico. Defina aqui a licença, caso o código venha a ser publicado como open source.
