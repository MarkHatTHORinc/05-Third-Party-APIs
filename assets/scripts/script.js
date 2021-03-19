var today = moment();
var dateText = today.format("dddd, MMMM Do");
var startHour = 9;  // starting hour for agenda 
var endHour = 17;   // ending hour for agenda

var currentDay = $("#currentDay");

// function to Build the agenda
function buildAgenda() {
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
    // Set the color of the row based upon hour
    setRowColor(agendaRow, i);

    agenda.append(agendaRow);
    agendaRow.append(columnTime);
    agendaRow.append(columnData);
    agendaRow.append(columnSave);
  }

  // monitor for a click of the save image
  $(".agenda").click(processSave);

  // monitor for a change so color of save image will change
  $(".agenda").change(processChange);
}

  // process agenda change so color of save image will change
  function processChange (event) {
    event.preventDefault();
    let hour = event.target.dataset.hour;
    //  change the color of the save image to red
    $(`#save-${hour}`).css("color", "red");
  }

  // process save
  function processSave(event) {
    event.preventDefault();
    let area = event.target.dataset.area;
    // Only do this if a save was clicked on
    if (area === "save"); {
      let hour = event.target.dataset.hour;
      let inputId = "#input-" + hour;
      let value = $(inputId).val();
      if (value !== "" && value !== "undefined") {
        localStorage.setItem(`hour-${hour}`, value);
        // change the color of the save image to black
        $(`#save-${hour}`).css("color", "black");
      }
    }
  }

// function to set row color
function setRowColor(agendaRow, hour) {
  let currentHour = moment().format('H');
  if (hour < currentHour) {
    agendaRow.css("background-color", "DarkCyan");
  } else if (hour == currentHour) {
    agendaRow.css("background-color", "DeepSkyBlue");
  }
}

buildAgenda();