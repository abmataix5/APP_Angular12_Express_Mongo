




# APP WEB TWOHANDAPP 📋


Primer proyecto del curso 2n Desarrollo de aplicaciones web.

Aplicacion web destinada a la venta online de productos de seguna mano, estilo Wallapop


# INDICE 📌


*  *Video APP en funcionamiento* 
*  *Tecnologias* 
*  *Modulos* 
*  *Funcionalidades*
*  *Autores*


## Video de la APP en funcionamiento ⌨️





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
