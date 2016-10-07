var excelToJson = require('excel-as-json').processFile;

excelToJson('talents.xlsx', 'talents.json', false, function (err, data) {
    if (err) {
        console.log(err);
    }
});

excelToJson('knacks.xlsx', 'knacks.json', false, function (err, data) {
    if (err) {
        console.log(err);
    }
});

excelToJson('spells.xlsx', 'spells.json', false, function (err, data) {
    if (err) {
        console.log(err);
    }
});