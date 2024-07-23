<template>
    <ul class="menu">
        <template v-for="(links, group) in groupedLinks">
            <li class="menu-title" v-text="group"></li>
            <li v-for="link in links">
                <NuxtLink :to="link.navigate" :class="[route.path == link.navigate ? '!text-primary active' : '']">
                    <span v-text="link.display"></span>
                </NuxtLink>
                
            </li>
        </template>
    </ul>
</template>
<script setup lang="ts">

interface NavLink {
    display: string,
    navigate: string,
    group: "Framework" | "Plugin"
}

const route = useRoute()

const links: NavLink[] = [
    {
        display: "Administratix",
        navigate: "/administratix",
        group: "Framework"
    },
    {
        display: "CMS",
        navigate: "/cms",
        group: "Framework"
    },
    {
        display: "Ecommerce",
        navigate: "/ecommerce",
        group: "Framework"
    },
    {
        display: "Action Logger",
        navigate: "/action-logger",
        group: "Plugin"
    },
    {
        display: "API Builder",
        navigate: "/api-builder",
        group: "Plugin"
    },
    {
        display: "Developer Panel",
        navigate: "/developer-panel",
        group: "Plugin"
    },
    {
        display: "Image Optimizer",
        navigate: "/image-optimizer",
        group: "Plugin"
    },
    {
        display: "Lang Manager",
        navigate: "/lang-manager",
        group: "Plugin"
    },
    {
        display: "Model Schema",
        navigate: "/model-schema",
        group: "Plugin"
    },
    {
        display: "Panel Tenacy",
        navigate: "/panel-tenacy",
        group: "Plugin"
    },
    {
        display: "Permission Manager",
        navigate: "/permission-manager",
        group: "Plugin"
    },
    {
        display: "Query Boost",
        navigate: "/query-boost",
        group: "Plugin"
    },
    {
        display: "Stylist",
        navigate: "/stylist",
        group: "Plugin"
    }
]

const groupedLinks = _GroupBy(links, 'group')
</script>