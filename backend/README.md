# BookByte — API

API que busca livros na Open Library para o BookByte. O front-end chama esta API, e ela chama a Open Library (ADR-001).

## Como rodar

```bash
cd backend
npm install
npm run dev
```

A API sobe em `http://localhost:3000`.

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
