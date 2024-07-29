---
title: ' Administratix | Plugins | Red Plug'
description: 'Aprende a usar '
---

# Crear plugins

Está sección está especializada en explicar en como crear plugins paso por paso.

## Crear el repositorio

El primer paso antes de crear un plugin, es necesario contar con un repositorios, todos los plugins se almacenan en Github, en la organización de [__Red Plug__]{.text-primary}, es importante seguir las siguientes convenciones al nombrar el repositorio

- El repositorio debe de crearse en https://github.com/orgs/red-plug/repositories
- El nombre debe de comenzar por "packages-"
- El nombre debe de ser en minúsculas
- El nombre no debe contener espacios, usar guiones medio (-) en su lugar
- El nombre no debe de repertirse
- El nombre no puede contener carácteres especiales (!?.,:;'"-_()[]{}\/|@#$%^&*+=~`<>)
- El nombre siempre que se pueda debe de estar en plural

## composer.json

El primer archivo que se debe de crear en el repo es el _composer.json_ con el siguiente contenido:

::code-mockup{:class="mb-8"}
```json
{
    "name": "red-plug/el-nombre-de-tu-plugin", //el mismo que el del repositorio, quitando el "packages-"
    "type": "library",
    "authors": [
        // coloca cuantos autores sean necesarios
        {
            "name": "tu_nombre_de_github",
            "email": "tu_correo@de_github"
        }
    ],
    "autoload": {
        "psr-4": {
            "RedPlug\\Administratix\\Plugins\\ElNombreDeTuPlugin\\": "src/", // el nombre de tu plugin en CamelCase
        },
        "files": [
            "src/helpers.php", // este es opcional, solo si tu plugin requiere helpers
        ]
    },
    "autoload-dev": {
        "psr-4": {
            "RedPlug\\Administratix\\ElNombreDeTuPlugin\\": "tests/" // el nombre de tu plugin en CamelCase
        }
    },
    "scripts": {
        "test": "vendor/bin/testbench package:test",
        "format": "vendor/bin/pint"
    },
    "require-dev": {
        "orchestra/testbench": "^9.1",
        "laravel/pint": "^1.16",
        "phpunit/phpunit": "^10.5",
        "nunomaduro/collision": "^8.1"
    },
    "require": {
        "red-plug/administratix": "^1.0" // este siempre será obligatorio, agregar cuantos necesites
    },
    "extra": {
        "laravel": {
            "providers": [
                "RedPlug\\Administratix\\Plugins\\ElNombreDeTuPlugin\\ElNombreDeTuPluginServiceProvider" // el nombre de tu plugin en CamelCase
            ]
        }
    },
    "config": {
        "allow-plugins": {
            "pestphp/pest-plugin": true
        }
    }
}

```
::

## .gitignore

El siguiente archivo a crear será el _.gitignore_ el cuál nos ayudará a no cargar los repositorios con archivos inncesarios, puedes copiar tal cual el siguiente contenido, agrega más si es necesario

::code-mockup{:class="mb-8"}
```
/node_modules/
/vendor/
.phpunit.cache
composer.lock
package.lock.json
```
::


## .editorconfig
Puedes copiar y pegar el siguiente contenido

::code-mockup{:class="mb-8"}
```
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 4
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false

[*.{yml,yaml}]
indent_size = 2

[docker-compose.yml]
indent_size = 4x
```
::

## pint.json

Puedes copiar y pegar el siguiente contenido

::code-mockup{:class="mb-8"}
```json
{
    "preset": "laravel",
    "rules": {
        "blank_line_before_statement": true,
        "concat_space": {
            "spacing": "one"
        },
        "method_argument_space": true,
        "single_trait_insert_per_statement": true,
        "types_spaces": {
            "space": "single"
        }
    }
}
```
::


## El Service Provider

El proveedor de servicios, de ahora en adelante [Service Provider](https://laravel.com/docs/11.x/packages#service-providers) es la clase principal que se comunicará con el código base de Laravel, habitualmente ese Service Provider se nombra de la siguiente `src/ElNombreDetuPluginServiceProvider.php`este tiene que ser registrado en el `composer.json` de tu plugin para que [Laravel lo autoregistre](https://laravel.com/docs/11.x/packages#package-discovery).

Primero tienes que identificar si tu plugin es de tipo panel (como el [Developer Panel](/developer-panel)), si es así tu ServiceProvider debe de heredar de `Filament\PanelProvider`como lo indica la [documentación de Filament](https://filamentphp.com/docs/3.x/panels/plugins#distributing-a-panel-in-a-plugin), de lo contrario tendrás que heredar de `RedPlug\Administratix\Support\PluginServiceProvider` el cual a su vez es una extensión de [Laravel Package Tools](https://github.com/spatie/laravel-package-tools).

::code-mockup{:class="mb-8"}
```php
<?php

namespace RedPlug\Administratix\Plugins\ElNombreDeTuPlugin;

use RedPlug\Administratix\Support\PluginServiceProvider;
use Spatie\LaravelPackageTools\Package;

class ElNombreDeTuPluginServiceProvider extends PluginServiceProvider
{
    /**
     * Configure the full service provider for more info read the link phpdocs
     *
     * @link   https://github.com/spatie/laravel-package-tools?tab=readme-ov-file#usage
     * @param  \Spatie\LaravelPackageTools\Package $package
     * @return void
     */
    public function configurePackage(Package $package): void
    {
        $package->name('el-nombre-de-tu-plugin');
    }
}

```
::

## El Plugin

El siguiente paso es crear la clase Plugin, el Plugin es la clase principal que se comunicará con Filament y que se tiene que registrar manualente bajo demanda en cada panel de Filament, en caso de que tu plugin no requiera registrar [Filament Resources](https://filamentphp.com/docs/3.x/panels/resources/getting-started#overview) o [Filament Pages](https://filamentphp.com/docs/3.x/panels/pages#overview), es probable que no requieras esta clase, para leer la referencia completa revisa https://filamentphp.com/docs/3.x/support/plugins/build-a-panel-plugin

Tomar en cuenta todas las opciones de configuración que Laravel Package Tools ofrece, para la referencia completa lee https://github.com/spatie/laravel-package-tools?tab=readme-ov-file#usage


::code-mockup{:class="mb-8"}
```php
<?php

namespace RedPlug\Administratix\Plugins\ElNombreDeTuPlugin;

use RedPlug\Administratix\Plugins\ElNombreDeTuPlugin\Filament\Resources\BrandResource;
use RedPlug\Administratix\Plugins\ElNombreDeTuPlugin\Filament\Resources\CategoryResource;
use RedPlug\Administratix\Plugins\ElNombreDeTuPlugin\Filament\Pages\EcommerceSettingsPage;
use RedPlug\Administratix\Support\Filament\BasePlugin;

class ElNombreDeTuPluginPlugin extends BasePlugin
{
    /**
     * The id of the plugin
     *
     * @var string
     */
    protected $id = 'el-nombre-de-tu-pluggin';

    /**
     * The resources of the plugin
     * 
     * @var array
     */
    protected array $resources = [
        'brand' => BrandResource::class,
        'category' => CategoryResource::class
    ];

    /**
     * The pages of the plugins
     * 
     * @var array
     */
    protected array $pages = [
        'ecommerce-settings' => EcommerceSettingsPage::class
    ];
}
```
::

El anterior archivo permitirá configurar ciertos detalles de los recursos, para leer la completa referencia de opciones de configuración de los recursos lee [Personalización de recursos](/administratix/resource), para leer la completa referencia de opciones de configuración de las páginas lee [Personalización de páginas](/administratix/page)

## Estructura del plugin

Tu repositorio debe de lucir de la siguiente manera

::code-mockup{:class="mb-8"}
```
config/
    el-nombre-de-tu-plugin.php
database/
    migrations/
src/
    Filament/
        Resources/
        Widgets/
        Pages/
    Models/
    Repositories/
    Settings/
    ElNombreDeTuPluginServiceProvider.php
    ElNombreDeTuPluginPlugin.php
    helpers.php
resources/
    views/
tests/
    Feature/
    Unit/
    TestCase.php
composer.json
.gitignore
.editorconfig
pint.json
phpunit.xml
```
::

