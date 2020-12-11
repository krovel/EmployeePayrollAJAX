let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "Secs";
}

function makeAJAXCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        console.log(methodType + " State Changed Called at " + showTime() + ". Ready State: " + xhr.readyState + " | Status: " + xhr.status);
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 201) {
                callback(xhr.responseText);
            } else if (xhr.status >= 400 && xhr.status < 500) {
                console.log("400 Client Error");
            } else if (xhr.status >= 500) {
                console.log("400 Server Error");
            }
        }
    }
    xhr.open(methodType, url, async);
    if (data) {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    } else xhr.send();
    console.log(methodType + " request sent to the Server at " + showTime());
}

const getURL = "http://127.0.0.1:3000/employee-payroll/1";

function getUserDetails(data) {
    console.log("Get User Data at " + showTime() + " Data : " + data);
}
makeAJAXCall("GET", getURL, getUserDetails, true);
console.log("Made GET AJAX to Server at " + showTime());

const deleteURL = "http://127.0.0.1:3000/employee-payroll/9";

function userDeleted(data) {
    console.log("User Deleted at " + showTime() + " Data : " + data);
}
makeAJAXCall("DELETE", deleteURL, userDeleted, false);
console.log("Made DELETE AJAX to Server at " + showTime());

const postURL = "http://127.0.0.1:3000/employee-payroll";
const employeeData = {
    "name": "Laiba",
    "salary": 3000000,
    "startDate": {
        "year": 2020,
        "month": 11,
        "day": 2
    },
    "gender": "F"
};

function userAdded(data) {
    console.log("User Added at " + showTime() + " Data : " + data);
}
makeAJAXCall("POST", postURL, userAdded, true, employeeData);
console.log("Made POST AJAX to Server at " + showTime());