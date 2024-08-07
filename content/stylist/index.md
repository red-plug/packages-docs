---
title: 'Stylst | Red Plug'
description: 'Aprende a usar '
---

# Stylist

Stylist se encargá de condensar la mayoria de mejoras visuales de nuestra aplicación, sigue leyendo para aprender más


## Antiguo sidebar

En filament 3, colocaron un nuevo sidebar sin fondo el cual para los que trabajamos con Filament 2 no nos termina de gustar, es por eso que hemos añadido ciertos estilos para que el sidebar sea más visible y parecido al de la versión anterior, una vez instales Administratix autómaticamente podrás ver el nuevo sidebar en tus paneles.

![Sidebar](/stylist/sidebar.png)

## Mails internos de Red Plug

Si por alguna razón necesitas crear un Mailable de laravel destinado a la organización de [__Red Plug__]{.text-primary} como el siguiente:

![Sidebar](/stylist/red-plug-mail.png)

Solo extiende de la clase `RedPlug\Administratix\Plugins\Stylist\Mail\RedPlugMailable`:


::code-mockup{:class="mb-8"}
```php
use RedPlug\Administratix\Plugins\Stylist\Mail\RedPlugMailable;

class MyMail extends RedPlugMailable
{
    ...
}
```
::

Y dentro de tu vista markdown usa el layout `x-red-plug-mail::message`:

::code-mockup{:class="mb-8"}
```blade
<x-red-plug-mail::message>
# Title example


Your content here


<x-mail::panel>
panel info
</x-mail::panel>
<x-mail::button :url="config('app.url')">
View
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-red-plug-mail::message>
```
::