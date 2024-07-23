<template>
    <a class="link" :target="external ? '_blank' : '_self'" :rel="external ? 'noopener noreferrer' : ''">
        <slot />
    </a>
</template>
<script setup lang="ts">
    defineProps({
        external: {
            type: Boolean,
            default: false
        }
    })
</script>