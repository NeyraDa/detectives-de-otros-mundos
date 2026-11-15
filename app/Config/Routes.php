<?php

use CodeIgniter\Router\RouteCollection;

/**
 * Versión local: el servidor solo entrega el juego y los casos.
 * No hay base de datos, API, cuentas ni panel. El progreso de cada
 * persona vive únicamente en su navegador (localStorage).
 *
 * @var RouteCollection $routes
 */
$routes->get('/', 'Juego::index');
// Sin extensión .js: en Nginx/CloudPanel las rutas que terminan en .js se
// tratan como archivos estáticos y nunca llegan a PHP (darían 404).
$routes->get('datos/casos', 'Datos::casos');
$routes->get('datos/casos.js', 'Datos::casos'); // compatibilidad con Apache

// Cualquier otra ruta devuelve un 404 de verdad, con su página.
// Sin esto, la excepción de "página no encontrada" escapaba hasta el try/catch
// de public/index.php, que la trataba como fallo de arranque: respondía 500
// ("Error al iniciar el sistema") y anotaba una línea en fatal_boot.log.
$routes->set404Override(static function () {
    return view('errors/html/404');
});
