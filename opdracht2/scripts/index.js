window.onload = function () {
  base_grid();
  document.querySelector("main").querySelector("button").onclick = function () {
    done();
  };
};

// This is a Map/Dictionary, which is a datype with (key, value) pairs.
// This avoids messy variables, creates clean code.
// See this as a filesystem/folder system on the mac.
const styling_options = {
  Shoe: {
    options: ["./images/shoe1.png", "./images/shoe2.png"],
  },
  Color: {
    options: [
      "./images/grid_options/colors/blue.png",
      "./images/grid_options/colors/brown.png",
      "./images/grid_options/colors/green.png",
      "./images/grid_options/colors/pink.png",
    ],
  },
  Design: {
    options: {
      shoe1: [
        "./images/shoe1.png",
        "./images/grid_options/design/shoe1-design.png",
      ],
      shoe2: [
        "./images/shoe2.png",
        "./images/grid_options/design/shoe2-design.png",
      ],
    },
  },
  Laces: {
    options: [
      "./images/grid_options/colors/blue.png",
      "./images/grid_options/colors/brown.png",
      "./images/grid_options/colors/green.png",
      "./images/grid_options/colors/pink.png",
    ],
  },
};

const display = {
  Color: {
    shoe1: [
      "./images/display/shoe1/color/shoecolor-blue.png",
      "./images/display/shoe1/color/shoecolor-brown.png",
      "./images/display/shoe1/color/shoecolor-green.png",
      "./images/display/shoe1/color/shoecolor-pink.png",
    ],
    shoe2: [
      "./images/display/shoe2/color/shoe2-colorblue.png",
      "./images/display/shoe2/color/shoe2-colorbrown.png",
      "./images/display/shoe2/color/shoe2-colorgreen.png",
      "./images/display/shoe2/color/shoe2-colorpink.png",
    ],
  },
  Design: {
    shoe1: [
      "./images/transparent.png",
      "./images/display/shoe1/shoe1-design.png",
    ],
    shoe2: [
      "./images/transparent.png",
      "./images/display/shoe2/shoe2-design.png",
    ],
  },
  Laces: {
    shoe1: [
      "./images/display/shoe1/laces/lacescolor-blue.png",
      "./images/display/shoe1/laces/lacescolor-brown.png",
      "./images/display/shoe1/laces/lacescolor-green.png",
      "./images/display/shoe1/laces/lacescolor-pink.png",
    ],
    shoe2: [
      "./images/display/shoe2/laces/shoe2-lacesblue.png",
      "./images/display/shoe2/laces/shoe2-lacesbrown.png",
      "./images/display/shoe2/laces/shoe2-lacesgreen.png",
      "./images/display/shoe2/laces/shoe2-lacespink.png",
    ],
  },
};

const current_shoe_style = {
  Shoe: "./images/shoe1.png",
  Color: "",
  Design: "",
  Laces: "",
};

// fills styling_attributes library
// example: var files = fs.readdirSync('/assets/photos/');
function fill_styling_attribute() {
  // var loc = window.location.;
  console.log(loc);
  var dir = loc.substring(0, loc.lastIndexOf("/"));
  console.log(dir);
}

// https://stackoverflow.com/questions/34913675/how-to-iterate-keys-values-in-javascript
// function to add the li's (shoe, color, design, laces)
function base_grid() {
  // 1. find corresponing <ul>
  var ul = document.querySelector("ul");
  console.log(ul);
  // 2. remove all <li> children
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  var li_count = 1;

  // creates a list with (key, value) pairs of map as entries
  Object.entries(styling_options).forEach(([style, v]) => {
    // 3. create <li> with string name: Shoe, Colors, Design, Laces
    var li = document.createElement("li");
    // 4. add event listener to <li>, that triggers function create_option_grid() with
    // corresponding arguments (String) title, (List) items_list (either list of img or colors) and
    // (String) style class name.
    li.addEventListener("click", function () {
      create_grid(style);
    });
    li.addEventListener("keydown", function(pressed_key) {
      if (pressed_key.key == "Enter") {
        create_grid(style);
      }
    })
    li.tabIndex = li_count;
    li.textContent = style;
    // 5. append <li> to <ul>
    ul.appendChild(li);
    li_count += 1;
  });
}

// https://www.geeksforgeeks.org/ways-iterating-array-javascript/
// base function for all li's (shoe, color, design, laces)
function create_grid(title) {
  // 1. find corresponing <ul>
  var ul = document.querySelector("ul");
  // 2. remove all <li> children
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  var arrow_index = 3;

  switch (title) {
    case "Shoe":
      shoe_grid(ul);
      break;
    case "Color":
      shoe_color_grid(ul);
      arrow_index = 5;
      break;
    case "Design":
      design_grid(ul);
      break;
    case "Laces":
      laces_color_grid(ul);
      arrow_index = 5;
      break;
  }

  arrow_title_options(title, arrow_index);
}

function shoe_grid(ul) {
  styling_options["Shoe"]["options"].forEach(function (item, index) {
    // 3. create <img> inside <li>
    var li = document.createElement("li");
    var img = document.createElement("img");
    img.src = item;
    li.appendChild(img);

    // 4. addevent listener to change shoe style
    li.addEventListener("click", function () {
      var shoe_layer = document.images[1];
      shoe_layer.src = item;

      // reset shoe style
      reset_shoe_style(item);
    });
    li.addEventListener("keydown", function (pressed_key) {
      if (pressed_key.key == "Enter") {
        var shoe_layer = document.images[1];
        shoe_layer.src = item;

        // reset shoe style
        reset_shoe_style(item);
      }
    });

    // tabIndex cannot be 0, or start at 0
    li.tabIndex = index + 1;

    // 5. append to <ul>
    ul.appendChild(li);
  });
}

function shoe_color_grid(ul) {
  // get chosen shoe string, will be used as key
  var chosen_shoe = current_shoe_style["Shoe"].split("/")[2].split(".")[0];

  styling_options["Color"]["options"].forEach(function (item, index) {
    // 3. create <img> inside <li>
    var li = document.createElement("li");
    var img = document.createElement("img");
    img.src = item;
    li.appendChild(img);

    // 4. add event listener to change shoe style
    li.addEventListener("click", function () {
      // get corresponding img_path for display]
      var shoe_img_display = display["Color"][chosen_shoe][index];
      // remember shoe display
      current_shoe_style["Color"] = shoe_img_display;
      // get corresponding img_tag in html
      var shoe_color_layer = document.images[2];
      // replace correspondingimg tag src with corresponding image path
      shoe_color_layer.src = shoe_img_display;
    });
    li.addEventListener("keydown", function (pressed_key) {
      if (pressed_key.key == "Enter") {
        // get corresponding img_path for display]
        var shoe_img_display = display["Color"][chosen_shoe][index];
        // remember shoe display
        current_shoe_style["Color"] = shoe_img_display;
        // get corresponding img_tag in html
        var shoe_color_layer = document.images[2];
        // replace correspondingimg tag src with corresponding image path
        shoe_color_layer.src = shoe_img_display;
      } 
    });

    li.tabIndex = index + 1;

    // 5. append to <ul>
    ul.appendChild(li);
  });
}

function design_grid(ul) {
  // get chosen shoe
  var chosen_shoe = current_shoe_style["Shoe"].split("/")[2].split(".")[0];
  // get corresponding design style for chosen shoe
  var design_options = styling_options["Design"]["options"][chosen_shoe];

  // iterate through list
  design_options.forEach(function (item, index) {
    // 3. create <img> inside <li>
    var li = document.createElement("li");
    var img = document.createElement("img");
    img.src = item;
    li.appendChild(img);

    // 4. add event listener to change shoe style
    li.addEventListener("click", function () {
      // get corresponding img_path for display
      var design_img_display = display["Design"][chosen_shoe][index];
      // remember design display
      current_shoe_style["Design"] = design_img_display;
      // get corresponding img_tag in html
      var shoe_design_layer = document.images[3];
      // replace correspondingimg tag src with corresponding image display path
      shoe_design_layer.src = design_img_display;
    });

    li.addEventListener("keydown", function (pressed_key) {
      if (pressed_key.key == "Enter") {
        // get corresponding img_path for display
        var design_img_display = display["Design"][chosen_shoe][index];
        // remember design display
        current_shoe_style["Design"] = design_img_display;
        // get corresponding img_tag in html
        var shoe_design_layer = document.images[3];
        // replace correspondingimg tag src with corresponding image display path
        shoe_design_layer.src = design_img_display;
      }
    });

    li.tabIndex = index + 1;

    // 5. append to <ul>
    ul.appendChild(li);
  });
}

function laces_color_grid(ul) {
  // get chosen shoe to get corresponding display
  var chosen_shoe = current_shoe_style["Shoe"].split("/")[2].split(".")[0];
  // get corresponding design style for chosen shoe
  var lace_options = styling_options["Laces"]["options"];

  lace_options.forEach(function (item, index) {
    // 3. create <img> inside <li>
    var li = document.createElement("li");
    var img = document.createElement("img");
    img.src = item;
    li.appendChild(img);

    // 4. add event listener to change shoe style
    li.addEventListener("click", function () {
      // get corresponding img_path for display
      var lace_img_display = display["Laces"][chosen_shoe][index];
      // remember laces display
      current_shoe_style["Laces"] = lace_img_display;
      // get corresponding img_tag in html
      var laces_layer = document.images[4];
      // replace corresponding img tag src with corresponding image display path
      laces_layer.src = lace_img_display;
    });

    li.addEventListener("keydown", function (pressed_key) {
      if (pressed_key.key == "Enter") {
        // get corresponding img_path for display
        var lace_img_display = display["Laces"][chosen_shoe][index];
        // remember laces display
        current_shoe_style["Laces"] = lace_img_display;
        // get corresponding img_tag in html
        var laces_layer = document.images[4];
        // replace corresponding img tag src with corresponding image display path
        laces_layer.src = lace_img_display;
      }
    });

    li.tabIndex = index + 1;

    // 5. append to <ul>
    ul.appendChild(li);
  });
}

//https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
//this can maybe be section? and ul is in the section with img and h2
function arrow_title_options(title, index) {
  // ask if creating div is okay
  var divBox = document.createElement("div");

  // creating image tag for arrow and h2 tag for title
  var arrow_img = document.createElement("img");
  var title_h2 = document.createElement("h2");

  // setting attributes for tags
  title_h2.textContent = title;
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    arrow_img.src = "./images/grid_options/backarrow-white.png";
  } else {
    arrow_img.src = "./images/grid_options/backarrow.png";
  }

  arrow_img.classList.add("backarrow");
  arrow_img.addEventListener("click", function () {
    divBox.remove();
    // 1. find corresponing <ul>
    var ul = document.querySelector("ul");
    // 2. remove all <li> children
    while (ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }

    base_grid();
  });
  arrow_img.addEventListener("keydown", function (pressed_key) {
    if (pressed_key.key == "Enter") {
      divBox.remove();
      // 1. find corresponing <ul>
      var ul = document.querySelector("ul");
      // 2. remove all <li> children
      while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
      }
      base_grid();
    }
    
  });     
  arrow_img.tabIndex = index;
  // link together
  divBox.appendChild(title_h2);
  divBox.appendChild(arrow_img);

  // idk why but only works with lastElementChild
  var section_tag = document.querySelector("main").querySelector("section");
  section_tag.insertBefore(divBox, section_tag.firstElementChild);
}

function done() {
  // 1. find corresponing <ul>
  var ul = document.querySelector("ul");
  // 2. remove all <li> children
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild);
  }

  // change h1 text
  document.querySelector("h1").textContent = "Your finished result";
  // get button tag
  var button = document.querySelector("main").querySelector("button");
  // replace -- I'm Done -- text
  button.textContent = "Add to Favorites";
  // add animation to images
  Array.from(document.images)
    .slice(1, 5)
    .forEach(function (item, index) {
      item.classList.add('final_result_animation')
    });
  // change event listener
  button.onclick = function () {
    // add to likes
    add_to_likes();
  };
}

// https://blog.logrocket.com/localstorage-javascript-complete-guide/#:~:text=localStorage%20is%20a%20property%20that,the%20browser%20window%20is%20closed.
// https://www.w3schools.com/jsref/jsref_gettime.asp
function add_to_likes() {
  // get date
  const d = new Date();
  // convert to miliseconds, to use as key.
  let time_miliseconds = d.getTime();
  console.log("going twice?");

  // In (key, value) pairs requires the key to be a string
  window.localStorage.setItem(
    // convert time (number) to string
    time_miliseconds.toString(),
    // convert current_shoe_style map to string
    JSON.stringify(current_shoe_style)
  );

  // get button tag
  var button = document.querySelector("main").querySelector("button");
  // replace -- Add to Favorites -- text
  button.textContent = "Start Over";
  // change event listener
  button.onclick = function () {
    reset_home_page();
  };
}

function reset_home_page() {
  // reset shoe style
  reset_shoe_style("./images/shoe1.png");
  // change h1 text
  document.querySelector("h1").textContent = "Welcome to your Shoe Factory!";
  // get button tag
  var button = document.querySelector("main").querySelector("button");
  // replace -- Start Over -- text
  button.textContent = "I'm Done";
  // change button function
  button.onclick = function () {
    done();
  }
  // reload page
  window.location.reload;
  base_grid();
}

// reset shoe style and display image tags in htm;
function reset_shoe_style(item) {
  // maybe we can reload here as well.
  current_shoe_style["Shoe"] = item;
  current_shoe_style["Design"] = "";
  current_shoe_style["Color"] = "";
  current_shoe_style["Laces"] = "";
  Array.from(document.images)
    .slice(2, 5)
    .forEach(function (item, index) {
      item.src = "images/transparent.png";
    });
}
