window.onload = () => {

    //Funcionalidad
    var cajaImg = document.querySelector(".cajaImg");
    var img = document.querySelector('#img');

    var bywValue = document.querySelector("#bYw");
    var bYwApp = document.querySelector("#bYwApp");
    var sepiaValue = document.querySelector('#sepia');
    var sepiaApp = document.querySelector('#sepiaApp');
    var negativoSi = document.querySelector('#negativoSi');
    var negativoNo = document.querySelector('#negativoNo');
    var aclararValue = document.querySelector('#aclarar');
    var aclararApp = document.querySelector('#aclararApp');
    var oscurecerValue = document.querySelector('#oscurecer');
    var oscurecerApp = document.querySelector('#oscurecerApp');

    const tam = {
        w : cajaImg.clientWidth,
        h : cajaImg.clientHeight
    };
    
    var row2 = document.querySelector(".row2");

    var template = `<canvas id="canvas"></canvas>`;

    cajaImg.className += ' ocultar';

    row2.innerHTML = template;

    var canvas = document.querySelector('#canvas');

    canvas.width = tam.w;
    canvas.height = tam.h;
    canvas.style.border = '1px solid black';

    var ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imageData.data;
    
    
    function bYw(valor) {
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        var imageDim = imageData.width * imageData.height;

        for(let i = 0; i < imageDim; i++) {

            let R = data[ i * 4 ];
            let G = data[ i * 4 + 1 ];
            let B = data[ i * 4 + 2 ];

            let grey = (R + G + B) / 3;

            R2 = (R - grey) / 100;
            R3 = R2 * valor;

            G2 = (G - grey) / 100;
            G3 = G2 * valor;

            B2 = (B - grey) / 100;
            B3 = B2 * valor;

            data[ i * 4 ] = grey + R3;
            data[ i * 4 + 1 ] = grey + G3;
            data[ i * 4 + 2 ] = grey + B3;

        }

        ctx.putImageData(imageData, 0, 0);

    }

    function Sepia(valor) {

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        var imageDim = imageData.width * imageData.height;
        
        for(let i = 0; i < imageDim; i++) {

            let R = data[ i * 4 ];
            let G = data[ i * 4 + 1 ];
            let B = data[ i * 4 + 2 ];

            let R1 = 0.00393; let R2 = 0.00349; let R3 = 0.00272;
            let G1 = 0.00769; let G2 = 0.00686; let G3 = 0.00534;
            let B1 = 0.00189; let B2 = 0.00168; let B3 = 0.00131;

            let R1F = R1 * valor; let R2F = R2 * valor; let R3F = R3 * valor;
            let G1F = G1 * valor; let G2F = G2 * valor; let G3F = G3 * valor;
            let B1F = B1 * valor; let B2F = B2 * valor; let B3F = B3 * valor;

            let RFF = ( R * R1F ) + ( G * G1F ) + ( B * B1F );
            let GFF = ( R * R2F ) + ( G * G2F ) + ( B * B2F );
            let BFF = ( R * R3F ) + ( G * G3F ) + ( B * B3F );

            if(RFF > 255) RFF = 255;
            if(GFF > 255) GFF = 255;
            if(BFF > 255) BFF = 255;


            data[ i * 4 ] = RFF;
            data[ i * 4 + 1 ] = GFF;
            data[ i * 4 + 2 ] = BFF;

        }

        ctx.putImageData(imageData, 0, 0);

    }

    function Negativo() {
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        var imageDim = imageData.width * imageData.height;

        for(let i = 0; i < imageDim; i++) {

            var R = data[ i * 4 ];
            var G = data[ i * 4 + 1 ];
            var B = data[ i * 4 + 2 ];

            data[ i * 4 ] = 255 - R;
            data[ i * 4 + 1 ] = 255 - G;
            data[ i * 4 + 2 ] = 255 - B;

        }

        ctx.putImageData(imageData, 0, 0);
    }

    function Aclarar(valor) {

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        var imageDim = imageData.width * imageData.height;

        for(let i = 0; i < imageDim; i++) {

            let R = data[ i * 4 ];
            let G = data[ i * 4 + 1 ];
            let B = data[ i * 4 + 2 ];

            let R1 = 255 - R;
            let G1 = 255 - G;
            let B1 = 255 - B;

            let R2 = R1 / 100;
            let G2 = G1 / 100;
            let B2 = B1 / 100;

            let R3 = R2 * valor;
            let G3 = G2 * valor;
            let B3 = B2 * valor;

            data[ i * 4 ] = R + R3;
            data[ i * 4 + 1 ] = G + G3;
            data[ i * 4 + 2 ] = B + B3;

        }

        ctx.putImageData(imageData, 0, 0);

    }

    function Oscurecer(valor) {

        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        var imageDim = imageData.width * imageData.height;

        for(let i = 0; i < imageDim; i++) {

            let R = data[ i * 4 ];
            let G = data[ i * 4 + 1 ];
            let B = data[ i * 4 + 2 ];

            let R1 = 255 - R;
            let G1 = 255 - G;
            let B1 = 255 - B;

            let R2 = R1 / 50;
            let G2 = G1 / 50;
            let B2 = B1 / 50;

            let R3 = R2 * valor;
            let G3 = G2 * valor;
            let B3 = B2 * valor;

            data[ i * 4 ] = R - R3;
            data[ i * 4 + 1 ] = G - G3;
            data[ i * 4 + 2 ] = B - B3;

        }

        ctx.putImageData(imageData, 0, 0);

    }


    bYwApp.addEventListener('click', () => {
        let value = bywValue.value;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        bYw(value);
    });

    sepiaApp.addEventListener('click', () => {
        let value = sepiaValue.value;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        Sepia(value);
    });
    
    negativoSi.addEventListener('click', () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        Negativo();
    });

    negativoNo.addEventListener('click', () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    });

    aclararApp.addEventListener('click', () => {
        let value = aclararValue.value;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        Aclarar(value);
    });

    oscurecerApp.addEventListener('click', () => {
        let value = oscurecerValue.value;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        Oscurecer(value);
    });

};


