const BASE_URL = "http://localhost:8080/employees";

const getEmployees = () => {
    return fetch(BASE_URL)
            .then(response => {
                if(!response.ok){
                    throw new Error(response.status);
                }
                return response.json();
            })
            
}

const getEmloyeeById = (id) =>{
    return fetch(BASE_URL + `/${id}`)
    .then(response => {
        if(!response.ok){
            throw new Error(response.status);
        }
        return response.json();
    })
} 

getEmloyeeById(2);