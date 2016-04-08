var appId = "44d933cb";
var appKey = "46308e6f8eff05d56f47208c3d337048";

function foodSearch(food) {
  var url = "https://api.nutritionix.com/v1_1/search/" + food +
    "?fields=item_description,item_name,brand_name,item_id,nf_calories,nf_calories_from_fat," +
    "nf_total_fat,nf_saturated_fat,nf_trans_fatty_acid,nf_cholesterol,nf_total_carbohydrate," +
    "nf_sodium,nf_serving_weight_grams,nf_dietary_fiber,nf_sugars,nf_protein,nf_vitamin_a_dv," + 
    "nf_vitamin_c_dv,nf_calcium_dv,nf_iron_dv" +
    "&appId=" + appId +
    "&appKey=" + appKey;
  sendRequest(url);
}

function sendRequest(url) {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var data = JSON.parse(xmlhttp.responseText);
      update(data);
    }
  };

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

function edit(id, info) { document.getElementById(id).innerHTML = info; }

// converts daily value of food into a percentage
function dv(id, info, num) { document.getElementById(id).innerHTML = Math.round((info / num) * 100); }

function update(data) {
  var prop = data.hits[0].fields;

  edit("item", prop.item_name);
  edit("brand", prop.brand_name);
  edit("desc", prop.item_description);
  edit("size", prop.nf_serving_weight_grams);
  edit("cals", prop.nf_calories);
  edit("cfat", prop.nf_calories_from_fat);
  edit("tfat", prop.nf_total_fat);
  edit("sfat", prop.nf_saturated_fat);
  edit("trfat", prop.nf_trans_fatty_acid);
  edit("chol", prop.nf_cholesterol);
  edit("sodium", prop.nf_sodium);
  edit("carbs", prop.nf_total_carbohydrate);
  edit("fiber", prop.nf_dietary_fiber);
  edit("sugar", prop.nf_sugars);
  edit("prot", prop.nf_protein);
  edit("vita", prop.nf_vitamin_a_dv);
  edit("vitc", prop.nf_vitamin_c_dv);
  edit("calc", prop.nf_calcium_dv);
  edit("iron", prop.nf_iron_dv);

  dv("trfatDV", prop.nf_trans_fatty_acid, 65);
  dv("sfatDV", prop.nf_saturated_fat, 20);
  dv("cholDV", prop.nf_cholesterol, 300);
  dv("sodiumDV", prop.nf_sodium, 2400);
  dv("carbsDV", prop.nf_total_carbohydrate, 300);
  dv("fiberDV", prop.nf_dietary_fiber, 25);
  dv("protDV", prop.nf_protein, 50);
}

window.onload = function() {
  var food = window.prompt("Type in a food to search for.");
  foodSearch(food);
}