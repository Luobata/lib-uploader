export default {
    typeFormat (typeArray) {
        if (typeArray === '*') return '*';
        if (!typeArray || !typeArray.length) return '';
        typeArray.forEach(function (item, index) {
            typeArray[index] = '*.' + item;
        });
        return typeArray.join(';');
    },
    sizeFormat (size) {
        if (!size || !parseFloat(size, 10)) return '0B';
        var unit = 'B';
        var hihgUnit = function (unit) {
            var unitUp = 'B';
            switch (unit) {
                case 'B':
                    unitUp = 'KB';
                    break;
                case 'KB':
                    unitUp = 'MB';
                    break;
                case 'MB':
                    unitUp = 'GB';
                    break;
                case 'GB':
                    unitUp = 'TB';
                    break;
            }
            return unitUp;
        };
        var size = parseInt(size, 10);
        while (size > 1024) {
            unit = hihgUnit(unit);
            size = parseFloat(size / 1024, 10);
        }
        return size + ' ' + unit;
    }
};
