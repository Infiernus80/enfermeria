<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Proyecto de Enfermería

Este proyecto está diseñado para gestionar datos relacionados con pacientes, medicamentos, citas médicas, horarios de administración de medicamentos y tanques de oxígeno en un entorno médico. Utiliza **NestJS** como framework para el backend.

## Características Principales

- **Gestión de Usuarios:**

  - Crear y listar usuarios con roles de `Admin` o `Familiar`.

- **Módulo de Pacientes:**

  - Registro y seguimiento de pacientes.

- **Medicamentos:**

  - Asignación y consulta de medicamentos por paciente.
  - Horarios de administración de medicamentos.

- **Citas Médicas:**

  - Registro y consulta de citas médicas con notas asociadas.

- **Tanques de Oxígeno:**
  - Gestión de tanques con cálculo automático de duración.
  - Registro de cambios y asociación con pacientes.

## Requisitos Previos

- Node.js v18+
- PostgreSQL
- npm o yarn

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/Infiernus80/enfermeria.git
   cd proyecto-enfermeria
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Configurar las variables de entorno:

   Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=tu_usuario
   DB_PASSWORD=tu_contraseña
   DB_NAME=nombre_base_datos
   JWT_SECRET=tu_secreto
   ```

<!-- 4. Ejecutar las migraciones de la base de datos:

   ```bash
   npm run typeorm -- migration:run
   ``` -->

## Scripts Disponibles

- **Iniciar el servidor:**

  ```bash
  npm run start
  ```

- **Iniciar en modo desarrollo:**

  ```bash
  npm run start:dev
  ```

<!-- - **Ejecutar pruebas:**

  ```bash
  npm run test
  ``` -->

<!-- - **Generar una migración:**

  ```bash
  npm run typeorm -- migration:generate src/migrations/<nombre_migracion>
  ``` -->

## Endpoints Principales

### Usuarios

- **GET /usuarios**: Obtiene todos los usuarios.
- **POST /usuarios**: Crea un nuevo usuario.

### Pacientes

- **GET /pacientes**: Obtiene todos los pacientes.
- **POST /pacientes**: Crea un nuevo paciente.

### Medicamentos

- **GET /medicamentos/paciente/:id**: Obtiene los medicamentos de un paciente.
- **POST /medicamentos/paciente**: Asigna un medicamento a un paciente.

### Citas Médicas

- **GET /citas-medicas/:id**: Obtiene una cita médica por ID.
- **POST /citas-medicas**: Crea una nueva cita médica.

### Tanques de Oxígeno

- **GET /tanques-oxigeno/:id**: Obtiene información de un tanque de oxígeno.
- **POST /tanques-oxigeno**: Registra un nuevo tanque de oxígeno.

## Documentación de API

Este proyecto utiliza **Swagger** para documentar su API. Una vez que el servidor esté en ejecución, accede a:

```
http://localhost:3000/api
```

## Estructura del Proyecto

```
proyecto-enfermeria/
├── src/
│   ├── usuarios/
│   ├── pacientes/
│   ├── medicamentos/
│   ├── citas-medicas/
│   ├── tanques-oxigeno/
│   └── common/
├── test/
├── .env
├── nest-cli.json
├── package.json
├── README.md
└── tsconfig.json
```

## Contribuciones

1. Hacer un fork del repositorio.
2. Crear una rama para tu funcionalidad o corrección:

   ```bash
   git checkout -b mi-nueva-funcionalidad
   ```

3. Hacer un commit de tus cambios:

   ```bash
   git commit -m "Agrega una nueva funcionalidad"
   ```

4. Hacer push a tu rama:

   ```bash
   git push origin mi-nueva-funcionalidad
   ```

5. Crear un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
