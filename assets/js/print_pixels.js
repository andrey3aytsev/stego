/*  Отрисовка изображения блоками *ака* пикселями
================================================= */

// Функция отрисовки изображения по пикселям
function pixel_draw_image(array) {

    // Контейнер для пикселей
    pix_block = $('#pix-block');

    // Расчет ширины 'пикселя'
    pix_wid = ( 1 / src_img_width ) * 100;

    // По всем пикселям проходим
    for (var i = 0; i < array.length; i++) {

        pix_block.append(
            '<span style="'

                + 'width: ' + pix_wid + '%; '
                + 'padding-bottom: ' + pix_wid + '%; '

                + 'background: rgb('
                + array[i][0] + ','
                + array[i][1] + ','
                + array[i][2] +

            ')"></span>'
        )
    }

}