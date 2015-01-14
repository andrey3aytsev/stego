/*  Функции для работы с LSB
=============================== */


// Создание массива последних битов
function lsb_create_array (image) {

    // Временные переменные
    var array1 = image.src_colors;
    var array2 = [];

    // По всем пикселям проходим
    for (var i = 0; i < image.size; i++) {

        if ( i % image.lsb_step == 0 ) {
            var r_channel = ABC.dec2Bin(array1[i][2]);
            array2.push( r_channel[7] );

        }
    }

    image.lsb = array2;
}


// Изменение последних битов массива цветов
function lsb_modify_array(image, string) {


    var array1 = image.src_colors;
    var array2 = array1;

    var ct = 0;
    // По всем пикселям проходим
    for (var i = 0; i < image.size; i++) {
        var r_channel = ABC.dec2Bin(array1[i][0]);
        var g_channel = ABC.dec2Bin(array1[i][1]);
        var b_channel = ABC.dec2Bin(array1[i][2]);

        if ( (i % image.lsb_step == 0) && (ct < string.length ) ) {
            b_channel = b_channel.substring(0, 7) + string[ct];
            ct++;
        }

        image.mod_colors.push([
            parseInt(r_channel, 2),
            parseInt(g_channel, 2),
            parseInt(b_channel, 2)
        ]);

    }

}


// Функция вывода лсб в текст
function lsb_2_ascii(image) {

    var lsb = image.lsb;

    // Контейнер для выходного текста
    var output_text = $("#output-text");

    // Вывод LSB в цикле
    for ( var i = 0; i < lsb.length - 8 ; i = i + 8) {

        var string = '';

        // Внутренний цикл по битам
        for ( var j = i; j - 8 < i; j++ ) {
            string += lsb[j];
        }

        var output = ABC.toAscii(string);

        // Выводим букву
        $(output_text).append( output );
    }
}




