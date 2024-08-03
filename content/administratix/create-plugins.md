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

    /**
     * The widgets of the plugin
     * 
     * @var array
     */
    protected array $widgets = [
        EcommerceOverview::class
    ];

    /**
     * The livewireComponents of the plugin
     * 
     * @var array
     */
    protected array $livewireComponents = [];
}
```
::

El anterior archivo permitirá configurar ciertos detalles de los recursos, para leer la completa referencia de opciones de configuración de los recursos lee [Personalización de recursos](/administratix/resource), para leer la completa referencia de opciones de configuración de las páginas lee [Personalización de páginas](/administratix/page)

## Estructura del plugin

Tu repositorio debe de lucir de la siguiente manera, toma en cuenta que no todas las carpetas son obligatorias

::code-mockup{:class="mb-8"}
```

config/
    el-nombre-de-tu-plugin.php
database/
    migrations/
src/
    Console/
    Filament/
        Resources/
        Widgets/
        Pages/
    Livewire/
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
README.md
```
::

## Resource de tu plugin

En caso de que tu plugin cuente con un resource de Filament, este debe de heredar de `RedPlug\Administratix\Support\Filament\Resources\Resource` y lucir como la siguiente estructura, toma en cuenta que niguna propiedad será tomada en cuenta, para configurar el resource debes de utlizar la función `setUp`



::code-mockup{:class="mb-8"}
```php
<?php


use RedPlug\Administratix\Support\Filament\Resources\BaseResource;
use RedPlug\Administratix\Support\Settings;

class BrandResource extends BaseResource
{
    protected static string $resourceName = 'brand';    

    protected static string $plugin = ElNombreDeTuPluginPlugin::class;

    public static function setUp(Settings $resourceDefaults): Settings
    {
        return $resourceDefaults->navigationIcon('heroicon-o-folder')
                                ->model(Brand::class)
                                ->pages([
                                    'index' => Pages\ManageBrands::route('/'),
                                    'edit' => Pages\EditBrand::route('/{record}/edit')
                                ])
                                ->relations([
                                    CategoriesRelationManager::class
                                ])
                                ->widgets([
                                    BrandOverview::class
                                ])
                                ->setUpTable(function(Table $table): void {
                                    $table->columns([
                                        TextColumn::make('id')
                                    ])
                                    ->filters([
                                        Filter::make('name')
                                    ])
                                    ->bulkActions([
                                        BulkAction::make('34')
                                    ]);
                                })
                                ->setUpForm(function(Form $form): void {
                                    $form->schema([
                                        TextInput::make('created_at')
                                    ]);
                                })
                                ->setUpPage('index', function(ManageRecordsSettings $settings): void {
                                    $settings->headerWidgets([
                                        BrandOverview::class
                                    ]);
                                });
    }
}

```
::

Para leer la completa referencia de settings de resource lee [settings de resource](/administratix/resource), toma en cuenta que es obligatorio declarar el plugin al que pertenece este resource en la propiedad `$plugin`, por último registra este resource en la propiedad `$resources` de tu plugin:


::code-mockup{:class="mb-8"}
```php
<?php
{

    /**
     * The resources of the plugin
     * 
     * @var array
     */
    protected array $resources = [
        'brand' => BrandResource::class,
    ];

}

```
::

es importante que la propiedad de tu resource `$resourceName` coincida con el que colocas como llave en el array de `$resources`.


## Page de tu plugin

En caso de que tu plugin cuenten con alguna Filament Page, este debe de heredar de `RedPlug\Administratix\Support\Filament\Pages\BasePage` y lucir como la siguiente estructura, toma en cuenta que niguna propiedad será tomada en cuenta, para configurar la page debes de utlizar la función `setUp`



::code-mockup{:class="mb-8"}
```php
<?php

use RedPlug\Administratix\Support\Filament\Pages\BasePage;
use RedPlug\Administratix\Support\Settings;

class SettingsPage extends BasePage
{

    protected static string $plugin = ElNombreDeTuPlugin::class;
    protected static string $pageName = 'config';


    /**
     * Configure the default for the current resource
     * 
     * @param  \RedPlug\Administratix\Support\Filament\Pages\PageSettings $resourceDefaults
     * @return \RedPlug\Administratix\Support\Filament\Pages\PageSettings
     */
    public static function setUp(Settings $pageDefaults): Settings
    {
        return $pageDefaults
                    ->view('filament.pages.test-page')
                    ->navigationIcon('heroicon-o-document-text');
    }
}


```
::

Para leer la completa referencia de settings de page lee [settings de page](/administratix/page), toma en cuenta que es obligatorio declarar el plugin al que pertenece este resource en la propiedad `$plugin`, por último registra esta page en la propiedad `$pages` de tu plugin:


::code-mockup{:class="mb-8"}
```php
<?php
{

    /**
     * The pages of the plugin
     * 
     * @var array
     */
    protected array $pages = [
        'config' => SettingsPage::class,
    ];

}

```
::

es importante que la propiedad de tu resource `$pageName` coincida con el que colocas como llave en el array de `$pages`.


## Widgets de tu plugin

En caso de que tu plugin cuente con widgets de Filament que no pertenezcan como tal a un recurso puedes registrarlos en la propiedad `$widgets` de tu plugin

::code-mockup{:class="mb-8"}
```php
<?php
{

    /**
     * The widgets of the plugin
     * 
     * @var array
     */
    protected array $widgets = [
        'config' => ProfileOverview::class,
    ];

}

```
::

## Livewire components de tu plugin

En caso de que tu plugin cuente con componentes de Livewire que no cuenten con funcionalidades de Filament como tal puedes registrarlos en la propiedad `$livewireComponents` de tu plugin

::code-mockup{:class="mb-8"}
```php
<?php
{

    /**
     * The livewire components of the plugin
     * 
     * @var array
     */
    protected array $livewireComponents = [
        'profile' => Profile::class,
    ];

}

```
::

## Permisos de tu plugin

En caso de que tu plugin cuente con enums de permisos provenientes de [PermissionManager](/permission-manager), puedes registrarlos en la propiedad `$permissions` de tu plugin

::code-mockup{:class="mb-8"}
```php
<?php
{
    /**
     * The permissions enums array
     * 
     * @var array
     */
    protected array $permissions = [
        BrandPermissions::class
    ];
}
```
::


## Los modelos de tu plugin

Es importante recordar que Administratix ofrece algunos subplugins que ayudan a mejorar y facilitar el desarrollo de nuestros plugins, algunos de estos plugins están estrictamente relacionados a los modelos, de los cuales se manejan con traits, es por eso que se recomiendan las siguientes implementaciones por modelo


### Panel Tenacy

Existirán aplicaciones que requeriran identificar registros de cada panel, no estamos utlizando las funcionalidades [Filament de Multi-Tenacy](https://filamentphp.com/docs/3.x/panels/tenancy) porque Filament lo recomienda para un solo panel, además de que queremos que el programador final pueda implementar esto ya en el desarrollo de la aplicación y no del plugin.

Para agregar identificación de panel es necesario agregar el trait `RedPlug\Administratix\Plugins\PanelTenacy\Concerns\BelongsToPanels` a tus modelos, para más información lee [Panel Tenacy de Administratix](/panel-tenacy).

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

### Lang Manager (Under construction...)

Exisitirán aplicaciones que requerirán soporte de múlitples idiomas para los registros, no estamos utilizando las funcionalidades de [Spatie Translatable](https://filamentphp.com/plugins/filament-spatie-translatable) porque guarda demasiada información en los registros y no es escalable este plugin, por lo tanto solo tomamos inspiración para crear nuestra propia solución de múlti-idioma en base a relaciones de eloquent.

Para agregar múltiples traducciones a los campos de un modelo es necesario agregar el trait `RedPlug\Administratix\Plugins\LangManager\Concerns\HasTranslations` y definir la propiedad `$translatable`:

::code-mockup{:class="mb-8"}
```php

use RedPlug\Administratix\Plugins\LangManager\Concerns\HasTranslations;
use Illuminate\Database\Eloquent\Model;

class MyModel extends Model
{
    use HasTranslations;

    protected array $translatable = [
        'name',
        'description'
    ];
}
```
::

### Query Boost
Intentamos dejar los modelos lo más limpios posibles para su mejor optimización, es por ello que contamos con el plugin query boost, el cual nos ayuda a optimizar y facilitar algunas tareas, por ejemplo, quitar las columnas de `created_at` y `updated_at`, ya que pocas veces nos serán útiles.

Para agregar los boosts de query habituales agrega los siguientes traits:

::code-mockup{:class="mb-8"}
```php

use Illuminate\Database\Eloquent\Model;

class MyModel extends Model
{
    use RedPlug\Administratix\Plugins\QueryBoost\Database\Eloquent\Concerns\DefaultSelect;

    protected $defaultSelect = [
        'id',
        'name'
    ];
}
```
::

## Nombres de tablas


Para crear los nombres de las tablas contamos con algunas funciones especiales que se dedican a construir los nombres de las tablas,

la convención de nombres es:

> red_plug_brands

donde brands es el nombre de nuestra tabla, el prefijo red_plug se agregará mediante una función:

::code-mockup{:class="mb-8"}
```php

buildRedPlugTableName(
    'panel-tenacy.table-prefix',
    'panel-tenacy.models.panel.table'
);
```
::

los parámetros son keys de configuración, es decir los nombres de las tablas se almacen en su config correspondiente, se recomienda crear una función helpers para cada tabla, ya que será utilizado más de una vez:

::code-mockup{:class="mb-8"}
```php
if (! function_exists('buildPanelTenacyPanelTableName')) {
    /**
     * Get the name for the table
     * 
     * @return string
     */
    function buildPanelTenacyPanelTableName(): string
    {
        return buildRedPlugTableName(
            'panel-tenacy.table-prefix',
            'panel-tenacy.models.panel.table'
        );
    }
}
```
::

y ahora sí agregarlos a lugares donde se suele utilizar, como migraciones y el modelo en sí


::code-mockup{:class="mb-8"}
```php
    /**
     * Get the table associated with the model.
     *
     * @return string
     */
    public function getTable()
    {
        return buildPanelTenacyPanelTableName();
    }
```
::

::code-mockup{:class="mb-8"}
```php
    Schema::create(buildPanelTenacyPanelTableName(), function (Blueprint $table) {
```
::

## Documentación

Recuerda clasificar tu plugin dentro de nuestras categorías:
- Framework
- Módulo
- Sistema

y crear su respectiva documentación en el repositorio de [package-docs](https://github.com/red-plug/packages-docs), puedes seguir el ejemplo de la documentación de [red-plug/brands](/brands)


## Versión 

Por último es necesario etiquetar tu plugin en git, para ello revisa la [última versión de administratix](https://github.com/red-plug/packages-administratix/releases), tomá el primer número y utiliza ese número para etiquetar tu plugin,

ejemplo si administratix está en la versión 3.4.2, solo tomá el número 3, y el resto conforme a lo que corresponda la implementación, para mayor información lee [versionamiento semantico](https://semver.org/lang/es/)

corre el siguiente comando

## README

El readme de tu plugin debe de dar una rápida introducción a lo que hace y como instalarlo en tu aplicación, sigue el ejemplo de [make a readme](https://www.makeareadme.com/#template-1)


::code-mockup{:class="mb-8"}
```bash
git tag 1.0.0
```
::
y subelo a github con el siguiente comando


::code-mockup{:class="mb-8"}
```bash
git push origin 1.0.0
```
::

por último crea un release en Github para notificar a todos de que existe una nueva versión agregar el link a la nueva documentación, además de agregar el sitio web a la documentación