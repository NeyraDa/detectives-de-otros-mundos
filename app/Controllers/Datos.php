<?php

namespace App\Controllers;

use CodeIgniter\HTTP\ResponseInterface;

/**
 * Entrega los casos como un archivo JavaScript (ruta datos/casos) que define
 * EQUIPOS y EQUIPOS_EN. Los casos se leen de app/Data/casos.json:
 * no hay base de datos en esta versión.
 */
class Datos extends BaseController
{
    private const ARCHIVO = APPPATH . 'Data/casos.json';
    private const LUGARES = ['marte', 'luna', 'espacio'];

    public function casos(): ResponseInterface
    {
        $casos = $this->leerCasos();
        $flags = JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT;
        $js    = "/* Casos del juego (app/Data/casos.json) */\n"
            . 'const EQUIPOS = ' . json_encode($casos['es'], $flags) . ";\n"
            . 'const EQUIPOS_EN = ' . json_encode((object) $casos['en'], $flags) . ";\n";

        return $this->response
            ->setContentType('application/javascript', 'utf-8')
            ->setHeader('Cache-Control', 'public, max-age=300')
            ->setBody($js);
    }

    /** @return array{es: list<array>, en: array<string, array>} */
    private function leerCasos(): array
    {
        $crudo = is_file(self::ARCHIVO) ? file_get_contents(self::ARCHIVO) : false;
        $filas = $crudo === false ? null : json_decode($crudo, true);
        if (! is_array($filas)) {
            log_message('error', 'casos.json no se pudo leer o no es JSON válido');

            return ['es' => [], 'en' => []];
        }

        usort($filas, static fn ($a, $b) => ($a['orden'] ?? 0) <=> ($b['orden'] ?? 0));
        $es = [];
        $en = [];
        foreach ($filas as $f) {
            $id = $f['id'] ?? '';
            if (! is_string($id) || ! preg_match('/^[a-z0-9-]{1,40}$/', $id)) {
                continue;
            }
            if (! in_array($f['lugar'] ?? '', self::LUGARES, true) || ! is_array($f['datos'] ?? null)) {
                continue;   // un caso mal formado no rompe el juego
            }
            if (($f['activo'] ?? true) === false) {
                continue;
            }
            $datos          = $f['datos'];
            $datos['id']    = $id;
            $datos['listo'] = true;
            $datos['lugar'] = $f['lugar'];
            $es[]           = $datos;
            if (is_array($f['datos_en'] ?? null)) {
                $en[$id] = $f['datos_en'];
            }
        }

        return ['es' => $es, 'en' => $en];
    }
}
