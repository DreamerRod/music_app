var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    res.status(200).json({
        msn: "Hola mundo"
    });
});

router.post('/test', function(req, res, next) {
    req.body["msn"] = "Por el servidor";
    var data = req.body
    res.status(200).json(data);
});
/*
1. Cambio de divisa
a. Servicio que recibirá 3 parámetros, la moneda original, la cantidad , y la
moneda del tipo de cambio tipo cadena. (Todas las monedas estarán en
relación al dollar).
b. Responderá con número flotante , dando la cantidad exacta del tipo de
divisa.

*/
router.post('/divisas', function(req, res, next) {
    var data = req.body
    let monedaoriginal = data.moneda;
    let cantidad = parseFloat(data.cantidad);
    let tipocambio = data.monedacambio;
    var tipomoneda=["CAD" , "1.3256384622" ,
    "HKD","7.8401345088",
    "ISK","124.6932654731",
    "PHP", "52.1294192493",
    "DKK", "6.7855130419",
    "HUF", "304.6169226575",
    "CZK", "23.5135872035",
    "GBP", "0.8011724075",
    "RON", "4.3155503045",
    "SEK", "9.7030809779",
    "IDR", "14112.4965918386",
    "INR", "70.9474688721",
    "BRL", "4.1587748796",
    "RUB", "63.6425520313",
    "HRK", "6.7290738889",
    "JPY", "107.6524584204",
    "THB", "30.5643915296",
    "CHF", "0.988639462",
    "EUR", "0.9088430428",
    "MYR", "4.1814959556",
    "BGN", "1.7775152231",
    "TRY", "5.6850858857",
    "CNY", "7.1070617104",
    "NOK", "9.0179950922",
    "NZD", "1.583931655",
    "ZAR", "14.868581296",
    "USD", "1",
    "MXN", "19.4398800327",
    "SGD", "1.3764427883",
    "AUD", "1.471326002",
    "ILS", "3.5040443515",
    "KRW", "1193.9107516132",
    "PLN", "3.9819140234",
    "BO", "6.96"];
    var monedaoriginalvalor;
    var tipocambiovalor;
    if (monedaoriginal!=""&&cantidad!=""&&tipocambio!="") {
        if (parseFloat(cantidad)>=0) {
            for (let i = 0; i < (tipomoneda.length/2); i++) {
                if (tipomoneda[i*2]==monedaoriginal) {
                    monedaoriginalvalor=parseFloat(tipomoneda[(i*2)+1]);
                }
                if (tipomoneda[i*2]==tipocambio) {
                    tipocambiovalor=parseFloat(tipomoneda[(i*2)+1]);
                }    
            }
            if ( monedaoriginalvalor >= 0 && tipocambiovalor >= 0 ) {
                var resul=(cantidad/monedaoriginalvalor)*tipocambiovalor;
                res.status(200).json({
                    msn: " el cambio total de "+cantidad+" "+monedaoriginal+" a "+tipocambio+" es de " +  resul + " " + tipocambio
                 });
                
            }
            else{
                res.status(200).json({
                    msn: " surgio un error al realizar el tipo de cambio"
                 });
            }


        } else {
            res.status(200).json({
                msn: "introduce una cantidad"
             });
        }
        
    } else {
        res.status(200).json({
            msn: "Introduce datos"
        });
    }
});

/*
2. Calculo de interes compuesto
a. Este servicio recibirá 3 parámetros, el monto que se solicita, y el tipo de
interés anual, y el tiempo de pago.
b. Responderá con la cantidad que el cliente debe pagar.
*/
router.post('/interes', function(req, res, next) {
    var data = req.body;
    let monto = parseFloat(data.monto)// parseFloat(req.query.monto);
    let tipoInteress = data.tipoInteres// req.query.tipoInteres;
    let tiempo = parseFloat(data.tiempoMeses)//req.query.tiempoMeses);
    let interes;
    if (parseFloat(tipoInteress)>=0) {
        if (parseFloat(tipoInteress)<1) {
            interes=parseFloat(tipoInteress);
        } else {
            interes=parseFloat(tipoInteress)/100;
        }
    } else {
        switch (tipoInteress) {
            case "alto":
                interes=0.25;
                break;
            case "bajo":
                interes=0.1
                break;
            default:
                interes= 0.15
                break;
        }
    }
    var total = ((monto + (monto * interes))/tiempo);
    res.status(200).json({
        msn: "se cancela un total de " + total + " por mes"
    });
    /*for (let j = 0; j < tiempo; j++) {
        res.status(200).json({
            msn: i+" " + total 
        });
        
    }*/
    //res.status(200).json(data);
});

module.exports = router;