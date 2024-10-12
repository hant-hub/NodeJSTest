
function setIdentity() {
    const identity = document.getElementById('identity-set').value;
    localStorage.setItem("identity", identity);
    document.location.href = "/";
}

function requestCalendar() {
    const identity = localStorage.getItem("identity");
    let response = fetch("/totalHours", {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify({"identity": identity})
    })
        .then((response) => { return response.json();})
        .then((data) => {
            document.getElementById('totalHours').innerHTML = data.total;
        })
        .catch((err) => {console.log(err)});
    
}
