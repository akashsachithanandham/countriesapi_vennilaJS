var option = "all";
var search = "";
fetchData();
function selectFilter() {
  option = document.getElementById("filter").value;
  console.log(option);
  fetchData();
}
function searchFilter() {
  search = document.getElementById("search").value;
  console.log("inside search:", search);
  option = search;
  searchFetchData();
}
async function searchFetchData() {
  console.log("inside fetchData: ", option);
  var res = "";

  res = await fetch("https://restcountries.eu/rest/v2/name/" + option);
  if (res.status == "200") {
    const countries = await res.json();
    console.log(countries);
    noitem.setAttribute("hidden", "");
    country.removeAttribute("hidden");
    spinner.setAttribute("hidden", "");
    displayData(countries);
  } else {
    console.log("inside else part");
    country.setAttribute("hidden", "");
    noitem.removeAttribute("hidden");
  }
}

async function fetchData() {
  console.log("inside fetchData: ", option);
  var res = "";
  if (option == "all") {
    res = await fetch("https://restcountries.eu/rest/v2/all");
  } else {
    res = await fetch("https://restcountries.eu/rest/v2/region/" + option);
  }
  const countries = await res.json();
  console.log(countries);
  noitem.setAttribute("hidden", "");
  country.removeAttribute("hidden");
  spinner.setAttribute("hidden", "");

  displayData(countries);
}

function displayData(countries) {
  var html = "";
  countries.forEach((country) => {
    html += '<div class="card ">';
    html += `
            <div>
                <img src="${country.flag}" alt="country flag" />
            </div>
            <div class="card-body">
                <h3 class="country-name">${country.name}</h3>
                <p>
                    <strong>Population:</strong>
                    ${country.population}
                </p>
                <p class="country-region">
                    <strong>Region:</strong>
                    ${country.region}
                </p>
                <p>
                    <strong>Capital:</strong>
                    ${country.capital}
                </p>
            </div>
        `;
    html += "</div>";
  });

 
  if (html != "") {
    document.querySelector("#countries").innerHTML = html;
  }
}
