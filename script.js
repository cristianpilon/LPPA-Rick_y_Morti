window.onload = function () {
  var getAllCharactersButton = document.getElementById("getAllCharacters");
  var filterCharactersButton = document.getElementById("filterCharacters");

  getAllCharactersButton.addEventListener("click", function () {
    getCharacters(
      "https://rickandmortyapi.com/api/character/",
      function (data) {
        renderCharacters(data.results);
      }
    );
  });

  filterCharactersButton.addEventListener("click", function () {
    var name = document.getElementById("name").value;
    var status = document.getElementById("status").value;
    var species = document.getElementById("species").value;
    var type = document.getElementById("type").value;
    var gender = document.getElementById("gender").value;

    var url =
      "https://rickandmortyapi.com/api/character/?name=" +
      name +
      "&status=" +
      status +
      "&species=" +
      species +
      "&type=" +
      type +
      "&gender=" +
      gender;

    getCharacters(url, function (data) {
      renderCharacters(data.results);
    });
  });

  function getCharacters(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          var data = JSON.parse(xhr.responseText);
          callback(data);
        } else {
          displayError("Error al obtener datos de la API");
        }
      }
    };
    xhr.send();
  }

  function renderCharacters(characters) {
    var container = document.getElementById("characters");
    container.innerHTML = "";
    for (var i = 0; i < characters.length; i++) {
      var character = document.createElement("div");
      character.className = "character";
      character.innerHTML =
        '<img src="' +
        characters[i].image +
        '" alt="' +
        characters[i].name +
        '">' +
        "<div><h3>" +
        characters[i].name +
        "</h3>" +
        "<p>Estado: " +
        characters[i].status +
        "</p>" +
        "<p>Especie: " +
        characters[i].species +
        "</p>" +
        "<p>Tipo: " +
        characters[i].type +
        "</p>" +
        "<p>Género: " +
        characters[i].gender +
        "</p></div>";
      container.appendChild(character);
    }
  }

  function displayError(message) {
    var container = document.getElementById("characters");
    container.innerHTML = '<p class="error">' + message + "</p>";
  }
};
