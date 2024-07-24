<template>
    <div class="navbar bg-neutral text-neutral-content w-full sticky top-0 z-10">
        <div class="flex-none lg:hidden">
            <label for="sidebar" aria-label="open sidebar" class="btn btn-square btn-ghost">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    class="inline-block h-6 w-6 stroke-current">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16">
                    </path>
                </svg>
            </label>
        </div>
        <div class="mx-2 flex-1 px-2">
            <NuxtLink to="/" class="btn btn-primary btn-outline btn-ghost mx-auto">
                Packages Docs
            </NuxtLink>
        </div>
        <div>
            <ThemeController></ThemeController>
        </div>
    </div>
</template>