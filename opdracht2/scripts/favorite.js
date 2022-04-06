window.onload = function () {
    show_list_shoes();
};

// To use this on reload;
var filtered_storage = localStorage;

// get trashcan img tag
const trash_img = document.querySelector('footer').querySelector('img');
// add event listener to trashcan, to detect item being dragged over
trash_img.addEventListener('dragover', function() {
    var dragged_li = document.querySelector('.dragging');
    remove_from_likes(dragged_li.id)
});


function remove_from_likes(key) {
    window.localStorage.removeItem(key);
    // window.location.reload; noottt working for some reason
    // https://stackoverflow.com/questions/18967532/window-location-reload-not-working-for-firefox-and-chrome
    window.location.href = window.location.href;
}


function show_list_shoes() {
    // get parent to append li's to
    var ul = document.querySelector("ul");
    // 2. remove all <li> children
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild);
    }
    ul.classList.add("favorites_ul");
    // get a list of keys of global storage variable
    var keys_list = Object.keys(filtered_storage);

    // if keys exist, then remove placeholder
    if (keys_list.length > 0) {
        var p = document.querySelector("p");
        if (p != null) {
            document.querySelector("p").remove();
        }
    }

    keys_list.forEach(function (item, index) {
        // get value of key, then convert to Json/map
        var shoe_style = JSON.parse(filtered_storage[item]);
        // create li to hold <img> tags
        var li = document.createElement("li");
        // set draggable attribute to True
        li.draggable = true;
        // set key as id of <li>
        li.id = item;
        // add dragstart listener to <li>
        li.addEventListener("dragstart", function () {
            li.classList.add('dragging');
        });
        li.addEventListener("dragend", function () {
            li.classList.remove('dragging')
        });

        // create remove button, to remove shoe from local.storage
        var button = document.createElement("button");
        // add text to remove button
        button.textContent = "Remove";
        // add onclick event to remove button, to remove (key, value) in localStorage
        button.onclick = function () {
            remove_from_likes(item);
        }
 
        // iterate through list of keys from shoe_style variable
        Object.keys(shoe_style).forEach(function (item, index) {
            // make img tag if style is not empty string
            if (shoe_style[item] != "") {
                // create img tag
                var img_tag = document.createElement("img");
                // // set images at draggable
                // img_tag.draggable = true;
                img_tag.src = shoe_style[item];
                li.appendChild(img_tag);
            }
        });
        li.appendChild(button);
        
        ul.appendChild(li);
    });
}

function shoe_filter_dropdown() {
    document.getElementById("shoe_filter").classList.toggle("show");
}

function shoe_color_filter_dropdown() {
    document.getElementById("color_filter").classList.toggle("show");
}

function design_filter_dropdown() {
    document.getElementById("design_filter").classList.toggle("show");
}

function laces_color_filter_dropdown() {
    document.getElementById("laces_filter").classList.toggle("show");
}

function filter(style, img) {
    filtered_storage = {};
    // get storage keys
    var keys_list = Object.keys(localStorage);
    // iterate through keys list
    // check if we can iterate through map/json directly
    // check line 115 in index.js
    keys_list.forEach(function (item, index) {
        // destringify value to convert back to json/map
        var shoe_style = JSON.parse(localStorage.getItem(item));
        // check if current style is selected style
        if (shoe_style[style].includes(img)) {
            filtered_storage[item]= JSON.stringify(shoe_style);
        };
    });

    show_list_shoes();
}