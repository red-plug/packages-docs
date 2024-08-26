<template>
    <div class="drawer lg:drawer-open">
        <input id="sidebar" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
            <AppHeader />
            <div class="container mx-auto py-3 lg:py-8 p-2 sm:p-4 md:p-8" id="content">
                <PageNavigation />
                <slot />
            </div>

            <AppFooter />
        </div>
        <div class="drawer-side">
            <label for="sidebar" aria-label="close sidebar" class="drawer-overlay"></label>
            <AppNavigation class="bg-base-300 text-base-content min-h-full w-80 p-4" />
        </div>
    </div>
</template>
