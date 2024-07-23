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
    group: "Framework" | "Plugin",
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
            }
        ]
    },
    {
        display: "CMS",
        navigate: "/cms",
        group: "Framework",
        child: [

        ]
    },
    {
        display: "Ecommerce",
        navigate: "/ecommerce",
        group: "Framework",
        child: [

        ]
    },
    {
        display: "Action Logger",
        navigate: "/action-logger",
        group: "Plugin",
        child: [

        ]
    },
    {
        display: "API Builder",
        navigate: "/api-builder",
        group: "Plugin",
        child: [
            
        ]
    },
    {
        display: "Developer Panel",
        navigate: "/developer-panel",
        group: "Plugin",
        child: [
            
        ]
    },
    {
        display: "Image Optimizer",
        navigate: "/image-optimizer",
        group: "Plugin",
        child: [
            
        ]
    },
    {
        display: "Lang Manager",
        navigate: "/lang-manager",
        group: "Plugin",
        child: [
            
        ]
    },
    {
        display: "Model Schema",
        navigate: "/model-schema",
        group: "Plugin",
        child: [
            
        ]
    },
    {
        display: "Panel Tenacy",
        navigate: "/panel-tenacy",
        group: "Plugin",
        child: [
            
        ]
    },
    {
        display: "Permission Manager",
        navigate: "/permission-manager",
        group: "Plugin",
        child: [
            
        ]
    },
    {
        display: "Query Boost",
        navigate: "/query-boost",
        group: "Plugin",
        child: [
            
        ]
    },
    {
        display: "Stylist",
        navigate: "/stylist",
        group: "Plugin",
        child: [
            
        ]
    }
]

const groupedLinks = _GroupBy(links, 'group')


function isActive(path: string): boolean {
    return route.path.startsWith(path)
}
</script>