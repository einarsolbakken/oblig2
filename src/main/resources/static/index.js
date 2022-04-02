

function kjopebillett(){

    const riktig = validate();
    if (riktig ) {

        const billett = {
            film: document.getElementById("film").value,
            antall: document.getElementById("antall").value,
            fornavn: document.getElementById("fornavn").value,
            etternavn: document.getElementById("etternavn").value,
            telefonNr: document.getElementById("telefonNr").value,
            epost: document.getElementById("epost").value,
        };


        $.post("/api/kinobillett/lagre" ,billett ,function() {
            vis()
        })

        let nullStill = document.getElementsByTagName("input");
        for (let i = 0; i < nullStill.length; i++) {
            if (nullStill[i].type === "text" || nullStill[i].type === "number") {
                nullStill[i].value = "";
            }
        }

        document.getElementById("film").selectedIndex = 0;

    }


}
function validate() {
    const film = document.getElementById("film").value;
    const antallInn = document.getElementById("antall").value;
    const fornavn = document.getElementById("fornavn").value;
    const etternavn = document.getElementById("etternavn").value;
    const telefonNr = document.getElementById("telefonNr").value;
    const epost = document.getElementById("epost").value;
    const antall = Number(antallInn);
    let riktig = true;

    if (film === "") {
        document.getElementById("filmdiv").innerHTML = "You must choose name the of Films".fontcolor(color = "red")
        riktig = false;
    }
    if (isNaN(antall) || antallInn === "") {
        document.getElementById("antalldiv").innerHTML = "You must to write number of tickets".fontcolor(color = "red")
        riktig = false;
    }
    if (fornavn === "") {
        document.getElementById("fornavndiv").innerHTML = "You must to write your name".fontcolor(color = "red")
        riktig = false
    }
    if (etternavn === "") {
        document.getElementById("etternavndiv").innerHTML = "You must to write your surname.".fontcolor(color = "red")
        riktig = false;
    }
    if (telefonNr === "") {
        document.getElementById("telefonNrdiv").innerHTML = "You must to write your tlfnr".fontcolor(color = "red")
        riktig = false;
    }
    if (epost === "") {
        document.getElementById("epostdiv").innerHTML = "You must to wirte your e-post".fontcolor(color = "red")
        riktig = false;
    }
    return riktig;
}


function vis() {
    $.get("/api/kinobillett/hent", function (data) {
            let billett_Tabel =
                "<table style=' width:70%'>" +
                "<tr>" +
                "<th>Film</th>" +
                "<th>Antall</th>" +
                "<th>Fornavn</th>" +
                "<th>Etternavn</th>" +
                "<th>TelefonNr</th>" +
                "<th>Epost</th>" +
                "</tr>";


            for (let p of data) {
                billett_Tabel += "<tr  >";
                billett_Tabel += "<td>" + p.film + "</td>" +
                    "<td>" + p.antall + "</td>" +
                    "<td>" + p.fornavn + "</td>" +
                    "<td>" + p.etternavn + "</td>" +
                    "<td>" + p.telefonNr + "</td>" +
                    "<td>" + p.epost + "</td>";
                billett_Tabel += "</tr>";
            }

            document.getElementById("boks").innerHTML = billett_Tabel;

        })


}

function slett() {
    $.ajax("/api/kinobillett/slett", {
        type: "DELETE",
        success : function () {
            document.getElementById("boks").innerHTML = "";
        }
    })


}






