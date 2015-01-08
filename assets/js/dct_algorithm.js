
// Функция создания 8-ми размерных массивов
function dct_generate_arrays (image) {

  tmp_array1 = [];
  tmp_array2 = [];

  for ( var i = 0 ; i <= image.size - 8; i +=8 ) {

    tmp_array1.push(
      [
        image.src_colors[ i ],
        image.src_colors[ i + 1 ],
        image.src_colors[ i + 2 ],
        image.src_colors[ i + 3 ],
        image.src_colors[ i + 4 ],
        image.src_colors[ i + 5 ],
        image.src_colors[ i + 6 ],
        image.src_colors[ i + 7 ]
      ]
    )

  }

  for ( var i = 0 ; i < image.size / ( 8 * 8 ); i++ ) {

    tmp_array2.push(
      [
        tmp_array1[ i ],
        tmp_array1[ i + 8 * 1 ],
        tmp_array1[ i + 8 * 2 ],
        tmp_array1[ i + 8 * 3 ],
        tmp_array1[ i + 8 * 4 ],
        tmp_array1[ i + 8 * 5 ],
        tmp_array1[ i + 8 * 6 ],
        tmp_array1[ i + 8 * 7 ]
      ]
    )

  }

  var row_count = Math.sqrt(tmp_array2.length);

  for ( var i = 0 ; i <= tmp_array2.length - row_count; i += row_count) {

    tmp_array3 = [];


    for ( var j = 0 ; j < row_count; j++ ) {

        tmp_array3.push(
            tmp_array2[ i * row_count + j ]
        );

     }

     image.sub_arrays.push(tmp_array3)
  }


}