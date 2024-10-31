//image classification

let showImage = document.getElementById("showImage");
let imageInput = document.getElementById("imageInput");
const resultText = document.getElementById("result");

imageInput.onchange = function(){
    showImage.src = URL.createObjectURL(imageInput.files[0]);
}

// loading model
async function loadModel() {
    model = await mobilenet.load();
    console.log("Model loaded");
}
loadModel();

//analyze and classify uploaded image
async function analyzeImage() {
    if (!model) {
        resultText.innerText = "Model is still loading...";
        return;
    }

    //preprocess the image 
    const image = tf.browser.fromPixels(showImage);
    const predictions = await model.classify(image);


    //display the result
    if (predictions.length > 0) {
        resultText.innerText = `${predictions[0].className} - ${predictions[0].probability.toFixed(2)}`;
    }

    //memory free
    image.dispose();  
}

// weather api
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");


async function checkWeather(city){
const apiKey = "57048daf86814de2acc133235241610";

    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
    const response = await fetch(apiUrl);
    var data = await response.json();

    console.log(data);
    
    document.querySelector(".city").innerHTML = data.location.name;
    document.querySelector(".tem").innerHTML = data.current.temp_c + "°C";
    document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
    document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/h";
    }


searchButton.addEventListener("click", () => {
    checkWeather(searchBox.value);
})

