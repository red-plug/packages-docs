<template>
    <ul class="menu">
        <template v-for="(links, group) in groupedLinks">
            <li>
                <span class="menu-title" v-text="group"></span>
                <ul>
                    <li v-for="link in links">
                        <NuxtLink :to="link.navigate" :class="{ 'menu-dropdown-toggle': link.child.length, '!text-primary active menu-dropdown-show': isActive(link.navigate) }">
                            <span v-text="link.display"></span>
                        </NuxtLink>
                        <ul v-if="link.child.length" class="menu-dropdown mt-2" :class="{ 'menu-dropdown-show': isActive(link.navigate) }">
                            <li v-for="sublink in link.child">
                                <NuxtLink :to="link.navigate + sublink.navigate" :class="{ '!text-primary active': isActive(link.navigate + sublink.navigate) }">
                                    <span v-text="sublink.display"></span>
                                </NuxtLink>
                            </li>
                        </ul>
                    </li>
                </ul>   
            </li>
        </template>
    </ul>
</template>
<script setup lang="ts">

interface ChildNavLink {
    display: string,
    navigate: string
}

interface NavLink extends ChildNavLink {
    group: "Framework" | "Módulo" | "Sistema",
    child: ChildNavLink[]
}

const route = useRoute()

const links: NavLink[] = [
    {
        display: "Administratix",
        navigate: "/administratix",
        group: "Framework",
        child: [
            {
                display: "Crear plugins",
                navigate: "/create-plugins",
            },
            {
                display: "Filament Resource",
                navigate: "/resource"
            },
            {
                display: "Filament Page",
                navigate: "/page"
            }
        ]
    },
    {
        display: "CMS",
        navigate: "/cms",
        group: "Sistema",
        child: [

        ]
    },
    {
        display: "Ecommerce",
        navigate: "/ecommerce",
        group: "Sistema",
        child: [

        ]
    },
    {
        display: "Action Logger",
        navigate: "/action-logger",
        group: "Framework",
        child: [

        ]
    },
    {
        display: "API Builder",
        navigate: "/api-builder",
        group: "Framework",
        child: [
            
        ]
    },
    {
        display: "Developer Panel",
        navigate: "/developer-panel",
        group: "Framework",
        child: [
            
        ]
    },
    {
        display: "Image Optimizer",
        navigate: "/image-optimizer",
        group: "Framework",
        child: [
            
        ]
    },
    {
        display: "Lang Manager",
        navigate: "/lang-manager",
        group: "Framework",
        child: [
            
        ]
    },
    {
        display: "Model Schema",
        navigate: "/model-schema",
        group: "Framework",
        child: [
            
        ]
    },
    {
        display: "Panel Tenacy",
        navigate: "/panel-tenacy",
        group: "Framework",
        child: [
            
        ]
    },
    {
        display: "Permission Manager",
        navigate: "/permission-manager",
        group: "Framework",
        child: [
            
        ]
    },
    {
        display: "Query Boost",
        navigate: "/query-boost",
        group: "Framework",
        child: [
            
        ]
    },
    {
        display: "Stylist",
        navigate: "/stylist",
        group: "Framework",
        child: [
            
        ]
    },
    {
        display: "Roles",
        navigate: "/roles",
        group: "Módulo",
        child: [

        ]
    },
    {
        display: "Admins",
        navigate: "/admins",
        group: "Módulo",
        child: [
            
        ]
    },
    {
        display: "Layouts",
        navigate: "/layouts",
        group: "Módulo",
        child: [
            
        ]
    },
    {
        display: "Media",
        navigate: "/media",
        group: "Módulo",
        child: [
            
        ]
    },
    {
        display: "Contents",
        navigate: "/contents",
        group: "Módulo",
        child: [
            
        ]
    },
    {
        display: "Comments",
        navigate: "/comments",
        group: "Módulo",
        child: [
            
        ]
    },
    {
        display: "Readers",
        navigate: "/readers",
        group: "Módulo",
        child: [
            
        ]
    },
    {
        display: "Subscriptions",
        navigate: "/subscriptions",
        group: "Módulo",
        child: [
            
        ]
    }
]

const groupedLinks = _GroupBy(links, 'group')


function isActive(path: string): boolean {
    return route.path.startsWith(path)
}
</script>