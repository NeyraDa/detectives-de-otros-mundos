<?php

namespace App\Controllers;

/** Página del juego (pública) */
class Juego extends BaseController
{
    public function index(): string
    {
        return view('juego');
    }
}
