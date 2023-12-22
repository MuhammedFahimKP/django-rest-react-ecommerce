const form             = document.getElementById('myform');
const ContentContainer = document.getElementById('container');
var Name               = document.getElementById('name')
var img                = document.getElementById('img')
var imgSrc             = 0



img.addEventListener('change',(e)=>{

    imgSrc = e.target.files[0];
    


});





const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzAyNzMyNjM5LCJpYXQiOjE3MDI2NDYyMzksImp0aSI6IjNlNzhlMzEzYzJhMzQxYjk5MTc2MWY2YjA1ZWI0NTI4IiwidXNlcl9pZCI6IjljZGYwNWQ0LWY2ZWYtNGQzMS1iMmZmLTIwMTQ0N2IwN2Q2ZiJ9.pKoclf7UKE6SR5T4x-hlVgMu26VVrXJlGjv5riia_C0'
form.addEventListener('submit',(e)=>{

    e.preventDefault()
   



    getCategoeries()
    
    


    
    
    
    
     
    
    

})



function writeContent(data){
    if (ContentContainer) {
        // alert(ContentContainer);
        console.log('hai');
         ContentContainer.innerHTML = "<pre>"+`${JSON.stringify(data,null,4)}`+"</pre>";
    }
        // else{
        //     ContentContainer.innerHTML = "";
        // }

}   


function getbrands(cat){

    fetch('http://127.0.0.1:8000/admin/brand/',{
        method : "GET",
        headers : {
            "Content-Type":"application/json",
            "Authorization" : `Bearer ${token}`,
        },
        

    }).then(response => {
        if (!response.ok) {


            // writeToContent(error=response.code)

            // throw new Error(`HTTP error! Status: ${response.status}`);
            
        }
        return response.json();
    })
    .then(Data =>{
        createProduct(cat,Data[0])

    })
    .catch(error => {
        // Handle errors here
        console.log('Error:', error);
    })
}


function getCategoeries(){
    fetch('http://127.0.0.1:8000/admin/categoery/',{
        method : "GET",
        headers : {
            "Content-Type":"application/json",
            "Authorization" : `Bearer ${token}`,
        },
        

    }).then(response => {
        if (!response.ok) {


            // writeToContent(error=response.code)

            // throw new Error(`HTTP error! Status: ${response.status}`);
            
        }
        return response.json();
    })
    .then(Data =>{
        getbrands(Data[0])


    })
    .catch(error => {
        // Handle errors here
        console.log('Error:', error);
    })
}



function createProduct(cat,bran){

    let requestBody = {
            
            
        name:Name.value,
        img:null,
        categoery:cat,
        brand:bran,
        is_active:true
        
    }
   
    
    
    console.log(requestBody)
    

    
    
    
    fetch('http://127.0.0.1:8000/admin/product/',{
        method : "POST",
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
        

    }).then(response => {
        if (!response.ok) {


            // writeToContent(error=response.code)

            // throw new Error(`HTTP error! Status: ${response.status}`);
            
        }
        return response.json();
    })
    .then(Data =>{

        writeContent(Data);

    })
    .catch(error => {
        // Handle errors here
        console.log('Error:', error);
    })
    


}







