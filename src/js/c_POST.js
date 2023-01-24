const BASE_URL = "http://localhost:8080/employees";

const addEmployee = (obj) =>{
    const options = {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(obj),
    }
    return fetch(BASE_URL,options)
        .then(response =>{
            if(!response.ok){
                throw new Error(response.status);
            }
            return response.json();
        })
}

let newEmployee= {
    "name": "Roony Roads",
    "title": "Web Dev JS",
    "skillLevels": {
    "javascript": 7,
    "python": 7,
    "sql": 8
    }
}

addEmployee(newEmployee);