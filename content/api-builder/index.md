---
title: 'API Builder | Red Plug'
description: 'Agrega una API a tu panel siguiendo la especificación JSON:API'
---

# API Builder

API builder es una extensión de [Laravel JSON API](https://laraveljsonapi.io/docs/3.0/getting-started/), el cual ofrece una serie de procesos y clases para facilitar la creación de APIs siguiendo la [especificación JSON:API](https://jsonapi.org/)

## Instalación

API Builder se instala autómaticamente junto con [Adminsitratix](/administratix) por lo que no requires correr ningún otro comando, sin embargo es necesario modificar tu `bootstrap/app.php` para [configurar los errores JSON](https://laraveljsonapi.io/docs/3.0/getting-started/#exception-handler):

::code-mockup{:class="mb-8"}
```php
<?php

use Illuminate\Foundation\Configuration\Exceptions;
use RedPlug\Administratix\Plugins\ApiBuilder\Exceptions\Handler;

->withExceptions(function (Exceptions $exceptions) {
    Handler::make($exceptions);
});

```
::


## Uso

Abre tu [Filament panel](https://filamentphp.com/docs/3.x/panels/configuration#introducing-panels) y agrega a la sección de plugins:


::code-mockup{:class="mb-8"}
```php

use RedPlug\Administratix\Plugins\ApiBuilder\ApiBuilderPlugin;

->id('admin')
->path('admin')
->plugins([
    ApiBuilderPlugin::make()
])
```
::

Esto automáticamente habilitará una API con la configuración de tu panel, para iniciar visita la url `/nombre-de-tu-panel/api` esta página te dará ejemplos de los endpoints a los que puedes realizar peticiones tipo json:



![Api Overview](/api-builder/api-overview.png)

Si requieres visualizar todas las rutas tipo API que tiene tu planel corre el siguiente comando:


::code-mockup{:class="mb-8"}
```bash
php artisan route:list --path=nombre-de-tu-panel/api
```
::

La mayoría de plugins creados por la organización de [__Red Plug__]{.text-primary} cuentan con sus propios endpoints, si agregas cualquier otro plugin estos estarán habilitados, recuerda que `ApiBuilderPlugin` se debe encontrar al último de los plugins, ya que si se registra antes que el resto de plugins estos no podrán registrar sus rutas api en tu panel:

::code-mockup{:class="mb-8"}
```php

use RedPlug\Administratix\Plugins\Brands\BrandsPlugin;
use RedPlug\Administratix\Plugins\ApiBuilder\ApiBuilderPlugin;

->id('admin')
->path('admin')
->plugins([
    BrandsPlugins::make(),
    ApiBuilderPlugin::make()
])
```
::

En dado caso que no requieras las rutas api de un plugin en particular puedes desactivarlo con el método `withoutApi`:

::code-mockup{:class="mb-8"}
```php

use RedPlug\Administratix\Plugins\Brands\BrandsPlugin;

->id('admin')
->path('admin')
->plugins([
    BrandsPlugins::make()
                ->withoutApi(),
])
```
::


## Autorizar peticiones

Para permitir el uso de peticiones en la API, API Builder cuenta con un resource para administrar tokens de acceso a la api:



![Server tokens resource](/api-builder/server-tokens.png)


La verificación de acceso es de la siguiente manera

1. Verificación de Server Token (revisa el header Authorization: Bearer {TOKEN})
2. Verifica la IP proveniente de la petición
3. Verifica el dominio proveniente de la petición

Toma en cuenta que el Server Token es un dato sensible por lo tanto no lo expongas al público, en su lugar utiliza la IP o el dominio autorizado.


## Agregar endpoints a tu API

Para crear nuevos endpoints a tu API puedes referirte totalmente a la documentación de https://laraveljsonapi.io/docs/3.0/schemas/, solo toma en cuenta que todos tus esquemas los debes de crear heredando de `RedPlug\Administratix\Plugins\ApiBuilder\Support\JsonApi\Schema` y debes de configurar las opciones principales del schema de la siguiente manera:

::code-mockup{:class="mb-8"}
```php
 
namespace App\JsonApi\Admin\Brands;

use RedPlug\Administratix\Plugins\ApiBuilder\Support\ApiResourceSettings;
use RedPlug\Administratix\Plugins\ApiBuilder\Support\ApiRelationSettings;
use RedPlug\Administratix\Plugins\ApiBuilder\Support\JsonApi\Schema;

class BrandSchema extends Schema
{

    /**
     * The api schema name saved in the plugin instance
     * 
     * @var string
     */
    protected static string $resourceName = 'brands';

    public static function setUp(ApiResourceSettings $apiSchemaDefaults): ApiResourceSettings
    {
        return $apiSchemaDefaults
                    ->model(Brand::class)
                    ->fields([
                        ID::make(),
                        DateTime::make('createdAt')->sortable()->readOnly(),
                        DateTime::make('updatedAt')->sortable()->readOnly(),
                        Str::make('name'),
                        HasMany::make('products')->readOnly(),
                    ])
                    ->relations('products', function(ApiRelationSettings $apiRelationSettings): void {
                        $apiRelationSettings->relationType('hasMany');
                    })
                    ->filters([
                        Where::make('name'),
                    ])
                    ->pagination(function(): ?Paginator {
                        return PagePagination::make();
                    })
                    ->authorizable(false)
                    ->sortables([
                        SortColumn::make('publishedAt', 'published')
                    ]);
    }

}

```
::


Una vez creado tu API Resource, agregarlo al plugin de API Builder:

::code-mockup{:class="mb-8"}

```php

use RedPlug\Administratix\Plugins\ApiBuilder\ApiBuilderPlugin;
use App\JsonApi\Admin\Brands\BrandSchema;

->id('admin')
->path('admin')
->plugins([
    ApiBuilderPlugin::make()
            ->apiSchemas([
                'brands' => BrandSchema::class
            ])
])
```
::

## Personalizar y extender APIs de Plugins

En caso que las configuraciones de un API schema proveido por plugins no cumpla con las necesidades de tu proyecto siempre puedes configurar por panel el schema del plugin, las configuraciones son las mismas vistas previmente de `ApiSchemaSettings`:

::code-mockup{:class="mb-8"}
```php

use RedPlug\Administratix\Plugins\ApiBuilder\ApiBuilderPlugin;
use RedPlug\Administratix\Plugins\Brands\BrandsPlugin;
use RedPlug\Administratix\Plugins\ApiBuilder\Support\ApiSchemaSettings;

->id('admin')
->path('admin')
->plugins([
    BrandsPlugin::make()
            ->configureApiResourceUsing('brands', function(ApiSchemaSettings $apiSchemaSettings): void {
                            $apiSchemaSettings->appendFields([
                                Str::make('description')
                            ]);
                        }),
    ApiBuilderPlugin::make(),
])
```
::

## Personalizar el servidor 

Para poder modificar las opciones del servidor `ApiBuilderPlugin` cuenta con varios métodos que puedes configurar por panel:


::code-mockup{:class="mb-8"}
```php

use RedPlug\Administratix\Plugins\ApiBuilder\ApiBuilderPlugin;

->id('admin')
->path('admin')
->plugins([
    ApiBuilderPlugin::make()
                ->server(AnotherServer::class) // lee https://laraveljsonapi.io/docs/3.0/servers/#defining-servers
                ->serverName('admin2')
                ->serverUri('api/v1')
                ->serverDomain('api.domain.com')
                ->serverMiddlewares([
                    Authenticatable::clas
                ])
])
```
::

En caso de que estes desarrollando un plugin que requiera de un servidor personalizado puedes agregar a tu plugin el trait `RedPlug\Administratix\Plugins\ApiBuilder\Concerns\HasApiServer`:

::code-mockup{:class="mb-8"}
```php

use RedPlug\Administratix\Plugins\ApiBuilder\Concerns\HasApiServer;
use RedPlug\Administratix\Support\Filament\BasePlugin;

class MyPlugin extends BasePlugin
{
    use HasApiServer;

    protected function registerApiRouting(): void
    { 
        // ...
    }
}

```
::

## Meilisearch

Este plugin agrega de manera un poco oculta soporte para [laravel scout](https://laravel.com/docs/11.x/scout#meilisearch) usando [Meilisearch](https://www.meilisearch.com) como driver. En caso de que quieras agregar la búsqueda mediante api, simplemente sigue los pasos instruídos por Laravel y agrega a tu esquema el siguiente filtro:

::code-mockup{:class="mb-8"}
```php
 
namespace App\JsonApi\Admin\Brands;

use RedPlug\Administratix\Plugins\ApiBuilder\Support\ApiResourceSettings;
use RedPlug\Administratix\Plugins\ApiBuilder\Support\JsonApi\Schema;
use RedPlug\Administratix\Plugins\ApiBuilder\Support\JsonApi\Filters\Search;

class BrandSchema extends Schema
{

    /**
     * The api schema name saved in the plugin instance
     * 
     * @var string
     */
    protected static string $resourceName = 'brands';

    public static function setUp(ApiResourceSettings $apiSchemaDefaults): ApiResourceSettings
    {
        return $apiSchemaDefaults
                    ->model(Brand::class)
                    ->fields([
                        // ...
                    ])
                    ->filters([
                        Search::make()
                    ]);
    }

}

```
::

esto te permitirá en tus consultas aplicar la búsqueda:


::code-mockup{:class="mb-8"}
```
/admin/api/brands?filter[search]=Texto+de+búsqueda
```
::