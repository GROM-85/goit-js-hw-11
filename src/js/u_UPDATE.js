const BASE_URL = "http://localhost:8080/employees";

const updateEmployee = ({id,body}) =>{
    const options = {
        method: "PATCH",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
    }
    return fetch(BASE_URL+`/${id}`,options)
        .then(response =>{
            if(!response.ok){
                throw new Error(response.status);
            }
            return response.json();
        })
}

let newEmployee= {
    id:6,
    body:
    {
    "name": "Ivan Gordiienko",
    "title": "Back End Team Lead"
}
};

updateEmployee(newEmployee);