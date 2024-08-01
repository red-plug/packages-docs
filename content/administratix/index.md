---
title: 'Administratix | Red Plug'
description: 'Aprende a usar '
---

# Administratix

## Requerimientos

- PHP 8.3+
- Laravel v11.0+
- Livewire v3.0+

## Instalación

> Administratix solo funciona en instalaciones nuevas de Laravel

Primero necesitarás modificar el `composer.json` de tu proyecto para agregar la [configuración de repositories](https://getcomposer.org/doc/articles/handling-private-packages.md)

::code-mockup{:class="mb-8"}
```json
{
    ...
    "repositories": [
        {
            "type": "vcs",
            "url": "https://github.com/red-plug/packages-administratix"
        }
    ]
    ...
}

```
::

Una vez realizado lo anterior puedes correr el siguiente comando en consola para instalar `red-plug/administratix`


::code-mockup{:class="mb-8"}
```bash
composer require red-plug/administratix
```
::

Una vez instalado el paquete, corre el siguiente comando

::code-mockup{:class="mb-8"}
```bash
php artisan administrator:install
```
::

El comando [instalará filament](https://filamentphp.com/docs/3.x/panels/installation#installation), te permitirá crear uno o más paneles y te [creará los temas](https://filamentphp.com/docs/3.x/panels/themes#creating-a-custom-theme) necesarios para cada uno de ellos en base a los estilos de [red-plug/stylist](/stylist).