song = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;
scoreleftwrist = 0;
scorerightwrist = 0;

function preload(){
    song = loadSound("music.mp3")

    
}

function draw(){
image(webcam,0,0,600,500);
 

if(scoreleftwrist > 0.2){
fill("#ff1100");
stroke("#ff1100")

circle(leftWristX,leftWristY,20)

numberleftwristy = Number(leftWristY);

remove_decimal = floor(numberleftwristy);



volume = remove_decimal/500

document.getElementById("volume").innerHTML = "Volume = " + volume



}

if(scorerightwrist > 0.2){

fill("#ff0019")
stroke("#ff0019")

circle(rightWristX,rightWristY,20)

if(rightWristY > 0 && rightWristY <= 100){
    document.getElementById("speed").innerHTML = "Speed = 0.5x" 
    song.rate(0.5)
}
else if(rightWristY > 100 && rightWristY <= 200){
    document.getElementById("speed").innerHTML = "Speed = 1x"
    song.rate(1)
}
else if(rightWristY > 200 && rightWristY <= 300){
    document.getElementById("speed").innerHTML = "Speed = 1.5x"
    song.rate(1.5)
}
else if(rightWristY > 300 && rightWristY <= 400){
    document.getElementById("speed").innerHTML = "Speed = 2x"
    song.rate(2)
}
else if(rightWristY > 400 && rightWristY <= 500){
    document.getElementById("speed").innerHTML = "Speed = 2.5x"
    song.rate(2.5)
}
}
}

function setup(){
canvas = createCanvas(600,500)
canvas.center();

webcam = createCapture(VIDEO);
webcam.hide();

posenet = ml5.poseNet(webcam, modelLoaded)
posenet.on('pose',gotPoses )
}

function play(){
    song.play();

    song.setVolume(volume);

    song.rate(2.5);

    

}

function pause(){
    song.pause()
}

function stop(){
    song.stop()
}

function modelLoaded(){
    console.log("PoseNet is Inistalised")
}

function gotPoses(results){

    if(results.length > 0){
        console.log(results)

        leftWristX =  results[0].pose.leftWrist.x
        
        leftWristY =  results[0].pose.leftWrist.y

        console.log("Left wrist x = " +leftWristX+ "and left wrist y =" +leftWristY)

        rightWristX =  results[0].pose.rightWrist.x
        
        rightWristY =  results[0].pose.rightWrist.y

        console.log("Right wrist x = " +rightWristX+ "and right wrist y =" +rightWristY)

        scoreleftwrist = results[0].pose.keypoints[9].score 
        scorerightwrist = results[0].pose.keypoints[10].score
        console.log("score leftwrist = " + scoreleftwrist)

    }

    

}