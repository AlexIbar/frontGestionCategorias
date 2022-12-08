
![Logo](https://www.redttu.edu.co/es/wp-content/uploads/2019/03/11.-IU-DIGITAL.png)

## EA3: Cliente Vue.js
## Gestion de Categorias y Posts 

Front que hace consumo de la API desarrollada en PHP para la entrega de la actividad anterior
Enlace: https://github.com/AlexIbar/gestionCategoria.git

## Authors

- [@AlexIbar](https://github.com/AlexIbar)
Edwin Alexander Ibarra Ortiz - PREELEC2202PC-TDS0033 
- [@chechorios2008](https://github.com/chechorios2008)
Sergio Andres Rios Gomez - PREELEC2202PC-TDS0033


## Repositorio GitHub
[![portfolio](https://pythonforundergradengineers.com/posts/git/images/git_and_github_logo.png)](https://github.com/)
Enlace: https://github.com/AlexIbar/frontGestionCategorias

# Descripción del front

### General
El sistema nos permite realizar la gestion de post, categorias, roles y usuarios. el sistema de administra de acuerdo al rol del usuario, teniendo en cuenta las necesidades planteadas en el archivo soporte del proyecto

### Comandos para iniciar el proyecto

## Installation


```bash
  npm install
  npm run dev #Para desarrollo
  npm run build #Compilar a producción
```

Tener en cuenta que para que el front pueda funcionar el proyecto del back debe de estar corriendo y se debe actualizar

## Se debe tener previamente

```sql
    insert into rols(nombre) VALUES ('ADMIN')
    insert into rols(nombre) VALUES ('LECTOR')
    insert into rols(nombre) VALUES ('AUTOR')
```
El rol ADMIN -> Es el que se encargara de crear los usuarios y roles asociados a los usuarios

```sql
    insert into usuarios(nombre, correo, password, id_rol) VALUES('Administrador', 'admin@admin.com','$2y$12$oeenqWrODpkQua6rR1P97OHpF5Gw4fe21AbVph6TbmdfYJPmLiVny', 1)
    -- La contraseña es: laura.norena@gmail.com
```

## Nota

Es importante descargar nuevamente el repositorio de Github porque el proyecto esta actualizado, donde se mejoraron algunos bugs que encontramos y ademas esta configurada la encryptación de la contraseña

### Capturas

https://drive.google.com/drive/folders/18Xv19VtzEtr-dsDZlSfytyaFpyhCz1cC?usp=share_link
