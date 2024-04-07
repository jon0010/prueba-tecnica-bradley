
# Prueba tencica para bradley (desarrollador backend)

En este sitio hice un CRUD con productos.

EL SITIO CUENTA CON LOS SIGUIENTES APARTADOS:

1) Vista general de tarjetas de productos con una sidebar con opciones de filtrado por busqueda de nombre, precios ascendente y descendente, fecha de creacion de mas antiguos a mas nuevos y viceversa.

2) Paginado dinamico que aumenta o disminuye automaticamente dependiendo el total de cards. 

4) Dashboard con opciones para crear productos, borrar y editar cada opcion con su panel dedicado.

5) Base de datos desplegada en mongoDB Atlas, backend desplegado en render y front desplegado en vercel.

6) Diseño responsive de todas  las secciones.





## Entorno local front

Para levantar el proyecto front-end, parate en la carpeta raíz e ingresa este comando en tu terminal

```bash
  npm run dev
```


## Variables de entorno

Para levantar el proyecto en tu entorno local create una cuenta en el sitio de Marvel API: https://developer.marvel.com vas a necesitar cuatro variables de entorno

```javascript
VITE_CLOUDINARY_API_KEY: tu_api_key

VITE_CLOUDINARY_UPLOAD_PRESET: tu_upload_preset

VITE_CLOUDINARY_CLOUD_NAME: tu_cloud_name
```


## Deploy en la nube (VERCEL)

Ingresa a esta url para ver la pagina desplegada https://prueba-tecnica-bradley.vercel.app
## Caracteristicas

- Realizado mediante Vite.js, Typescript y tailwindCSS.
- No se usaron otros plugins de UI solo tailwind.



## Contacto

- E-mail: jonnahuel78@gmail.com
- LinkedIn: https://www.linkedin.com/in/jon-nahuel-pereyra-832191257


## API Reference

#### Get all products

```http
  GET /product
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| no required | `string` | obtiene todos los productos |

#### Get product

```http
  GET /product/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. trae producto por id |


#### Post product

```http
  POST /product/post/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. crea un producto |



#### Update product

```http
  PUT product/update/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. actualiza un producto |



#### Delete product

```http
  DELETE product/delete/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. borra un producto |

## AVISO IMPORTANTE

El servicio render en su capa gratuita levanta el backend en 50 segundos despues que se hizo la PRIMERA solicitud, luego funcicona con normalidad

![App Screenshot](https://res.cloudinary.com/dkpotpaaf/image/upload/v1712523987/Captura_de_pantalla_1379_eeptwf.png)

