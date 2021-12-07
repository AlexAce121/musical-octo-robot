video = "";
statuses= "";
objects=[];

function preload() {
   video = createVideo("video.mp4");
   video.hide();
}

function setup() {
    canvas = createCanvas(480 , 380);
    canvas.center();
}

function draw(){
    image(video , 0 , 0 , 480 , 380);
    if (statuses != "") {
        objectDetector.detect(video , gotResult);
        for(i=0;i<objects.length;i++) {
            document.getElementById("status").innerHTML = "Status : Detected Objects";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected : "+objects.length;

            fill("#FF0000");
            percentage = floor(objects[i].confidence*100);
            text(objects[i].label + "" + percentage +"%" , objects[i].x +15 , objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
    }
}

function START() {
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
 console.log('Model Loaded');
 statuses = true
 video.loop();
 video.speed(1);
 video.volume(0);
}

function gotResult(error , results) {
    console.log(results);
    objects = results ;
        if (error) {
        console.log(error);
    }
}