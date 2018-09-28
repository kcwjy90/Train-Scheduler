
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBNei_vN8GvML5kPGoD6tfVqAs4GSWaCEw",
    authDomain: "ishallpass-b8571.firebaseapp.com",
    databaseURL: "https://ishallpass-b8571.firebaseio.com",
    projectId: "ishallpass-b8571",
    storageBucket: "ishallpass-b8571.appspot.com",
    messagingSenderId: "160785092414"
  };

  firebase.initializeApp(config);


  var database = firebase.database();

      var trainName = "";
      var trainDestination = "";
      var trainTime = 0;
      var trainFrequency = "";

      var firstTimeConverted ="";
      var currentTime = "";
      var diffTime ="";
      var tRemainder="";
      var firstTime = "";
      var nextTrain ="";

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

      // Grabs user input
      trainName = $("#trainName").val();
      trainDestination = $("#trainDestination").val();
      trainTime = $("#trainTime").val();
      firstTime = trainTime;
      trainFrequency = $("#trainFreq").val();

      // Clears all of the text-boxes
      $("#trainName").val("");
      $("#trainDestination").val("");
      $("#trainTime").val("");
      $("#trainFreq").val("");


      // First Time (pushed back 1 year to make sure it comes before current time)
      firstTimeConverted = moment(firstTime, "HH:mm");
    
      // Current Time
      currentTime = moment();

      // Difference between the times
      diffTime = moment().diff(moment(firstTimeConverted), "minutes");

      // Time apart (remainder)
      tRemainder = diffTime % trainFrequency;

      // Minute Until Train
      tMinutesTillTrain = trainFrequency - tRemainder;

      // Next Train
      nextTrain = moment().add(tMinutesTillTrain, "minutes");

      //putting data into database
        database.ref().push({
          name: trainName,
          destination: trainDestination,
          time: trainTime,
          frequency: trainFrequency,
          arrival: nextTrain.toLocaleString(),
          minutes: tMinutesTillTrain
        });

});


database.ref().on("child_added", function(childSnapshot) {
      // Store everything into a variable.
    var recTrainName = childSnapshot.val().name;
    var recTrainDes = childSnapshot.val().destination;
    var recTrainTime = childSnapshot.val().time;
    var recTrainFreq = childSnapshot.val().frequency;
    var recNextArrival = childSnapshot.val().arrival;
    var recTrainMinutes = childSnapshot.val().minutes;
  
      // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(recTrainName),
      $("<td>").text(recTrainDes),
      $("<td>").text(recTrainFreq),
      $("<td>").text(recNextArrival),
      $("<td>").text(recTrainMinutes),
    );
  
    // Append the new row to the table
    $("#scheduleHere").append(newRow);
  });
  

