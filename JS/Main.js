var canvas, pathLength, loaderText, textInterval;
var textCounter = 0;
var textIndex = 0;

function startLoader(element, length){

    length -= 5;

    if (length < 0){
        length = 0; 

        clearInterval(textInterval);

        document.getElementById("lock-animation").classList.remove("fa-lock");
        document.getElementById("lock-animation").classList.add("fa-lock-open");

        setTimeout( function(){ 
            document.getElementById("mainLoader").style.opacity = '0'; 
            document.getElementById("mainLoader").style.display = "none";
            document.getElementById("roadpie").style.display = "none";
        }, 1000);

        setTimeout( function(){ 
            document.getElementById("mainEncoder").style.display = "grid";
            document.getElementById("mainEncoder").style.opacity = '0'; 
            
            setTimeout(function(){
                document.getElementById("mainEncoder").style.opacity = '1';
                document.getElementById("roadpie").style.display = "flex";
            }, 500);

        }, 1500);
    }
        
    element.style.strokeDashoffset = length;

    if (length > 0) {
        setTimeout(function() { startLoader(element, length); }, 60);
    }

}

function loaderTextChange(){

    var encriptedText, resultText = "";
    const welcomeTxt = "Bienvenido";
    textCounter++;

    if (!(textCounter % 6)){
        textIndex++;
        console.log("" + textCounter);
    }

    encriptedText = (Math.random() + 1).toString(36).slice(2, (12-textIndex)).toUpperCase();

    console.log(welcomeTxt.substring(0, textIndex));
    resultText =  welcomeTxt.substring(0, textIndex) + encriptedText;

    loaderText.innerText = resultText;
    
}

function startEncript(){
    var textToEncript = document.getElementById("textToProcess").value;

    cleanResult();

    if (textToEncript.length != 0){

        setTimeout( function(){ 
            document.getElementById("noMessageBox").style.opacity = '0'; 
            document.getElementById("noMessageBox").style.display = "none";
        }, 500);

        setTimeout( function(){ 
            document.getElementById("textResultBox").style.opacity = '1'; 
            document.getElementById("textResultBox").style.display = "block";
        }, 500);

        setTimeout( function(){ 

            for (const charToCheck of textToEncript.toLowerCase()){
                
                switch (charToCheck){
                    case 'e':
                        printToResult('enter');
                        break;
                    case 'i':
                        printToResult('imes');
                        break;
                    case 'a':
                        printToResult('ai');
                        break;
                    case 'o':
                        printToResult('ober');
                        break;
                    case 'u':
                        printToResult('ufat');
                        break;
                    default:
                        printToResult(charToCheck);
                }
            }
        }, 500)
    }
}

function cleanResult(){
    document.getElementById("textResultToProcess").value = "";
}

function printToResult(charToPrint){
    console.log(charToPrint);
    document.getElementById("textResultToProcess").value += charToPrint;
}

document.onreadystatechange = function(){
    if(document.readyState=='loaded' || document.readyState=='complete'){
        canvas = document.getElementById("circleLoader");
        pathLength = canvas.getTotalLength();

        loaderText = document.getElementById("wTextValue");

        textInterval = setInterval(loaderTextChange, 100);

        startLoader(canvas, pathLength);
    }
}