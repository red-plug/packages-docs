---
title: 'Inicio | Red Plug'
description: 'Package Docs es una wiki para los distintos plugins de la organización Red Plug'
---

# [Red Plug]{.text-primary} Packages

Bienvenido a la documentación principal de todos los plugins y paquetes más importantes de la organización [__Red Plug__]{.text-primary}, dentro de esta documentación está contenida la información de cada uno de los paquetes, comenzando por [Administratix](/administratix) el cuál es la dependencia de el resto de plugins, de momento tenemos seccionados 3 tipos de plugins


## Framework
Aquí se encuentran los paquetes que nos ayudan a facilitar, potenciar y dar formalidad a nuestro código en los proyectos, los plugins que aquí puedes encontrar son:

::div{.w-full .md:w-3/4 .mx-auto .overflow-x-auto .mb-8}
| Plugin | Descripción |
| :---   | :---        |
| [__red-plug/administratix__](/administratix) | Ofrece las clases base para crear recursos y cualquier otra funcionalidad de Filament |
| [red-plug/action-logger](/action-logger) | Ofrece un recurso para visualizar los eventos de cada modelo y sus acciones básicas |
| [red-plug/admin-settings](/admin-settings) | Ofrece una manera sencilla de guardar ajustes en base de datos |
| [red-plug/api-builder](/api-builder) | Ofrece una API modular para habilitar los contenidos de tu plugin mediante la especificación [JSON:API](https://jsonapi.org/) |
| [red-plug/developer-panel](/developer-panel) | Ofrece un [panel de Filament](https://filamentphp.com/docs/3.x/panels/getting-started#overview) especializado en acciones típicas de un desarrollador |
| [red-plug/image-optimizer](/image-optimizer) | Ofrece una API para modificar las imagenes guardadas en el sistema |
| [red-plug/lang-manager](/lang-manager) | Ofrece herramientas para convertir los contenidos en múltiples idiomas |
| [red-plug/panel-tenacy](/panel-tenacy) | Permite relacionar registros de base de datos a un panel, permitiendo tener múltiples paneles de Filament con registros independientes |
| [red-plug/permission-manager](/permission-manager) | Permite gestionar y estandarizar permisos en los plugins |
| [red-plug/query-boost](/query-boost) | Ofrece scopes y extensiones de query para facilitar el trabajo con queries |
| [red-plug/stylist](/stylist) | Personaliza el estilo de los paneles para que sean más clasicos |
::

## Módulos y submodulos

Aquí encontrarás los plugins que habitualmente se utilizan para adminsitrar registros de base de datos varios, habitualmente estos tienen fuerte dependencia con los plugins de tipo Framework

::div{.w-full .md:w-3/4 .mx-auto .overflow-x-auto .mb-8}
| Plugin | Descripción |
| :---   | :---        |
| [red-plug/roles](/roles) | Permite gestionar los roles y permisos de cada usuario |
| [red-plug/admins](/admins) | Permite manipular registros relacionados a los usuarios |
| [red-plug/layouts](/layouts) | Permite gestionar plantillas |
| [red-plug/media](/media) | Permite gestionar medios como imágenes, videos, audios, etc. |
| [red-plug/contents](/contents) | Permite gestionar contenidos |
| [red-plug/comments](/comments) | Permite gestionar comentarios |
| [red-plug/readers](/readers) | Permite gestionar lectores de sitio web |
| [red-plug/subscriptions](/subscriptions) | Permite gestionar lectores que se suscriben al blog |
::

## Sistemas

Aquí encontrarás plugins de sistema completo, es decir que estos plugins están enfocados a resolver una necidad común y permite agregar más cosas en el camino

::div{.w-full .md:w-3/4 .mx-auto .overflow-x-auto .mb-8}
| Plugin | Descripción |
| :---   | :---        |
| [red-plug/cms](/cms) | Sistema de CMS, gestor de contenidos, permite administrar suscriptores y visitantes |
| [red-plug/ecommerce](/ecommerce) | Una tienda en línea completa, con métodos de pago y envío |
::
