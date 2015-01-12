/*  Попиксельное чтение изображение
    и сохранение значений каналов массив
======================================== */

function canvas_read_image(image) {

    // Инициализируем канвас
    canvas_init();

    var array = [];


    // Отображаем в канвасе исходное изображение
    cxt_src.drawImage(src_img, 0, 0, src_img_width, src_img_height);

    // Поллучаем массив с информацией по цветам
    var myGetImageData = cxt_src.getImageData(0,0, src_img_width, src_img_height);
    var sourceBuffer32 = new Uint32Array(myGetImageData.data.buffer);

    // Проходим по всем пикселям и забираем цвета
    for ( var i = 0 ; i < src_img_width * src_img_height ; i++ ) {

        var value = sourceBuffer32[i];

        // Запоминаем значения текущего пикселя
        var hexString = value.toString(16);

        var b_channel = parseInt(hexString.slice(2,4), 16);
        var g_channel = parseInt(hexString.slice(4,6), 16);
        var r_channel = parseInt(hexString.slice(6,8), 16);


        // Записываем эти значения в массив в десятичном виде
        array.push([r_channel, g_channel, b_channel ]);

    }

    image.src_colors = array;
    image.size = array.length;
}
