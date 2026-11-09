// Busca livros na Open Library e devolve no formato que o BookByte usa.

const CAMPOS = [
    "key", // sem este campo a Open Library não manda a edição em português
    "title",
    "author_name",
    "first_publish_year",
    "number_of_pages_median",
    "cover_i",
    "editions",
    "editions.title",
    "editions.publisher",
    "editions.isbn",
    "editions.cover_i",
].join(",");

export async function buscarLivros(termo) {
    // lang=pt faz a Open Library trazer a edição em português, quando existe
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(termo)}&lang=pt&limit=20&fields=${CAMPOS}`;

    // Se a Open Library demorar mais de 8 segundos, a gente desiste
    const resposta = await fetch(url, { signal: AbortSignal.timeout(8000) });

    if (!resposta.ok) {
        throw new Error(`A Open Library respondeu com erro ${resposta.status}`);
    }

    const dados = await resposta.json();
    return dados.docs.map(converterLivro);
}

function converterLivro(obra) {
    const edicao = obra.editions?.docs?.[0] ?? {};
    const capa = edicao.cover_i ?? obra.cover_i;

    return {
        titulo: edicao.title ?? obra.title,
        autor: obra.author_name?.join(", ") ?? null,
        editora: edicao.publisher?.[0] ?? null,
        ano: obra.first_publish_year ?? null,
        paginas: obra.number_of_pages_median ?? null,
        isbn: edicao.isbn?.find((isbn) => isbn.length === 13) ?? edicao.isbn?.[0] ?? null,
        capa: capa ? `https://covers.openlibrary.org/b/id/${capa}-L.jpg` : null,
    };
}
