// Werte werden festgelegt
let personen = [];
let personenursprung = [];
let mails = [];
// Die Funktion sammeln wird beschrieben
function sammeln() {
    // Für jedes div mit der Klasse person wird dem Array personen, personen urdprung und mail hinzugefügt.
    $(".person").each(function () {
        let name = $(this).children(".name").val();
        let mail = $(this).children(".mail").val();
        personen.push(name);
        personenursprung.push(name);
        mails.push(mail);
    });
    if (pruefen(personen).length == 0) {
        // Die Funktion mischen wird aufgerufen
        mischen(personen);
        // Die Funktion vergleichen wird aufgerufen
        vergleichen(personen);
    } else {

    }

}
// Die Funktion mischen wird beschrieben
function mischen(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
// Die Funktion vergleichen wird beschrieben
function vergleichen(c) {
    for (let i = c.length - 1; i > -1; i--) {
        let z = personenursprung[i]
        let y = personen[i];
        if (z != y) {

        } else {
            // Falls eine Person sich selbst zieht wird von vorne begonnen
            personen.length = 0;
            personenursprung.length = 0;
            sammeln();
        }
    }
}
// Funktion zur Überprüfung ob zwei gleiche items auftauchen
let pruefen = arr => arr.filter((item, index) => arr.indexOf(item) != index)
// Sende an jede Person eine Mail mit ihrem Partner
function mailsenden() {
    for (let i = personen.length - 1; i > -1; i--) {
        let mail = mails[i];
        let name = personen[i];
        let wichtel = personenursprung[i];
        $.ajax({
            type: "GET",
            data: {
                wichtel: wichtel,
                name: name,
                mail: mail
            },
            // Adresse deines Servers hinzufügen
            url: "/zu/deinem/server/send.php",
            success: function (success) {},
            error: function (error) {},
            timeout: 10000
        });
    }
}
$("#submit").click(function () {
    sammeln();
    if (pruefen(personen).length == 0) {
        mailsenden(personen);
        // console.log("Personen= " + personen);
        // console.log("Ursprung= " + personenursprung);
        console.log("Es hat alles geklappt!");
        personen.length = 0;
        personenursprung.length = 0;
        $("#super").fadeIn(500);
        $("#super").delay(3000).fadeOut(1000);
    } else {
        $("#error").fadeIn(500);
        $("#error").delay(2000).fadeOut(500);
        console.log("Fehler!");
        personen.length = 0;
        personenursprung.length = 0;
    }
});
// Füge person hinzu
$(".hinzufuegen").click(function () {
    let anzahl = $('.person').length + 1;
    // Reguliere Menge
    if (anzahl != 41) {
        $(".personen").last().append("<div class='person'><h2> Person " + anzahl +
            "</h2><input type='text' class='name' name='name[]' placeholder='Name' required><br><br><input type='text' class='mail' name='mail[]' placeholder='Mail' required><br><br>"
        );
        window.scrollTo(0, document.body.scrollHeight);
    } else {
        alert("Mehr als 40 Personen sind nicht möglich!")
    }
    // Zeige den entfernen Button
    if (anzahl > 3) {
        $(".entfernen").show();
    } else {
        $(".entfernen").hide();
    }
});
//Entferne letzte person
$(".entfernen").click(function () {
    $(".person").last().remove();
    let anzahl = $('.person').length - 1;
    if (anzahl < 3) {
        $(".entfernen").hide();
    } else {
        $(".entfernen").show();
    }
});
