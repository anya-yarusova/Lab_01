<?php
session_start();
if (isset($_SESSION['history'])) {
    $history = $_SESSION['history'];
    echo("<thead><tr><th>X</th><th>Y</th><th>R</th><th>Result</th><th>Time</th><th>Script time</th></tr></thead>");
    echo ("<tbody>");
    foreach ($history as $item) {
        echo '<tr>';
        echo '<td>' . $item['x'] . '</td>';
        echo '<td>' . $item['y'] . '</td>';
        echo '<td>' . $item['r'] . '</td>';
        if ($item['result']) {
            echo '<td <p class="status hit">Hit </p></td>';
        } else {
            echo '<td> <p class="status miss">Miss</p></td>';
        }
        echo '<td>' . date('Y-m-d H:i:s', $item['time']) . '</td>';
        echo '<td>' . $item['script_time'], ' ms' . '</td>';
        echo '</tr>';
    }
    echo ("</tbody>");
}
?>
