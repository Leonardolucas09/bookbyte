<script setup>
    import bookByteLogo from '../assets/bookByte_logo.png'
    import userIcon from '../assets/avatarGenerico.png'
</script>

<template>
    <header class="flex p-7 justify-between items-center">
        <span>
            <img :src="bookByteLogo" alt="BookByte Logo" class="logo" />
        </span>

        <div class="flex justify-end items-center gap-4">
            <h2 class="text-white item-center font-semibold text-lg">
                Olá, Fulano
            </h2>
            <img :src="userIcon" alt="User Icon" class="user-icon" />
        </div>
    </header>
</template>