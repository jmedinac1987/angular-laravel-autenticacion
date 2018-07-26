@component('mail::message')
# Cambiar la contraseña

Haga clic en el botón de abajo para cambiar la contraseña.


@component('mail::button', ['url' => $token])
Reiniciar contraseña
@endcomponent


Gracias,<br>
{{ config('app.name') }}
@endcomponent
