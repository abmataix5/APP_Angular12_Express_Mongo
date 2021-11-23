




# APP WEB TWOHANDAPP 📋


Primer proyecto del curso 2n Desarrollo de aplicaciones web.

Aplicacion web destinada a la venta online de productos de seguna mano, estilo Wallapop


# INDICE 📌


*  *Imagenes de la APP en funcionamiento* 
*  *Tecnologias* 
*  *Modulos* 
*  *Funcionalidades*
*  *Autores*


## Imagenes de la APP en funcionamiento ⌨️

### Home
<br><br>
![Captura de pantalla de 2021-11-11 18-55-58](https://user-images.githubusercontent.com/62066419/141346430-75fa0034-4a5c-4bd1-8afc-c960c6b50e54.png)
<br>
### Shop
<br><br>
![Captura de pantalla de 2021-11-11 18-55-56](https://user-images.githubusercontent.com/62066419/141346592-c608c13a-c8fc-4dd3-bf8d-2e6a6a400aa2.png)
<br>

### Perfil
<br><br>
![Captura de pantalla de 2021-11-11 18-55-34](https://user-images.githubusercontent.com/62066419/141346614-617b34c8-6fed-4e8c-973e-e8a108f9a13a.png)
<br>

### Mis pedidos
<br><br>
![Captura de pantalla de 2021-11-11 18-55-48](https://user-images.githubusercontent.com/62066419/141346626-177541cd-cace-4a1e-9963-5903ce15d6ed.png)

<br>

### Login/Register
<br><br>
![Captura de pantalla de 2021-11-11 19-00-41](https://user-images.githubusercontent.com/62066419/141346734-da686fb5-6378-4689-95c0-ae41a96a8855.png)

<br>

### Settings

![Captura de pantalla de 2021-11-11 18-55-53](https://user-images.githubusercontent.com/62066419/141346741-db4d09e5-c7ac-42fc-88d2-79ad9afbf84a.png)


<br>



## Construido con 🛠️


 * SERVIDOR

     * [Express 4.17.1](https://expressjs.com/es/) basado en NodeJS

        * Mongoose 
        * Express JWT
        * Passport
        * Slug
        * middleware_auth
 
* CLIENTE

    * [Angular 12](https://angular.io/)

        * core 
        * shared 
        * interceptor 
        * observable/suscribe/subjects
        * ng Bootsrap
        * ngx-toastr
        * ngx-reactive forms
        * ngx-pagination
        * ng-rating bar
        * ngx-infinite-scroll


* BBDD

    * [MongoDB](https://www.mongodb.com/)



  




### Modulos de la app 🔩

* *Home* 
* *Shop* 
* *Perfil* 
* *Mis pedidos*
* *Login/Register*


### Funcionalidad ⚙️

<table>
    <tr>
        <th>Página</th>
        <th>Características</th>
    </tr>
    <tr>
        <td>Home</td>
        <td>
            <ul>
                <li>Slider -->  Mostramos imagenes desde DB.</li>
                <li>Categorias + Scroll >> Muestra las categorias, y carga categorias con un scroll.</li>
                 <li>Componente search >> Nos permite buscar los productos mediante entradas parciales o totales por teclado.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>Shop</td>
        <td>
            <ul>
                <li>Componente List_Productos >> Nos muestra los productos que aparecen en nuestra DB.</li>
                <li>Componente Filtros >> Nos ayuda a visualiza productos a traves del filtrado de los productos. Nos muestra aquellas preferencias aplicadas.</li>
                <li>Componente Favoritos >> Añade y quita los productos favoritos del cliente. Guarda sus preferencias en DB.</li>
                <li>Paginación >> Nos ayuda a listar los productos por páginas.</li>
                <li>Componente search >> Nos permite buscar los productos mediante entradas parciales o totales por teclado.</li>
            </ul>
        </td>
    </tr> 
      <tr>
        <td>Login/Register/Auth</td>
        <td>
            <ul>
                <li>Adquisicion datos para Register y Login introducidos por el usuario mediante el uso de Reactive-Forms con Validadores</li>
                <li>Generamos un token_user encriptado que validamos contra un secret, que nos permite realizar operaciones autorizadas dentro de la aplicación.</li>
                <li>Para la ejecución de cualquier acción por parte del cliente, se valida contra el server, si el usuario esta autorizado para realizar dicha acción</li>
                <li>Componente search >> Nos permite buscar los productos mediante entradas parciales o totales por teclado</li>
            </ul>
        </td>
    </tr> 
        <tr>
        <td>Mis pedidos</td>
        <td>
            <ul>
                <li>Componente pedidos -> Nos muestra los productos comprados por el usuario</li>
                <li>Componente rating -> Nos permite valorar la compra, esta valoracion irá destinada al usuario vendedor.</li>
            </ul>
        </td>
    </tr> 
       <tr>
        <td>Perfil</td>
        <td>
            <ul>
                <li>Componente perfil -->  Muestra la información del usuario.</li>
                <li>Componente children list_articles --> Muestra los productos en venta de del usuario</li>
                <li>Componente children list_favorites --> Muestra los productos favoritos del usuario.</li>
                <li>Componente children followers --> Muestra los seguidores del usuario.</li>
                  <li>Componente children following --> Muestra los usuarios que sigue el usuario.</li>
            </ul>
        </td>
    </tr>
</table>



## Autores ✒️



* *Abel Mataix * - [abmataix5](https://github.com/abmataix5/)

* *Hugo Micó  * - [hachemico](https://github.com/hachemico/)
