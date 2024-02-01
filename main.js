function preload(){
    classifier = ml5.imageClassifier('DoodleNet')
}
function setup(){
    canvas = createCanvas(300, 300);
    canvas.center();
    background("#78e26b");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}
function draw(){
    strokeWeight(13);
    stroke("black");
    if(mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}
function classifyCanvas(){
    classifier.classify(canvas, gotResults);
}
function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("label_draw").innerHTML = 'label: ' + results[0].label;
        document.getElementById("confidence_level").innerHTML = 'confidence: ' + Math.round(results[0].confidence * 100) + "%";
        utterThis = new SpeechSynthesisUtterance(results[0].label);
        synth.speak(utterThis);
    }
}
function clearCanvas(){
    background("#78e26b");
}