---
title: 'Pulse | Red Plug'
description: 'Obten perspectivas acerca de tu aplicación'
---

# Pulse

Laravel Pulse es una herramienta de motinoreo creada por los desarrolladores de Laravel, permite ver distintas métricas de la aplicación, desde recursos del sistema hasta queries lentos de la aplicación asi como cache y otras herramientas.

[__Red Plug__]{.text-primary} cuenta con su propia integración como Filament Plugin para que se pueda visualizar en cualquier panel, dentro de la navegación del mismo, además añade una capa de seguridad para asegurar que solo las personas con sus permisos correspondientes pueden ver las métricas.


## Instalación

Pulse se instala autómaticamente junto con [Adminsitratix](/administratix) por lo que no requires correr ningún otro comando

## Uso

Abre tu [Filament panel](https://filamentphp.com/docs/3.x/panels/configuration#introducing-panels) y agrega a la sección de plugins:


::code-mockup{:class="mb-8"}
```php

use RedPlug\Administratix\Plugins\Pulse\PulsePlugin;


->id('admin')
->path('admin')
->plugins([
    PulsePlugin::make()
])
```
::

corre el siguiente comando para crear las tablas de Pulse


::code-mockup{:class="mb-8"}
```bash
php artisan migrate
```
::

corre el siguiente comando para sincronizar los permisos de Pulse


::code-mockup{:class="mb-8"}
```bash
php artisan administratix:permissions
```
::

dirigite al administrador en el navegador y ya deberías de poder ver un nuevo item en el menú de navegación, si no lo puedes ver asegurate de tener asignados los permisos de Pulse

Si quieres añadir alguna métrica en cualquier página, así como en el dashboard puedes utilizar los siguientes widgets (cada widget tiene su permiso asignado, asegurate de tener ese permiso para poder visualizar el widget):


::code-mockup{:class="mb-8"}
```php

use RedPlug\Administratix\Plugins\Pulse\Filament\Widgets\Cache;
use RedPlug\Administratix\Plugins\Pulse\Filament\Widgets\Exceptions;
use RedPlug\Administratix\Plugins\Pulse\Filament\Widgets\Queues;
use RedPlug\Administratix\Plugins\Pulse\Filament\Widgets\Servers;
use RedPlug\Administratix\Plugins\Pulse\Filament\Widgets\SlowJobs;
use RedPlug\Administratix\Plugins\Pulse\Filament\Widgets\SlowOutgoingRequests;
use RedPlug\Administratix\Plugins\Pulse\Filament\Widgets\SlowQueries;
use RedPlug\Administratix\Plugins\Pulse\Filament\Widgets\SlowRequests;
use RedPlug\Administratix\Plugins\Pulse\Filament\Widgets\Usage;

protected function getHeaderWidgets(): array
{
    return [
        Servers::make(),
        Queues::make(),
        Cache::make(),
        Exceptions::make(),
        Usage::make(),
        SlowJobs::make(),
        SlowOutgoingRequests::make(),
        SlowQueries::make(),
        SlowRequests::make(),
    ];
}
```
::