const x_field = document.getElementsByName("x");
const y_field = document.getElementById("y");
const r_field = document.getElementById("r");
let submit = document.getElementById("submit");
let error_x = document.getElementById("error_x_message");
let error_y = document.getElementById("error_y_message");
let error_r = document.getElementById("error_r_message");
const numberPattern = new RegExp("^[+-]?([0-9]*[.,])?[0-9]+$");

function validateX(event) {
    let flag = false;
    for (let i = 0; i < x_field.length; i++) {
        if (x_field[i].checked && flag) {
            error_x.hidden = false;
            submit.disabled = true;
            error_x.innerHTML = "Выберите только одно значение X";
            break;
        } else if (x_field[i].checked) {
            error_x.hidden = true;
            flag = true;
            if (error_y.hidden && error_r.hidden) {
                submit.disabled = false;
            }
            error_x.innerHTML = "";
        }
    }
    if (!flag) {
        error_x.hidden = false;
        submit.disabled = true;
        error_x.innerHTML = "Выберите значение X";
    }
}

function validateY(event) {
    const y = y_field.value;
    if (y === "") {
        error_y.innerHTML = "Значение Y не может быть пустым";
        error_y.hidden = false;
        submit.disabled = true;
    } else if (isNaN(parseFloat(y))) {
        error_y.innerHTML = "Значение Y должно быть числом";
        error_y.hidden = false;
        submit.disabled = true;
    } else if (!numberPattern.test(y)|| parseFloat(y) < -3 || parseFloat(y) > 5) {
        error_y.innerHTML = "Значение Y должно быть в диапазоне [-3; 5]";
        error_y.hidden = false;
        submit.disabled = true;
    } else {
        error_y.innerHTML = "";
        error_y.hidden = true;
        if (error_x.hidden && error_r.hidden) {
            submit.disabled = false;
        }
    }
}

function validateR(event) {
    const r = r_field.value;
    if (r === "") {
        error_r.innerHTML = "Значение R не может быть пустым";
        error_r.hidden = false;
        submit.disabled = true;
    } else if (isNaN(parseFloat(r))) {
        error_r.innerHTML = "Значение R должно быть числом";
        error_r.hidden = false;
        submit.disabled = true;
    } else if (!numberPattern.test(r)|| parseFloat(r) < 2 || parseFloat(r) > 5) {
        error_r.innerHTML = "Значение R должно быть в диапазоне [2; 5]";
        error_r.hidden = false;
        submit.disabled = true;
    } else {
        error_r.innerHTML = "";
        error_r.hidden = true;
        if (error_x.hidden && error_y.hidden) {
            submit.disabled = false;
        }
    }
}

export function validate() {
    x_field.forEach((x) => {
        x.addEventListener("change", validateX);
        x.dispatchEvent(new Event("change"));
    });
    y_field.addEventListener("change", validateY);
    y_field.dispatchEvent(new Event("change"));
    r_field.addEventListener("change", validateR);
    r_field.dispatchEvent(new Event("change"));
}
