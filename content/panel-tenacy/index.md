---
title: 'Panel Tenacy | Red Plug'
description: 'Agrega distinción de registros entre paneles'
---

# Panel Tenacy

Panel tenacy es un plugin que te ayuda a mantener tus registros de base de datos separados por panel, es decir que si por ejemplo tienes un panel de `b2b` y otro de `b2c`, cada panel tendrá sus propios productos, marcas y categorías.


## Instalación

Panel Tenacy se intala autómaticamente junto con [Adminsitratix](/administratix) por lo que no requires correr ningún otro comando

## Uso

Abre tu [Filament panel](https://filamentphp.com/docs/3.x/panels/configuration#introducing-panels) y agrega a la sección de plugins:


::code-mockup{:class="mb-8"}
```php

use RedPlug\Administratix\Plugins\PanelTenacy\PanelTenacyPlugin;

->id('admin')
->path('admin')
->plugins([
    PanelTenacyPlugin::make()
])
```
::

corre el siguiente comando para crear las tablas de Panel Tenacy


::code-mockup{:class="mb-8"}
```bash
php artisan migrate
```
::

corre el siguiente comando para sincronizar los paneles en base de datos


::code-mockup{:class="mb-8"}
```bash
php artisan administratix:panels
```
::


Por último asegurate que los modelos que desees que tengan diferenciación de paneles, agrega el siguiente trait:

::code-mockup{:class="mb-8"}
```php

use RedPlug\Administratix\Plugins\PanelTenacy\Concerns\BelongsToPanels;
use Illuminate\Database\Eloquent\Model;

class MyModel extends Model
{
    use BelongsToPanel;
}
```
::


## Obtener registros de un panel

en caso de que estes creando un seeder o cualquier otro código que requiera acceder a registros de una panel en específico, puedes acceder a los [local scopes](https://laravel.com/docs/11.x/eloquent#local-scopes) del modelo


::code-mockup{:class="mb-8"}
```php
MyModel::query() 
        ->withoutPanel(); // quita el filtrado por panel

MyModel::query()
        ->fromPanel('admin'); // obtiene los registros específicos del panel 'admin'
```
::

### Contexto de panel

En caso de que requieras realizar operaciones completas sobre algún proceso en específico puedes usar la Facade `PanelTenacy`, la cual funciona como transacciones de base de datos:


::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Plugins\PanelTenacy\Facades\PanelTenacy;

PanelTenacy::withTenacy('admin', function () {
    $instance = MyModel::create($data);

    $instance->delete();
});


PanelTenacy::withTenacy(['admin', 'b2b'], function () { // también es posible realizar esto con varios paneles

})
```
::

Si no necesitas ningún contexto de panel simplemente:

::code-mockup{:class="mb-8"}
```php
PanelTenacy::withTenacy(null, function () {
    $instance = MyModel::create($data);

    $instance->delete();
});

PanelTenacy::withoutTenacy(function () { // esta manera es más descriptiva

});

```
::

### Contexto de panel manual

Si requieres modificar por completo el panel en que se están realizando las acciones puedes usar el método `set`:


::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Plugins\PanelTenacy\Facades\PanelTenacy;

PanelTenacy::set('admin'); // recibe por parametro el ID del panel
PanelTenacy::set(['admin', 'b2b']); // es posible asignar varios paneles al mismo tiempo

$instance = MyModel::create($data);

$instance->delete();

```
::

Si requieres obtener el contexto del panel actual siendo utilizado:

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Plugins\PanelTenacy\Facades\PanelTenacy;

$panelId = PanelTenacy::get();

info($panelId); // ['admin']

```
::

Panel Tenacy funciona en base a Context de Laravel, para mayor información lee https://laravel.com/docs/11.x/context#introduction