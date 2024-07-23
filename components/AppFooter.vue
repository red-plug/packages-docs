<template>
    <footer class="footer footer-center bg-neutral text-neutral-content p-4">
        <aside>
            <p>Derechos de autor <span v-text="year"></span> - Todos los derechos reservados por <Anchor class="link-primary">Red Plug</Anchor> Asociados</p>
        </aside>
    </footer>
</template>
<script setup lang="ts">
const year = new Date().getFullYear()
</script>