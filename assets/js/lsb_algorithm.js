/*  Функции для работы с LSB
=============================== */


// Создание массива последних битов
function lsb_create_array (image) {

    // Временные переменные
    var array1 = image.src_colors;
    var array2 = [];

    // По всем пикселям проходим
    for (var i = 0; i < array1.length; i++) {

        var r_channel = dec_2_bin(array1[i][0]);
        var g_channel = dec_2_bin(array1[i][1]);
        var b_channel = dec_2_bin(array1[i][2]);

        array2.push( r_channel[7] );
        array2.push( g_channel[7] );
        array2.push( b_channel[7] );
    }

    image.lsb = array2;
}


// Изменение последних битов массива цветов
function lsb_modify_array(image, string) {

    var array1 = image.src_colors
    var array2 = array1;

    // Определяем кратность трём
    var residue = string.length % 3;

    // Дополняем нулями до кратности трём
    switch (residue) {
        case 0:
            break;
        case 1:
            string += '00';
            break;
        case 2:
            string += '0';
            break;
    }

    // Индекс текущего элемента строки
    var text_index = 0;

    // По всем пикселям проходим
    for (var i = 0; i < array1.length; i++) {

        var r_channel = dec_2_bin(array1[i][0]);
        var g_channel = dec_2_bin(array1[i][1]);
        var b_channel = dec_2_bin(array1[i][2]);

        r_channel = r_channel.substring(0, 7) + string[text_index + 0];
        g_channel = g_channel.substring(0, 7) + string[text_index + 1];
        b_channel = b_channel.substring(0, 7) + string[text_index + 2];

        array2[i][0] = parseInt(r_channel, 2);
        array2[i][1] = parseInt(g_channel, 2);
        array2[i][2] = parseInt(b_channel, 2);

        text_index += 3;

        if (text_index > string.length ) { break };
    }

    image.mod_colors = array2;
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

        // Выводим букву
        $(output_text).append(ABC.toAscii(string));
    }
}




