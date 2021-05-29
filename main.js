status="";
objects=[];
Otbf="";

function setup() {
    canvas=createCanvas(400,300);
    canvas.position(480,230);
    video=createCapture(VIDEO);
    video.hide();
}

function modelloaded() {
    console.log("model is loaded");
    status= true;
    objectdetector.detect(video,getResult);
}

function search() {
    objectdetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status - Detecting Objects";
    otbf=document.getElementById("input").value;

}

function getResult(error,results) {
    if(error) {
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}

function draw() { 
    image(video,0,0,700,500);

    if(status!="") {
        for(var i=0;i<objects.length;i++) {
             fill("red");
             textSize(20);
             percent=floor(objects[i].confidence*100)
             text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+20);
             noFill();
             stroke("red");
             strokeWeight(5);
             rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }






}