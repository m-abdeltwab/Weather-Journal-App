// API URL and Personal API Key
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=880dc18e5e268b4d23f09732726c5b98";

// generate button
const btn = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();

//  GET Weather Data from API
const getData = async(baseURL, zipCode, apiKey) => {
    const response = await fetch(baseURL + zipCode + ",us" + apiKey);
    try {
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.log("error", error);
    }
};

// event listener function
const GenerateData = () => {
    const zipCode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;

    getData(baseURL, zipCode, apiKey).then((userData) => {
        // add data to POST request
        postData("http://localhost:3000/addData", {
            temperature: userData.main.temp,
            date: newDate,
            feelings: feelings,
        }).then(function() {
            updateUI();
        });
    });
};

btn.addEventListener("click", GenerateData);

/* Function to POST data */
const postData = async(url = "", data = {}) => {
    const request = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await request.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
};

// update UI
const updateUI = async() => {
    const request = await fetch("http://localhost:3000/allData");
    try {
        const Data = await request.json();

        document.getElementById("date").innerHTML = `Date: ${Data.date}`;
        document.getElementById(
            "temp"
        ).innerHTML = `Temperature: ${Data.temperature}  &deg;K`;
        document.getElementById(
            "content"
        ).innerHTML = `Your Feeling: ${Data.feelings}`;
    } catch (error) {
        console.log("error", error);
    }
};