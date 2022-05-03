// Add a "checked" symbol when clicking on a list item
var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
  if (ev.target.tagName === 'LI') {
    console.log('@@', ev.target.getAttribute("class"))
    const userId = localStorage.getItem('userId');
    const id = ev.target.getAttribute("id")
    const data = {
      "checked": !(ev.target.getAttribute("class")=="checked")
    }
    $.ajax({
      type: "PUT",
      url: `http://localhost:3000/updateTodo/${userId}/${id}`,
      data: JSON.stringify(data),// now data come in this function
      contentType: "application/json; charset=utf-8",
      crossDomain: true,
      dataType: "json",
      success: function (data, status, jqXHR) {
        window.location.href = "index.html";
      },

      error: function (jqXHR, status) {
        console.log(jqXHR);
        alert('fail' + status.code);
      }
    });

  }
}, false);

// Create a new list item when clicking on the "Add" button
function newElement() {
  var inputValue = document.getElementById("myInput").value;
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    // document.getElementById("myUL").appendChild(li);
    const userId = localStorage.getItem('userId');
    const data = {
      "todo": {
        "text": inputValue,
        "checked": false
      }
    }
    $.ajax({
      type: "PUT",
      url: `http://localhost:3000/update/${userId}`,
      data: JSON.stringify(data),// now data come in this function
      contentType: "application/json; charset=utf-8",
      crossDomain: true,
      dataType: "json",
      success: function (data, status, jqXHR) {
        window.location.href = "index.html";
      },

      error: function (jqXHR, status) {
        console.log(jqXHR);
        alert('fail' + status.code);
      }
    });

  }
  document.getElementById("myInput").value = "";
}

$(document).ready(function () {
  const userId = localStorage.getItem('userId');
  var apiUrl = `http://localhost:3000/getOne/${userId}`;
  fetch(apiUrl).then(response => {
    return response.json();
  }).then(data => {
    if (data.length != 0 && data.todo.length != 0) {
      for (var i = 0; data.todo.length > i; i++) {
        var li = document.createElement("li");
        var t = document.createTextNode(data.todo[i].text);
        li.appendChild(t);
        li.setAttribute("id", data.todo[i]._id)
        if (data.todo[i].checked) {
          li.setAttribute("class", "checked")
        }
        document.getElementById("myUL").appendChild(li);
      }
    }
  }).catch(err => {
  });
});