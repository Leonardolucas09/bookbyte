<script setup>
    import { useTemplateRef } from 'vue';

    const carrossel = useTemplateRef('carrossel')
    
    function scrollDireita() {
        carrossel.value.scrollBy({ 
            left: 300, behavior: 'smooth'
        })
    }

    const livros = [
        {
            id: 1,
            isbn: "978-85-828-5119-7",
            titulo: "1984",
            autor: "George Orwell",
            dataPublicacao: "2020-11-21",
            avaliacoes: 4.8,
            editora: "Penguin-Companhia das Letras",
            idioma: "Português",
            paginas: 392,
            capa: "https://covers.openlibrary.org/b/isbn/9788582851197-L.jpg"
        },
        {
            id: 2,
            isbn: "978-85-220-3145-0",
            titulo: "O Pequeno Príncipe",
            autor: "Antoine de Saint-Exupéry",
            dataPublicacao: "2015-05-01",
            avaliacoes: 4.9,
            editora: "Agir",
            idioma: "Português",
            paginas: 96,
            capa: "https://covers.openlibrary.org/b/isbn/9788522031450-L.jpg"
        },
        {
            id: 3,
            isbn: "978-85-336-1516-8",
            titulo: "O Senhor dos Anéis",
            autor: "J. R. R. Tolkien",
            dataPublicacao: "2001-01-01",
            avaliacoes: 4.9,
            editora: "Martins Fontes",
            idioma: "Português",
            paginas: 1211,
            capa: "https://covers.openlibrary.org/b/isbn/9788533613409-L.jpg"
        },
        {
            id: 4,
            isbn: "978-85-03-00949-2",
            titulo: "O Sol É Para Todos",
            autor: "Harper Lee",
            dataPublicacao: "2006-10-10",
            avaliacoes: 4.8,
            editora: "José Olympio",
            idioma: "Português",
            paginas: 349,
            capa: "https://covers.openlibrary.org/b/isbn/9788503009492-L.jpg"
        },
        {
            id: 5,
            isbn: "978-85-7657-101-8",
            titulo: "Duna",
            autor: "Frank Herbert",
            dataPublicacao: "2010-11-24",
            avaliacoes: 4.8,
            editora: "Aleph",
            idioma: "Português",
            paginas: 544,
            capa: "https://covers.openlibrary.org/b/isbn/9788576571018-L.jpg"
        },
        {
            id: 6,
            isbn: "978-85-7164-685-8",
            titulo: "A Metamorfose",
            autor: "Franz Kafka",
            dataPublicacao: "1997-08-07",
            avaliacoes: 4.7,
            editora: "Companhia das Letras",
            idioma: "Português",
            paginas: 96,
            capa: "https://covers.openlibrary.org/b/isbn/9788571646858-L.jpg"
        },
        {
            id: 7,
            isbn: "978-85-7326-208-7",
            titulo: "Crime e Castigo",
            autor: "Fiodor Dostoiévski",
            dataPublicacao: "2001-01-01",
            avaliacoes: 4.9,
            editora: "Editora 34",
            idioma: "Português",
            paginas: 568,
            capa: "https://covers.openlibrary.org/b/isbn/9788573262087-L.jpg"
        },
        {
            id: 8,
            isbn: "978-85-08-17127-9",
            titulo: "Quarto de Despejo",
            autor: "Carolina Maria de Jesus",
            dataPublicacao: "2015-01-01",
            avaliacoes: 4.8,
            editora: "Ática",
            idioma: "Português",
            paginas: 200,
            capa: "https://covers.openlibrary.org/b/isbn/9788508171279-L.jpg"
        },
        {
            id: 9,
            isbn: "978-85-325-2066-1",
            titulo: "O Conto da Aia",
            autor: "Margaret Atwood",
            dataPublicacao: "2017-06-07",
            avaliacoes: 4.8,
            editora: "Rocco",
            idioma: "Português",
            paginas: 368,
            capa: "https://covers.openlibrary.org/b/isbn/9788532520661-L.jpg"
        }
    ]
    
    const livrosEmLoop = [...livros, ...livros]
</script>

<template>
    <div class="flex justify-between px-8 py-4 text-white text-xl font-semibold">
        <h2>Continuar lendo</h2>
        <button class="cursor-pointer" @click="scrollDireita">
            <svg width="10" height="17" viewBox="0 0 10 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.55078 8.47656C9.55078 8.7207 9.45312 8.93555 9.26758 9.12109L1.5332 16.6895C1.35742 16.8652 1.14258 16.9531 0.888672 16.9531C0.390625 16.9531 0 16.5723 0 16.0645C0 15.8105 0.0976562 15.5957 0.253906 15.4297L7.36328 8.47656L0.253906 1.52344C0.0976562 1.35742 0 1.13281 0 0.888672C0 0.380859 0.390625 0 0.888672 0C1.14258 0 1.35742 0.0878906 1.5332 0.253906L9.26758 7.83203C9.45312 8.00781 9.55078 8.23242 9.55078 8.47656Z" fill="currentColor"/>
            </svg> 
        </button>
    </div>
    <div class="overflow-hidden scroll-smooth" ref="carrossel">
        <div class="flex gap-4 animate-scroll w-max">
            <div v-for="(livro, index) in livrosEmLoop" :key="index" 
                class="flex flex-col items-center w-28 ">
                <img :src="livro.capa" class="w-30 h-40 rounded" alt="Capa do livro Duna"/>
                <h3 class="text-white text-center">{{ livro.titulo}}</h3>
                <span class="text-center text-wrap text-sm text-gray-400 leading-none">{{ livro.autor }}</span> 

            </div>
        </div>
    </div>
</template>