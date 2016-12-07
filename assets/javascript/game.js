
//  PSEUDOCODE:

//

// ** Initialize Firebase: Replace with your database

var config = {
    apiKey: "AIzaSyD8wwNFAqg-T33hmAHmjJsbGUkxi-ZlYEg",
    authDomain: "hw-7-trainscheduler.firebaseapp.com",
    databaseURL: "https://hw-7-trainscheduler.firebaseio.com",
    storageBucket: "hw-7-trainscheduler.appspot.com",
    messagingSenderId: "553763872372"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

// 2. Button for adding Train Names
$("#addTrainBtn").on("click", function() {

  // Grabs user input
  var trnName = $("#trainNameInput").val().trim();
  var trnDest = $("#destination-input").val().trim();
  var trnFirst = moment($("#firstTrtainTime").val().trim(), "HH:mm");
  var trnFreq = $("#frequency-input").val().trim();

  

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trnName,
    dest: trnDest,
    first: trnFirst,
    freq: trnFreq,
    // tMinutesTillTrain:tMinutesTillTrain,
    // nextArrival:nextArrival,
    // dateAdded:firebase.database.ServerValue.TIMESTAMP,

  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.first);
  console.log(newTrain.freq);
  // console.log(newTrain.tMinutesTillTrain);
  // console.log(newTrain.nextArrival);
  // console.log(newTrain.dateAdded);



  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#trainNameInput").val("");
  $("#destination-input").val("");
  $("#firstTrtainTime").val("");
  $("#frequency-input").val("");
// First Time (pushed back 1 year to make sure it comes before current time)
      var firstTimeConverted = moment(trnFirst, "HH:mm").subtract(1, "years"); // find out more about .substract(1 ...)
      console.log(firstTimeConverted);
      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));
      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % trnFreq;
      console.log(tRemainder);

      // Minute Until Train
      var tMinutesTillTrain = trnFreq - tRemainder;
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      // Next Train
      var nextTrain = moment().add(tMinutesTillTrain, "minutes");
      console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

      // Arrival time
  	  nextArrival = moment(nextTrain).format("HH:mm a");

  // Prevents moving to new page
  return false;    

});

// 3. Create Firebase event for adding TRAINS to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.

  var trnName = childSnapshot.val().name;
  var trnDest = childSnapshot.val().dest;
  var trnFirst = childSnapshot.val().first;
  var trnFreq = childSnapshot.val().freq;
  // var tMinutesTillTrain = childSnapshot.val().tMinutesTillTrain;
  // var nextArrival = childSnapshot.val().nextArrival;

  

  // Train Info
  console.log(trnName);
  console.log(trnDest);
  console.log(trnFirst);
  console.log(trnFreq);

  // Prettify the employee start ************************
  var trnStartPretty = moment.unix(trnFirst).format("HH:mm");


  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trnName + "</td><td>" + trnDest + "</td><td>" +
  trnFreq + "</td>      </tr>");

  //<td>" + nextArrival + "</td><td>" + tMinutesTillTrain + "</td> 

});



