//Autor: Juan José López Gómez, 2025

var baseCalc=0;
var porcentImp=0;
var fechaHoy=1970+parseInt((Date.now()/1000)/60/60/24/365); //año actual
//alert(fechaHoy);


function comprueba1empl(valid){
    var resultado;
    var valor;

    var vali;
    
    valor=document.getElementById(valid).value;    

    try{
        val=typeof valor;       
        vali=parseInt(valor);
        
        if (vali.toString()=="NaN") throw new Error("Debe introducir un resultado de tipo numérico//"+valid);

        if (valid=="annacim" && document.getElementById("annacim").value!=null && fechaHoy-document.getElementById("annacim").value<65){
            alert("El perceptor futuro no tiene derecho a jubilación por no tener la edad mínima establecida (65 años).//"+valid); 
            document.getElementById("nacim").innerHTML="El perceptor futuro no tiene derecho a jubilación por no tener la edad mínima establecida (65 años).";
        }

        if(valid=="Uempl" && document.getElementById("Pempl").value!=null){
            calcularAT();
        }
    }
    catch(error){
        alert(error);
        document.getElementById(valid).value=null;
        exit;
    }
}


function calcularAT(){
    var resultado;
    var valor;
    var valor2;
    var vali;
    //alert("calcularAT");
    valor=document.getElementById("Pempl").value;    
    valor2=document.getElementById("Uempl").value;
    
    if (valor2!=null && valor!=null && valor2<valor){
        alert("El valor debe ser menor que el introducido en 'Año del último empleo'.");
        //document.getElementById("Uempl").value=null;
        //document.getElementById("Pempl").value=null;
        exit;
    }
    else if(valor2!=null && valor!=null && valor2>=valor){
        document.getElementById("antrab").value=valor2-valor;
        porcentImp=50+(((valor2-valor)-15)*2);
        document.getElementById("anfalt").value=36-(valor2-valor);
    }
}


function compruebaIBR(){
    var resultado;
    var valor;
    var vali;

    valor=document.getElementById("basereg").value;    

    try{
        val=typeof valor;       
        vali=parseInt(valor);

        antr=document.getElementById("antrab").value;

        if (vali.toString()=="NaN") throw new Error("Debe introducir un resultado de tipo numérico");
        
        if (antr<36){
            //alert(valor*0.80);
            baseCalc=valor*(porcentImp/100);
            document.getElementById("baseregC").innerHTML="Porcentaje correspondiente: " + porcentImp.toString() + "% (El total de años trabajados es inferior a 36)";
        }  
        else{
            baseCalc=0;
            document.getElementById("baseregC").innerHTML="Porcentaje correspondiente: 100%";
        }      
    }
    catch(error){
        alert(error);
        document.getElementById("basereg").value=null;
        exit;
    }
}


function calcular(){
    //alert("calcular");
    var valAnT;
    var baseReg;

    baseReg=document.getElementById("basereg").value;  
    
    //valAnt=document.getElementById("antrab").value;

    if (baseCalc>0) {        
        baseCalc=baseReg*(porcentImp/100);
        baseReg=baseCalc;
    }
    document.getElementById("result").innerHTML="Le correspondería una pensión de "+baseReg+ " euros brutos mensuales.";
    document.getElementById("irpf").innerHTML = "Al aplicar un IRPF del 20%, le quedaría una pensión neta de " + (baseReg - (baseReg * 0.20)).toString() + " euros mensuales.";
    alert("LOS DATOS OFRECIDOS POR ESTE SITIO SON MERAMENTE ORIENTATIVOS.")

    //document.getElementById("divresult").style.autofocus = true;
    document.getElementById("divresult").style.visibility = "visible";
    document.getElementById("divresult").style.visibility = "visible";
    document.getElementById("divresult").style.paddingTop = "30px";
    document.getElementById("divresult").style.paddingBottom = "30px";
    document.getElementById("divresult").style.backgroundColor = "rgba(50, 180, 150, 0.50)"; /*darkseagreen;*/    
}

function borrar() {
    location.reload(true);
    document.getElementById("divresult").style.visibility = "hidden";
}
