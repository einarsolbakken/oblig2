$(() => {
    $("#bestilling").click(() => {
        const film = $("#film");
        const antall = $("#antall");
        const fornavn = $("#fornavn");
        const etternavn = $("#etternavn");
        const telefonNr = $("#telefonNr");
        const epost = $("#epost");

        const billett = {
            film: film.val(),
            antall: antall.val(),
            fornavn: fornavn.val(),
            etternavn: etternavn.val(),
            telefonNr: telefonNr.val(),
            epost: epost.val()
        };
        if (inputval(billett)){
            $.post("/lagre", billett, () => hent ());
            film.val("");
            antall.val("");
            fornavn.val("");
            etternavn.val("");
            telefonNr.val("");
            epost.val("");
        }else {
            console.log("Mangler input")
        }

    });
    $("#slettAlle").click(() => {
        $.ajax({
            url: "/slett",
            type: "DELETE",
            success: () => hent()
        });
    });

});

const hent = () => $.get("/hent", billett => formater(billett));

const inputval = billett => {
    if (billett.film === "") return false
    else if (billett.antall === "") return false
    else if (billett.fornavn === "") return false
    else if (billett.etternavn === "") return false
    else if (billett.telefonNr === "") return false
    else if (billett.epost !== "");
}

const formater = bestilling => {
    let ut = "<table><tr>" +
        "<th>VelgFilm</th><th>Antall</th><th>Fornavn</th><th>EttterNavn</th><th>TelefonNr</th><th>Epost</th>" +
        "</tr>";
    for (let m of bestilling) {
        ut += "<tr>";
        ut += "<td>" + m.film + "</td><td>" + m.antall + "</td><td>" + m.fornavn + "</td><td>" + m.etternavn + "</td><td>" + m.telefonNr + "</td><td>" + m.epost + "</td>";
        ut += "</tr>";
    }

    ut += "</table>";

    $("#kjopebillett").html(ut);
}