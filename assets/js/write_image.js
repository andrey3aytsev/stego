/*  Функция отрисовки изображения в канвас
    на основе массива цветов пикселей
=========================================== */

function canvas_draw_image (array) {

    // Счетчик
    var i = 0;

    // По всем пикселям проходим
    for ( var y = 0 ; y < src_img_height ; y++ ) {
        for ( var x = 0 ; x < src_img_width ; x++ ) {

            cxt_mod.fillStyle = "rgb(" +
                + array[i][0] + ','
                + array[i][1] + ','
                + array[i][2] + ');';

            cxt_mod.fillRect(x, y, 1, 1);

            i++;

        }
    }
}