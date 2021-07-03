status="";
objects=[];
otbf="";

function setup() {
    canvas=createCanvas(400,300);
    canvas.position(480,230);
    video=createCapture(VIDEO);
    video.hide();
}

function modelloaded() {
    console.log("model is loaded");
    status= true;
}


function start() {
    objectdetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status - Detecting Objects";
    otbf=document.getElementById("input").value;
}


function getResult(error,results) {
    if(results) {
        console.log(results);
        objects=results;
    }
   else if (error) {
        console.log(error);
   } 
}

function draw() { 
    image(video,0,20,700,500);

    if(status!="") {
        objectdetector.detect(video,getResult);
        for(var i=0;i<objects.length;i++) {
            document.getElementById("status").innerHTML="object detected"
             fill("red");
             textSize(20);
             percent=floor(objects[i].confidence*100)
             text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+20);
             noFill();
             stroke("red");
             strokeWeight(5);
             rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

             if (objects[i].label==otbf){
                document.getElementById("ofn").innerHTML="Object found";
          }
            else{
                 document.getElementById("ofn").innerHTML="object not found"
            }
        }
    }
}






