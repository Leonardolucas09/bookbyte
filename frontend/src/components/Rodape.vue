<script setup>
defineProps({ currentPage: { type: String, default: '' } })
defineEmits(['navigate'])
</script>

<template>
    <div class="fixed left-0 right-0 bottom-10 px-5">
        <div class="flex justify-center bg-zinc-900 items-center py-2 px-2 rounded-full">
            <ul class="flex text-white w-full justify-around ">
                <li class="botao w-20"
                    :class="{ 'botao-ativo': currentPage === '' }"
                    @click="$emit('navigate', '')">
                    <a href="" @click.prevent>
                        <div class="flex flex-col items-center">
                            <svg width="13" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.664062 17.6143C0.298828 17.6143 0 17.3154 0 16.9502V1.69336C0 0.680664 0.697266 0 1.73486 0H10.9155C11.9614 0 12.6504 0.680664 12.6504 1.69336V16.9502C12.6504 17.3154 12.3516 17.6143 11.9863 17.6143C11.6128 17.6143 11.314 17.3154 11.314 16.9502V1.77637C11.314 1.51074 11.1396 1.33643 10.8906 1.33643H1.75977C1.51074 1.33643 1.33643 1.51074 1.33643 1.77637V16.9502C1.33643 17.3154 1.0376 17.6143 0.664062 17.6143ZM2.58984 17.3237C2.43213 17.3237 2.30762 17.1909 2.30762 17.0415V2.58154C2.30762 2.42383 2.43213 2.29932 2.58984 2.29932H10.0688C10.2183 2.29932 10.3428 2.42383 10.3428 2.58154V17.0415C10.3428 17.1909 10.2183 17.3237 10.0688 17.3237H2.58984ZM8.36719 10.6499C8.74072 10.6499 9.03125 10.3511 9.03125 9.98584C9.03125 9.6123 8.74072 9.32178 8.36719 9.32178C8.00195 9.32178 7.70312 9.6123 7.70312 9.98584C7.70312 10.3511 8.00195 10.6499 8.36719 10.6499Z" fill="currentColor"/>
                            </svg>
                            Início
                        </div>
                    </a>
                </li>
                <li class="botao"
                    :class="{ 'botao-ativo': currentPage === 'lista' }"
                    @click="$emit('navigate', 'lista')">
                    <a href="" @click.prevent>
                        <div class="flex flex-col items-center">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_86_291)">
                                    <path d="M17.3666 3.84172C16.941 3.41589 16.4356 3.0781 15.8794 2.84763C15.3232 2.61716 14.727 2.49854 14.1249 2.49854C13.5229 2.49854 12.9267 2.61716 12.3705 2.84763C11.8143 3.0781 11.3089 3.41589 10.8833 3.84172L9.99994 4.72506L9.1166 3.84172C8.25686 2.98198 7.0908 2.49898 5.87494 2.49898C4.65908 2.49898 3.49301 2.98198 2.63327 3.84172C1.77353 4.70147 1.29053 5.86753 1.29053 7.08339C1.29053 8.29925 1.77353 9.46531 2.63327 10.3251L9.99994 17.6917L17.3666 10.3251C17.7924 9.89943 18.1302 9.39407 18.3607 8.83785C18.5912 8.28164 18.7098 7.68546 18.7098 7.08339C18.7098 6.48132 18.5912 5.88514 18.3607 5.32893C18.1302 4.77271 17.7924 4.26735 17.3666 3.84172Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_86_291">
                                        <rect width="20" height="20" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                            Minha Lista
                        </div>
                    </a>
                </li>
                <li class="botao"
                    :class="{ 'botao-ativo': currentPage === 'estante' }"
                    @click="$emit('navigate', 'estante')">
                    <a href="" @click.prevent>
                        <div class="flex flex-col items-center">
                            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.54834 17.7886C0.863281 17.7886 0 16.9336 0 15.2236V2.60645C0 0.871582 0.85498 0 2.57324 0H11.3887C13.1069 0 13.9619 0.879883 13.9619 2.60645V12.1274C13.9619 12.9575 13.5801 13.3643 13.2646 13.6797C12.2354 14.7173 12.4512 16.0703 13.4971 16.4854C13.7627 16.5767 13.9619 16.834 13.9619 17.1245C13.9619 17.498 13.6631 17.7886 13.2979 17.7886H2.54834ZM2.37402 12.7251C2.63135 12.7251 2.85547 12.5093 2.85547 12.2437V1.75977C2.85547 1.49414 2.63135 1.28662 2.37402 1.28662C2.1167 1.28662 1.90088 1.49414 1.90088 1.75977V12.2437C1.90088 12.5093 2.1167 12.7251 2.37402 12.7251ZM2.62305 16.4521H11.6211C11.1812 15.7383 11.1147 14.8252 11.5049 13.9619C11.4219 13.9785 11.3223 13.9868 11.2144 13.9868H2.69775C1.86768 13.9868 1.33643 14.4683 1.33643 15.2153C1.33643 16.0039 1.78467 16.4521 2.62305 16.4521Z" fill="currentColor"/>
                            </svg>
                            Estante
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<style>
    .botao {
        font-weight: 500;
        flex: 1;
        border-radius: 9999px;
        padding: 8px 12px;
        cursor: pointer;
        transition: background-color 0.25s ease, color 0.25s ease;
        color: #fff;
    }

    .botao a {
        color: inherit;
        display: flex;
        justify-content: center;
    }

    .botao-ativo {
        background-color: #FFF;
        color: rgb(24 24 27);
    }

    .botao:not(.botao-ativo):hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
</style>
