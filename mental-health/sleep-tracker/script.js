$(document).ready(function () {
    const userId = localStorage.getItem('userId');
    var apiUrl = `http://localhost:3000/getOne/${userId}`;
    fetch(apiUrl).then(response => {
        return response.json();
    }).then(data => {
        if (data.length != 0 && data.sleep.length!=0) {
            console.log(data.sleep.length);
            $('#recordsTable').attr('hidden',false);
            var tr = '';
            for (var i = 0; data.sleep.length > i; i++ ){
                console.log(data.sleep[i]);
                tr += '<tr><td class="text-left">' + data.sleep[i].asleepTime +
                        '</td><td class="text-left">' + data.sleep[i].wakeupTime +
                        '</td></tr>'
            }
            $('#recordsTable tbody').append(tr);
        }
    }).catch(err => {
    });
    $('#submit').click(function(){
        const userId = localStorage.getItem('userId');
        const asleepTime = $("#asleepTime").val();
        const wakeupTime = $("#wakeupTime").val();
        const data = {
            "sleep": {
                "asleepTime": asleepTime,
                "wakeupTime": wakeupTime
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
    })
})