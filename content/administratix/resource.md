---
title: 'Administratix | Resource | Red Plug'
description: 'Aprende a configurar un recurso distribuido por Red Plug'
---

# Resource

Bienvenido a la referencia de configuración de Filament resource en base a Administratix

ya sea que estes creando tu recurso mediante la herencia de la clase `RedPlug\Administratix\Support\Filament\BasePlugin`:

::code-mockup{:class="mb-8"}
```php
<?php

namespace RedPlug\Administratix\Plugins\Brands\Filament\Resources;


use RedPlug\Administratix\Plugins\Brands\Models\Brand;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use RedPlug\Administratix\Support\Filament\Resource\BaseResource;
use RedPlug\Administratix\Support\Filament\Resource\ResourceSettings;
use RedPlug\Administratix\Support\Settings;
use RedPlug\Administratix\Plugins\Brands\Filament\Resources\Pages\ManageBrands;
use RedPlug\Administratix\Plugins\Brands\Filament\Resources\Pages\EditBrand;
use RedPlug\Administratix\Plugins\Products\Filament\ProductsRelationManager;

class BrandResource extends BaseResource
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
use App\Plugins\DummyPlugin;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Pages;
use Filament\Pages\SubNavigationPosition;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\Widgets;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\AuthenticateSession;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\View\Middleware\ShareErrorsFromSession;
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
                                        ->can(function(string $action, string|Model $model, string $resource): bool {
                                            return authorize($action, $model, $resource::shouldCheckPolicyExistence())->allowed();
                                        })
                                        ->shouldCheckPolicyExistence(true)
                                        ->shouldSkipAuthorization(false)
                                        ->canViewAny(function(string $resource): bool {
                                            return $resource::can('viewAny');
                                        })
                                        ->canEdit(function(string $resource, Model $record): bool {
                                            return $resource::can('edit');
                                        })
                                        ->canCreate(function(string $resource): bool {
                                            return $resource::can('create');
                                        })
                                        ->canDelete(function(string $resource, Model $record): bool {
                                            return $resource::can('delete', $record);
                                        })
                                        ->canDeleteAny(function(string $resource): bool {
                                            return $resource::can('deleteAny');
                                        })
                                        ->canForceDelete(function(string $resource, Model $record): bool {
                                            return $resource::can('forceDelete', $record);
                                        })
                                        ->canForceDeleteAny(function(string $resource): bool {
                                            return $resource::can('forceDeleteAny');
                                        })
                                        ->canReorder(function(string $resource): bool {
                                            return $resource::can('reorder');
                                        })
                                        ->canReplicate(function(string $resource, Model $record): bool {
                                            return $resource::can('replicate', $record);
                                        })
                                        ->canRestore(function(string $resource, Model $record): bool {
                                            return $resource::can('restore', $record);
                                        })
                                        ->canRestoreAny(function(string $resource): bool {
                                            return $resource::can('restoreAny');
                                        })
                                        ->canView(function(string $resource, Model $record): bool {
                                            return $resource::can('view', $record);
                                        })
                                        ->breadcrumb('Brands')
                                        ->eloquentQuery(function(Builder $query, string $resource): Builder {
                                            return $resource::getModel()::query();
                                        })
                                        ->globallySearchableAttributes(['name'])
                                        ->modelLabel('Brand')
                                        ->model(Brand::class)
                                        ->pluralModelLabel('brands')
                                        ->titleCasePluralModelLabel('Brands')
                                        ->recordTitleAttribute('name')
                                        ->recordTitle(function(?Model $record): mixed {
                                            return $record?->name ?: 'Brand';
                                        })
                                        ->routeBaseName(function(?string $panel): string {
                                            return 'filament.admin.resources.brands';
                                        })
                                        ->routeMiddleware(function(Panel $panel): array {
                                            return [];
                                        })
                                        ->withoutRouteMiddleware(function(Panel $panel): array {
                                            return [];
                                        })
                                        ->slug('brands')
                                        ->navigationGroup('Brands')
                                        //->navigationParentItem('Categories');
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

## subNavigationPosition
::div{:class="mb-4"}
```php 
\Filament\Pages\SubNavigationPosition|\Closure
```
::

Permite configurar

::code-mockup{:class="mb-8"}
```php
<?php

/**
 * Configure the resource 
 * 
 * @param  \RedPlug\Administratix\Support\Filament\Resource\ResourceSettings $settings
 * @return \RedPlug\Administratix\Support\Filament\Resource\ResourceSettings
 */
function setUp(Settings $settings): Settings
{
    $settings->subNavigationPosition(SubNavigationPosition::Start);
}
```
::