---
title: 'Permission Manager | Red Plug'
description: 'Aprende a usar '
---

# Permission Manager

Permission Manager es un plugin incluido con [Administratix](/administratix), este plugin  busca facilitar la autorización de administradores mediante permisos y roles.


## El modelo User

Por defecto al crear un nuevo proyecto en Laravel, viene un modelo `User` incluido en la carpeta modelos de tu proyecto, para facilitar la autorización cambia la herencia por el modelo de Administratix:

::code-mockup{:class="mb-8"}
```php

use RedPlug\Administratix\Models\Authenticatable as Model;

class User extends Model
{
    use HasFactory, Notifiable;
    
    //
}
```
::

esto automaticamente configurará tu modelo para autorizar su acceso a los paneles mediantes permisos

## Escribir permisos

Para manejar nuevos permisos en nuestra aplicación/plugin es necesario hacerlo mediante enums, ya sea que estes escribiendo un plugin o haciendo una aplicación hay que crear la carpeta Enums/ donde irá nuestro `Permissions.php` enum, tu enum debe de lucir como:

::code-mockup{:class="mb-8"}
```php
enum Permissions: string
{
    case VIEW_ANY = 'brands_view_any';
    case CREATE = 'brands_create';
    case UPDATE = 'brands_update';
    case VIEW = 'brands_view';
    case DELETE = 'brands_delete';
    case DELETE_ANY = 'brands_delete_any';
    case FORCE_DELETE = 'brands_force_delete';
    case FORCE_DELETE_ANY = 'brands_force_delete_any';
    case RESTORE = 'brands_restore';
    case RESTORE_ANY = 'brands_restore_any';
    case REORDER = 'brands_reorder';
}
```
::

## Registrar permisos

Para registrar nuevos permisos en tu panel debes de llamar a la clase `RedPlug\Administratix\Plugins\PermissionManager\Support\PermissionManager` mediante el binding de [Laravel](https://laravel.com/docs/11.x/container#automatic-injection):

En caso de que estes escribiendo un plugin lee [Registrar permisos en plugin](/administratix/create-plugins#permisos-de-tu-plugin)

::code-mockup{:class="mb-8"}
```php

use RedPlug\Administratix\Plugins\PermissionManager\Support\PermissionManager;

public function index(Request $request, PermissionManager $permissionManager)
{
    //
}

```
::

En caso de que no puedas acceder a la [inyección autómatica de dependencias](https://laravel.com/docs/11.x/container#automatic-injection) puedes llamar a su método make:

::code-mockup{:class="mb-8"}
```php

use RedPlug\Administratix\Plugins\PermissionManager\Support\PermissionManager;

public function manageSomething()
{
    $permissionManager = PermissionManager::make();
}
```
::

Y llamar al método register, habitualmente esto debe de ser en el `ServiceProvider`, recuerda que si tienes más de un panel tienes que indicar en que paneles se va a registrar.

::code-mockup{:class="mb-8"}
```php
$permissionManager->register(PermissionsManager::class, $panelId);
```
::

## Sincronizar permisos
Para sincronizar los permisos con base de datos simplemente corre el siguiente comando
::code-mockup{:class="mb-8"}
```bash
php artisan administratix:permissions
```
::

## Obtener permisos de un panel

Para obtener todos los permisos relacionados a un panel simplemente accede al método `get` de PermissionManager:
::code-mockup{:class="mb-8"}
```php
    $permissionManager->get($panelId);
```
::

Para mayor información de como usar enums para verificar permiso [lee la documentación de Laravel Permission](https://spatie.be/docs/laravel-permission/v6/basic-usage/enums)

## Politicas de acceso

para escribir políticas de acceso por modelo solo es necesario seguir [la documentación de Laravel Policies](https://laravel.com/docs/11.x/authorization#creating-policies), recuerda seguir los métodos que [Filament declara](https://filamentphp.com/docs/3.x/panels/resources/getting-started#authorization).  


Para registrar policies en tu aplicación lee la documentación https://laravel.com/docs/11.x/authorization#registering-policies  

Para registrar politicas en tu plugin hazlo en tu service provider:


::code-mockup{:class="mb-8"}
```php

use Illuminate\Support\Facades\Gate;

public function packageBooted()
{
    Gate::policy($this->app->config['brands.models.brand.model'], $this->app->config['brands.models.brand.policy']);
}
```
::