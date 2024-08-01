---
title: ' Administratix | Page | Red Plug'
description: 'Aprende a configurar una página distribuida por Red Plug'
---


# Page

Bienvenido a la referencia de configuración de Filament page en base a Administratix

ya sea que estes creando tu pagina mediante la herencia de la clase `RedPlug\Administratix\Support\Filament\Pages\BasePage`:


::code-mockup{:class="mb-8"}
```php
<?php

namespace RedPlug\Administratix\Plugins\Brands\Filament\Pages;


class TestPage extends BasePage
{
    /**
     * Configure the default for the current page
     * 
     * @param  \RedPlug\Administratix\Support\Filament\Pages\PageSettings $pageDefaults
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

O que quieras personalizar la página de un plugin proveído por [__Red Plug__]{.text-primary}:

::code-mockup{:class="mb-8"}
```php
<?php

namespace App\Providers\Filament;

use App\Plugins\BrandsPlugin;
use RedPlug\Administratix\Support\Filament\Page\PageSettings;

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
                            ->configurePageUsing('page-name', function(PageSettings $settings): void {
                                $settings->navigationIcon('heroicon-o-dollar')
                                        ->view('filament.custom-view');
                            })
            ]);
    }
}

```
::

Las configuraciones de la página son las siguientes:

Recuerda que la mayoría de configuraciones aceptan `Closures` como parámetro si en el ejemplo no se específica un `Closure` da por hecho que puedes agregarlo de la siguiente manera:


::code-mockup{:class="mb-8"}
```php
->method(function() {

});
```
::


## view

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|\Closure
```
::

Permite cambiar la vista utilizada por la página 

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Pages\PageSettings;
use Closure;

$settings->view('admin.pages.brands.my-custom-page');

```
::


## layout

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|\Closure
```
::

Permite cambiar el layout utilizado por la página 

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Pages\PageSettings;
use Closure;

$settings->layout('admin.layouts.my-custom-layout');

```
::

## maxContentWidth

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|\Closure
```
::

Permite cambiar el layout para el contenido máximo, para mayor información lee [contenido máximo](https://filamentphp.com/docs/3.x/panels/configuration#customizing-the-maximum-content-width) 

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Pages\PageSettings;
use Filament\Support\Enums\MaxWidth;
use Closure;

$settings->maxContentWidth(MaxWidth::ExtraLarge);

```
::

## breadcrumbs

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|\Closure
```
::

Permite cambiar el breadcrumb de la página 

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Pages\PageSettings;
use Closure;

$settings->breadcrumb([
    'Item 1',
    'Item 2'
]);

```
::



## slug

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
string|\Closure
```
::

Permite configurar el slug que se utilizará en la ruta del panel, para más información lee [personalización de la url](https://filamentphp.com/docs/3.x/panels/pages#customizing-the-page-url)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Pages\PageSettings;
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

Permite configurar la agrupación del menú de navegación para la página, para más información lee [agrupar elementos del menú de navegación](https://filamentphp.com/docs/3.x/panels/navigation#grouping-navigation-items)
::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Pages\PageSettings;
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

Permite configurar si el elemento del menú de navegación pertenece a otro elemento

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Pages\PageSettings;
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

Permite configurar el icono del elemento del menú de navegación, para más información lee [icono de elemento de navegación](https://filamentphp.com/docs/3.x/panels/navigation#customizing-a-navigation-items-icon)

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Pages\PageSettings;
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
use RedPlug\Administratix\Support\Filament\Pages\PageSettings;
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
use RedPlug\Administratix\Support\Filament\Pages\PageSettings;
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
use RedPlug\Administratix\Support\Filament\Pages\PageSettings;
use Closure;

$settings->navigationBadge(function(): string|int {
    return 3;
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
use RedPlug\Administratix\Support\Filament\Pages\PageSettings;
use Closure;

$settings->navigationBadgeTooltip(function(): string {
    return "There is active brands";
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
use RedPlug\Administratix\Support\Filament\Page\PageSettings;
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
use RedPlug\Administratix\Support\Filament\Pages\PageSettings;
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

Permite configurar la url de la página 

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Pages\PageSettings;
use Closure;

$settings->navigationUrl('...');

```
::


## shouldRegisterNavigation

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
bool|\Closure
```
::

Permite configurar si la página se mostrará en el menú de nevegación

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Pages\PageSettings;
use Closure;

$settings->shouldRegisterNavigation(true);

```
::


## footer

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
Illuminate\Contracts\View\View;|\Closure
```
::

Permite configurar un footer para la página

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Pages\PageSettings;
use Illuminate\Contracts\View\View;
use Closure;

$settings->footer(view('admin.layouts.partials.my-custom-footer'));

```
::

## header

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
Illuminate\Contracts\View\View|\Closure
```
::

Permite configurar un header para la página

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Pages\PageSettings;
use Illuminate\Contracts\View\View;
use Closure;

$settings->header(view('admin.layouts.partials.my-custom-header'));

```
::


## headerWidgets

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
array|\Closure
```
::

Permite configurar los widgets del header de la página

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Pages\PageSettings;
use Closure;

$settings->headerWidgets([])
        ->appendHeaderWidgets([])
        ->prependHeaderWidgets([]);

```
::

## headerWidgetsColumns

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
int|string|array|\Closure
```
::

Permite configurar la distribución de los header widgets

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Pages\PageSettings;
use Closure;

$settings->headerWidgetsColumns(2)

```
::

## footerWidgets

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
array|\Closure
```
::

Permite configurar los widgets del footer de la página

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Pages\PageSettings;
use Closure;

$settings->footerWidgets([])
        ->appendFooterWidgets([])
        ->prependFooterWidgets([]);

```
::

## footerWidgetsColumns

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
int|string|array|\Closure
```
::

Permite configurar la distribución de los footer widgets

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Pages\PageSettings;
use Closure;

$settings->footerWidgetsColumns(2)

```
::

## filterVisibleColumns

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
\Closure
```
::

Permite evaluar cada widget para mostrarlo o no

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Pages\PageSettings;
use Closure;

$settings->filterVisibleColumns(function(array $widgets): array {
    return $widgets;
})

```
::

## widgetData

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
array|\Closure
```
::

Permite pasar datos a los widgets

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Pages\PageSettings;
use Closure;

$settings->widgetData(function(): array {
    return [
        'values' => 1
    ];
});

```
::

## headerActions

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
array|\Closure
```
::

Permite agregar nuevas acciones a la página

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Pages\PageSettings;
use Closure;

$settings->headerActions([])
        ->appendHeaderActions([])
        ->prependHeaderActions([]);

```
::

## canAccess

::div{:class="bg-neutral px-2 py-1 mb-2"}
```php
bool|\Closure
```
::

Permite validar si el usuario actual puede acceder a la página.

::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Support\Filament\Pages\PageSettings;
use Closure;

$settings->canAccess(function(): bool {
    return true;
});

```
::

