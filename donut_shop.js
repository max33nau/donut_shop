
/* FUNCTION PotDonutShop allows you to create a object based on the parameters
you enter, which create properties within the object. */
function PotDonutShop(Shoplocation, MinCustomersPerHour, MaxCustomersPerHour, AverageDonutsPerCustomer) {
    this.Shoplocation = Shoplocation;
    this.MinCustomersPerHour = MinCustomersPerHour;
    this.MaxCustomersPerHour = MaxCustomersPerHour;
    this.AverageDonutsPerCustomer = AverageDonutsPerCustomer;
}

/*Declaring the 5 Different Donut Shop locations */
var DonutShop1 = new PotDonutShop( "Downtown" , 8 , 43 , 4.50 );
var DonutShop2 = new PotDonutShop( "Capitol Hill" , 4, 37 , 2.00 );
var DonutShop3 = new PotDonutShop( "South Lake Union" , 9 , 23 , 6.33 );
var DonutShop4 = new PotDonutShop( "Wedgewood" , 2 , 28 , 1.25 );
var DonutShop5 = new PotDonutShop( "Ballard" , 8 , 58 , 3.75 );

/* Making my new objects into a array allows me to use a for loop later.
The Variables AmountofPeopleEachHour and AmountofDonutsNeeded are empty
arrays that will build with values as my for loop is created. */
var PotDonuts = [ DonutShop1, DonutShop2, DonutShop3, DonutShop4, DonutShop5 ];
var AmountofPeopleEachHour = [];
var AmountofDonutsNeeded = [];


/* This method is added to each of my objects and generates a random
number between the minimum and maximum number of customers that come into
the different locations based on the properties within each object. */
PotDonutShop.prototype.RandomNumberOfCustomers = function() {
    return Math.floor( Math.random() * ( this.MaxCustomersPerHour - this.MinCustomersPerHour +1 ) ) + this.MinCustomersPerHour;
}

/*This generates the top half of my table displaying what hours the franchises
are open. If you change the time to starts or end they will change how long your
table is. Also it gives a total column after all the hours have been generated.*/
var Time = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
var TimeYouWantToStart = Time[7]; // Assumes you Open in AM and  0 = 12AM
var TimeYouWantToEnd = Time[6]; // Assumes You Close in the PM 0 = 12PM
var TimeDuringDay = "<th></th>"; //Blank Space in table
var FinishedTimeTable = false;
var HoursOpenedinAM;
var HoursOpenedinPM;

if ( TimeYouWantToStart === Time[0] ) {
    TimeDuringDay += "<th>" + Time[0] + ":00 AM   </th>";
    for (zz = 1; zz < 12; zz++) {
       TimeDuringDay += "<th>" + zz + ":00 AM   </th>"
     }
  HoursOpenedinAM = 12;
 } else {
    for ( zz = Time[ TimeYouWantToStart ]; zz < 12; zz++) {
       TimeDuringDay += "<th>" + zz + ":00 AM   </th>";
     }
    HoursOpenedinAM = 12 - TimeYouWantToStart;
 }

if ( TimeYouWantToEnd === Time[0] ) {
    TimeDuringDay += "<th>" + Time[0] + ":00 PM   </th>";
    HoursOpenedinPM = 1;
 } else {
    TimeDuringDay += "<th>" + Time[0] + ":00 PM   </th>";
    for (zz = 1; zz <= TimeYouWantToEnd; zz++) {
    TimeDuringDay += "<th>" + zz + ":00 PM   </th>";
    }
    HoursOpenedinPM = TimeYouWantToEnd + 1;
 }

var TimeTableHeading = "<tr id='TimeTable'> </tr>"
var NumberOfLocations = "";

 for (zz=0; zz<PotDonuts.length; zz++) {
   NumberOfLocations += "<tr id=" + "'Location" + (zz+1) + "''" +"> </tr>";
   console.log(NumberOfLocations)
 }

var debug = TimeTableHeading + NumberOfLocations;
console.log(debug);
 var tableContent = document.getElementById("table");
 tableContent.innerHTML = TimeTableHeading + NumberOfLocations;

// Writes the hour generated above into the DOM
var TimeTableString;
TimeTableString = document.getElementById("TimeTable");
TimeTableString.innerHTML = TimeDuringDay + "<th> Total </th>";



/* This for loop runs through each location and logs each of the
objects properties. */
for (ii=0; ii<PotDonuts.length; ii++) {
  var hoursOpen = HoursOpenedinAM + HoursOpenedinPM;
  var FinishedLocation=false;
  console.log("Current Donut Shop Location = " + PotDonuts[ii].Shoplocation);
  console.log("Min Amount of Customers = " + PotDonuts[ii].MinCustomersPerHour);
  console.log("Max Amount of Customers= " + PotDonuts[ii].MaxCustomersPerHour);
  console.log("Average Donuts Per Customer = " + PotDonuts[ii].AverageDonutsPerCustomer);

/* For each location, The for loop will cycle through each hour that the franchise
is open. Then it will start to build a array with the values of donuts needed to be
made for each hour. This is where I use the RandomNumberOfCustomers function and Then
multiply it by the average number of donuts each customer buys per franchise. */
  while(!FinishedLocation) {
    var totalDonuts = 0;
    var CurrentData = "<th>" + PotDonuts[ii].Shoplocation + "</th>";
    for( jj=1; jj <= hoursOpen; jj++ ) {
      AmountofPeopleEachHour[jj] = PotDonuts[ii].RandomNumberOfCustomers();
      AmountofDonutsNeeded[jj] = Math.ceil(AmountofPeopleEachHour[jj] * PotDonuts[ii].AverageDonutsPerCustomer);
      CurrentData += "<td>" + AmountofDonutsNeeded[jj] + "</td>";
      totalDonuts += AmountofDonutsNeeded[jj];
    }
    console.log(CurrentData);
    var Data = document.getElementById("Location" + (ii+1));
    Data.innerHTML = CurrentData + "<td>" + totalDonuts + "</td>";
    FinishedLocation = true;
  }
}
