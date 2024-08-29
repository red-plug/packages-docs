---
title: 'API Builder | Red Plug'
description: 'Agrega una API a tu panel siguiendo la especificación JSON:API'
---

# API Builder

API builder es una extensión de [Laravel JSON API](https://laravel-json-api.readthedocs.io/en/latest/), el cual ofrece una serie de procesos y clases para facilitar la creación de APIs siguiendo la [especificación JSON:API](https://jsonapi.org/)

## Instalación

Panel Tenacy se instala autómaticamente junto con [Adminsitratix](/administratix) por lo que no requires correr ningún otro comando

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

Esto automáticamente habilitará una API con la configuración de tu panel, para iniciar visita la url `/nombre-de-tu-panel/api` esta página te dará ejemplos de los endpoints a los que puedes realizar peticiones tipo json, si requieres visualizar todas las rutas tipo API que tiene tu planel corre el siguiente comando


::code-mockup{:class="mb-8"}
```bash
php artisan route:list --path=nombre-de-tu-panel/api
```
::

La mayoría de plugins creados por la organzación de [__Red Plug__]{.text-primary} cuentan con sus propios endpoints, si agregas cualquier otro plugin estos estarán habilitados, recuerda que `ApiBuilderPlugin` se debe encontrar al último de los plugins, ya que si se registra antes que el resto de plugins estos no podrán registrar sus rutas api en tu panel:

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

Para crear nuevos endpoints a tu API puedes referirte totalmente a la documentación de https://laravel-json-api.readthedocs.io/en/latest, solo toma en cuenta que todo lo relacionado a resolvers no aplica, en cambio tendrás que crear `ApiResources`, estos deben extender de `RedPlug\Administratix\Plugins\ApiBuilder\Support\ApiResource` y configurar tu ApiResource con los datos necesarios (minimanente model, adapter y schema)

::code-mockup{:class="mb-8"}
```php

namespace App\JsonApi\Brand;

use RedPlug\Administratix\Plugins\ApiBuilder\Support\ApiResource as BaseApiResource;
use RedPlug\Administratix\Plugins\ApiBuilder\Support\ApiResource\ApiResourceSettings;
use App\Models\Brand;
use App\JsonApi\Brand\Adapter;
use App\JsonApi\Brand\Schema;
use App\JsonApi\Brand\Validators;
use App\JsonApi\Brand\Authorizer;
use App\JsonApi\Brand\ContentNegotiator;

class ApiResource extends BaseApiResource
{
    public function setUp(ApiResourceSettings $apiResourceDefaults): ApiResourceSettings
    {
        return $apiResourceDefaults
                    ->model(Brand::class)
                    ->adapter(Adapter::class)
                    ->schema(Schema::class);
    }
}
```
::

todas las opciones a modificar son las siguientes

::code-mockup{:class="mb-8"}
```php

use RedPlug\Administratix\Plugins\ApiBuilder\Support\ApiResource\ApiResourceSettings;
use CloudCreativity\LaravelJsonApi\Routing\ResourceRegistration;

public function setUp(ApiResourceSettings $apiResourceDefaults): ApiResourceSettings
{
    return $apiResourceDefaults
                ->model(Brand::class) // obligatorio, el modelo al que pertenece
                ->adapter(Adapter::class) // obligatorio, el adaptador al que pertenece https://laravel-json-api.readthedocs.io/en/latest/basics/adapters/
                ->schema(Schema::class) // obligatorio, el schema al que pertenece https://laravel-json-api.readthedocs.io/en/latest/basics/schemas/
                ->validator(Validators::class) // https://laravel-json-api.readthedocs.io/en/latest/basics/validators/
                ->controller(ApiBrandController::class) // https://laravel-json-api.readthedocs.io/en/latest/basics/controllers/
                ->authorizer(Authorizer::class) // https://laravel-json-api.readthedocs.io/en/latest/basics/security/
                ->contentNegotiator(ContentNegotiator::class) // https://laravel-json-api.readthedocs.io/en/latest/features/media-types/#content-negotiators
                ->only(['index', 'show']) // https://laravel-json-api.readthedocs.io/en/latest/basics/routing/#resource-routes
                ->except(['delete']) // https://laravel-json-api.readthedocs.io/en/latest/basics/routing/#resource-routes
                ->readOnly(true) // https://laravel-json-api.readthedocs.io/en/latest/basics/routing/#resource-routes
                ->uri('api_brands') // https://laravel-json-api.readthedocs.io/en/latest/basics/routing/#resource-routes
                ->relations([ // https://laravel-json-api.readthedocs.io/en/latest/basics/routing/#relationship-routes
                    'hasOne' => [
                        'name' => 'category',
                    ],
                    'hasMany' => [
                        'name' => 'users',
                        'inverse' => 'categories'
                    ]
                ])
                ->id('[A-Z]+') // https://laravel-json-api.readthedocs.io/en/latest/basics/routing/#id-constraints
                ->middleware('throttle:60,1') // https://laravel-json-api.readthedocs.io/en/latest/basics/routing/#middleware
                ->routing(function(ResourceRegistration $api): void { // esto remplaza todo lo anterior

                })
                ->extraRouting(function(ResourceRegistration $api): void { // esto se añade a todo lo anterior

                });
}
```
::

Una vez creado tu API Resource, agregarlo al plugin de API Builder:

::code-mockup{:class="mb-8"}

```php

use RedPlug\Administratix\Plugins\ApiBuilder\ApiBuilderPlugin;
use App\JsonApi\Brand\ApiResource as BrandApiResource;

->id('admin')
->path('admin')
->plugins([
    ApiBuilderPlugin::make()
            ->apiResources([
                'brands' => BrandApiResource::class
            ])
])
```
::

## Personalizar y extender APIs de Plugins

En caso que las configuraciones de un API resource proveido por plugins no cumpla con las necesidades de tu proyecto siempre puedes configurar por panel el resource del plugin, las configuraciones son las mismas vistas previmente de `ApiResourceSettings`:

::code-mockup{:class="mb-8"}
```php

use RedPlug\Administratix\Plugins\ApiBuilder\ApiBuilderPlugin;
use RedPlug\Administratix\Plugins\Brands\BrandsPlugin;

->id('admin')
->path('admin')
->plugins([
    BrandsPlugin::make()
            ->configureApiResourceUsing('brands', function(ApiResourceSettings $settings): void {
                            $settings->relations([
                                'hasOne' => [
                                    'name' => 'category'
                                ] 
                            ]);
                        }),
    ApiBuilderPlugin::make(),
])
```
::