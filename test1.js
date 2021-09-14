0
00:00:00,000 --> 00:00:20,000
var currentPose = null;
const video = document.getElementById("video")
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
        }).then(stream => {
            video.srcObject = stream;
            video.play()
        }).catch(e => {
          console.log(e)
        })
async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);   
    for (let i = 0; i < maxPredictions; i++) {
	const classPrediction =
	      prediction[i].className + ": " + prediction[i].probability.toFixed(2);
	labelContainer.childNodes[i].innerHTML = classPrediction;
    }
    // finally draw the poses
    //drawPose(pose);
    //console.log(typeof(pose));
    //ここに追記する
    // １番確率の高いポーズを求める。    
    // その確率が予め決めた閾値以上であったら
    // そのポーズのラベルを、グローバル変数currentPoseに書き込む
    let ary;
    currentpose = null;
	for (let i = 0;i<prediction.length;i++) {
	    ary.push(prediction[i] / prediction.length);
	}
	const aryMax = function (a, b) {return Math.max(a, b);}
	let max = ary.reduce(aryMax);
	if (max > 40) {
	    currentpose = pose.lavel;
	}
}

1
00:00:55,000 --> 00:01:09,000
//alert("1つ目のポーズ");
//judge();
if (currentpose != "安楽座のポーズ") {
    player.seekTo(25,true);
    //alertのokをおしてから巻き戻す＝＞ポーズが取れていない秒数を開始時間にしてから書く
}
