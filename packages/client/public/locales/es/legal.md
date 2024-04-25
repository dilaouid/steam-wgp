# Aviso legal

## Información feneral

**Nombre del responsable principal**: Diyaeddine LAOUID  
**Tipo de proyecto**: Proyecto de código abierto bajo la licencia GPLv3  
**Plataforma de desarrollo y alojamiento**: GitHub  
**URL del proyecto**: [GitHub SteamWGP](https://github.com/dilaouid/steam-wgp)

## Descripción del servicio

SteamWGP es un proyecto de código abierto diseñado para permitir a los usuarios de Steam conectarse mediante OpenID con sus cuentas de Steam. El proyecto facilita la agregación y uso de la información de las cuentas de los usuarios, como apodos, URL de perfiles, avatares, identificaciones digitales y bibliotecas de juegos. SteamWGP no está afiliado a Steam o Valve Corporation, ni a ninguna otra entidad de terceros.

### Recopilación de datos

El proyecto recoge la siguiente información:

- **Apodo de Steam**: Se utiliza para identificar a los usuarios en la plataforma.
- **URL del perfil**: Accesible públicamente y utilizada para redirigir al perfil de Steam.
- **Hash del avatar**: Se utiliza para mostrar el avatar del usuario.
- **ID digital de Steam**: Se utiliza como identificador único para cada usuario.
- **Biblioteca de juegos**:
  - Si es pública, se recogen todos los juegos para permitir la participación efectiva en los "steamders".
  - Si es privada, no se recogen juegos, limitando así la utilidad de la plataforma para el usuario afectado.
  - Los juegos permanecen registrados en nuestra base de datos incluso si la biblioteca del usuario se vuelve privada después de su recopilación, incluso si el usuario elimina su cuenta, o si la cuenta es suspendida o prohibida. Igualmente, si un usuario elimina un juego de su biblioteca, este permanece registrado en nuestra base de datos. Los juegos se utilizan para identificar juegos comunes entre los usuarios y facilitar la búsqueda de compañeros de juego.

### Funcionalidad de los Steamders

Los "steamders" son espacios virtuales donde los jugadores se reúnen para decidir juntos qué juego jugar. El sistema puede recuperar juegos multijugador comunes entre todos los jugadores de un steamder o todos los juegos multijugador de los participantes.

### Gestión de datos

- Los datos relacionados con los steamders se conservan indefinidamente en la base de datos.
- La información sobre los participantes de un steamder se elimina una vez que este concluye, con excepción de los juegos seleccionados y la información persistente sobre el steamder mismo.

### Eliminación de datos

Los usuarios pueden eliminar su cuenta en cualquier momento, lo que resultará en la eliminación de todos sus datos, incluyendo su biblioteca de juegos registrada en la base de datos. Sin embargo, una vez eliminada una cuenta, es posible restaurarla solo **dos días** después de su eliminación. Esto se hace para evitar el abuso de los recursos del servidor durante la sincronización de los datos de Steam.

## Derechos de uso

Dado que el proyecto está bajo licencia GPLv3, está prohibido venderlo. Cualquier uso comercial directo de este proyecto está estrictamente prohibido. Este proyecto es estrictamente no lucrativo: es gratuito, no contiene publicidad y no utiliza cookies de seguimiento, con la excepción de tokens JWT para la autenticación de los usuarios. Sin embargo, es posible hacer donaciones para apoyar al responsable del proyecto, sin contraprestación directa.

## Licencia

Este proyecto se publica bajo la [Licencia Pública General de GNU v3 (GPLv3)](https://www.gnu.org/licenses/gpl-3.0.html), que garantiza a los usuarios la libertad de compartir y modificar el software siempre que todas las copias modificadas también se compartan bajo la misma licencia.

## Responsabilidades

El responsable del proyecto no puede ser considerado responsable de interrupciones del servicio o pérdida de datos. Los usuarios utilizan el servicio bajo su propio riesgo. La fiabilidad de los datos obtenidos a través de Steam y su integridad no están garantizadas por el responsable del proyecto.

---

Estas menciones legales tienen como objetivo proporcionar total transparencia sobre el funcionamiento del proyecto y sus implicaciones para los usuarios. Para cualquier pregunta o preocupación adicional, por favor contacte al responsable del proyecto a través de los canales de comunicación indicados en la página del proyecto en GitHub.
