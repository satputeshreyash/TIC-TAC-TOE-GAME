function openPlayerConfig(event) {
  //event.target object will give you access to the element for which it is called
  const selectedPlayerId = +event.target.dataset.playerid; //to input data field  from button refer html file
  //if playerId = player-Id --> const clickedButton = event.target.dataset.['player-Id'];
  // + to convert string into a int
  editedPlayer = selectedPlayerId;
  playerConfigOverlayElement.style.display = "block";
  backdropElement.style.display = "block";
}

function closePlayerConfig() {
  playerConfigOverlayElement.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error"); //once the error is found we have to remove the class!!
  errorsOutputElement.textContent = "";
  formElement.firstElementChild.lastElementChild.value ='';//on clicking confirm --> input field should be cleared before the next use
}

function savePlayerConfig(event) {
  //in event object there is a method called preventDefault which is used to prevent the submissionn of data to the  server!!
  event.preventDefault();

  //FUCKING IMPORTANT!!
  // const formdata = {}; --> one way to create object
  //another way -->
  const formdata = new FormData(event.target); //event.target will look for the input field value entered
  //event.target denotes the form and event.target.value will point to all the input filed int the form
  //above statement will look for the input fields in the form and the input should compulsarily have a name
  //select is also a type of input --> w3school forms section refer
  //Formdata is the blueprint function --> in our lng --> class
  //Formdata is built in --> has the logic for parsing and also have number of methods
  //SEARCH FOR DIFFERENT TYPES OF BUILTIN METHODS IN JS

  const enteredPlayername = formdata.get("playername").trim(); //formdata --> object
  //get() --> is one of the method on Formdata
  //formdata.get('playername') --> will get you the entered input in the input field that has name 'playername'!!
  // trim is the method which is used to validate the data basically it will deal with the white space which is not required

  if (!enteredPlayername) {
    event.target.firstElementChild.classList.add("error"); //targets the form and firsr child div
    errorsOutputElement.textContent = "please enter a valid name";
    return; //if the input is invalid we must return --> exit the function
  }

  const updatedPlayerDataElement = document.getElementById('player-' + editedPlayer + '-data');//will be applicable for both the id
   updatedPlayerDataElement.children[1].textContent = enteredPlayername;

   players[editedPlayer - 1].name = enteredPlayername;//to set whose turn is it
   //object has been create in app.js players[0] --> 1st object players[1] --> second object
   closePlayerConfig();
}
