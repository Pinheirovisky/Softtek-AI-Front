var img0 = "../img/termometro/0.png"
var img1 = "../img/termometro/1.png"
var img2 = "../img/termometro/2.png"
var img3 = "../img/termometro/3.png"
var img4 = "../img/termometro/4.png"
var img5 = "../img/termometro/5.png"

var indicetermometro = document.getElementById("rangetermometro")

function trocar(){
    var vartermometro
    if(indicetermometro.value == 0){
        document.getElementById("thermometer").src = "../img/termometro/0.png";
    }
    else if(indicetermometro.value == 1){
        document.getElementById("thermometer").src = "../img/termometro/1.png";
    } 
    else if(indicetermometro.value == 2){
        document.getElementById("thermometer").src = "../img/termometro/2.png";
    } 
    else if(indicetermometro.value == 3){
        document.getElementById("thermometer").src = "../img/termometro/3.png";
    } 
    else if(indicetermometro.value == 4){
        document.getElementById("thermometer").src = "../img/termometro/4.png";
    } else{document.getElementById("thermometer").src = "../img/termometro/5.png";}

    }

 