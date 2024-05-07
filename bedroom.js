img1="";
status_1="";
img2="";
objects_1=[];

function setup(){
    canvas=createCanvas(500,350);
    canvas.center();
}

function preload(){
    img1=loadImage("bedroom.jpeg");

}



function modelLoaded(){
    console.log("modelLoaded");
    status_1=true;
   

}

function gotResults(error,results){
    if(error){
        console.log(error);
    }
        console.log(results);
        objects_1=results;
        // console.log("object: "+objects_1);
    
}

function draw(){
     image(img1,0,0,500,350);
    if(status_1 != ""){
        r=random(255);
        g=random(255);
        b=random(255);
        
        object_detector.detect(img1,gotResults);
        for(var i=0; i<objects_1.length; i++){
            document.getElementById("status").innerHTML="Status:object detected";
            document.getElementById("n_objects").innerHTML="No. of objects detected: "+objects_1.length;
            fill(r,g,b);
            textSize(30);
            percentage=floor(objects_1[i].confidence*100);
            text(objects_1[i].label+" "+percentage+"%",objects_1[i].x,objects_1[i].y);
            noFill();
            stroke(r,g,b);
            rect(objects_1[i].x,objects_1[i].y,objects_1[i].width,objects_1[i].height);
        }

    }
    
}

function start(){
    object_detector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    draw();
}