---
title: 'Administratix | Resource | Red Plug'
description: 'Aprende a configurar un recurso distribuido por Red Plug'
---

# Resource

Bienvenido a la referencia de configuración de Filament resource en base a Administratix

ya sea que estes creando tu recurso mediante la herencia de la clase `RedPlug\Administratix\Support\Filament\Resource\BaseResource`:

::code-mockup{:class="mb-8"}
```php
<?php

namespace RedPlug\Administratix\Plugins\Brands\Filament\Resources;

class BrandResource extends \RedPlug\Administratix\Support\Filament\Resource\BaseResource
{
    public static function setUp(Settings $resourceDefaults): Settings
    {
        return $resourceDefaults->navigationIcon('heroicon-o-folder')
                                ->model(Brand::class)
                                ->shouldCheckPolicyExistence(true)
                                ->shouldSkipAuthorization(true)
                                ->pages([
                                    'index' => ManageBrands::route('/'),
                                    'edit' => EditBrand::route('/{record}/edit')
                                ])
                                ->relations([
                                    ProductsRelationManager::class
                                ])
                                ->widgets([]);
    }
}
```
::

O que quieras personalizar el recurso de un plugin proveído por [__Red Plug__]{.text-primary}:

::code-mockup{:class="mb-8"}
```php
<?php

namespace App\Providers\Filament;

use App\Models\Brand;
use App\Plugins\BrandsPlugin;
use RedPlug\Administratix\Support\Filament\Resource\ResourceSettings;

use function Filament\authorize;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->plugins([
                BrandsPlugin::make()
                            ->configureResourceUsing('brand', function(ResourceSettings $settings) {
                                $settings->navigationIcon('heroicon-o-currency-rupee')
                                        ->subNavigationPosition(SubNavigationPosition::Start)
                                        ->canAccess(function(string $resource): bool {
                                            return $resource::canViewAny();
                                        })
                                        ->resolveRecordRouteBinding(function(int|string $key, string $resource): ?Model {
                                            return $resource::getModel()::whereKey($key)->first();
                                        })
                                        ->routeMiddleware(function(Panel $panel): array {
                                            return [];
                                        })
                                        ->slug('brands')
                                        ->navigationGroup('Brands')
                                        ->navigationIcon('heroicon-o-tag')
                                        ->activeNavigationIcon('heroicon-s-tag')
                                        ->navigationBadge(function(string $resource) {
                                            return $resource::getModel()::count();
                                        })
                                        ->navigationBadgeTooltip(function(string $resource): string {
                                            $count = $resource::getModel()::count();
                                            return "There is {$count} active brands";
                                        })
                                        ->navigationBadgeColor('danger')
                                        ->navigationSort(1)
                                        ->shouldRegisterNavigation(true);
                            })
            ]);
    }
}

```
::

Las configuraciones del resource son las siguientes:

Recuerda que la mayoría de configuraciones aceptan `Closures` como parámetro si en el ejemplo no se específica un `Closure` da por hecho que puedes agregarlo de la siguiente manera:


::code-mockup{:class="mb-8"}
```php
->method(function(string $resource) {

});
```
::

## configureTableUsing

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
\Closure
```
::

Permite configurar la tabla del resource, para leer la referencia completa revisa [tablas de filament](https://filamentphp.com/docs/3.x/tables/getting-started), Administratix ofrece nuevos métodos para extender las funcionalidades de la tabla.

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use RedPlug\Administratix\Support\Filament\Tables\Table;
use Closure;

$settings->configureTableUsing(function(Table $table): void {
    $table->columns([])
        ->appendColumns([])
        ->prependColumns([])
        ->actions([])
        ->appendActions([])
        ->prependActions([])
        ->filters([])
        ->appendFilters([])
        ->prependFilters([])
        ->bulkActions([])
        ->appendBulkActions([])
        ->prependBulkActions([]);
});

```
::

## configureFormUsing

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
\Closure
```
::

Permite configurar el formulario del resource, para leer la referencia completa revisa [formularios de filament](https://filamentphp.com/docs/3.x/forms/getting-started) , Administratix ofrece nuevos métodos para extender las funcionalidades de el formulario.

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use RedPlug\Administratix\Support\Filament\Forms\Form;
use Closure;

$settings->configureFormUsing(function(Form $form): void {
    $form->appendSchema([])
        ->prependSchema([]);
});

```
::


## configureInfolistUsing

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
\Closure
```
::

Permite configurar el infolist del resource, para leer la referencia completa revisa [infolists de filament](https://filamentphp.com/docs/3.x/infolists/getting-started) , Administratix ofrece nuevos métodos para extender las funcionalidades de el infolist.

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use RedPlug\Administratix\Support\Filament\Infolists\Infolist;
use Closure;

$settings->configureInfolistUsing(function(Infolist $infolist): void {
    $infolist->appendSchema([])
            ->prependSchema([]);
});

```
::


## configurePageUsing

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
\Closure
```
::

Permite configurar las páginas registradas por el resource, el primer parámetro es el nombre de la página a configurar (típicamente `index`, `create`, `edit`, `view`) y como segundo parámetro el Closure de personalización, para leer la referencia completa de configuración de páginas revisa [settings de página](/administratix/page).

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->configurePageUsing('index', function(ListRecordsSettings $settings): void {
    $settings->headerWidgets([])
            ->appendFooterWidgets([]);
});

```
::


## subNavigationPosition

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
\RedPlug\Administratix\Support\Filament\Resources\ResourceSettings|\Closure
```
::

Permite configurar la subnavegación del resource para más info lee [Filament subnavigation](https://filamentphp.com/docs/3.x/panels/resources/getting-started#sub-navigation-position).

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Filament\Pages\SubNavigationPosition;
use Closure;

$settings->subNavigationPosition(SubNavigationPosition::Start);
```
::


## canAccess

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
bool|\Closure
```
::

Permite validar si el usuario actual puede acceder al recurso.

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->canAccess(function(string $resource): bool {
    return $resource::canViewAny();
});

```
::


## resolveRecordRouteBinding

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
\Closure
```
::

Permite configurar la lógica de obtener el modelo al editar/visualizar un registro.

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Illuminate\Database\Eloquent\Model;
use Closure;

$settings->resolveRecordRouteBinding(function(int|string $key, string $resource): ?Model {
    return $resource::getModel()::whereKey($key)->first();
});

```
::


## can

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
\Closure
```
::

Permite configurar la lógica de autorización principal del recurso, para más información lee [autorización en Filament](https://filamentphp.com/docs/3.x/panels/resources/getting-started#authorization)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Illuminate\Database\Eloquent\Model;
use Closure;

use function Filament\authorize;

$settings->can(function(string $action, string|Model $model, string $resource): bool {
    return authorize($action, $model, $resource::shouldCheckPolicyExistence())->allowed();
});

```
::


## shouldCheckPolicyExistence

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
bool|\Closure
```
::

Quita/coloca la verificación de la policy de laravel para el modelo relacionado al recurso

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->shouldCheckPolicyExistence(true);

```
::


## shouldSkipAuthorization

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
bool|\Closure
```
::

Permite habilitar/inhabilitar la verificación de permisos al modelo del recurso, para más información lee [saltar autorización](https://filamentphp.com/docs/3.x/panels/resources/getting-started#skipping-authorization)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->shouldSkipAuthorization(false);

```
::


## canViewAny

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
bool|\Closure
```
::

Permite configurar la lógica de autorización principal del recurso para la acción `viewAny`, para más información lee [autorización en Filament](https://filamentphp.com/docs/3.x/panels/resources/getting-started#authorization)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->canViewAny(function(string $resource): bool {
    return $resource::can('viewAny');
});

```
::


## canEdit

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
bool|\Closure
```
::

Permite configurar la lógica de autorización principal del recurso para la acción `update`, para más información lee [autorización en Filament](https://filamentphp.com/docs/3.x/panels/resources/getting-started#authorization)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Illuminate\Database\Eloquent\Model;
use Closure;

$settings->canEdit(function(string $resource, Model $record): bool {
    return $resource::can('edit', $record);
});

```
::


## canCreate

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
bool|\Closure
```
::

Permite configurar la lógica de autorización principal del recurso para la acción `create`, para más información lee [autorización en Filament](https://filamentphp.com/docs/3.x/panels/resources/getting-started#authorization)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->canCreate(function(string $resource): bool {
    return $resource::can('create');
});

```
::


## canDelete

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
bool|\Closure
```
::

Permite configurar la lógica de autorización principal del recurso para la acción `delete`, para más información lee [autorización en Filament](https://filamentphp.com/docs/3.x/panels/resources/getting-started#authorization)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Illuminate\Database\Eloquent\Model;
use Closure;

$settings->canDelete(function(string $resource, Model $record): bool {
    return $resource::can('delete', $record);
});

```
::


## canDeleteAny

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
bool|\Closure
```
::

Permite configurar la lógica de autorización principal del recurso para la acción `deleteAny`, para más información lee [autorización en Filament](https://filamentphp.com/docs/3.x/panels/resources/getting-started#authorization)    

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->canDeleteAny(function(string $resource): bool {
    return $resource::can('deleteAny');
});

```
::


## canForceDelete

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
bool|\Closure
```
::

Permite configurar la lógica de autorización principal del recurso para la acción `forceDelete`, para más información lee [autorización en Filament](https://filamentphp.com/docs/3.x/panels/resources/getting-started#authorization)  

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Illuminate\Database\Eloquent\Model;
use Closure;

$settings->canForceDelete(function(string $resource, Model $record): bool {
    return $resource::can('forceDelete', $record);
});

```
::


## canForceDeleteAny

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
bool|\Closure
```
::

Permite configurar la lógica de autorización principal del recurso para la acción `forceDeleteAny`, para más información lee [autorización en Filament](https://filamentphp.com/docs/3.x/panels/resources/getting-started#authorization)  

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->canForceDeleteAny(function(string $resource): bool {
    return $resource::can('forceDeleteAny');
});

```
::


## canReorder

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
bool|\Closure
```
::

Permite configurar la lógica de autorización principal del recurso para la acción `reorder`, para más información lee [autorización en Filament](https://filamentphp.com/docs/3.x/panels/resources/getting-started#authorization)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->canReorder(function(string $resource): bool {
    return $resource::can('reorder');
});

```
::


## canReplicate

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
bool|\Closure
```
::

Permite configurar la lógica de autorización principal del recurso para la acción `replicate`, para más información lee [autorización en Filament](https://filamentphp.com/docs/3.x/panels/resources/getting-started#authorization)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Illuminate\Database\Eloquent\Model;
use Closure;

$settings->canReplicate(function(string $resource, Model $record): bool {
    return $resource::can('replicate', $record);
});

```
::


## canRestore

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
bool|\Closure
```
::

Permite configurar la lógica de autorización principal del recurso para la acción `restore`, para más información lee [autorización en Filament](https://filamentphp.com/docs/3.x/panels/resources/getting-started#authorization)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Illuminate\Database\Eloquent\Model;
use Closure;

$settings->canRestore(function(string $resource, Model $record): bool {
    return $resource::can('restore', $record);
});

```
::


## canRestoreAny

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
bool|\Closure
```
::

Permite configurar la lógica de autorización principal del recurso para la acción `restoreAny`, para más información lee [autorización en Filament](https://filamentphp.com/docs/3.x/panels/resources/getting-started#authorization)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->canRestoreAny(function(string $resource): bool {
    return $resource::can('restoreAny');
});

```
::


## canView

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
bool|\Closure
```
::

Permite configurar la lógica de autorización principal del recurso para la acción `restoreAny`, para más información lee [autorización en Filament](https://filamentphp.com/docs/3.x/panels/resources/getting-started#authorization)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Illuminate\Database\Eloquent\Model;
use Closure;

$settings->canView(function(string $resource, Model $record): bool {
    return $resource::can('view', $record);
});

```
::


## canGloballySearch

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
bool|\Closure
```
::

Habilita/Deshabilita la búsqueda global de Filament, para más información lee [búsqueda global en Filament](https://filamentphp.com/docs/3.x/panels/resources/global-search)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->canGloballySearch(false);

```
::


## breadcrumb

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|\Closure
```
::

Permite cambiar la barra de navegación del recurso

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->breadcrumb('Brands');

```
::


## eloquentQuery

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
\Closure
```
::

Permite cambiar el query base aplicado al modelo correspondiente del recurso, para más información lee [personalizar el query del recurso](https://filamentphp.com/docs/3.x/panels/resources/getting-started#customizing-the-resource-eloquent-query)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Illuminate\Database\Eloquent\Builder;
use Closure;

$settings->eloquentQuery(function(Builder $query, string $resource): Builder {
    return $resource::getModel()::query();
});

```
::


## globallySearchableAttributes

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
array|\Closure
```
::
Define los atributos del modelo que serán utilizados para la búsqueda global, para más información lee [búsqueda global a través de varias columnas](https://filamentphp.com/docs/3.x/panels/resources/global-search#globally-searching-across-multiple-columns)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->globallySearchableAttributes(['name']);

```
::


## modelLabel

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|\Closure
```
::

Permite configurar el título del modelo que se utiliza en varias secciones del resource, para más información lee [personalizar el label del modelo](https://filamentphp.com/docs/3.x/panels/resources/getting-started#customizing-the-model-label)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->modelLabel('brand');

```
::


## titleCaseModelLabel

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|\Closure
```
::

Permite configurar el título del modelo que se utiliza en varias secciones del resource, para más información lee [capilazación autómatica](https://filamentphp.com/docs/3.x/panels/resources/getting-started#automatic-model-label-capitalization)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->titleCaseModelLabel('brand');

```
::


## model

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|\Closure
```
::

Permite cambiar el modelo a usar en el resource 

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->model(BrandChild::class);

```
::


## pluralModelLabel

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|\Closure
```
::

Permite cambiar el plural del modelLabel, para más info lee [pluralización del modelo](https://filamentphp.com/docs/3.x/panels/resources/getting-started#customizing-the-plural-model-label)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->pluralModelLabel('brands');

```
::


## titleCasePluralModelLabel

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|\Closure
```
::

Permite cambiar el plural del titleCaseModelLabel, para más info lee [pluralización del modelo](https://filamentphp.com/docs/3.x/panels/resources/getting-started#customizing-the-plural-model-label)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->titleCasePluralModelLabel('Brands');

```
::


## recordTitleAttribute

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
\Closure
```
::

Permite configurar que atributo del modelo se utilizará para mostrarlo en acciones y distintos feebacks, para más información lee [título del registro](https://filamentphp.com/docs/3.x/panels/resources/getting-started#record-titles)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->recordTitleAttribute('name');

```
::


## recordTitle

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
\Closure
```
::

En caso de que quieras cambiar la lógica de obtención del identificador del modelo

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Illuminate\Database\Eloquent\Model;
use Closure;

$settings->recordTitle(function(?Model $record): mixed {
    return $record?->name ?: 'Brand';
});

```
::


## widgets

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
array|\Closure
```
::

Permite registrar nuevos widgets como componentes de livewire para ser utilizados en las páginas posteriormente, para más información lee [crear widgets de resource](https://filamentphp.com/docs/3.x/panels/resources/widgets#creating-a-resource-widget)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->widgets([
    BrandOverview::class
]);

```
::


## routeBaseName

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|\Closure
```
::

Permite configurar el nombre base de las rutas para generarlos mediante el helper de laravel `route()` 

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->routeBaseName(function(?string $panel): string {
    return 'filament.admin.resources.brands';
});

```
::

## relativeRouteName

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|\Closure
```
::

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->relativeRouteName('...');

```
::


## 

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|\Closure
```
::

Permite configurar el prefijo al generar las rutas mediante el helper de laravel `route()`

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->routePrefix('api');

```
::



## routeMiddleware

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|array|\Closure
```
::

Permite configurar que middlewares se le aplicarán al resource 

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->routeMiddleware(function(Panel $panel): array {
    return [];
});

```
::


## withoutRouteMiddleware

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|array|\Closure
```
::

Permite configurar que middlewares ya cargados no deberían aplicarse al resource

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->withoutRouteMiddleware(function(Panel $panel): array {
    return [];
});

```
::


## slug

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|\Closure
```
::

Permite configurar el slug que se utilizará en la ruta del panel, para más  información lee [personalización de la url](https://filamentphp.com/docs/3.x/panels/resources/getting-started#customizing-the-resource-url)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->slug('brands');

```
::


## navigationGroup

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|\Closure
```
::

Permite configurar la agrupación del menú de navegación para el resource, para más información lee [agrupar elementos del menú de navegación](https://filamentphp.com/docs/3.x/panels/resources/getting-started#grouping-resource-navigation-items)
::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->navigationGroup('Catalog');

```
::


## navigationParentItem

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|\Closure
```
::

Permite configurar si el elemento del menú de navegación pertenece a otro elemento, para más información lee [agrupar recursos en otro recurso](https://filamentphp.com/docs/3.x/panels/resources/getting-started#grouping-resource-navigation-items-under-other-items)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->navigationParentItem('products');

```
::


## navigationIcon

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|\Closure
```
::

Permite configurar el icono del elemento del menú de navegación, para más información lee [icono de elemento de navegación](https://filamentphp.com/docs/3.x/panels/resources/getting-started#setting-a-resource-navigation-icon)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->navigationIcon('heroicon-o-tag');

```
::


## activeNavigationIcon

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|\Closure
```
::

Permite configurar el icono del elemento del menú de navagación cuando está activo, para más información lee [cambiar el icono de nevagación cuando está activo](https://filamentphp.com/docs/3.x/panels/navigation#switching-navigation-item-icon-when-it-is-active)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->activeNavigationIcon('heroicon-s-tag');

```
::


## navigationLabel

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|\Closure
```
::

Permite configurar el título de elemento del menú de navegación, para más información lee [presonalizar el título de nevegación](https://filamentphp.com/docs/3.x/panels/navigation#customizing-a-navigation-items-label)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->navigationLabel('My brands');

```
::


## navigationBadge

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|\Closure
```
::

Permite configurar mostrar una etiqueta al final del elemento del menú de nevegación, para más información lee [badge de navegación](https://filamentphp.com/docs/3.x/panels/navigation#adding-a-badge-to-a-navigation-item)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->navigationBadge(function(string $resource): string|int {
    return $resource::getModel()::count();
});

```
::


## navigationBadgeTooltip

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|\Closure
```
::

Permite configurar un título que aparecerá en el badge al dejar el mouse encima, para más información lee [badge de navegación](https://filamentphp.com/docs/3.x/panels/navigation#adding-a-badge-to-a-navigation-item)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->navigationBadgeTooltip(function(string $resource): string {
    $count = $resource::getModel()::count();
    return "There is {$count} active brands";
});

```
::


## navigationBadgeColor

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|array|\Closure
```
::

Permite configurar el color del badge [badge de navegación](https://filamentphp.com/docs/3.x/panels/navigation#adding-a-badge-to-a-navigation-item)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->navigationBadgeColor('danger');

```
::


## navigationSort

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
int|\Closure
```
::

Permite configurar el orden del elemento del menú de navegacíon, para más informacion lee [orden de navegación](https://filamentphp.com/docs/3.x/panels/navigation#sorting-navigation-items)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->navigationSort(1);

```
::


## navigationUrl

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|\Closure
```
::

Permite configurar la url del recurso 

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->navigationUrl('...');

```
::


## shouldRegisterNavigation

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
\Closure
```
::

Permite configurar si el resource se mostrará en el menú de nevegación

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Resources\ResourceSettings;
use Closure;

$settings->shouldRegisterNavigation(true);

```
::
