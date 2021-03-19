var today = moment();
var dateText = today.format("dddd, MMMM Do");
var startHour = 9;
var endHour = 22;

var currentDay = $("#currentDay");

// function to set row color
function setRowColor(agendaRow, hour) {
  let currentHour = moment().format('H');
  if (hour < currentHour) {
    agendaRow.css("background-color", "DarkCyan");
  } else if (hour == currentHour) {
    agendaRow.css("background-color", "DeepSkyBlue");
  }
}

currentDay.text(dateText);

let agenda = $("#agenda");
agenda.empty();  // remove any existing elements
agenda.addClass("agenda");

for (let i = startHour; i <= endHour; i++) {
  // create row for hour
  let agendaRow = $('<div>');
  agendaRow.addClass("row");
  agendaRow.addClass("agendaRow");

  // create the column that holds the time
  let columnTime = $('<div>');
  columnTime.addClass("col-sm-2");
  columnTime.addClass("columnTime");
  if (i < 13) {
    columnTime.text(`${i}:00 am`);
  } else {
    columnTime.text(`${i - 12}:00 pm`);
  }

  // create the column that the user can enter the agenda data
  let columnData = $('<input>');
  columnData.addClass("col-sm-8");
  columnData.addClass("columnData");
  columnData.attr("data-area", "input");
  columnData.attr("data-hour", `${i}`);
  columnData.attr("id", `input-${i}`);
  columnData.attr("type", "text");
  const agendaData = localStorage.getItem(`hour-${i}`);
  columnData.val(agendaData);

  // create the column that allows the user to save
  let columnSave = $('<i>');
  columnSave.addClass("col-sm-2");
  columnSave.addClass("far fa-save fa-2x");
  columnSave.attr("data-area", "save");
  columnSave.attr("data-hour", `${i}`);
  columnSave.attr("id", `save-${i}`);
  columnSave.attr("alt", "Save");

  setRowColor(agendaRow, i);

  agenda.append(agendaRow);
  agendaRow.append(columnTime);
  agendaRow.append(columnData);
  agendaRow.append(columnSave);
}

// $(".agenda").on("click", (event) => {
  $(".agenda").click (function(event) {
  event.preventDefault();
  console.log("something was clicked");
  // var hour = event.target.dataset.hour;
  // var value = event.target.value;
  let area = event.target.dataset.area;
  // Only do this if a save was clicked on
  if (area === "save"); {
    let hour = event.target.dataset.hour;
    let inputId = "input-" + hour;
    let value = $(inputId).val();
    console.log(`hour=${hour}\n value=${value}`);
    if (value !== "") {
      console.log("writing to local storage");
      localStorage.setItem(`hour-${hour}`, value);
      //  change the color of the save image to red
     $(`#save-${hour}`).css("color", "black");
    }
  }
})

  // function to color save button on change of input
  // $(".agenda").on("change", "input", function(event) {
$(".agenda").change (function(event) {
     event.preventDefault();  

     let hour = event.target.dataset.hour;
console.log("In the on change function");
console.log(`hour: ${hour}`);
//  change the color of the save image to red
     $(`#save-${hour}`).css("color", "red");
     console.log("Tried to change the color.");
})