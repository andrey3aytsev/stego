
// Функция склеивания элементов массива в маленикие массивы
function elements_to_array(array, firstIndex, step, length) {

    for ( var i = 0, tmp_array = [] ; i < length; i++ ) {
      tmp_array.push( array[ firstIndex + i * step ] )
    }

    return tmp_array;
}


// Функция перевода линейного массива в многоуровневую матрицу
function array_delianize (array_before, array_after) {

    // Временные массивы
    var array_8_colors = [],
        array_8_rows   = [],
        array_length   = array_before.length;

    // Делианизируем по 8 цветов
    for ( var i = 0 ; i <= array_length - 8; i +=8 ) {
      array_8_colors.push( elements_to_array(array_before, i, 1, 8) )
    }

    // Делианизируем по 8 блоков из 8ми цветов
    for ( var i = 0 ; i < array_length / ( 8 * 8 ); i++ ) {
      array_8_rows.push( elements_to_array(array_8_colors, i, 8, 8) )
    }

    // Делианизируем по 16 блоков из 64ех цветов
    for ( var i = 0 ; i < Math.sqrt( array_length / ( 8 * 8 ) ) ; i++ ) {
      array_after.push( elements_to_array(array_8_rows, i, 16, 16) );
    }

}


// Сигма функция Зайцева
function dct_sigma(argument) {
    argument == 0 ? ( argument = (1 / Math.sqrt(2))) : (argument = 1);
    return argument;
}


// Дискретное преобразование для 1 элемента
function dct_direct (u, v, C_x_y) {

    var prod = dct_sigma(u) * dct_sigma(v) / 4,
        summ = 0;

    for (var m = 0; m < 8; m++) {
      for (var l = 0; l < 8; l++) {

        summ += Math.round( 1
          * C_x_y
          * Math.cos( Math.round((Math.PI * u * (2*m + 1)) / 16) )
          * Math.cos( Math.round((Math.PI * v * (2*l + 1)) / 16) )
        )
      }
    }

    return Math.round(prod * summ);
}


// ПДК преобразование для всех значений интенсивности
function dct_function (image) {

    // Делианизируем массив цветов
    array_delianize(image.src_colors, image.sub_arrays);

    var DCT_linear = [],
        sub_length = image.sub_arrays.length;


    // По строкам блоков, По строке блоков,
    // По строкам блока, По элементам строки блока
    for (var i = 0; i < sub_length; i++) {
      for (var j = 0; j < sub_length; j++) {
        for (var m = 0; m < 8; m++) {
          for (var l = 0; l < 8; l++) {

              // Вычисляем коэффициент
              var C_x_y = image.sub_arrays[i][j][m][l][2],
                  dct_i = dct_direct(m, l, C_x_y);

              // Добавляем его в линейный массив
              DCT_linear.push( dct_i );

          }
        }
      }
    }

    // Делианизируем массив коэффициентов
    array_delianize( DCT_linear, image.dct );

}










