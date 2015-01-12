

// Сигма функция Зайцева
function dct_sigma(argument) {
    argument == 0 ? ( argument = (1 / Math.sqrt(2))) : (argument = 1);
    return argument;
}

// Функция кодирования бита сообщения
function dct_encript_bit (bit, val1, val2) {

    // Порог
    P_opposite = image.dct_P * -1;

    var gap = Math.abs(val1) - Math.abs(val2);

    if ( bit == '0' ) {

        if ( gap < image.dct_P ) {

            diff = (image.dct_P - gap) / 2;

            // Если оба положительные
            if ( (val1 >= 0) && (val2 >= 0) ) {
                val1 += diff;
                if ( val2 > diff ) { val2 -= diff }
                else { val1 += diff - val2; val2 = 0; }
            }

            // Если первое положительное
            if ( (val1 >= 0) && (val2 < 0) ) {
                val1 += diff;
                if ( val2 < -diff ) { val2 += diff }
                else { val1 += diff + val2; val2 = 0; }
            }

            // Если второе положительное
            if ( (val1 < 0) && (val2 >= 0) ) {
                val1 -= diff;
                if ( val2 > diff ) { val2 -= diff }
                else { val1 -= diff - val2; val2 = 0; }
            }

            // Если оба отрицательные
            if ( (val1 < 0) && (val2 < 0) ) {
                val1 -= diff;
                if ( val2 < -diff ) { val2 += diff }
                else { val1 -= diff + val2; val2 = 0; }
            }
        }
    }


    if ( bit == '1' ) {

        if ( gap > P_opposite ) {

            diff = Math.abs((P_opposite - gap) / 2);

            // Если оба положительные
            if ( (val1 >= 0) && (val2 >= 0) ) {
                val2 += diff;
                if ( val1 > diff ) { val1 -= diff }
                else { val2 += diff - val1; val1 = 0; }
            }

            // Если первое положительное
            if ( (val1 >= 0) && (val2 < 0) ) {
                val2 -= diff;
                if ( val1 > diff ) { val1 -= diff }
                else { val2 -= diff - val1; val1 = 0; }
            }

            // Если второе положительное
            if ( (val1 < 0) && (val2 >= 0) ) {
                val2 += diff;
                if ( val1 < -diff ) { val1 += diff }
                else { val2 += diff + val1; val1 = 0; }
            }

            // Если оба отрицательные
            if ( (val1 < 0) && (val2 < 0) ) {
                val2 -= diff;
                if ( val1 < -diff ) { val1 += diff }
                else { val2 -= diff + val1; val1 = 0; }
            }
        }
    }

    return [val1, val2];
}


