# Administratix

## Requerimientos

- PHP 8.3+
- Laravel v11.0+
- Livewire v3.0+

## Instalación

> Administratix solo funciona en instalaciones nuevas de Laravel

Primero necesitarás modificar el `composer.json` de tu proyecto para agregar la [configuración de repositories](https://getcomposer.org/doc/articles/handling-private-packages.md)

```json
{
    ...
    "repositories": [
        {
            "type": "vcs",
            "url": "https://github.com/red-plug/packages-administratix"
        }
    ]
    ...
}

```