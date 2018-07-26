# SPA con Sistema de Autenticación y Reinicio de Contraseñas

El proyecto combina la versión de Angular CLI 6.0 y Laravel 5.5, con el ánimo de crear una SPA la cual contiene el sistema de autenticación y reinicio de contraseñas.

## Tecnologías utilizadas

* Angular CLI 6.0
* Laravel 5.5
* JWT
* ng-Snotify

## Como ejecutar el proyecto

Después de clonar el proyecto, deberás seguir los siguientes pasos:

1. Ingresar a la carpeta Frontend y digitar el siguiente comando en la ventana de comandos ya sea Bash o Simbolo del sistema: `npm install`.

2. Ingresar a la carpeta Backend ubicar el archivo "composer.lock" y eliminarlo.

3. Una vez concluidos los pasos 1 y 2, debe ingresar a la carpeta Backend y digitar el siguiente comando en la ventana de comandos ya sea Bash o Simbolo del sistema: `composer install`.

4. Ingresar a la carpeta del Backend con el editor de código preferido y ubicar el archivo ".env.example" y crear una copia con el nombre de ".env", una vez creado el archivo ".env" recuerde ajustar los siguientes campos:
    
    * DB_DATABASE=su_base_de_datos
    * DB_USERNAME=su_usuario
    * DB_PASSWORD=su_contraseña
    * MAIL_USERNAME= su_usuario_mailtrap
    * MAIL_PASSWORD= su_contraseña_amiltrap
    * MAIL_ENCRYPTION=tls

5. Estando en la carpeta Backend debe ejecutar los siguientes comandos: `php artisan key:generate` y posteriormente `php artisan jwt:secret`.

6. Teniendo en cuenta que para este proyecto la url End Point del API creado con Laravel es virtual, entonces debe ajustar los archivos hosts, http.conf y httpd-vhosts.conf

    * C:\Windows\System32\drivers\etc\hosts
    * C:\Su_ruta\wamp64\bin\apache\apache2.4.17\conf\http.conf
    * C:\Su_ruta\wamp64\bin\apache\apache2.4.17\conf\extra\httpd-vhosts.conf

En caso de no querer realizar dicho ajuste puede editar los siguientes archivos del frontend y cambiar las variables "server" y "iss":

* archivo user.service.ts: la variable server debera cambiar a http://127.0.0.1:8000/api/auth

* archivo token.service.ts: el objeto iss debera cambiar a 
    * private iss = {
        login : 'http://127.0.0.1:8000/api/auth/login',
        signup: 'http://127.0.0.1:8000/api/auth/signup'
  }

NOTA: la ruta dirección http://127.0.0.1:8000 la provee el comando `php artisan serve` cuando se desea ejecutar el api mediante comandos.

## Tener en cuenta 

Para que este proyecto pueda ser ejecutado debe tener instaladas las siguientes tecnologías:
    
    * Angular CLI 6.0.1 o superior
    * PHP 7.0 o superior
    * node v.8.9.0 o supeior
    * npm 5.5.1 o superior
    * composer 1.6.5 o superior
    * TypeScript

## Licencia

El proyecto para este caso es open-sourced [MIT license](https://opensource.org/licenses/MIT).

