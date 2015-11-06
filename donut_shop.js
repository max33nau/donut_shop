/******** FUNCTIONS ********/

//Creates Constructional Objects for Top Pots Donut Shops
function PotDonutShop(Shoplocation, MinCustomersPerHour, MaxCustomersPerHour, AverageDonutsPerCustomer) {
    this.Shoplocation = Shoplocation;
    this.MinCustomersPerHour = MinCustomersPerHour;
    this.MaxCustomersPerHour = MaxCustomersPerHour;
    this.AverageDonutsPerCustomer = AverageDonutsPerCustomer;
  }

//Generates random number of customers each hour based on min and max.
PotDonutShop.prototype.RandomNumberOfCustomers = function() {
    return Math.floor( Math.random() * ( this.MaxCustomersPerHour - this.MinCustomersPerHour +1 ) )
    + this.MinCustomersPerHour;
  }

// Generates top Row of the table with the times you want to open and close
function HoursOpen(open,close) {
    var Time = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    var TimeYouWantToStart = Time[open]; // Assumes you Open in AM and  0 = 12AM
    var TimeYouWantToEnd = Time[close]; // Assumes You Close in the PM 0 = 12PM
    var TimeDuringDay = "<tr id='TimeTableHeading'></tr>" + "<th></th>"; //Blank Space in table
    var FinishedTimeTable = false;

    if ( TimeYouWantToStart === Time[0] ) {
        TimeDuringDay += "<th class = 'theading'>" + Time[0] + ":00 AM   </th>";
        for ( zz = 1; zz < 12; zz++ ) {
           TimeDuringDay += "<th class = 'theading'>" + zz + ":00 AM   </th>";
           }
        HoursOpenedinAM = 12;
     } else {
        for ( zz = Time[ TimeYouWantToStart ]; zz < 12; zz++) {
           TimeDuringDay += "<th class = 'theading'>" + zz + ":00 AM   </th>";
           }
        HoursOpenedinAM = 12 - TimeYouWantToStart;
     }

    if ( TimeYouWantToEnd === Time[0] ) {
        TimeDuringDay += "<th class = 'theading'>" + Time[0] + ":00 PM   </th>";
        HoursOpenedinPM = 1;
     } else {
        TimeDuringDay += "<th class = 'theading'>" + Time[0] + ":00 PM   </th>";
        for (zz = 1; zz <= TimeYouWantToEnd; zz++) {
           TimeDuringDay += "<th class = 'theading'>" + zz + ":00 PM   </th>";
           }
        HoursOpenedinPM = TimeYouWantToEnd + 1;
     }
    table = TimeDuringDay + "<th class = 'theading'> Total </th>";
  }

//Puts in the content into the table from your initial five Pot Donut Shops
function InitialTable() {
    for (ii=0; ii<PotDonuts.length; ii++) {
        var hoursOpen = HoursOpenedinAM + HoursOpenedinPM;
        var FinishedLocation=false;
        while(!FinishedLocation) {
          var totalDonuts = 0;

          var CurrentData = "<tr id=" + "'Location" + (ii+1) + "''" +"> </tr>" +
          "<th>" + PotDonuts[ii].Shoplocation + "</th>";
            for( jj=1; jj <= hoursOpen; jj++ ) {
                AmountofPeopleEachHour[jj] = PotDonuts[ii].RandomNumberOfCustomers();
                AmountofDonutsNeeded[jj] = Math.ceil(AmountofPeopleEachHour[jj] *
                PotDonuts[ii].AverageDonutsPerCustomer);
                CurrentData += "<td>" + AmountofDonutsNeeded[jj] + "</td>";
                totalDonuts += AmountofDonutsNeeded[jj];
             }
          table +=  CurrentData + "<td>" + totalDonuts + "</td>";
          FinishedLocation = true;
        }
     }
  }

//Allows you to add a new row with a new location to your current table
//Doesn't change previous data simply adds on to global variable table
function AddLocation() {
    var newRow = "<tr id=" + "'Location" + (amountofLocations) + "''" +"> </tr>" +
                 "<th>" + PotDonuts[amountofLocations].Shoplocation + "</th>";
    var hoursOpen = HoursOpenedinAM + HoursOpenedinPM;
    var totalDonuts = 0;
    var newData = "";
    for( jj=1; jj <= hoursOpen; jj++ ) {
        AmountofPeopleEachHour[jj] = PotDonuts[ii].RandomNumberOfCustomers();
        AmountofDonutsNeeded[jj] = Math.ceil(AmountofPeopleEachHour[jj] *
        PotDonuts[ii].AverageDonutsPerCustomer);
        newData += "<td>" + AmountofDonutsNeeded[jj] + "</td>";
        totalDonuts += AmountofDonutsNeeded[jj];
     }
     revisedrow +=  newRow + newData + "<td>" + totalDonuts + "</td>";

  }

//Writes the global varialbe table to DOM
function writetoDOM () {
    var initialtable;
    initialtable = document.getElementById("table");
    initialtable.innerHTML = table;
  }

//Happens when the button is clicked and adds a location to the table
function buttonclick() {
    revisedrow = "";
    var newLocation = document.getElementById( "newlocation" ).value;
    var newMin = Number( document.getElementById( "newmin" ).value );
    var newMax = Number( document.getElementById( "newmax" ).value );
    var newAverage = Number( document.getElementById("newaverage" ).value );
    var NewDonutShop = new PotDonutShop( newLocation,newMin,newMax,newAverage );
    var existinglocation = false;

    if ( newLocation.length < 1 || newMin.length < 1 || newMax < 1 || newAverage < 1 ) {
       return;
     }
    for ( ii=0; ii < PotDonuts.length; ii++ ) {
      if (newLocation === PotDonuts[ii].Shoplocation) {
          PotDonuts[ii].MinCustomersPerHour = newMin;
          PotDonuts[ii].MaxCustomersPerHour = newMax;
          PotDonuts[ii].AverageDonutsPerCustomer = newAverage;
          existinglocation = true;
       }
     }
    if ( existinglocation === false ) {
         PotDonuts.push(NewDonutShop);
         AddLocation();
         amountofLocations++;
         table += revisedrow;
         writetoDOM();
     }
  }

//When the change time button is clicked and then changes the initial table times
function changetime() {
    var newopen = Number(document.getElementById("useropentime").value);
    var newclose = Number(document.getElementById("userclosetime").value);
    var revisednumberopen;
    var revisednumberclose;
    if ( newopen.length < 1 || newclose.length < 1 ) {
       return;
     }
    if ( newopen === 12 ) {
        revisednumberopen  = 0;
     } else {
        revisednumberopen = newopen;
     }
    if ( newclose === 12 ) {
         revisednumberclose = 0;
     } else {
        revisednumberclose = newclose;
     }
     console.log("newtime" + revisednumberopen);
    HoursOpen(revisednumberopen,revisednumberclose);
    InitialTable();
    writetoDOM();
  }

// Updates a current location that has already been established
function update() {
    console.log(PotDonuts);
    console.log("clicked");
    var newLocation = document.getElementById( "newlocation" ).value;
    var newMin = Number( document.getElementById( "newmin" ).value );
    var newMax = Number( document.getElementById( "newmax" ).value );
    var newAverage = Number( document.getElementById("newaverage" ).value );
    var NewDonutShop = new PotDonutShop( newLocation,newMin,newMax,newAverage );

    for ( ii=0; ii < PotDonuts.length; ii++ ) {
      console.log("new " + newLocation);
      console.log(PotDonuts[ii].Shoplocation);
      console.log(PotDonuts[ii].MinCustomersPerHour);
      if (newLocation === PotDonuts[ii].Shoplocation) {
          PotDonuts[ii].MinCustomersPerHour = newMin;
          PotDonuts[ii].MaxCustomersPerHour = newMax;
          PotDonuts[ii].AverageDonutsPerCustomer = newAverage;
          console.log(PotDonuts[ii].MinCustomersPerHour);
          break;
     }
}
  HoursOpen(open,close);
  InitialTable();
  writetoDOM();
}

// Changes the CSS layout of the page 
function layout(pagelayout) {
    var changecolor = document.getElementById("MainBody");
    changecolor.className = pagelayout + "mainbody";

    var header = document.getElementById("header1");
    header.className = pagelayout + "header";

    var table = document.getElementById("table");
    table.className = pagelayout + "table";

    var fieldset = document.getElementById("EventTime");
    fieldset.className = pagelayout + "fieldset";
    var fieldset1 = document.getElementById("EventLocation");
    fieldset1.className = pagelayout + "fieldset";

    var legend1 = document.getElementById("Legend1");
    legend1.className = pagelayout + "legend";
    var legend2 = document.getElementById("Legend2");
    legend2.className = pagelayout + "legend";

    var button = document.getElementById("changetime");
    button.className = pagelayout + "button";
    var button1 = document.getElementById("AddLocation");
    button1.className = pagelayout + "button";
    var button2 = document.getElementById("Update");
    button2.className = pagelayout + "button";
    var button2 = document.getElementById("Update");
    button2.className = pagelayout + "button";

    var inputLocation = document.getElementById("newlocation");
    inputLocation.className = pagelayout + "input";
    var inputopen = document.getElementById("useropentime");
    inputopen.className = pagelayout + "input";
    var inputclose = document.getElementById("userclosetime");
    inputclose.className = pagelayout + "input";
    var inputmin = document.getElementById("newmin");
    inputmin.className = pagelayout + "input";
    var inputmax = document.getElementById("newmax");
    inputmax.className = pagelayout + "input";
    var inputaverage = document.getElementById("newaverage");
    inputaverage.className = pagelayout + "input";

    var unorderedlist = document.getElementById("UList");
    unorderedlist.className = pagelayout + "unorderedlist";

    var mainimage1 = document.getElementById("headerimage");
    mainimage1.src = "images/"+ pagelayout + ".jpg";

    var mainimage2 = document.getElementById("headerimage2");
    mainimage2.src = "images/"+ pagelayout + "1.jpg";
  }

/******** END OF FUNCTIONS  ********/

/******** GLOBAL VARIABLES JOHN's FAVORITE ********/

var DonutShop1 = new PotDonutShop( "Downtown" , 8 , 43 , 4.50 );
var DonutShop2 = new PotDonutShop( "Capitol Hill" , 4, 37 , 2.00 );
var DonutShop3 = new PotDonutShop( "South Lake Union" , 9 , 23 , 6.33 );
var DonutShop4 = new PotDonutShop( "Wedgewood" , 2 , 28 , 1.25 );
var DonutShop5 = new PotDonutShop( "Ballard" , 8 , 58 , 3.75 );

var PotDonuts = [ DonutShop1, DonutShop2, DonutShop3, DonutShop4, DonutShop5 ];
var AmountofPeopleEachHour = [];
var AmountofDonutsNeeded = [];

var HoursOpenedinAM;
var HoursOpenedinPM;
var open = 7;
var close = 6;
var FirstLocation = 1;
var InitialFinalLocation = PotDonuts.length;
var table = "";
var amountofLocations = 5;
var revisedrow = "";

/******** END OF GLOBAL VARIABLES ********/

/******** EASTER EGG EVENTS ********/

var ClickedLocation = document.getElementById("thanksgiving");
ClickedLocation.addEventListener('dblclick', function() {layout("thanksgiving");}, false);

var DefaultClickedLocation = document.getElementById("default");
DefaultClickedLocation.addEventListener('dblclick', function() {layout("default");}, false);

var ChristmasClickedLocation = document.getElementById("christmas");
ChristmasClickedLocation.addEventListener('dblclick', function() {layout("christmas");}, false);
/******** END OF EASTER EGG EVENTS ********/

/******** Initial Webpage Load ********/
HoursOpen(open,close);
InitialTable();
writetoDOM();

/******** Finished Page Load ********/
