<?php
/**
 * Copyright (c) 2015 Leonardo Cardoso (http://leocardz.com)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.0.0
 */

/** This class handles url analysis */
class Url
{

    static function canonicalLink($imgSrc, $referrer)
    {
        if (strpos($imgSrc, "//") === 0)
            $imgSrc = "http:" . $imgSrc;
        else if (strpos($imgSrc, "/") === 0)
            $imgSrc = "http://" . Url::canonicalPage($referrer) . $imgSrc;
        else
            $imgSrc = "http://" . Url::canonicalPage($referrer) . '/' . $imgSrc;
        return $imgSrc;
    }

    static function canonicalImgSrc($imgSrc)
    {
        $imgSrc = str_replace("../", "", $imgSrc);
        $imgSrc = str_replace("./", "", $imgSrc);
        $imgSrc = str_replace(" ", "%20", $imgSrc);
        return $imgSrc;
    }

    static function canonicalRefererPage($url)
    {
        $canonical = "";
        $barCounter = 0;
        for ($i = 0; $i < strlen($url); $i++) {
            if ($url[$i] != "/") {
                $canonical .= $url[$i];
            } else {
                $canonical .= $url[$i];
                $barCounter++;
            }
            if ($barCounter == 3) {
                break;
            }
        }
        return $canonical;
    }

    static function canonicalPage($url)
    {
        $canonical = "";

        if (substr_count($url, 'http://') > 1 || substr_count($url, 'https://') > 1 || (strpos($url, 'http://') !== false && strpos($url, 'https://') !== false))
            return $url;

        if (strpos($url, "http://") !== false || strpos($url, "HTTP://") !== false)
            $url = substr($url, 7);
        elseif (strpos($url, "https://") !== false || strpos($url, "HTTPS://") !== false)
            $url = substr($url, 8);

        for ($i = 0; $i < strlen($url); $i++) {
            if ($url[$i] != "/")
                $canonical .= $url[$i];
            else
                break;
        }

        return $canonical;
    }

    static function getImageUrl($pathCounter, $url)
    {
        $src = "";
        if ($pathCounter > 0) {
            $urlBreaker = explode('/', $url);
            for ($j = 0; $j < $pathCounter + 1; $j++) {
                $src .= $urlBreaker[$j] . '/';
            }
        } else {
            $src = $url;
        }
        return preg_replace("/^http:/i", "https:", $src);
    }
}
