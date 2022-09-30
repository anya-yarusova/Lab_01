import {validate} from "./validator.js";
import {graph} from "./draw_graph.js";

function update_table() {
    fetch('https://se.ifmo.ru/~s335149/Lab_01/create_table.php')
        .then(response => {
            return response.text();
        })
        .then((response_text) => {
            $(function () {
                    $('#result_table').html(response_text);
                }
            )
        });
}

function submit_button() {
    $('#submit').on('click', () => {
        const form = document.getElementById("form");
        const formData = new FormData(form);
        fetch("https://se.ifmo.ru/~s335149/Lab_01/submit.php", {
            method: "POST",
            body: formData
        }).then(() => {
            update_table();
        });
    });
}

function reset_button() {
    $('#reset').on('click', () => {
        fetch("https://se.ifmo.ru/~s335149/Lab_01/clear.php");
        update_table();
    });

}

document.addEventListener("DOMContentLoaded", (event) => {
    update_table();
    graph();
    submit_button();
    reset_button();
    validate();
});
