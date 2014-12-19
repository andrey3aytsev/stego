/*  Попиксельное чтение изображение
    и сохранение значений каналов массив
======================================== */

function canvas_read_image(image) {

    var array = [];

    // Отображаем в канвасе исходное изображение
    cxt_src.drawImage(src_img, 0, 0, src_img_width, src_img_height);

    // Двойной цикл по пикселям
    for ( var y = 0 ; y < src_img_height ; y++ ) {
        for ( var x = 0 ; x < src_img_width ; x++ ) {

            // Запоминаем значения текущего пикселя
            var pixelData = cxt_src.getImageData(x, y, 1, 1).data;

            // Записываем эти значения в массив в десятичном виде
            array.push([
                pixelData[0], // Красный
                pixelData[1], // Зелёный
                pixelData[2]  // Синий
            ]);

        }
    }

    image.src_colors = array;
    image.size = array.length;
}
