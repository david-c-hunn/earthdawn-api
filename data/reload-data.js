var request = require('request'), fs = require('fs');

var apiURL = 'http://earthdawn-api.herokuapp.com/earthdawn',
    talents = fs.createReadStream('./talents.json'),
    knacks = fs.createReadStream('./knacks.json'),
    disciplines = fs.createReadStream('./disciplines.json'),
    spells = fs.createReadStream('./spells.json');

function onDiscsUploaded(err, res, bod) {
    if (err) { console.log(err); } 
    else {
        console.log('===== discipline data uploaded =====');
        console.log(bod);
    }
}

function onKnacksUploaded(err, res, bod) {
    if (err) { console.log(err); } 
    else {
        console.log('===== knack data uploaded =====');
        console.log(bod);
    }
}

function onKnacksDeleted(err, res, bod) {
    if (err) { console.log(err); } 
    else {
        console.log('===== all knacks deleted =====');
        console.log('===== uploading knack data =====');
        knacks.pipe(request.post(apiURL + '/knacks/bulk', onKnacksUploaded));
    }
}

function onDiscsDeleted(err, res, bod) {
    if (err) { console.log(err); } 
    else {
        console.log('===== all disciplines deleted =====');
        console.log('===== uploading discipline data =====');
        disciplines.pipe(
            request.post(apiURL + '/disciplines/bulk', onDiscsUploaded));
    }
}

function onTalentsUploaded(err, res, bod) {
    if (err) { console.log(err); } 
    else {
        console.log('===== talent data uploaded =====');
        console.log(bod);
        console.log();

        console.log('===== sending delete all knacks request =====')
        request.delete(apiURL + '/knacks/delete_all', onKnacksDeleted);

        console.log('===== sending delete all disciplines request =====')
        request.delete(apiURL + '/disciplines/delete_all', onDiscsDeleted);
    }
}

function onTalentsDeleted(err, res, bod) {
    if (err) { console.log(err); } 
    else {
        console.log('===== all talents deleted =====');
        console.log('===== uploading talent data =====');
        talents.pipe(request.post(apiURL + '/talents/bulk', onTalentsUploaded));
    }
}

function onSpellsUploaded(err, res, bod) {
    if (err) { console.log(err); } 
    else {
        console.log('===== spell data uploaded =====');
        console.log(bod);
        console.log();
    }
}

function onSpellsDeleted(err, res, bod) {
    if (err) { console.log(err); }
    else {
        console.log('===== all spells deleted =====');
        console.log('===== uploading spell data =====');
        spells.pipe(request.post(apiURL + '/spells/bulk', onSpellsUploaded));
    }
}

console.log('===== sending delete all talents request =====')
request.delete(apiURL + '/talents/delete_all', onTalentsDeleted);
request.delete(apiURL + '/spells/delete_all', onSpellsDeleted);