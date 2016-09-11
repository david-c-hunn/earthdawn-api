var request = require('request'), fs = require('fs');

var apiURL = 'http://localhost:8000/earthdawn',
    talents = fs.createReadStream('./talents.json'),
    disciplines = fs.createReadStream('./disciplines.json');


function deleteAllDiscipline(err, res, bod) {
    if (err) {
        console.log(err);
    } else {
        console.log(bod);
        request.delete(
            apiURL + '/disciplines/delete_all', bulkUploadDisciplines);
    }
}

function bulkUploadDisciplines(err, res, bod) {
    if (err) {
        console.log(err);
    } else {
        console.log(bod);
        disciplines.pipe(
            request.post(apiURL + '/disciplines/bulk', function(err, res, bod) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(bod);
                }
            }));
    }
}

// Delete existing entries and then upload the new ones.
request.delete(apiURL + '/talents/delete_all', function(err, res, bod) {
    if (err) {
        console.log(err);
    } else {
        console.log(bod);
        talents.pipe(request.post(apiURL + '/talents/bulk', deleteAllDiscipline));
    }
});
