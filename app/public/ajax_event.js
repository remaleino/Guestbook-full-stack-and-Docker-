//Jätetään eventti, joka aktiovituu form-elementit lähetyksessä
$("#form").submit(function (e) {
    //Estetään tiedon lähetystä.
    e.preventDefault();
    //Kerätään formista username, country ja message
    const data = new FormData(e.target);
    const value = Object.fromEntries(data.entries());
    //Luodaan valmiiksi päivämäärä
    var d = new Date();
    //Aloitetaan ajax-metodi
    $.ajax({
        /*Tehdään asynkroninen AJAX-pyynnön, joka tulee olemaan
        GET-tyyppinen ja se saadaan osoitteesta /ajax.
        Koska meidän on myös lisättävä uuden merkinnän JSON-
        tiedostoon, lähetetään myös datana JSON-lista lomakkeen kohdista.
        */
        type: 'GET',
        url: '/ajax',
        data: { "id": "", "username": value.username, "country": value.country, "date": d.toString(), "message": value.message },
        //Eli jos saadaan tietoa takaisin, käynistetään funktio.
        success: function (json) {
            //Lisätään sivuston listaan elementit JSON-objektien mukaisesti.
            json.forEach(obj => {
                var d = new Date(obj.date)
                d = d.toLocaleString()
                $("#list").append('<div class="ajax-item ajax-item-selected pure-g">' +
                    '<div class="pure-u">' +
                    '<img width="64" height="64" alt="avatar" class="ajax-avatar" src="/images/avatar.png">' +
                    '</div>' +
                    '<div class="pure-u-3-4">' +
                    '<h5 class="ajax-name">' + obj.username + ' from ' + obj.country + '</h5>' +
                    '<p class="ajax-desc">' + obj.message + '</p>' +
                    '<p class="ajax-desc">Time: ' + d + '</p>' +
                    '</div>' +
                    '</div>');
            })
        }
    })
});