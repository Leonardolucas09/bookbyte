# BookByte — API

API do BookByte. Busca livros na Open Library (ADR-001) e cuida do cadastro e do login dos usuários, que ficam salvos no MySQL (ADR-004 e ADR-006).

## Como rodar

1. Com o MySQL ligado, rode o arquivo `banco.sql`. Ele cria o banco `bookbyte` e a tabela `usuario`:
   ```bash
   mysql -u root -p < banco.sql
   ```
2. Copie `.env.example` para `.env` e coloque a senha do seu MySQL em `DB_PASSWORD`.
3. Suba a API:
   ```bash
   cd backend
   npm install
   npm run dev
   ```

A API sobe em `http://localhost:3000`.

## Cadastro

```
POST /api/cadastro
{ "nomeUsuario": "camila", "email": "camila@email.com", "senha": "123456" }
```

| Situação | Status | Resposta |
|---|---|---|
| Conta criada | 201 | `{ "mensagem": "Conta criada com sucesso." }` |
| Campo vazio, e-mail sem @ ou senha com menos de 6 caracteres | 400 | `{ "erro": "..." }` |
| E-mail ou nome de usuário já usado | 409 | `{ "erro": "..." }` |

A senha nunca é salva: o banco guarda só o hash dela (bcrypt).

## Atualizar o progresso e a nota pessoal de leitura

```http
PATCH /api/estante/12/leitura
Authorization: Bearer <token>
Content-Type: application/json

{ "statusLeitura": "Lendo", "paginasLidas": 184, "descricaoLeitura": "Gostei muito deste capítulo." }
```

O status, o progresso e a nota são salvos pelo modal. O progresso é salvo como quantidade de páginas no item da estante do usuário; a interface também aceita porcentagem e converte para páginas usando o total cadastrado. A nota é privada e só pode ser criada ou editada enquanto o status for `Lendo`; ao mudar para outro status, a nota existente é preservada.

Em um banco já criado, execute uma vez:

```sql
ALTER TABLE item_estante ADD COLUMN descricao_leitura TEXT;
```

## Login

```
POST /api/login
{ "login": "camila", "senha": "123456" }
```

`login` pode ser o e-mail ou o nome de usuário.

| Situação | Status | Resposta |
|---|---|---|
| Deu certo | 200 | `{ "token": "...", "usuario": { "id", "nomeUsuario", "email" } }` |
| E-mail/usuário ou senha errados | 401 | `{ "erro": "E-mail ou senha incorretos." }` |

O token vale por 7 dias. O front guarda ele no navegador e, sem ele, só deixa abrir as telas de login, cadastro e recuperar senha.

## Perfil e preferências

Todas exigem `Authorization: Bearer <token>`.

```http
GET /api/usuario
```

Devolve `{ id, nomeUsuario, email, preferencias }`.

```http
PATCH /api/usuario/perfil
{ "nomeUsuario": "camila", "email": "camila@email.com" }
```

| Situação | Status |
|---|---|
| Deu certo | 200, com o usuário atualizado |
| Campo vazio ou e-mail sem @ | 400 |
| E-mail ou nome de usuário já usado por outra conta | 409 |

```http
PATCH /api/usuario/preferencias
{ "metaLivros": 20, "tema": "sepia" }
```

Mande só os campos que mudaram. Campo desconhecido ou valor fora da lista dá 400.

| Campo | Valores |
|---|---|
| `metaLivros` | inteiro de 0 a 1000 |
| `unidadeProgresso` | `paginas`, `porcentagem` |
| `lembreteLeitura`, `novidadesEmail` | `true`, `false` |
| `tema` | `claro`, `sepia`, `escuro` |
| `fonteLeitura` | `lora`, `inter` |
| `tamanhoTexto` | `pequeno`, `medio`, `grande` |

Em um banco já criado, execute uma vez:

```sql
ALTER TABLE usuario
    ADD COLUMN meta_livros INT NOT NULL DEFAULT 20,
    ADD COLUMN unidade_progresso VARCHAR(20) NOT NULL DEFAULT 'paginas',
    ADD COLUMN lembrete_leitura BOOLEAN NOT NULL DEFAULT TRUE,
    ADD COLUMN novidades_email BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN tema VARCHAR(20) NOT NULL DEFAULT 'claro',
    ADD COLUMN fonte_leitura VARCHAR(20) NOT NULL DEFAULT 'lora',
    ADD COLUMN tamanho_texto VARCHAR(20) NOT NULL DEFAULT 'medio';
```

## Buscar livros

```
GET /api/livros/busca?q=duna
```

Resposta:

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

Quando der algum problema, a resposta avisa:

| Situação | Status | O que o front faz |
|---|---|---|
| Termo com menos de 2 letras | 400 | Pede para digitar mais |
| Nenhum livro encontrado | 200 com `cadastroManual: true` | Oferece o cadastro manual |
| Open Library fora do ar ou lenta | 503 com `cadastroManual: true` | Oferece o cadastro manual |
