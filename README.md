# BookByte

Aplicação web para organizar uma estante pessoal e acompanhar leituras. O projeto está dividido em uma interface SPA em Vue e uma API Node.js/Express que consulta o catálogo público da Open Library.

## Visão geral

O BookByte permite visualizar livros guardados no navegador, acompanhar seus status de leitura e buscar livros pelo catálogo Open Library. O frontend é uma aplicação de página única (SPA): o Vue Router troca as páginas sem recarregar o documento.

> **Estado atual:** os livros da estante são persistidos no `localStorage` do navegador. O repositório não contém banco de dados nem API própria para autenticação ou CRUD da estante. As telas de login e recuperação de senha existem na interface, mas não estão ligadas a um serviço de autenticação neste backend.

## Tecnologias

- **Frontend:** Vue 3, Vue Router, Vite e Tailwind CSS 4.
- **Backend:** Node.js, Express 5 e CORS.
- **Catálogo externo:** Open Library Search API.
- **Persistência local:** `localStorage` do navegador.

## Arquitetura

```text
Navegador
┌─────────────────────────────────────┐
│ Vue SPA: páginas, componentes e estado│
│  ├─ Estante local (localStorage)     │
│  └─ Serviço de busca                 │
└──────────────────┬──────────────────┘
                   │ HTTP /api/livros/busca
                   ▼
┌─────────────────────────────────────┐
│ API Express                         │
│ valida termo → consulta → normaliza │
└──────────────────┬──────────────────┘
                   │ HTTPS
                   ▼
             Open Library
```

A API backend atua como intermediária para a busca externa. Ela valida o termo, consulta a Open Library com limite de oito segundos e transforma os resultados para o formato usado pela aplicação. A estante do usuário não passa pelo backend: permanece no armazenamento local do navegador.

### Organização MVVM no frontend

| Conceito | Onde aparece | Responsabilidade |
|---|---|---|
| **Model (Modelo)** | `src/services/estante.js` e objetos de livro | Dados da estante, status e operações de inclusão/atualização; persistência via `localStorage`. |
| **View (Visualização)** | `src/Pages/`, `src/components/` e `src/layouts/` | Telas e elementos visuais, como estante, cartões, cabeçalho e navegação. |
| **ViewModel (Modelo de visualização)** | `<script setup>` das páginas e componentes Vue | Estado reativo (`ref`), valores derivados (`computed`) e ações que conectam a interface aos dados e serviços. |
| **Serviços** | `src/services/api.js` e `src/services/estante.js` | Comunicação com a API HTTP e operações/persistência da estante, mantendo detalhes fora da marcação visual. |

Por exemplo, `Estante.vue` calcula contagens e progresso com `computed` e apresenta esses dados no template. O módulo `services/estante.js` mantém a lista reativa e sincroniza as alterações com `localStorage`. Em `Descobrir.vue`, a interface de busca pode consumir `services/api.js`, que chama o backend.

## Estrutura do repositório

```text
bookbyte/
├── frontend/
│   ├── public/                 # Arquivos estáticos públicos
│   └── src/
│       ├── assets/             # Imagens e recursos visuais
│       ├── components/         # Componentes reutilizáveis
│       │   └── icons/          # Ícones Vue
│       ├── layouts/            # Estruturas compartilhadas das páginas
│       ├── Pages/              # Telas e rotas da aplicação
│       ├── router/             # Configuração do Vue Router
│       ├── services/           # Acesso à API e estado da estante
│       ├── App.vue             # Raiz da interface
│       ├── main.js             # Inicialização do Vue
│       └── style.css           # Tailwind e estilos globais
└── backend/
    └── src/
        ├── server.js           # Aplicação Express e endpoint HTTP
        └── openLibrary.js      # Consulta e normalização da Open Library
```

### Rotas principais

| Rota | Página |
|---|---|
| `/estante` | Estante e resumo de leitura |
| `/descobrir` | Descoberta de livros |
| `/notas` | Notas de leitura |
| `/configuracoes` | Configurações |
| `/login` | Login |
| `/recuperar-senha` | Recuperação de senha |

A rota raiz redireciona para `/estante`; caminhos desconhecidos também retornam à raiz.

## Requisitos

- Node.js com suporte a `fetch` e `AbortSignal.timeout` (Node.js 18 ou superior recomendado).
- npm.
- Conexão com a internet para consultar a Open Library.

## Como executar em desenvolvimento

Abra dois terminais na raiz do repositório.

### 1. Iniciar a API

```bash
cd backend
npm install
npm run dev
```

A API fica disponível em `http://localhost:3000`.

### 2. Iniciar o frontend

```bash
cd frontend
npm install
npm run dev
```

Abra o endereço local informado pelo Vite, normalmente `http://localhost:5173`.

## API de busca

```http
GET /api/livros/busca?q=duna
```

Resposta de sucesso:

```json
{
  "livros": [
    {
      "titulo": "Duna",
      "autor": "Frank Herbert",
      "editora": "Aleph",
      "ano": 1965,
      "paginas": 608,
      "isbn": "9788576574941",
      "capa": "https://covers.openlibrary.org/b/id/15228531-L.jpg"
    }
  ],
  "cadastroManual": false
}
```

- Termo com menos de duas letras: HTTP `400`.
- Nenhum resultado: HTTP `200`, com `cadastroManual: true`.
- Falha ou timeout na Open Library: HTTP `503`, com `cadastroManual: true`.

O backend permite chamadas cross-origin via CORS e usa `PORT` se definida; caso contrário, escuta na porta `3000`.

## Scripts disponíveis

### Frontend (`frontend/`)

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor de desenvolvimento Vite. |
| `npm run build` | Gera o build de produção em `dist/`. |
| `npm run preview` | Serve localmente o build de produção. |
| `npm run lint` | Executa ESLint. |
| `npm run lint:fix` | Aplica correções automáticas do ESLint. |

### Backend (`backend/`)

| Comando | Descrição |
|---|---|
| `npm run dev` | Inicia a API com reinicialização ao detectar mudanças. |
| `npm start` | Inicia a API. |

## Desenvolvimento e organização

- Mantenha páginas em `frontend/src/Pages/` e componentes reaproveitáveis em `frontend/src/components/`.
- Centralize chamadas HTTP e operações de dados nos módulos de `frontend/src/services/`.
- Deixe estado derivado de estado Vue em `computed`, e use `ref` para estado reativo local.
- Ao alterar contratos da busca, atualize o backend e os consumidores do frontend em conjunto.
- Execute `npm run lint` e `npm run build` em `frontend/` antes de entregar mudanças de interface.
- Não versione credenciais nem dados pessoais. Atualmente não há arquivo `.env` necessário para executar a configuração local padrão.

## Limitações conhecidas

- O `localStorage` é específico do navegador e do dispositivo; não sincroniza entre usuários ou dispositivos.
- A API de busca depende da disponibilidade da Open Library.
- A aplicação atualmente não tem banco de dados, autenticação funcional no backend, nem endpoints para persistir a estante remotamente.
