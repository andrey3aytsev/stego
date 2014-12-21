// Функции для просчета количественных характеристик алгоритма

function get_image_diffs (image) {


  for (var i = 0; i < image.size; i++) {

    var diff_red = Math.abs(image.mod_colors[i][0] - image.src_colors[i][0]);
    var diff_green = Math.abs(image.mod_colors[i][1] - image.src_colors[i][1]);
    var diff_blue = Math.abs(image.mod_colors[i][2] - image.src_colors[i][2]);

    var diff = diff_red + diff_green + diff_blue;

    console.log(diff_red,diff_blue,diff_green);

    image.image_diff.push(diff);

    if (diff > image.largest_diff) {
    	
    	image.largest_diff = diff
    }

  } 

}