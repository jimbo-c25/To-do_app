const weekDays = {
    0: "sunday",
    1: "monday",
    2: "tuesday",
    3: "wednesday",
    4: "thursday",
    5: "friday",
    6: "saturday"
};

findCurrentDay();

function findCurrentDay() {
    const date = new Date();
    const currentDay = date.getDay();
    console.log(currentDay);
    return;
};

const currentDaySelected = document.getElementById(`${weekDays[findCurrentDay()]}`);
//currentDaySelected.classList.toggle("selected");
console.log(currentDaySelected);