/******** FUNCTIONS ********/

function PotDonutShop(Shoplocation, MinCustomersPerHour, MaxCustomersPerHour, AverageDonutsPerCustomer) {
    this.Shoplocation = Shoplocation;
    this.MinCustomersPerHour = MinCustomersPerHour;
    this.MaxCustomersPerHour = MaxCustomersPerHour;
    this.AverageDonutsPerCustomer = AverageDonutsPerCustomer;
  }

PotDonutShop.prototype.RandomNumberOfCustomers = function() {
    return Math.floor( Math.random() * ( this.MaxCustomersPerHour - this.MinCustomersPerHour +1 ) )
    + this.MinCustomersPerHour;
  }

function HoursOpen(open,close) {
    var Time = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    var TimeYouWantToStart = Time[open]; // Assumes you Open in AM and  0 = 12AM
    var TimeYouWantToEnd = Time[close]; // Assumes You Close in the PM 0 = 12PM
    var TimeDuringDay = "<tr id='TimeTableHeading'></tr>" + "<th></th>"; //Blank Space in table
    var FinishedTimeTable = false;

    if ( TimeYouWantToStart === Time[0] ) {
        TimeDuringDay += "<th>" + Time[0] + ":00 AM   </th>";
        for ( zz = 1; zz < 12; zz++ ) {
           TimeDuringDay += "<th>" + zz + ":00 AM   </th>";
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

    table = TimeDuringDay + "<th> Total </th>";

  }

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

function writetoDOM () {
    var initialtable;
    initialtable = document.getElementById("table");
    initialtable.innerHTML = table;
  }

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


function GoBlazers() {
    var changecolor = document.getElementById("MainBody");
    changecolor.className = 'blazers';
  }

function GoTimbers() {
     var changecolor = document.getElementById("MainBody");
     changecolor.className = 'timbers';
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

var ClickedLocation = document.getElementById("EventLocation");
ClickedLocation.addEventListener('dblclick', function() {GoBlazers();}, false);
var ClickedLocation = document.getElementById("EventTime");
ClickedLocation.addEventListener('dblclick', function() {GoTimbers();}, false);

/******** END OF EASTER EGG EVENTS ********/

/******** Initial Webpage Load ********/
HoursOpen(open,close);
InitialTable();
writetoDOM();

/******** Finished Page Load ********/
