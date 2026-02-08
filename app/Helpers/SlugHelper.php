<?php

if (!function_exists('makeSlug')) {
    function makeSlug($string)
    {
        $string = mb_strtolower($string);
        $string = preg_replace('/[^\p{L}\p{N}]+/u', '-', $string);
        return trim($string, '-');
    }
}
