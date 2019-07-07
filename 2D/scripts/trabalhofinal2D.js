const canvas = document.querySelector("#canvas");
canvas.height = window.innerHeight - 10;
canvas.width = window.innerWidth - 10;
let ctx = canvas.getContext('2d');
let greenColor = "#008729";
let yellowColor = "#F8F600";

let escudo = [{x: .0, color: greenColor},
    {x: .0, color: yellowColor},
    {x: .0, color: greenColor},];

function quadradoAchatado(x) {
    ctx.beginPath();
    ctx.moveTo(x, x);
    ctx.quadraticCurveTo(1, 0, x, -x);
    ctx.quadraticCurveTo(0, -1, -x, -x);
    ctx.quadraticCurveTo(-1, 0, -x, x);
    ctx.quadraticCurveTo(0, 1, x, x);
    ctx.closePath();
}

function drawEscudo(escudo) {
    ctx.save();
    escudo.forEach(parte => {
        ctx.scale(0.92, 0.92);
        quadradoAchatado(parte.x);
        ctx.fillStyle = parte.color;
        ctx.fill();
    });
    ctx.restore();
}

let pernaFrontal = [
    {
        circulo: {
            raio: .25,
            centro: {x: 0, y: 0},
        },
        pontos: [
            {x: -.3, y: 0, lineto: null},
            {x: .27, y: .1, lineto: null},
            {x: .0, y: .65, cx: .08, cy: .9, quadratic: null},
            {x: -.15, y: 1, lineto: null},
            {x: -.3, y: .5, cx: -.3, cy: 0, quadratic: null},
        ],
        scale: {x: 75, y: 58},
        rotation: 1.5,
        translation: {x: -0.7, y: .4}
    },
    {
        circulo: {
            raio: .2,
            centro: {x: 0, y: 0},
        },
        pontos: [
            {x: -.2, y: 0, lineto: null},
            {x: .15, y: .07, lineto: null},
            {x: .2, y: 1.2, cx: .57, cy: 1.23, quadratic: null},
            {x: .66, y: 1.63, lineto: null},
            {x: -.2, y: 1, cx: -.2, cy: 0, quadratic: null},
        ],
        scale: {x: 45, y: 40},
        rotation: -.3,
        translation: {x: -2.7, y: 0.65}
    }
];

let pernaTraseira = [
    {
        circulo: {
            raio: .34,
            centro: {x: -.01, y: -.05},
        },
        pontos: [
            {x: -.33, y: -.2, liento: null},
            {x: .3, y: 0.1, lineto: null},
            {x: -.2, y: .6, cx: .1, cy: 1.1, quadratic: null},
            {x: -.1, y: 1.1, lineto: null},
            {x: -.6, y: .2, cx: -.33, cy: -.2, quadratic: false},
        ],
        scale: {x: 67, y: 81},
        rotation: -.91,
        translation: {x: 1.12, y: .5}
    },
    {
        pontos: [
            {x: -.1, y: -0.25, lineto: null},
            {x: 0.67, y: 0.12, lineto: null},
            {x: 2, y: 2, lineto: null},
            {x: 1.5, y: 1.8, lineto: null},
        ],
        scale: {x: 10, y: 60},
        translation: {x: 13, y: 1.8},
        rotation: -.7,
    }
];

let corpo = [
    {
        pontos: [
            {x: 0, y: -.15, moveto: null},
            {x: 0.5, y: -.25, cx: 0.75, cy: -0.15, quadratic: null},
            {x: .8, y: -.25, cx: .6, cy: -.55, quadratic: null},
            {x: .92, y: -.35, cx: .92, cy: -.14, quadratic: null},
            {x: .83, y: -.1, lineto: null},
            {x: .88, y: 0, lineto: null},
            {x: 1.05, y: .41, cx: .55, cy: .37, quadratic: null},
            {x: .3, y: 0.37, cx: -.1, cy: 0.45, quadratic: null},
            {x: -.9, y: 0.5, cx: -.55, cy: -.53, quadratic: null},
            {x: -.8, y: -.5, lineto: null},
            {x: -.83, y: -.58, lineto: null},
            {x: -.3, y: -.9, lineto: null},
            {x: -.2, y: -1.2, cx: -.9, cy: -.8, quadratic: null},
            {x: -.8, y: -.9, cx: -.68, cy: -1, quadratic: null},
            {x: -.68, y: -1.06, cx: -.84, cy: -1.09, quadratic: null},
            {x: -.63, y: -1.1, cx: -.62, cy: -1.04, quadratic: null},
            {x: -.5, y: -1.09, lineto: null},
            {x: -.55, y: -1.18, cx: -.67, cy: -1.25, quadratic: null},
            {x: -.42, y: -1.2, cx: -.4, cy: -1.12, quadratic: null},
            {x: -.34, y: -1.13, cx: -.3, cy: -1.11, quadratic: null},
            {x: -.3, y: -1.21, cx: -.43, cy: -1.4, quadratic: null},
            {x: -.16, y: -1.24, cx: -.17, cy: -.93, quadratic: null},
            {x: .1, y: -1.05, lineto: null},
            {x: -.05, y: -.8, lineto: null},
            {x: -.18, y: -.82, lineto: null},
            {x: -.27, y: -.4, lineto: null},
            {x: -.3, y: -.12, cx: 0, cy: -.15, quadratic: null},
        ],
        scale: {x: 112, y: 102},
        translation: {x: -.06, y: .01},
        rotation: .1,
    }
];

let veado = [
    pernaFrontal,
    pernaTraseira,
    corpo,
];

function drawParte(parte) {
    if (parte.hasOwnProperty("circulo")) {
        ctx.beginPath();
        ctx.arc(parte.circulo.centro.x, parte.circulo.centro.y, parte.circulo.raio, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();
    }
    if (parte.hasOwnProperty("pontos")) {
        // moveTo(parte.pontos[0].x, parte.pontos[0].y);
        ctx.beginPath();
        parte.pontos.forEach(ponto => {
            if (ponto.hasOwnProperty("quadratic")) {
                ctx.quadraticCurveTo(ponto.x, ponto.y, ponto.cx, ponto.cy);
            }
            if (ponto.hasOwnProperty("lineto")) {
                ctx.lineTo(ponto.x, ponto.y);
            }
            if (ponto.hasOwnProperty("moveto")) {
                ctx.moveTo(ponto.x, ponto.y);
            }
        });
        ctx.closePath();
        ctx.fill();
    }
}

function drawveado(veado) {
    ctx.fillStyle = yellowColor;
    veado.forEach(parteDoCorpo => {
        parteDoCorpo.forEach(parte => {
            ctx.save();
            ctx.scale(-parte.scale.x, parte.scale.y);
            ctx.translate(parte.translation.x, parte.translation.y);
            ctx.rotate(parte.rotation);
            drawParte(parte);
            ctx.restore();
        });
    });
}

let scene = {
    escudo: escudo,
    veado: veado,
    trans: {x: 0, y: 560},
    scaleEscudo: {x: 280, y: 240},
    draw_text: false,
    make_movement: false,
    draw_escudo: false,
};

function drawText() {
    let image = new Image();
    image.src = "./images/text.png";
    image.onload = function () {
        ctx.fillStyle = ctx.createPattern(image, "no-repeat");
        ctx.translate(880, 485);
        ctx.scale(-0.1, 0.1);
        ctx.fillRect(0, 0, 5620, 682);
    };
}

function draw(scene) {
    ctx.save();
    ctx.translate(scene.trans.x, scene.trans.y);
    ctx.scale(scene.scaleEscudo.x, scene.scaleEscudo.y);
    drawEscudo(scene.escudo);
    ctx.restore();

    ctx.save();
    ctx.translate(scene.trans.x, scene.trans.y);
    drawveado(scene.veado);
    ctx.restore();

}

let x = function (time) {

    if (!scene.draw_escudo) {
        if (scene.trans.x < 900 && scene.trans.y > 260) {
            scene.trans.x += 3;
            scene.trans.y -= 1.5;
        } else {
            scene.make_movement = true;

        }
    }

    if (scene.make_movement) {
        ctx.translate(scene.trans.x, scene.trans.y);
        ctx.scale(-1, 1);
        ctx.translate(-scene.trans.x, -scene.trans.y);
        scene.draw_escudo = true;
        scene.make_movement = false;

    }

    if (scene.draw_escudo) {

        scene.escudo.forEach(elememnt => {
            if (elememnt.x < 0.7) {
                elememnt.x += 0.02;
            } else {
                scene.draw_text = true;

            }
        });
    }

    if (scene.draw_text) {
        draw(scene);
        drawText();
    } else {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        draw(scene);
        requestAnimationFrame(x);
    }
};

requestAnimationFrame(x);

