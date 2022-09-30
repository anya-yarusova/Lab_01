const canvas = document.getElementById("graph");
const ctx = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const radius = width / 2.5;
const arrow_size = 20;
const axes_color = '#000';
const figure_color = '#00f';
const font_size = 10;
const mark_size = 30;

function draw_marks() {
    ctx.beginPath();
    ctx.fillStyle = axes_color;
    ctx.strokeStyle = axes_color;
    ctx.fillText('X', width - mark_size / 2, height / 2 - mark_size - mark_size / 2);
    ctx.fillText('Y', width / 2 + mark_size + mark_size / 2, mark_size / 2);
    ctx.fillText('-R', width / 2 - radius, height / 2 + mark_size + mark_size / 2);
    ctx.moveTo(width / 2 - radius, height / 2 + mark_size);
    ctx.lineTo(width / 2 - radius, height / 2 - mark_size);
    ctx.fillText('-R/2', width / 2 - radius / 2, height / 2 + mark_size + mark_size / 2);
    ctx.moveTo(width / 2 - radius / 2, height / 2 + mark_size);
    ctx.lineTo(width / 2 - radius / 2, height / 2 - mark_size);
    ctx.fillText('R/2', width / 2 + radius / 2, height / 2 + mark_size + mark_size / 2);
    ctx.moveTo(width / 2 + radius / 2, height / 2 + mark_size);
    ctx.lineTo(width / 2 + radius / 2, height / 2 - mark_size);
    ctx.fillText('R', width / 2 + radius, height / 2 + mark_size + mark_size / 2);
    ctx.moveTo(width / 2 + radius, height / 2 + mark_size);
    ctx.lineTo(width / 2 + radius, height / 2 - mark_size);
    ctx.fillText('R', width / 2 - mark_size - mark_size / 2, height / 2 - radius);
    ctx.moveTo(width / 2 - mark_size, height / 2 - radius);
    ctx.lineTo(width / 2 + mark_size, height / 2 - radius);
    ctx.fillText('R/2', width / 2 - mark_size - mark_size / 2, height / 2 - radius / 2);
    ctx.moveTo(width / 2 - mark_size, height / 2 - radius / 2);
    ctx.lineTo(width / 2 + mark_size, height / 2 - radius / 2);
    ctx.fillText('-R/2', width / 2 - mark_size - mark_size / 2, height / 2 + radius / 2);
    ctx.moveTo(width / 2 - mark_size, height / 2 + radius / 2);
    ctx.lineTo(width / 2 + mark_size, height / 2 + radius / 2);
    ctx.fillText('-R', width / 2 - mark_size - mark_size / 2, height / 2 + radius);
    ctx.moveTo(width / 2 - mark_size, height / 2 + radius);
    ctx.lineTo(width / 2 + mark_size, height / 2 + radius);
    ctx.stroke();
}

function draw_axes() {
    ctx.beginPath();
    ctx.fillStyle = axes_color;
    ctx.moveTo(width / 2, height);
    ctx.lineTo(width / 2, 0);
    ctx.lineTo(width / 2 - arrow_size, arrow_size);
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2 + arrow_size, arrow_size);
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.lineTo(width - arrow_size, height / 2 - arrow_size);
    ctx.moveTo(width, height / 2);
    ctx.lineTo(width - arrow_size, height / 2 + arrow_size);
    ctx.stroke();
    draw_marks();
}

function draw_figure() {
    ctx.beginPath();
    ctx.fillStyle = figure_color;
    ctx.arc(width / 2, height / 2, radius / 2, 0,1.5*Math.PI, true);
    ctx.lineTo(width / 2, height / 2);
    ctx.fill();
    ctx.fillRect(width / 2 - radius, height / 2, radius, radius / 2);
    ctx.moveTo(width / 2, height / 2);
    ctx.lineTo(width / 2 + radius, height / 2);
    ctx.lineTo(width / 2, height / 2 + radius / 2);
    ctx.lineTo(width / 2, height / 2);
    ctx.fill();
}

function draw_graph() {
    draw_figure();
    draw_axes();
}

function draw_cursor(e) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_graph();
    ctx.beginPath();
    ctx.fillStyle = '#f00';
    ctx.arc(e.offsetX, e.offsetY, 5, 0, 2 * Math.PI);
    ctx.fill();
}

export function graph() {
    canvas.onmousedown = (event) => {
        const form = document.getElementById("form");
        const formData = new FormData(form);
        const r = parseFloat(formData.get("r").toString());
        const x = (event.offsetX / width) * (5 * r / 2) - (5 / 4) * r;
        const y =  - (event.offsetY / height) * (5 * r / 2) + (5 / 4) * r;
        const data = new FormData();
        data.append('x', x.toString());
        data.append('y', y.toString());
        data.append('r', r.toString());
        fetch("http://localhost:63342/testing/submit.php", {
            method: "POST",
            body: data
        }).then(() => {
            fetch('http://localhost:63342/testing/create_table.php')
                .then(response => {
                    return response.text();
                })
                .then((response_text) => {
                    $(function () {
                            $('#result_table').html(response_text);
                        }
                    )
                });
        });
    }
    canvas.onmousemove = (event) => {
        draw_cursor(event);
    }
    canvas.onmouseleave = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw_graph();
    }
    draw_graph();
}
