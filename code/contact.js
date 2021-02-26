var XMLHttpRequestObject = false;
var data = '../code/contact.php';

var nameInput;
var emailInput;
var subjectInput;
var messageInput;
var form;
var content;

window.onload = function () {
    $('#picker').dateTimePicker();

    if (window.XMLHttpRequest) {
        XMLHttpRequestObject = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        XMLHttpRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
    }

    nameInput = document.getElementById("name");
    emailInput = document.getElementById("email");
    subjectInput = document.getElementById("subject");
    messageInput = document.getElementById("message");
    content = document.getElementById("content");

    form = document.getElementById('contact-form')
    form.addEventListener('submit', getData);
}

function getData() {
    if (XMLHttpRequestObject) {
        XMLHttpRequestObject.open("POST", data);

        var params_xml = createJSON();

        XMLHttpRequestObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        XMLHttpRequestObject.onreadystatechange = function () {
            if (XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 200) {
                console.log(XMLHttpRequestObject.responseText);
                content.innerHTML = XMLHttpRequestObject.responseText;
            }
        }
        console.log(params_xml);
        XMLHttpRequestObject.send("params=" + params_xml);
    }
}

function createJSON() {
    var json = '{ "params" : [' +
        '{ "name":"' + nameInput.value + '", "email":"' + emailInput.value + '", "subject":"' + subjectInput.value + '", "message":"' + messageInput.value + '" }]}';
    return json;
}