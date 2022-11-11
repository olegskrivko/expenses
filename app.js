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
let incomeTotal = document.querySelector(
  ".categories-chart-month-board .income"
);

let expenditureSubCat = document.querySelector(
  ".sub-categories-chart-month-board .expenditure"
);
let incomeSubCat = document.querySelector(
  ".sub-categories-chart-month-board .income"
);

let monthTitle = document.querySelector(".month-title");

// form
let inputExpensesForm = document.querySelector(".input-expenses-form");
let inputExpenses = document.querySelector(".input-expenses");
let inputExpensesBtn = document.querySelector(".input-expenses-btn");
let expensesSaveBtn = document.querySelector(".expenses-save-btn");

// better to create div in js and inject to html, fill data attribute, attach icons. more flexible
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
let giftsItems = document.querySelectorAll(
  '[data-subcategory-item="sub-gifts"]'
);
let houseItems = document.querySelectorAll(
  '[data-subcategory-item="sub-house"]'
);
let billsItems = document.querySelectorAll(
  '[data-subcategory-item="sub-bills"]'
);
let furnitureItems = document.querySelectorAll(
  '[data-subcategory-item="sub-furniture"]'
);
let devicesItems = document.querySelectorAll(
  '[data-subcategory-item="sub-devices"]'
);
let petsItems = document.querySelectorAll('[data-subcategory-item="sub-pets"]');
let serviceItems = document.querySelectorAll(
  '[data-subcategory-item="sub-service"]'
);
let hobbiesItems = document.querySelectorAll(
  '[data-subcategory-item="sub-hobbies"]'
);
let workItems = document.querySelectorAll('[data-subcategory-item="sub-work"]');
let otherItems = document.querySelectorAll(
  '[data-subcategory-item="sub-other"]'
);

// let subuniversity = document.querySelector(
//   '[data-subcategory-item-name="university"]'
// );
// let subbooks = document.querySelector('[data-subcategory-item-name="books"]');
// let subcourses = document.querySelector(
//   '[data-subcategory-item-name="courses"]'
// );
let currentMonth = "";
let selectedCategory = "";
let selectedSubCategory = "";

let currentLimitValue = 0;
currentLimit.innerHTML = currentLimitValue;
let overlimit = [];

currentLimitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  currentLimitValue = currentLimitInput.value;
  currentLimit.innerHTML = currentLimitValue;
});

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
  subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedSubCategory} Per Year`;
}
setCategoryOnLoading();

expenditureTotal.innerHTML = "-" + 340 + " \u20AC";
incomeTotal.innerHTML = 2100 + " \u20AC";

expenditureSubCat.innerHTML = "-" + 32 + " \u20AC";
incomeSubCat.innerHTML = 290 + " \u20AC";

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

// init category and subcategory

// set inital category
// if (selectedCategory.length === 0) {
//   categoryItems[0].style.border = "solid 2px darkorange";
//   // foodItems[0].style.border = "solid 2px darkorange";
//   foodItems.forEach((element) => {
//     element.style.display = "flex";
//   });
// }

// subCategoryItem.forEach((item) => {
//   console.log(item);
//   item.style.display = "flex";
// });

// CATEGORY
categoryItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    categoryItems.forEach((element) => {
      element.style.backgroundColor = "#1e1e1e";
      element.style.border = "none";
      // inputExpensesForm.style.display = "none";
    });
    selectedCategory = e.target.dataset.categoryItem;

    // subCategoriesTitle.innerHTML =
    //   subCategoryItem[0].dataset.subcategoryItemName;
    // selectedSubCategory = (subCategoryItem[0].style.border =
    //   "solid 2px darkorange");

    categoriesTitle.innerHTML = selectedCategory;

    subCategoriesChartMonthTitle.innerHTML = `Expenses On ${selectedCategory} In ${currentMonth}`;
    e.target.style.border = "solid 2px darkorange";

    categoriesChartMonthTitle.innerHTML = "Total Expenses In " + currentMonth;

    // hide all sub items
    subCategoryItem.forEach((elem) => {
      elem.style.display = "none";
    });
    switch (selectedCategory) {
      case "food":
        selectedSubCategory = foodItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedSubCategory} Per Year`;
        foodItems[0].style.border = "solid 2px darkorange";
        foodItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "education":
        selectedSubCategory = educationItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedSubCategory} Per Year`;
        educationItems[0].style.border = "solid 2px darkorange";
        educationItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "transport":
        selectedSubCategory = transportItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        console.log(selectedSubCategory);
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedSubCategory} Per Year`;
        transportItems[0].style.border = "solid 2px darkorange";
        transportItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "travel":
        selectedSubCategory = travelItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedSubCategory} Per Year`;
        travelItems[0].style.border = "solid 2px darkorange";
        travelItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "clothes":
        selectedSubCategory = clothesItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedSubCategory} Per Year`;
        clothesItems[0].style.border = "solid 2px darkorange";
        clothesItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "sport":
        selectedSubCategory = sportItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedSubCategory} Per Year`;
        sportItems[0].style.border = "solid 2px darkorange";
        sportItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "health":
        selectedSubCategory = healthItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedSubCategory} Per Year`;
        healthItems[0].style.border = "solid 2px darkorange";
        healthItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "gifts":
        selectedSubCategory = giftsItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedSubCategory} Per Year`;
        giftsItems[0].style.border = "solid 2px darkorange";
        giftsItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "house":
        selectedSubCategory = houseItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedSubCategory} Per Year`;
        houseItems[0].style.border = "solid 2px darkorange";
        houseItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "bills":
        selectedSubCategory = billsItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedSubCategory} Per Year`;
        billsItems[0].style.border = "solid 2px darkorange";
        billsItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "furniture":
        selectedSubCategory = furnitureItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedSubCategory} Per Year`;
        furnitureItems[0].style.border = "solid 2px darkorange";
        furnitureItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "devices":
        selectedSubCategory = devicesItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedSubCategory} Per Year`;
        devicesItems[0].style.border = "solid 2px darkorange";
        devicesItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "pets":
        selectedSubCategory = petsItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedSubCategory} Per Year`;
        petsItems[0].style.border = "solid 2px darkorange";
        petsItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "service":
        selectedSubCategory = serviceItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedSubCategory} Per Year`;
        serviceItems[0].style.border = "solid 2px darkorange";
        serviceItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "hobbies":
        selectedSubCategory = hobbiesItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedSubCategory} Per Year`;
        hobbiesItems[0].style.border = "solid 2px darkorange";
        hobbiesItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "work":
        selectedSubCategory = workItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedSubCategory} Per Year`;
        workItems[0].style.border = "solid 2px darkorange";
        workItems.forEach((item) => {
          item.style.display = "flex";
        });
        break;
      case "other":
        selectedSubCategory = otherItems[0].dataset.subcategoryItemName;
        subCategoriesTitle.innerHTML = selectedSubCategory;
        subCategoriesChartYearTitle.innerHTML = `Expenses On ${selectedSubCategory} Per Year`;
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
      // inputExpensesForm.style.display = "flex";
    });
    e.target.style.border = "solid 2px darkorange";
    // console.log(e.target.dataset.subcategoryItemName);
    selectedSubCategory = e.target.dataset.subcategoryItemName;
    subCategoriesTitle.innerHTML = selectedSubCategory;
    subCategoriesChartYearTitle.innerHTML = `Expenses on ${selectedSubCategory} Per Year`;
  });
});

let dataSchema = {
  January: {
    food: { alcohol: 0, coffee: 0, burger: 0 },
    education: { university: 20, books: 30, courses: 0 },
    transport: { bus: 0, car: 0 },
    travel: { plane: 0, car: 0 },
    clothes: { socks: 0, "t-shirts": 0, mittens: 0 },
    sport: { equipment: 0, gym: 0 },
    health: { tooth: 0, syringe: 0, virus: 0, bacterium: 0, bone: 0, pills: 0 },
    gifts: { gifts: 0, cash: 0 },
    house: { rent: 0, mortgage: 0 },
    bills: {
      electricity: 0,
      gas: 0,
      water: 0,
      trash: 0,
      wifi: 0,
      phone: 0,
    },
    furniture: { chair: 0, bed: 0 },
    pets: { cat: 0, dog: 0 },
    service: { wrench: 0 },
    hobbies: {
      volleyball: 0,
      snowboarding: 0,
      swimming: 0,
      hiking: 0,
      skating: 0,
      biking: 0,
    },
  },
  February: {
    food: { alcohol: 0, coffee: 0, burger: 0 },
    education: { university: 20, books: 0, courses: 0 },
    transport: { bus: 0, car: 0 },
    travel: { plane: 0, car: 0 },
    clothes: { socks: 0, "t-shirts": 0, mittens: 0 },
    sport: { equipment: 0, gym: 0 },
    health: { tooth: 0, syringe: 0, virus: 0, bacterium: 0, bone: 0, pills: 0 },
    gifts: { gifts: 0, cash: 0 },
    house: { rent: 50, mortgage: 20 },
    bills: {
      electricity: 0,
      gas: 0,
      water: 0,
      trash: 0,
      wifi: 0,
      phone: 0,
    },
    furniture: { chair: 0, bed: 0 },
    pets: { cat: 0, dog: 0 },
    service: { wrench: 0 },
    hobbies: {
      volleyball: 0,
      snowboarding: 0,
      swimming: 0,
      hiking: 0,
      skating: 0,
      biking: 0,
    },
  },
  March: {
    food: { alcohol: 5, coffee: 0, burger: 0 },
    education: { university: 0, books: 0, courses: 0 },
    transport: { bus: 0, car: 0 },
    travel: { plane: 0, car: 0 },
    clothes: { socks: 0, "t-shirts": 0, mittens: 0 },
    sport: { equipment: 0, gym: 0 },
    health: { tooth: 0, syringe: 0, virus: 0, bacterium: 0, bone: 0, pills: 0 },
    gifts: { gifts: 0, cash: 0 },
    house: { rent: 0, mortgage: 0 },
    bills: {
      electricity: 0,
      gas: 0,
      water: 0,
      trash: 0,
      wifi: 0,
      phone: 0,
    },
    furniture: { chair: 0, bed: 0 },
    pets: { cat: 0, dog: 0 },
    service: { wrench: 0 },
    hobbies: {
      volleyball: 0,
      snowboarding: 0,
      swimming: 0,
      hiking: 0,
      skating: 0,
      biking: 0,
    },
  },
  April: {
    food: { alcohol: 0, coffee: 0, burger: 80 },
    education: { university: 0, books: 0, courses: 0 },
    transport: { bus: 0, car: 0 },
    travel: { plane: 0, car: 0 },
    clothes: { socks: 0, "t-shirts": 0, mittens: 0 },
    sport: { equipment: 0, gym: 0 },
    health: { tooth: 0, syringe: 0, virus: 0, bacterium: 0, bone: 0, pills: 0 },
    gifts: { gifts: 0, cash: 0 },
    house: { rent: 0, mortgage: 0 },
    bills: {
      electricity: 0,
      gas: 0,
      water: 0,
      trash: 0,
      wifi: 0,
      phone: 0,
    },
    furniture: { chair: 0, bed: 0 },
    pets: { cat: 0, dog: 0 },
    service: { wrench: 0 },
    hobbies: {
      volleyball: 0,
      snowboarding: 0,
      swimming: 0,
      hiking: 0,
      skating: 0,
      biking: 0,
    },
  },
  May: {
    food: { alcohol: 0, coffee: 0, burger: 0 },
    education: { university: 0, books: 20, courses: 0 },
    transport: { bus: 0, car: 0 },
    travel: { plane: 0, car: 0 },
    clothes: { socks: 0, "t-shirts": 0, mittens: 0 },
    sport: { equipment: 0, gym: 0 },
    health: { tooth: 0, syringe: 0, virus: 0, bacterium: 0, bone: 0, pills: 0 },
    gifts: { gifts: 0, cash: 0 },
    house: { rent: 0, mortgage: 0 },
    bills: {
      electricity: 0,
      gas: 0,
      water: 0,
      trash: 0,
      wifi: 0,
      phone: 0,
    },
    furniture: { chair: 0, bed: 0 },
    pets: { cat: 0, dog: 0 },
    service: { wrench: 0 },
    hobbies: {
      volleyball: 0,
      snowboarding: 0,
      swimming: 0,
      hiking: 0,
      skating: 0,
      biking: 0,
    },
  },
  June: {
    food: { alcohol: 15, coffee: 0, burger: 0 },
    education: { university: 0, books: 0, courses: 0 },
    transport: { bus: 0, car: 0 },
    travel: { plane: 0, car: 0 },
    clothes: { socks: 0, "t-shirts": 0, mittens: 0 },
    sport: { equipment: 0, gym: 0 },
    health: { tooth: 0, syringe: 0, virus: 0, bacterium: 0, bone: 0, pills: 0 },
    gifts: { gifts: 0, cash: 0 },
    house: { rent: 0, mortgage: 0 },
    bills: {
      electricity: 0,
      gas: 0,
      water: 0,
      trash: 0,
      wifi: 0,
      phone: 0,
    },
    furniture: { chair: 0, bed: 0 },
    pets: { cat: 0, dog: 0 },
    service: { wrench: 0 },
    hobbies: {
      volleyball: 0,
      snowboarding: 0,
      swimming: 0,
      hiking: 0,
      skating: 0,
      biking: 0,
    },
  },
  July: {
    food: { alcohol: 0, coffee: 0, burger: 0 },
    education: { university: 0, books: 0, courses: 0 },
    transport: { bus: 0, car: 0 },
    travel: { plane: 0, car: 0 },
    clothes: { socks: 0, "t-shirts": 0, mittens: 0 },
    sport: { equipment: 0, gym: 0 },
    health: { tooth: 0, syringe: 0, virus: 0, bacterium: 0, bone: 0, pills: 0 },
    gifts: { gifts: 34, cash: 0 },
    house: { rent: 0, mortgage: 0 },
    bills: {
      electricity: 0,
      gas: 0,
      water: 0,
      trash: 0,
      wifi: 0,
      phone: 0,
    },
    furniture: { chair: 0, bed: 0 },
    pets: { cat: 0, dog: 0 },
    service: { wrench: 0 },
    hobbies: {
      volleyball: 0,
      snowboarding: 0,
      swimming: 0,
      hiking: 0,
      skating: 0,
      biking: 0,
    },
  },
  August: {
    food: { alcohol: 0, coffee: 0, burger: 0 },
    education: { university: 0, books: 0, courses: 20 },
    transport: { bus: 0, car: 0 },
    travel: { plane: 0, car: 0 },
    clothes: { socks: 0, "t-shirts": 0, mittens: 0 },
    sport: { equipment: 0, gym: 0 },
    health: { tooth: 0, syringe: 0, virus: 0, bacterium: 0, bone: 0, pills: 0 },
    gifts: { gifts: 0, cash: 0 },
    house: { rent: 0, mortgage: 0 },
    bills: {
      electricity: 0,
      gas: 0,
      water: 0,
      trash: 0,
      wifi: 0,
      phone: 0,
    },
    furniture: { chair: 0, bed: 0 },
    pets: { cat: 0, dog: 0 },
    service: { wrench: 0 },
    hobbies: {
      volleyball: 0,
      snowboarding: 0,
      swimming: 0,
      hiking: 0,
      skating: 0,
      biking: 0,
    },
  },
  September: {
    food: { alcohol: 0, coffee: 0, burger: 0 },
    education: { university: 0, books: 0, courses: 0 },
    transport: { bus: 0, car: 0 },
    travel: { plane: 0, car: 0 },
    clothes: { socks: 0, "t-shirts": 0, mittens: 0 },
    sport: { equipment: 0, gym: 40 },
    health: { tooth: 0, syringe: 0, virus: 0, bacterium: 0, bone: 0, pills: 0 },
    gifts: { gifts: 0, cash: 0 },
    house: { rent: 0, mortgage: 0 },
    bills: {
      electricity: 0,
      gas: 0,
      water: 0,
      trash: 0,
      wifi: 0,
      phone: 0,
    },
    furniture: { chair: 0, bed: 0 },
    pets: { cat: 0, dog: 0 },
    service: { wrench: 0 },
    hobbies: {
      volleyball: 0,
      snowboarding: 0,
      swimming: 0,
      hiking: 0,
      skating: 0,
      biking: 0,
    },
  },
  October: {
    food: { alcohol: 0, coffee: 0, burger: 0 },
    education: { university: 0, books: 0, courses: 30 },
    transport: { bus: 0, car: 0 },
    travel: { plane: 0, car: 0 },
    clothes: { socks: 0, "t-shirts": 0, mittens: 0 },
    sport: { equipment: 0, gym: 0 },
    health: { tooth: 0, syringe: 0, virus: 0, bacterium: 0, bone: 0, pills: 0 },
    gifts: { gifts: 0, cash: 0 },
    house: { rent: 0, mortgage: 0 },
    bills: {
      electricity: 0,
      gas: 0,
      water: 0,
      trash: 0,
      wifi: 0,
      phone: 0,
    },
    furniture: { chair: 0, bed: 0 },
    pets: { cat: 0, dog: 0 },
    service: { wrench: 0 },
    hobbies: {
      volleyball: 0,
      snowboarding: 0,
      swimming: 0,
      hiking: 0,
      skating: 0,
      biking: 0,
    },
  },
  November: {
    food: { alcohol: 5, coffee: 10, burger: 0 },
    education: { university: 30, books: 20, courses: 50 },
    transport: { bus: 0, car: 0 },
    travel: { plane: 0, car: 0 },
    clothes: { socks: 0, "t-shirts": 0, mittens: 0 },
    sport: { equipment: 0, gym: 0 },
    health: { tooth: 0, syringe: 0, virus: 0, bacterium: 0, bone: 0, pills: 0 },
    gifts: { gifts: 0, cash: 0 },
    house: { rent: 0, mortgage: 0 },
    bills: {
      electricity: 0,
      gas: 0,
      water: 0,
      trash: 0,
      wifi: 0,
      phone: 0,
    },
    furniture: { chair: 0, bed: 0 },
    pets: { cat: 0, dog: 0 },
    service: { wrench: 0 },
    hobbies: {
      volleyball: 0,
      snowboarding: 0,
      swimming: 0,
      hiking: 0,
      skating: 0,
      biking: 0,
    },
  },
  December: {
    food: { alcohol: 0, coffee: 0, burger: 0 },
    education: { university: 0, books: 0, courses: 0 },
    transport: { bus: 0, car: 0 },
    travel: { plane: 0, car: 0 },
    clothes: { socks: 0, "t-shirts": 0, mittens: 0 },
    sport: { equipment: 0, gym: 0 },
    health: { tooth: 0, syringe: 0, virus: 0, bacterium: 0, bone: 0, pills: 0 },
    gifts: { gifts: 30, cash: 0 },
    house: { rent: 0, mortgage: 0 },
    bills: {
      electricity: 0,
      gas: 0,
      water: 0,
      trash: 0,
      wifi: 0,
      phone: 0,
    },
    furniture: { chair: 0, bed: 0 },
    pets: { cat: 0, dog: 0 },
    service: { wrench: 0 },
    hobbies: {
      volleyball: 0,
      snowboarding: 0,
      swimming: 0,
      hiking: 0,
      skating: 0,
      biking: 0,
    },
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

// input values
inputExpensesBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (selectedCategory) {
    let tempCat = dataSchema[currentMonth][selectedCategory];
    tempCat[selectedSubCategory] += Number(inputExpenses.value);
  }
  startApp(currentMonth);
  // // CATEGORY EXPENSES PER MONTH
  // labelValues1 = getChartValuesFirst(dataSchema[currentMonth]);

  // chartData1 = {
  //   labels: labelValues1[0],
  //   datasets: [
  //     {
  //       label: "some label",
  //       data: labelValues1[1],
  //       backgroundColor: [
  //         "#003f5c",
  //         "#2f4b7c",
  //         "#665191",
  //         "#a05195",
  //         "#d45087",
  //         "#f95d6a",
  //         "#ff7c43",
  //         "#ffa600",
  //       ],
  //       borderColor: [
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //       ],
  //       borderWidth: 5,
  //     },
  //   ],
  // };

  // configuration1 = {
  //   type: "doughnut",
  //   data: chartData1,
  //   options: {
  //     scales: {
  //       ticks: {
  //         display: false,
  //       },
  //     },
  //   },
  // };

  // // CATEGORY EXPENSES PER YEAR
  // labelValues2 = getChartValuesSecond(dataSchema);

  // chartData2 = {
  //   labels: labelValues2[0],
  //   datasets: [
  //     {
  //       label: "some label",
  //       data: labelValues2[1],
  //       backgroundColor: [
  //         "#003f5c",
  //         "#2f4b7c",
  //         "#665191",
  //         "#a05195",
  //         "#d45087",
  //         "#f95d6a",
  //         "#ff7c43",
  //         "#ffa600",
  //         "#d45087",
  //         "#f95d6a",
  //         "#ff7c43",
  //         "#ffa600",
  //       ],
  //       borderColor: [
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // configuration2 = {
  //   type: "bar",
  //   data: chartData2,
  //   options: {
  //     scales: {
  //       y: {
  //         beginAtZero: true,
  //       },
  //     },
  //   },
  // };

  // // SUBCATEGORY EXPENSES PER MONTH
  // labelValues3 = getChartValuesThird(
  //   dataSchema[currentMonth][selectedCategory]
  // );

  // chartData3 = {
  //   labels: labelValues3[0],
  //   datasets: [
  //     {
  //       label: "some label",
  //       data: labelValues3[1],
  //       backgroundColor: [
  //         "#003f5c",
  //         "#2f4b7c",
  //         "#665191",
  //         "#a05195",
  //         "#d45087",
  //         "#f95d6a",
  //         "#ff7c43",
  //         "#ffa600",
  //       ],
  //       borderColor: [
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //       ],
  //       borderWidth: 5,
  //     },
  //   ],
  // };

  // configuration3 = {
  //   type: "doughnut",
  //   data: chartData3,
  //   options: {
  //     scales: {
  //       ticks: {
  //         display: false,
  //       },
  //     },
  //   },
  // };

  // // SUBCATEGORY EXPENSES PER YEAR
  // labelValues4 = getChartValuesFourth(selectedCategory, dataSchema);

  // chartData4 = {
  //   labels: labelValues4[0],
  //   datasets: [
  //     {
  //       label: "some label",
  //       data: labelValues4[1],
  //       backgroundColor: [
  //         "#003f5c",
  //         "#2f4b7c",
  //         "#665191",
  //         "#a05195",
  //         "#d45087",
  //         "#f95d6a",
  //         "#ff7c43",
  //         "#ffa600",
  //         "#d45087",
  //         "#f95d6a",
  //         "#ff7c43",
  //         "#ffa600",
  //       ],
  //       borderColor: [
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //         "#252526",
  //       ],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // configuration4 = {
  //   type: "bar",
  //   data: chartData4,
  //   options: {
  //     scales: {
  //       y: {
  //         beginAtZero: true,
  //       },
  //     },
  //   },
  // };

  // // catMonthChart
  // renderChartFirst();
  // // catYearChart
  // renderChartSecond();
  // // subCatMonthChart
  // renderChartThird();
  // // subCatYearChart
  // renderChartFourth();
});

// selectedCategory = "food";
// selectedSubCategory = "alcohol";
function startApp(currentMonth) {
  // CATEGORY EXPENSES PER MONTH
  categoriesChartMonthTitle.innerHTML = "Total Expenses In " + currentMonth;
  subCategoriesChartMonthTitle.innerHTML = `Expenses On ${selectedCategory} In ${currentMonth}`;
  labelValues1 = getChartValuesFirst(dataSchema[currentMonth]);

  chartData1 = {
    labels: labelValues1[0],
    datasets: [
      {
        label: "",
        data: labelValues1[1],
        backgroundColor: [
          "#003f5c",
          "#2f4b7c",
          "#665191",
          "#a05195",
          "#d45087",
          "#f95d6a",
          "#ff7c43",
          "#ffa600",
        ],
        borderColor: [
          "#252526",
          "#252526",
          "#252526",
          "#252526",
          "#252526",
          "#252526",
          "#252526",
          "#252526",
        ],
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

  labelValues2 = getChartValuesSecond(dataSchema);

  chartData2 = {
    labels: labelValues2[0],
    datasets: [
      {
        label: "",
        data: labelValues2[1],
        backgroundColor: [
          "#003f5c",
          "#2f4b7c",
          "#665191",
          "#a05195",
          "#d45087",
          "#f95d6a",
          "#ff7c43",
          "#ffa600",
          "#d45087",
          "#f95d6a",
          "#ff7c43",
          "#ffa600",
        ],
        borderColor: [
          "#252526",
          "#252526",
          "#252526",
          "#252526",
          "#252526",
          "#252526",
          "#252526",
          "#252526",
          "#252526",
          "#252526",
          "#252526",
          "#252526",
        ],
        borderWidth: 1,
      },
      {
        label: "",
        data: [20, 30, 32, 11, 43, 30, 20, 33, 44, 35, 56, 23],
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
        backgroundColor: [
          "#003f5c",
          "#2f4b7c",
          "#665191",
          "#a05195",
          "#d45087",
          "#f95d6a",
          "#ff7c43",
          "#ffa600",
        ],
        borderColor: [
          "#252526",
          "#252526",
          "#252526",
          "#252526",
          "#252526",
          "#252526",
          "#252526",
          "#252526",
        ],
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
        backgroundColor: [
          "#003f5c",
          "#2f4b7c",
          "#665191",
          "#a05195",
          "#d45087",
          "#f95d6a",
          "#ff7c43",
          "#ffa600",
          "#d45087",
          "#f95d6a",
          "#ff7c43",
          "#ffa600",
        ],
        borderColor: [
          "#252526",
          "#252526",
          "#252526",
          "#252526",
          "#252526",
          "#252526",
          "#252526",
          "#252526",
          "#252526",
          "#252526",
          "#252526",
          "#252526",
        ],
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
  return [labelsValues, dataValues];
}

// second chart
function getChartValuesSecond(data) {
  let labelsValues = [];
  let dataValues = [];
  // let dataValuesPerMonth = [];

  // month & category {}
  for (const [key1, value1] of Object.entries(data)) {
    labelsValues.push(key1);
    // dataValuesPerMonth.push(value1);

    // subcategory
    let catTotal = 0;
    for (const [key2, value2] of Object.entries(value1)) {
      let subCatTotal = 0;
      for (const [key3, value3] of Object.entries(value2)) {
        subCatTotal += Number(value3);
      }
      catTotal += Number(subCatTotal);
    }

    dataValues.push(catTotal);
  }
  return [labelsValues, dataValues];
}

// third chart
function getChartValuesThird(data) {
  let labelsValues = [];
  let dataValues = [];
  for (const [key, value] of Object.entries(data)) {
    labelsValues.push(key);
    dataValues.push(value);
  }
  return [labelsValues, dataValues];
}

// fourth chart
function getChartValuesFourth(selectedCat, data) {
  let labelsValues = [];
  let dataValues = [];
  // let dataValuesPerMonth = [];

  for (const [key1, value1] of Object.entries(data)) {
    labelsValues.push(key1);
    // dataValuesPerMonth.push(value1);

    let subCatTotal = 0;
    for (const [key2, value2] of Object.entries(value1[selectedCat])) {
      subCatTotal += Number(value2);
    }
    dataValues.push(subCatTotal);
  }

  return [labelsValues, dataValues];
}

//////////////////////////////
// func deletes old chart and creates new one (render)

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

// function renderChart(name_obj, name_str, config) {
//   if (this.name_obj !== undefined) {
//     this.name_obj.destroy();
//     this.name_obj = new Chart(document.getElementById(name_str), config);
//   } else {
//     this.name_obj = new Chart(document.getElementById(name_str), config);
//   }
// }

// class Rectangle {
//   constructor(height, width) {
//     this.height = height;
//     this.width = width;
//   }
//   // Getter
//   get area() {
//     return this.calcArea();
//   }
//   // Method
//   calcArea() {
//     return this.height * this.width;
//   }
// }

// const square = new Rectangle(10, 10);
// square.area;

// function getChartValues(data) {
//   // new var
//   // go for output
//   let catExpMonthLabels = [];
//   let catExpMonthValues = [];
//   let catExpYearLabels = []; // months
//   let catExpYearValues = [];
//   let subCatExpMonthLabels = [];
//   let subCatExpMonthValues = [];
//   let subCatExpYearLabels = []; // months
//   let subCatExpYearValues = [];
//   // temp var cat {}
//   let dataObjectPerMonth = [];

//   // month & category {}
//   for (const [key1, value1] of Object.entries(data)) {
//     // get months
//     catExpYearLabels.push(key1);
//     // get months
//     subCatExpYearLabels.push(key1);
//     dataObjectPerMonth.push(value1);

//     let categories = [];
//     let setCat = [...new Set(categories)];
//     // subcategory
//     let totalCat = 0;
//     for (const [key2, value2] of Object.entries(value1)) {
//       // console.log(key2);
//       categories.push(key2);
//       let totalSubCat = 0;
//       for (const [key3, value3] of Object.entries(value2)) {
//         totalSubCat += Number(value3);
//       }
//       totalCat += Number(totalSubCat);
//     }
//     // let setCategories = [...new Set(categories)];
//     catExpMonthLabels.push(setCat);
//     catExpMonthValues.push(totalCat);
//   }
//   return console.log(catExpMonthLabels);
// }

// var a = [1, 1, 2];

// let b = [...new Set(a)];

// console.log(b);
// c = new Set(a);
// console.log(...c);

// let b = window.localStorage.setItem("dataSchema", JSON.stringify(dataSchema));
// console.log(b);
// let a = window.localStorage.getItem(dataSchema);
// console.log("dataSchema: ", JSON.parse(a));

// Remove Data from Local Storage
// localStorage.removeItem(key);
// Remove All (Clear Local Storage)
// localStorage.clear();

// outputfile
// const link = document.querySelector(".mylink");

// let reportYear = 2022;
// let text = dataSchema;

// link.setAttribute(
//   "href",
//   "data:text/plain;charset=utf-8," + encodeURIComponent(JSON.stringify(text))
// );
// link.setAttribute("download", `report_${reportYear}.txt`);
