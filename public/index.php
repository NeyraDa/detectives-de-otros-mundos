<?php

define('FCPATH', __DIR__ . DIRECTORY_SEPARATOR);

$minPhpVersion = '8.2';
if (version_compare(PHP_VERSION, $minPhpVersion, '<')) {
    header('HTTP/1.1 503 Service Unavailable.', true, 503);
    echo 'Your PHP version must be ' . $minPhpVersion . ' or higher to run CodeIgniter. Current version: ' . PHP_VERSION;
    exit(1);
}

$pathsPath = FCPATH . '../app/Config/Paths.php';
if (! is_file($pathsPath)) {
    header('HTTP/1.1 503 Service Unavailable.', true, 503);
    echo 'No se encontró app/Config/Paths.php.';
    exit(1);
}

require $pathsPath;

$paths = new Config\Paths();

require rtrim($paths->systemDirectory, '\\/ ') . DIRECTORY_SEPARATOR . 'Boot.php';

try {
    exit(CodeIgniter\Boot::bootWeb($paths));
} catch (Throwable $e) {
    @file_put_contents(FCPATH . '../writable/logs/fatal_boot.log', '[' . date('Y-m-d H:i:s') . '] ' . $e->getMessage() . PHP_EOL . $e->getTraceAsString() . PHP_EOL . PHP_EOL, FILE_APPEND);
    header('HTTP/1.1 500 Internal Server Error.', true, 500);
    echo 'Error al iniciar el sistema. Revisa writable/logs/fatal_boot.log';
    exit(1);
}
