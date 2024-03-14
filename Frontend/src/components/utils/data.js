
async function sendRequest(data){

    try{

        let res = await  fetch("http://127.0.0.1:8000/users/google-auth/", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json'
            // Other possible headers
            }
        })

        let resdata = await res.json()
        

        console.log(resdata)

    }

    catch(err){

        console.log(err)
    }

}

export default sendRequest;