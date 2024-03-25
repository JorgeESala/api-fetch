
async function fetchUsers(){
  
  if(!askedAMinuteAgo()){
    // Cleans the table before fetching users
    document.getElementById("users-body").innerHTML = ""

    document.getElementById("users-spinner").hidden = false;
    const resolve = await fetch("https://reqres.in/api/users?delay=3");
    const users = await resolve.json();
    document.getElementById("users-spinner").hidden = true;
    users.data.map( (user) => {
        document.getElementById("users-body").innerHTML += `
        <tr>
        <th scope="row">${user.id}</th>
        <td>${user.first_name}</td>
        <td>${user.last_name}</td>
        <td>${user.email}</td>
        <td><img src="${user.avatar}"</td>
      </tr>
        `
    })
  }
  else{
    alert("Wait 1 minute before asking again");
  }
}

// checks if the users were asked a minute ago
function askedAMinuteAgo(){

  // if the date exists
  if(localStorage.getItem("date")){

    // actual date
    const minActuales = new Date().getMinutes();

    // stored date
    const minLocalStorage = new Date(localStorage.getItem("date")).getMinutes();

    const diferenciaMinutos = minActuales- minLocalStorage;
    
    if(diferenciaMinutos <= 1 ){
      return true;
    }else {
      localStorage.setItem("date", new Date());
      return false;
    }

    
  }else{
    localStorage.setItem("date", new Date());
    return false;
  }
}