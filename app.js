let categoryItems = document.querySelectorAll(".category-item");
let subCategoryItem = document.querySelectorAll(".sub-category-item");

// category title
let categoriesTitle = document.querySelector(".categories-title");
// subcategory title
let subCategoriesTitle = document.querySelector(".sub-categories-title");

// set limits
let currentLimit = document.querySelector(".current-limit");
let currentLimitInput = document.querySelector(".current-limit-input");
let currentLimitBtn = document.querySelector(".current-limit-btn");

let clearLimitBtn = document.querySelector(".clear-limit-btn");

let statisticsTitleMostSpentOn = document.querySelector(
  ".statistics-title-most-spent-on"
);

let clearAllDataBtn = document.querySelector(".clear-all-data-btn");

// chart titles
let categoriesChartMonthTitle = document.querySelector(
  ".categories-chart-month-title"
);
let subCategoriesChartMonthTitle = document.querySelector(
  ".sub-categories-chart-month-title"
);

let subCategoriesChartYearTitle = document.querySelector(
  ".sub-categories-chart-year-title"
);

// date arrows
let monthArrowLeft = document.querySelector(".month-arrow-left");
let monthArrowRight = document.querySelector(".month-arrow-right");

let expenditureTotal = document.querySelector(
  ".categories-chart-month-board .expenditure"
);

let statisticsTitleMostSpentIn = document.querySelector(
  ".statistics-title-most-spent-in"
);

let expenditureSubCat = document.querySelector(
  ".sub-categories-chart-month-board .expenditure"
);

let monthTitle = document.querySelector(".month-title");

// form
let inputExpensesForm = document.querySelector(".input-expenses-form");
let inputExpenses = document.querySelector(".input-expenses");
let inputExpensesBtn = document.querySelector(".input-expenses-btn");
let expensesSaveBtn = document.querySelector(".expenses-save-btn");

// categories
let foodItems = document.querySelectorAll('[data-subcategory-item="sub-food"]');

let educationItems = document.querySelectorAll(
  '[data-subcategory-item="sub-education"]'
);

let transportItems = document.querySelectorAll(
  '[data-subcategory-item="sub-transport"]'
);
let travelItems = document.querySelectorAll(
  '[data-subcategory-item="sub-travel"]'
);
let clothesItems = document.querySelectorAll(
  '[data-subcategory-item="sub-clothes"]'
);
let sportItems = document.querySelectorAll(
  '[data-subcategory-item="sub-sport"]'
);
let healthItems = document.querySelectorAll(
  '[data-subcategory-item="sub-health"]'
);

let houseItems = document.querySelectorAll(
  '[data-subcategory-item="sub-house"]'
);
let billsItems = document.querySelectorAll(
  '[data-subcategory-item="sub-bills"]'
);

let serviceItems = document.querySelectorAll(
  '[data-subcategory-item="sub-service"]'
);
let hobbiesItems = document.querySelectorAll(
  '[data-subcategory-item="sub-hobbies"]'
);

let otherItems = document.querySelectorAll(
  '[data-subcategory-item="sub-other"]'
);

let currentMonth = "";
let selectedCategory = "";
let selectedSubCategory = "";
let sumTotal = 0;

// limit
let currentLimitValue = 0;
if (localStorage.getItem("currentLimitValue") !== null) {
  let curLimitValue = window.localStorage.getItem("currentLimitValue");
  console.log(currentLimitValue);
  currentLimitValue = JSON.parse(curLimitValue);
}

currentLimit.innerHTML = "Current Limit: " + currentLimitValue + "\u20AC";

// select 1st category & 1st subcategory on loading, set titles
function setCategoryOnLoading() {
  selectedCategory = categoryItems[0].style.border = "solid 2px darkorange";
  selectedCategory = categoryItems[0].dataset.categoryItem;

  foodItems.forEach((item) => {
    item.style.display = "flex";
  });
  selectedSubCategory = subCategoryItem[0].style.border =
    "solid 2px darkorange";
  selectedSubCategory = subCategoryItem[0].dataset.subcategoryItemName;
  categoriesTitle.innerHTML = selectedCategory;
  subCategoriesTitle.innerHTML = selectedSubCategory;
  categoriesChartMonthTitle.innerHTML = "Total Expenses In " + currentMonth;
  subCategoriesChartMonthTitle.innerHTML = `Expenses On ${selectedCategory} In ${currentMonth}`;
  subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedCategory} Per Year`;
}
setCategoryOnLoading();

// set current month
(function setCurrentMonth() {
  if (currentMonth.length === 0) {
    currentMonth = getCurrentMonth();
    monthTitle.innerHTML = currentMonth;
  }
})();

function getCurrentMonth() {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentDate = new Date();
  let currentMonthNum = currentDate.getMonth();
  let currentMonth = months[currentMonthNum];
  return currentMonth;
}

monthArrowLeft.addEventListener("click", () => {
  if (currentMonth !== "January") {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let currentMonthIndex = months.indexOf(currentMonth);
    currentMonth = months[currentMonthIndex - 1];
    monthTitle.innerHTML = currentMonth;
    startApp(currentMonth);
  }
});

monthArrowRight.addEventListener("click", () => {
  if (currentMonth !== "December") {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let currentMonthIndex = months.indexOf(currentMonth);
    currentMonth = months[currentMonthIndex + 1];
    monthTitle.innerHTML = currentMonth;
    startApp(currentMonth);
  }
});

currentLimitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  currentLimitValue = currentLimitInput.value;
  currentLimit.innerHTML = "Current Limit: " + currentLimitValue + "\u20AC";
  console.log(currentLimitValue);
  window.localStorage.setItem(
    "currentLimitValue",
    JSON.stringify(currentLimitValue)
  );
  if (localStorage.getItem("currentLimitValue") !== null) {
    let currentLimitValue = window.localStorage.getItem("currentLimitValue");
    currentLimitValue = JSON.parse(currentLimitValue);
  }
  currentLimitInput.value = "";
  startApp(currentMonth);
});

clearLimitBtn.addEventListener("click", () => {
  localStorage.removeItem("currentLimitValue");
});

// CATEGORY
categoryItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    categoryItems.forEach((element) => {
      element.style.backgroundColor = "#1e1e1e";
      element.style.border = "none";
    });
    selectedCategory = e.target.dataset.categoryItem;

    categoriesTitle.innerHTML = selectedCategory;

    subCategoriesChartMonthTitle.innerHTML = `Expenses On ${selectedCategory} In ${currentMonth}`;
    e.target.style.border = "solid 2px darkorange";

    categoriesChartMonthTitle.innerHTML = "Total Expenses In " + currentMonth;

    // hide all sub items
    subCategoryItem.forEach((elem) => {
      elem.style.display = "none";
      elem.style.border = "none";
    });
    switch (selectedCategory) {
      case "food":
        selectedSubCategory = foodItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedCategory} Per Year`;
        foodItems[0].style.border = "solid 2px darkorange";
        foodItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "education":
        selectedSubCategory = educationItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedCategory} Per Year`;
        educationItems[0].style.border = "solid 2px darkorange";
        educationItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "transport":
        selectedSubCategory = transportItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedCategory} Per Year`;
        transportItems[0].style.border = "solid 2px darkorange";
        transportItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "travel":
        selectedSubCategory = travelItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedCategory} Per Year`;
        travelItems[0].style.border = "solid 2px darkorange";
        travelItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "clothes":
        selectedSubCategory = clothesItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedCategory} Per Year`;
        clothesItems[0].style.border = "solid 2px darkorange";
        clothesItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "sport":
        selectedSubCategory = sportItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedCategory} Per Year`;
        sportItems[0].style.border = "solid 2px darkorange";
        sportItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "health":
        selectedSubCategory = healthItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedCategory} Per Year`;
        healthItems[0].style.border = "solid 2px darkorange";
        healthItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "house":
        selectedSubCategory = houseItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedCategory} Per Year`;
        houseItems[0].style.border = "solid 2px darkorange";
        houseItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "bills":
        selectedSubCategory = billsItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedCategory} Per Year`;
        billsItems[0].style.border = "solid 2px darkorange";
        billsItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "service":
        selectedSubCategory = serviceItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedCategory} Per Year`;
        serviceItems[0].style.border = "solid 2px darkorange";
        serviceItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "hobbies":
        selectedSubCategory = hobbiesItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedCategory} Per Year`;
        hobbiesItems[0].style.border = "solid 2px darkorange";
        hobbiesItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "other":
        selectedSubCategory = otherItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedCategory} Per Year`;
        otherItems[0].style.border = "solid 2px darkorange";
        otherItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
    }
    startApp(currentMonth);
  });
});

// SUB CATEGORY
subCategoryItem.forEach((item) => {
  item.addEventListener("click", (e) => {
    subCategoryItem.forEach((element) => {
      element.style.backgroundColor = "#1e1e1e";
      element.style.border = "none";
    });
    e.target.style.border = "solid 2px darkorange";
    selectedSubCategory = e.target.dataset.subcategoryItemName;
    subCategoriesTitle.innerHTML = selectedSubCategory;
    subCategoriesChartYearTitle.innerHTML = `Expenses on ${selectedCategory} Per Year`;
  });
});

let dataSchema = {
  January: {
    food: {
      alcohol: 0,
      coffee: 0,
      burger: 0,
      meat: 0,
      vegetables: 0,
      fish: 0,
      sweets: 0,
    },
    education: { university: 0, books: 0, courses: 0 },
    transport: { motorcycle: 0, bus: 0, taxi: 0, car: 0 },
    travel: { plane: 0, hotel: 0 },
    clothes: { outerwear: 0, accessories: 0 },
    sport: { gym: 0 },
    health: { dental: 0, spa: 0, pills: 0 },
    house: { rent: 0, mortgage: 0, furniture: 0, electronics: 0 },
    bills: {
      electricity: 0,
      gas: 0,
      water: 0,
      trash: 0,
      wifi: 0,
      phone: 0,
      heating: 0,
    },
    service: { repair: 0 },
    hobbies: {
      volleyball: 0,
      snowboarding: 0,
      swimming: 0,
      hiking: 0,
      skating: 0,
      biking: 0,
    },
    other: { gift: 0, pets: 0, cash: 0 },
  },
  February: {
    food: {
      alcohol: 0,
      coffee: 0,
      burger: 0,
      meat: 0,
      vegetables: 0,
      fish: 0,
      sweets: 0,
    },
    education: { university: 0, books: 0, courses: 0 },
    transport: { motorcycle: 0, bus: 0, taxi: 0, car: 0 },
    travel: { plane: 0, hotel: 0 },
    clothes: { outerwear: 0, accessories: 0 },
    sport: { gym: 0 },
    health: { dental: 0, spa: 0, pills: 0 },
    house: { rent: 0, mortgage: 0, furniture: 0, electronics: 0 },
    bills: {
      electricity: 0,
      gas: 0,
      water: 0,
      trash: 0,
      wifi: 0,
      phone: 0,
      heating: 0,
    },
    service: { repair: 0 },
    hobbies: {
      volleyball: 0,
      snowboarding: 0,
      swimming: 0,
      hiking: 0,
      skating: 0,
      biking: 0,
    },
    other: { gift: 0, pets: 0, cash: 0 },
  },
  March: {
    food: {
      alcohol: 0,
      coffee: 0,
      burger: 0,
      meat: 0,
      vegetables: 0,
      fish: 0,
      sweets: 0,
    },
    education: { university: 0, books: 0, courses: 0 },
    transport: { motorcycle: 0, bus: 0, taxi: 0, car: 0 },
    travel: { plane: 0, hotel: 0 },
    clothes: { outerwear: 0, accessories: 0 },
    sport: { gym: 0 },
    health: { dental: 0, spa: 0, pills: 0 },
    house: { rent: 0, mortgage: 0, furniture: 0, electronics: 0 },
    bills: {
      electricity: 0,
      gas: 0,
      water: 0,
      trash: 0,
      wifi: 0,
      phone: 0,
      heating: 0,
    },
    service: { repair: 0 },
    hobbies: {
      volleyball: 0,
      snowboarding: 0,
      swimming: 0,
      hiking: 0,
      skating: 0,
      biking: 0,
    },
    other: { gift: 0, pets: 0, cash: 0 },
  },
  April: {
    food: {
      alcohol: 0,
      coffee: 0,
      burger: 0,
      meat: 0,
      vegetables: 0,
      fish: 0,
      sweets: 0,
    },
    education: { university: 0, books: 0, courses: 0 },
    transport: { motorcycle: 0, bus: 0, taxi: 0, car: 0 },
    travel: { plane: 0, hotel: 0 },
    clothes: { outerwear: 0, accessories: 0 },
    sport: { gym: 0 },
    health: { dental: 0, spa: 0, pills: 0 },
    house: { rent: 0, mortgage: 0, furniture: 0, electronics: 0 },
    bills: {
      electricity: 0,
      gas: 0,
      water: 0,
      trash: 0,
      wifi: 0,
      phone: 0,
      heating: 0,
    },
    service: { repair: 0 },
    hobbies: {
      volleyball: 0,
      snowboarding: 0,
      swimming: 0,
      hiking: 0,
      skating: 0,
      biking: 0,
    },
    other: { gift: 0, pets: 0, cash: 0 },
  },
  May: {
    food: {
      alcohol: 0,
      coffee: 0,
      burger: 0,
      meat: 0,
      vegetables: 0,
      fish: 0,
      sweets: 0,
    },
    education: { university: 0, books: 0, courses: 0 },
    transport: { motorcycle: 0, bus: 0, taxi: 0, car: 0 },
    travel: { plane: 0, hotel: 0 },
    clothes: { outerwear: 0, accessories: 0 },
    sport: { gym: 0 },
    health: { dental: 0, spa: 0, pills: 0 },
    house: { rent: 0, mortgage: 0, furniture: 0, electronics: 0 },
    bills: {
      electricity: 0,
      gas: 0,
      water: 0,
      trash: 0,
      wifi: 0,
      phone: 0,
      heating: 0,
    },
    service: { repair: 0 },
    hobbies: {
      volleyball: 0,
      snowboarding: 0,
      swimming: 0,
      hiking: 0,
      skating: 0,
      biking: 0,
    },
    other: { gift: 0, pets: 0, cash: 0 },
  },
  June: {
    food: {
      alcohol: 0,
      coffee: 0,
      burger: 0,
      meat: 0,
      vegetables: 0,
      fish: 0,
      sweets: 0,
    },
    education: { university: 0, books: 0, courses: 0 },
    transport: { motorcycle: 0, bus: 0, taxi: 0, car: 0 },
    travel: { plane: 0, hotel: 0 },
    clothes: { outerwear: 0, accessories: 0 },
    sport: { gym: 0 },
    health: { dental: 0, spa: 0, pills: 0 },
    house: { rent: 0, mortgage: 0, furniture: 0, electronics: 0 },
    bills: {
      electricity: 0,
      gas: 0,
      water: 0,
      trash: 0,
      wifi: 0,
      phone: 0,
      heating: 0,
    },
    service: { repair: 0 },
    hobbies: {
      volleyball: 0,
      snowboarding: 0,
      swimming: 0,
      hiking: 0,
      skating: 0,
      biking: 0,
    },
    other: { gift: 0, pets: 0, cash: 0 },
  },
  July: {
    food: {
      alcohol: 0,
      coffee: 0,
      burger: 0,
      meat: 0,
      vegetables: 0,
      fish: 0,
      sweets: 0,
    },
    education: { university: 0, books: 0, courses: 0 },
    transport: { motorcycle: 0, bus: 0, taxi: 0, car: 0 },
    travel: { plane: 0, hotel: 0 },
    clothes: { outerwear: 0, accessories: 0 },
    sport: { gym: 0 },
    health: { dental: 0, spa: 0, pills: 0 },
    house: { rent: 0, mortgage: 0, furniture: 0, electronics: 0 },
    bills: {
      electricity: 0,
      gas: 0,
      water: 0,
      trash: 0,
      wifi: 0,
      phone: 0,
      heating: 0,
    },
    service: { repair: 0 },
    hobbies: {
      volleyball: 0,
      snowboarding: 0,
      swimming: 0,
      hiking: 0,
      skating: 0,
      biking: 0,
    },
    other: { gift: 0, pets: 0, cash: 0 },
  },
  August: {
    food: {
      alcohol: 0,
      coffee: 0,
      burger: 0,
      meat: 0,
      vegetables: 0,
      fish: 0,
      sweets: 0,
    },
    education: { university: 0, books: 0, courses: 0 },
    transport: { motorcycle: 0, bus: 0, taxi: 0, car: 0 },
    travel: { plane: 0, hotel: 0 },
    clothes: { outerwear: 0, accessories: 0 },
    sport: { gym: 0 },
    health: { dental: 0, spa: 0, pills: 0 },
    house: { rent: 0, mortgage: 0, furniture: 0, electronics: 0 },
    bills: {
      electricity: 0,
      gas: 0,
      water: 0,
      trash: 0,
      wifi: 0,
      phone: 0,
      heating: 0,
    },
    service: { repair: 0 },
    hobbies: {
      volleyball: 0,
      snowboarding: 0,
      swimming: 0,
      hiking: 0,
      skating: 0,
      biking: 0,
    },
    other: { gift: 0, pets: 0, cash: 0 },
  },
  September: {
    food: {
      alcohol: 0,
      coffee: 0,
      burger: 0,
      meat: 0,
      vegetables: 0,
      fish: 0,
      sweets: 0,
    },
    education: { university: 0, books: 0, courses: 0 },
    transport: { motorcycle: 0, bus: 0, taxi: 0, car: 0 },
    travel: { plane: 0, hotel: 0 },
    clothes: { outerwear: 0, accessories: 0 },
    sport: { gym: 0 },
    health: { dental: 0, spa: 0, pills: 0 },
    house: { rent: 0, mortgage: 0, furniture: 0, electronics: 0 },
    bills: {
      electricity: 0,
      gas: 0,
      water: 0,
      trash: 0,
      wifi: 0,
      phone: 0,
      heating: 0,
    },
    service: { repair: 0 },
    hobbies: {
      volleyball: 0,
      snowboarding: 0,
      swimming: 0,
      hiking: 0,
      skating: 0,
      biking: 0,
    },
    other: { gift: 0, pets: 0, cash: 0 },
  },
  October: {
    food: {
      alcohol: 0,
      coffee: 0,
      burger: 0,
      meat: 0,
      vegetables: 0,
      fish: 0,
      sweets: 0,
    },
    education: { university: 0, books: 0, courses: 0 },
    transport: { motorcycle: 0, bus: 0, taxi: 0, car: 0 },
    travel: { plane: 0, hotel: 0 },
    clothes: { outerwear: 0, accessories: 0 },
    sport: { gym: 0 },
    health: { dental: 0, spa: 0, pills: 0 },
    house: { rent: 0, mortgage: 0, furniture: 0, electronics: 0 },
    bills: {
      electricity: 0,
      gas: 0,
      water: 0,
      trash: 0,
      wifi: 0,
      phone: 0,
      heating: 0,
    },
    service: { repair: 0 },
    hobbies: {
      volleyball: 0,
      snowboarding: 0,
      swimming: 0,
      hiking: 0,
      skating: 0,
      biking: 0,
    },
    other: { gift: 0, pets: 0, cash: 0 },
  },
  November: {
    food: {
      alcohol: 0,
      coffee: 0,
      burger: 0,
      meat: 0,
      vegetables: 0,
      fish: 0,
      sweets: 0,
    },
    education: { university: 0, books: 0, courses: 0 },
    transport: { motorcycle: 0, bus: 0, taxi: 0, car: 0 },
    travel: { plane: 0, hotel: 0 },
    clothes: { outerwear: 0, accessories: 0 },
    sport: { gym: 0 },
    health: { dental: 0, spa: 0, pills: 0 },
    house: { rent: 0, mortgage: 0, furniture: 0, electronics: 0 },
    bills: {
      electricity: 0,
      gas: 0,
      water: 0,
      trash: 0,
      wifi: 0,
      phone: 0,
      heating: 0,
    },
    service: { repair: 0 },
    hobbies: {
      volleyball: 0,
      snowboarding: 0,
      swimming: 0,
      hiking: 0,
      skating: 0,
      biking: 0,
    },
    other: { gift: 0, pets: 0, cash: 0 },
  },
  December: {
    food: {
      alcohol: 0,
      coffee: 0,
      burger: 0,
      meat: 0,
      vegetables: 0,
      fish: 0,
      sweets: 0,
    },
    education: { university: 0, books: 0, courses: 0 },
    transport: { motorcycle: 0, bus: 0, taxi: 0, car: 0 },
    travel: { plane: 0, hotel: 0 },
    clothes: { outerwear: 0, accessories: 0 },
    sport: { gym: 0 },
    health: { dental: 0, spa: 0, pills: 0 },
    house: { rent: 0, mortgage: 0, furniture: 0, electronics: 0 },
    bills: {
      electricity: 0,
      gas: 0,
      water: 0,
      trash: 0,
      wifi: 0,
      phone: 0,
      heating: 0,
    },
    service: { repair: 0 },
    hobbies: {
      volleyball: 0,
      snowboarding: 0,
      swimming: 0,
      hiking: 0,
      skating: 0,
      biking: 0,
    },
    other: { gift: 0, pets: 0, cash: 0 },
  },
};

let catMonthChart;
let labelValues1;
let chartData1;
let configuration1;

let catYearChart;
let labelValues2;
let chartData2;
let configuration2;

let subCatMonthChart;
let labelValues3;
let chartData3;
let configuration3;

let subCatYearChart;
let labelValues4;
let chartData4;
let configuration4;

// let noExpensesLabel;
// let noExpensesValue;
let backgroundColorChart3 = [
  "#003f5c",
  "#2f4b7c",
  "#665191",
  "#a05195",
  "#d45087",
  "#f95d6a",
  "#ff7c43",
  "#ffa600",
];

let backgroundColorChart1 = [
  "#003f5c",
  "#2f4b7c",
  "#665191",
  "#a05195",
  "#d45087",
  "#f95d6a",
  "#ff7c43",
  "#ffa600",
];

// input values
inputExpensesBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (selectedCategory) {
    let tempCat = dataSchema[currentMonth][selectedCategory];
    tempCat[selectedSubCategory] += Number(inputExpenses.value);

    window.localStorage.setItem("dataSchema", JSON.stringify(dataSchema));
    inputExpenses.value = "";
  }
  startApp(currentMonth);
});

function startApp(currentMonth) {
  // CATEGORY EXPENSES PER MONTH
  categoriesChartMonthTitle.innerHTML = "Total Expenses In " + currentMonth;
  subCategoriesChartMonthTitle.innerHTML = `Expenses On ${selectedCategory} In ${currentMonth}`;

  if (localStorage.getItem("dataSchema") !== null) {
    let mydataSchema = window.localStorage.getItem("dataSchema");
    dataSchema = JSON.parse(mydataSchema);
  }

  labelValues1 = getChartValuesFirst(dataSchema[currentMonth]);

  chartData1 = {
    labels: labelValues1[0],
    datasets: [
      {
        label: "",
        data: labelValues1[1],
        backgroundColor: backgroundColorChart1,
        borderColor: ["#252526"],
        borderWidth: 5,
      },
    ],
  };

  configuration1 = {
    type: "doughnut",
    data: chartData1,
    options: {
      scales: {
        ticks: {
          display: false,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };

  // CATEGORY EXPENSES PER YEAR

  labelValues2 = getChartValuesSecond(dataSchema, currentLimitValue);
  chartData2 = {
    labels: labelValues2[0],
    datasets: [
      {
        label: "",
        data: labelValues2[1],
        backgroundColor: ["#003f5c"],
        borderColor: ["#252526"],
        borderWidth: 1,
      },
      {
        label: "",
        data: labelValues2[2],
        backgroundColor: ["#d45087"],
        borderColor: ["#252526"],
        borderWidth: 1,
      },
    ],
  };

  configuration2 = {
    type: "bar",
    data: chartData2,
    options: {
      scales: {
        x: { stacked: true },
        y: {
          beginAtZero: true,
          stacked: true,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";

              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "EUR",
                }).format(context.parsed.y);
              }
              return label;
            },
          },
        },
      },
    },
  };

  // SUBCATEGORY EXPENSES PER MONTH
  labelValues3 = getChartValuesThird(
    dataSchema[currentMonth][selectedCategory]
  );

  chartData3 = {
    labels: labelValues3[0],
    datasets: [
      {
        label: "",
        data: labelValues3[1],
        backgroundColor: backgroundColorChart3,
        borderColor: ["#252526"],
        borderWidth: 5,
      },
    ],
  };

  configuration3 = {
    type: "doughnut",
    data: chartData3,
    options: {
      scales: {
        ticks: {
          display: false,
        },
      },
      plugins: {
        legend: {
          display: false,
          position: "top",
        },
      },
    },
  };

  // SUBCATEGORY EXPENSES PER YEAR
  labelValues4 = getChartValuesFourth(selectedCategory, dataSchema);

  chartData4 = {
    labels: labelValues4[0],
    datasets: [
      {
        label: "",
        data: labelValues4[1],
        backgroundColor: ["#003f5c"],
        borderColor: ["#252526"],
        borderWidth: 1,
      },
    ],
  };

  configuration4 = {
    type: "bar",
    data: chartData4,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || "";

              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "EUR",
                }).format(context.parsed.y);
              }
              return label;
            },
          },
        },
      },
    },
  };

  // catMonthChart
  renderChartFirst();
  // catYearChart
  renderChartSecond();
  // subCatMonthChart
  renderChartThird();
  // subCatYearChart
  renderChartFourth();
}
startApp(currentMonth);

// get labels, values from object, return as array
// first chart
function getChartValuesFirst(data) {
  let labelsValues = [];
  let dataValues = [];
  for (const [key1, value1] of Object.entries(data)) {
    labelsValues.push(key1);
    let categoryExp = 0;
    for (const [key2, value2] of Object.entries(value1)) {
      categoryExp += Number(value2);
    }
    dataValues.push(categoryExp);
  }

  let sum = dataValues.reduce((partialSum, a) => partialSum + a, 0);
  if (sum === 0) {
    labelsValues = ["No Expenses"];
    // dataValues = [1];
    backgroundColorChart1 = ["rgba(55,55,55,0.3)"];
  } else {
    backgroundColorChart1 = [
      "#003f5c",
      "#2f4b7c",
      "#665191",
      "#a05195",
      "#d45087",
      "#f95d6a",
      "#ff7c43",
      "#ffa600",
    ];
  }
  return [labelsValues, dataValues];
}

// expenses on category in month (second chart)
function getChartValuesSecond(data, limit) {
  let labelsValues = [];
  let dataValues = [];
  let limitValues = [];
  let maxValue = 0;
  let mostMoneySpentOn = "";
  let mostMoneySpentOnValue = 0;
  let mostMoneySpentIn = "";

  // month & category {}
  for (const [key1, value1] of Object.entries(data)) {
    labelsValues.push(key1);

    // subcategory
    let catTotal = 0;
    for (const [key2, value2] of Object.entries(value1)) {
      let subCatTotal = 0;

      for (const [key3, value3] of Object.entries(value2)) {
        subCatTotal += Number(value3);
      }

      catTotal += Number(subCatTotal);

      if (mostMoneySpentOnValue < subCatTotal) {
        mostMoneySpentOnValue = subCatTotal;
        mostMoneySpentOn = key2;
      }
      // find category with most expenses
      if (catTotal > maxValue) {
        maxValue = catTotal;
        mostMoneySpentIn = key1;
      }
    }
    if (key1 === currentMonth) {
      console.log(key1);
      console.log(catTotal);
      expenditureTotal.innerHTML = "-" + catTotal + "\u20AC";
    }

    // find month with most expenses

    if (catTotal <= limit) {
      dataValues.push(catTotal);
      limitValues.push(0);
    } else if (catTotal > limit) {
      dataValues.push(limit);
      limitValues.push(catTotal - limit);
    }
  }

  statisticsTitleMostSpentOn.innerHTML =
    mostMoneySpentOn + " - " + mostMoneySpentOnValue + "\u20AC";

  statisticsTitleMostSpentIn.innerHTML =
    mostMoneySpentIn + " - " + maxValue + "\u20AC";

  return [labelsValues, dataValues, limitValues];
}

// expenses on category in month (third chart)
function getChartValuesThird(data) {
  let labelsValues = [];
  let dataValues = [];
  for (const [key, value] of Object.entries(data)) {
    labelsValues.push(key);
    dataValues.push(Number(value));
  }
  // if no expenses occurred in current month then create placeholder grey chart, else use normal color scheme
  let sum = dataValues.reduce((partialSum, a) => partialSum + a, 0);
  if (sum === 0) {
    labelsValues = ["No Expenses"];
    dataValues = [1];
    backgroundColorChart3 = ["rgba(55,55,55,0.3)"];
  } else {
    backgroundColorChart3 = [
      "#003f5c",
      "#2f4b7c",
      "#665191",
      "#a05195",
      "#d45087",
      "#f95d6a",
      "#ff7c43",
      "#ffa600",
    ];
  }

  return [labelsValues, dataValues];
}

// expenses on category per year (fourth chart)
function getChartValuesFourth(selectedCat, data) {
  let labelsValues = [];
  let dataValues = [];

  for (const [key1, value1] of Object.entries(data)) {
    labelsValues.push(key1);

    let subCatTotal = 0;

    for (const [key2, value2] of Object.entries(value1[selectedCat])) {
      subCatTotal += Number(value2);
    }
    dataValues.push(subCatTotal);
  }
  let sum = dataValues.reduce((partialSum, a) => partialSum + a, 0);
  expenditureSubCat.innerHTML = "-" + sum + "\u20AC";
  // let sum = dataValues.reduce((a, b) => a + b, 0);

  return [labelsValues, dataValues];
}

// rerender charts
function renderChartFirst() {
  if (catMonthChart !== undefined) {
    catMonthChart.destroy();
    catMonthChart = new Chart(
      document.getElementById("catMonthChart"),
      configuration1
    );
  } else {
    catMonthChart = new Chart(
      document.getElementById("catMonthChart"),
      configuration1
    );
  }
}

function renderChartSecond() {
  if (catYearChart !== undefined) {
    catYearChart.destroy();
    catYearChart = new Chart(
      document.getElementById("catYearChart"),
      configuration2
    );
  } else {
    catYearChart = new Chart(
      document.getElementById("catYearChart"),
      configuration2
    );
  }
}

function renderChartThird() {
  if (subCatMonthChart !== undefined) {
    subCatMonthChart.destroy();
    subCatMonthChart = new Chart(
      document.getElementById("subCatMonthChart"),
      configuration3
    );
  } else {
    subCatMonthChart = new Chart(
      document.getElementById("subCatMonthChart"),
      configuration3
    );
  }
}

function renderChartFourth() {
  if (subCatYearChart !== undefined) {
    subCatYearChart.destroy();
    subCatYearChart = new Chart(
      document.getElementById("subCatYearChart"),
      configuration4
    );
  } else {
    subCatYearChart = new Chart(
      document.getElementById("subCatYearChart"),
      configuration4
    );
  }
}

// render charts after window resize
function resizedwindow() {
  startApp(currentMonth);
  console.log("Window resized!");
}
let doit;
window.onresize = () => {
  clearTimeout(doit);
  doit = setTimeout(resizedwindow, 300);
};

// ask confirmation to delete all data
clearAllDataBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to erase all data?")) {
    localStorage.removeItem("dataSchema");
  } else {
    return;
  }
});

// outputfile
// const link = document.querySelector(".mylink");

// let reportYear = 2022;
// let text = dataSchema;

// link.setAttribute(
//   "href",
//   "data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(text))
// );
// link.setAttribute("download", `report_${reportYear}.txt`);
