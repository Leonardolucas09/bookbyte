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
