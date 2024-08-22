# Backoffice Bank

Esta es la aplicación de backoffice para gestionar varios aspectos del sistema bancario. Esta aplicación está construida con React y se conecta a una API de backend, que maneja la lógica principal y el almacenamiento de datos.

## Estructura del Proyecto

- **Frontend (Backoffice):** Este repositorio contiene el front end basado en React para que los administradores y gerentes interactúen con el sistema bancario.
- **Backend:** El backend maneja las interacciones con la base de datos, la autenticación y la lógica de negocio. Es crucial para el funcionamiento del backoffice.

## Conexión con el Backend

El backoffice se comunica con la API del backend para realizar varias acciones, como la gestión de usuarios, operaciones de cuentas, manejo de transacciones y registro de auditorías. El backend es esencial para que el backoffice funcione correctamente.

### Repositorio del Backend

Puedes encontrar el repositorio de la API del backend [aquí](https://github.com/calfmike/backendBank).

### Cómo Funcionan Juntos

- **Autenticación:** La autenticación de usuarios se gestiona a través del backend. El backoffice envía las credenciales de inicio de sesión y el backend devuelve un token JWT, que luego se utiliza para realizar solicitudes autenticadas.
- **Gestión de Usuarios:** El backoffice permite a los administradores crear, actualizar, eliminar y ver usuarios. Estas operaciones se realizan a través de llamadas a la API del backend.
- **Gestión de Cuentas:** Los administradores pueden ver y gestionar cuentas de usuarios a través del backoffice. Los datos se obtienen y actualizan en el backend.
- **Transacciones:** El backoffice facilita depósitos, retiros y transferencias entre cuentas, todas las cuales son procesadas por el backend.
- **Logs de Auditoría:** El backoffice proporciona una interfaz para ver los logs de auditoría, que son almacenados y gestionados por el backend.

## Funcionalidades

### 1. Gestión de Usuarios

- **Crear Usuario:** Los administradores pueden crear nuevos usuarios (tanto usuarios regulares como administradores) a través de un formulario en el backoffice.
- **Editar Usuario:** Se pueden modificar los detalles de los usuarios existentes, incluyendo el restablecimiento de contraseñas.
- **Eliminar Usuario:** Los administradores pueden eliminar usuarios del sistema.
- **Ver Perfiles de Usuarios:** Todos los usuarios se pueden listar y ver en detalle.

### 2. Gestión de Cuentas

- **Ver Cuentas:** Listar todas las cuentas asociadas con un usuario.
- **Crear Cuenta:** Abrir nuevas cuentas (corriente o de ahorros) para los usuarios.
- **Eliminar Cuenta:** Eliminar cuentas que ya no sean necesarias.

### 3. Gestión de Transacciones

- **Depositar Fondos:** Añadir dinero a las cuentas de usuario.
- **Retirar Fondos:** Retirar dinero de las cuentas de usuario.
- **Transferir Fondos:** Mover fondos entre cuentas de usuarios.
- **Revertir Transacciones:** Revertir una transacción anterior si es necesario.

### 4. Logs de Auditoría

- **Ver Logs de Auditoría:** Acceder y revisar los logs de todas las acciones realizadas dentro del sistema, ayudando en la auditoría y el seguimiento de actividades.
