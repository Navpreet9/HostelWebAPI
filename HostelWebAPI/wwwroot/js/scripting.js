let address = '/api/HostelBookings';

function displayBookings() {
    resetBookingForm();
    $("#hostel_details").show();
    $.ajax({
        type: "GET",
        url: address,
        cache: false,
        success: function (data) {
            $("#hostel_details").empty();
            if (data.length == 0) {
                let html = "<h1>No Hostel Booking</h1>";
                $("#hostel_details").append(html);
            } else {

                $.each(data, function (key, item) {
                    let html = '<div class="col-md-4  mb-3"><div class="card col-md-12">';
                    html += '<div class="card-body">';
                    html += '<h5 class="card-title">' + item.studentName + " (" + item.rollNo + ')</h5>';
                    html += '<p class="card-text">Floor: ' + item.floor + '</p>';
                    html += '<p class="card-text">Room No: ' + item.room + '</p>';
                    html += '<p class="card-text">Facility:</p>';
                    let values = item.facility.split(",");
                    if (values == "" || values.length == 0) {
                        html += "<strong>No Faciltiy Selected</strong>";
                    } else {
                        html += "<ul>";
                        for (let value of values) {
                            html += "<li>" + value + "</li>";
                        }
                        html += "</ul>";
                    }
                    html += '</div>';
                    html += '<div class="row mb-2">';
                    html += '<div class="col-md-6">';
                    html += '<button class="btn btn-info btn-block" onclick="getBooking(' + item.id + ')">Edit</button>';
                    html += '</div>';
                    html += '<div class="col-md-6">';
                    html += '<button class="btn btn-danger btn-block" onclick="deleteBooking(' + item.id + ')">Delete</button>';
                    html += '</div>';
                    html += '</div>';
                    html += '</div></div>';
                    $("#hostel_details").append(html);
                });
            }
        }
    });
}

function resetBookingForm() {
    $("#hostel_form").hide();
    $("#title_message").html("Fill Form to Book Hostel");
    $("#rollno").val("");
    $("#name").val("");
    $("#id").val("");
    $("#floor").val("");
    $("#room").val("");
    $("#result").html("");
    $('input:checkbox').removeAttr('checked');
}

function showBookingForm() {
    resetBookingForm();
    $("#hostel_details").hide();
    $("#hostel_form").show();
}

function getBooking(id) {
    resetBookingForm();
    $("#hostel_details").hide();
    $("#hostel_form").show();
    $.ajax({
        type: "GET",
        url: address + "/" + id,
        contentType: "application/json"
    }).done(function (booking) {
        $("#title_message").html("Edit Book Details");
        $("#rollno").val(booking.rollNo);
        $("#name").val(booking.studentName);
        $("#id").val(booking.id);
        $("#floor").val(booking.floor);
        $("#room").val(booking.room);
        let values = booking.facility.split(",");
        if (values != "") {
            $("[name='facility']").each(function () {
                let found = false;
                for (let value of values) {
                    if (this.value == value) {
                        $(this).attr('checked', 'checked');
                    }
                }
            });
        }
    });
}

function saveDetails() {
    let rollno_value = parseInt($('#rollno').val());
    let name_value = $('#name').val();
    let floor_value = $('#floor').val();
    let room_value = $('#room').val();
    let facility_value = "";
    $("[name='facility']").each(function () {
        if (this.checked) {
            facility_value += this.value + ",";
        }
    });
    if (facility_value.length > 0) {
        facility_value = facility_value.substring(0, facility_value.length - 1);
    }
    let booking = {
        rollNo: rollno_value,
        studentName: name_value,
        floor: floor_value,
        room: room_value,
        facility: facility_value
    };
    if ($("#title_message").text().indexOf("Edit") != -1) {
        let id = parseInt($("#id").val());
        booking["id"] = id;
        $.ajax({
            type: "PUT",
            url: address + "/" + id,
            data: JSON.stringify(booking),
            contentType: "application/json; charset=utf-8"
        }).done(function (response) {
            $("#result").html("<h1>Booking is Saved</h1>");
        }).fail(function (xhr, status) {
            $("#result").html("<h1>Booking is not Saved</h1>");
        });        
    } else {
        $.ajax({
            type: "POST",
            url: address,
            data: JSON.stringify(booking),
            contentType: "application/json; charset=utf-8"
        }).done(function (response) {
            $("#result").html("<h1>Booking is Saved</h1>");
        }).fail(function (xhr, status) {
            $("#result").html("<h1>Booking is not Saved</h1>");
        });
    }    
}

function deleteBooking(id) {
    let result = confirm("Are You Sure to Remove This Booking?");
    if (result) {
        $.ajax({
            type: "DELETE",
            url: address + "/" + id,
        }).done(function (response) {
            displayBookings();
        });
    }
}