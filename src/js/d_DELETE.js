const BASE_URL = "http://localhost:8080/employees";

const deleteEmployee = (id) => {
    const options = {
        method:"DELETE",
    }
    return fetch(BASE_URL + `/${id}`,options)
            .then(response => {
                if(!response.ok){
                    throw new Error(response.status);
                }
                response.json();
            })
}

deleteEmployee(7);