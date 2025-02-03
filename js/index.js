
/* Html Element */
var nameInput = document.getElementById("name")
var siteWebName = document.getElementById("siteWeb")
var searchInput = document.getElementById("search")
var addBtn =  document.getElementById("addBtn")
var updateBtn = document.getElementById("updateBtn")




/* App Var */
var updateIndex;

/* Function */



var infoList = JSON.parse(localStorage.getItem("name")) || [];
displayAllInfo()



function addInfo(){


if(validate(regexName , nameInput) && validate(regexSiteWeb , siteWebName)){

    
var info = {
    name: nameInput.value,
    siteWeb: siteWebName.value,
    
    
    };
    
    
    infoList.push(info)
    localStorage.setItem("name", JSON.stringify(infoList))
    
    displayInfo(infoList.length -  1 )
    clearInput();
    
}else{

  Swal.fire({
    title: "Site Name or Url is not valid,",
    icon: "error"
  });
  
}

}




function displayInfo(index){


var infoHtml=`

<tr>
<td> ${index + 1}</td>
<td>
${infoList[index].name}
</td>              
<td>
  <button class="one btn  px-md-3 py-md-2" onclick="visitWebsite(${index})" >
  
    <i class="fa-regular fa-eye"></i>
    visit
  </button>
</td>
<td>
  <button class="btn btn-danger  px-md-3 py-md-2"onclick="deleteInfo(${index})" >
    <i class="fa-solid fa-trash"></i>
   Delete
  </button>
</td>


<td>
  <button class="btn btn-primary px-md-3 py-md-2" onclick="gateInfo(${index})" >
    <i class="fa-solid fa-trash"></i>
   Update
  </button>
</td>
</tr>

`

tableInfo.innerHTML += infoHtml



}



function displayAllInfo(){


    for(var i = 0; i < infoList.length; i++){

        displayInfo(i)
    }
}


function clearInput (){

    nameInput.value = "";
    siteWebName.value = "";
    
}



function deleteInfo (index){

    infoList.splice(index, 1)
    localStorage.setItem("name"  ,JSON.stringify(infoList))

    tableInfo.innerHTML = ""
    displayAllInfo()
}



var regexName = /^[A-Z][a-z]{3,100}$/;


var regexSiteWeb =/^(https?:\/\/)?([a-z-0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9#?&%_./-]*)?$/

function validate( regex , element){

if(regex.test(element.value)){

    element.classList.add("is-valid")
    element.classList.remove("is-invalid")
    return true;

}
    element.classList.add("is-invalid")
    element.classList.add("is-valid")
return false;



}




function visitWebsite(index) {
    var regexHttp = /^https?:\/\//;
    if (regexHttp.test(infoList[index].siteWeb)) {
      window.open(infoList[index].siteWeb);
    } 
  }


function searchName(){
 tableInfo.innerHTML= "";
  for (var i = 0 ; i < infoList.length ; i++ ){

    if(infoList[i].name.toLowerCase().includes(searchInput.value.toLowerCase())){
      displayInfo(i)


    }
  }
  
}



function gateInfo(index){
  updateIndex = index;

  nameInput.value = infoList[index].name;
  siteWebName.value = infoList[index].siteWeb;
  updateBtn.classList.remove("d-none")
  addBtn.classList.add("d-none")

  

}


 function updateInfo(){
  infoList[updateIndex].name = nameInput.value
  infoList[updateIndex].siteWeb = siteWebName.value

  localStorage.setItem("name", JSON.stringify(infoList))
  tableInfo.innerHTML = ""
  displayAllInfo()
  clearInput()
  updateBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");
  
} 