<?php
$start_time = hrtime(true);
function checkArea(float $x, float $y, float $r): bool
{
    return ($x >= 0 && $y >= 0 && $x * $x + $y * $y <= $r * $r / 4) ||
        ($x <= 0 && $y <= 0 && $x >= -$r  && $y >= -$r / 2) ||
        ($x >= 0 && $y <= 0 && $y >= $x / 2 - $r / 2);
}

if (!(isset($_POST['x']) && isset($_POST['y']) && isset($_POST['r']))) {
    if (!isset($_POST['r'])) {
        echo 'R not set';
    }
    if (!isset($_POST['y'])) {
        echo 'Y not set';
    }
    if (!isset($_POST['x'])) {
        echo 'X not set';
    }

    echo 'Not enough parameters';
    http_response_code(400);
}
else{
    $x = $_POST['x'];
    $y = $_POST['y'];
    $r = $_POST['r'];
    if (is_numeric($x) && is_numeric($y) && is_numeric($r)) {
        $x = floatval($x);
        $y = floatval($y);
        $r = floatval($r);
        if ($y >= -3 && $y <= 5 && $r >= 2 && $r <= 5) {
            $result = checkArea($x, $y, $r);
            $script_time = hrtime(true) - $start_time;
            $script_time = $script_time / 1000000000;
            $script_time = round($script_time, 7);
            $output = array(
                'x' => $x,
                'y' => $y,
                'r' => $r,
                'result' => $result,
                'time' => time(),
                'script_time' => $script_time
            );
            session_start();
            if (!isset($_SESSION['history'])) {
                $_SESSION['history'] = array($output);
            } else {
                array_push($_SESSION['history'], $output);
            }
        }
        else {
            echo 'Invalid parameters';
            http_response_code(400);
        }
    }
    else {
        echo 'Invalid parameters';
        http_response_code(400);
    }
}
?>