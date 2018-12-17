$(document).ready(function() {
  $(".tooltipEl").tooltip({
    delay: 10,
    placement: "bottom",
    title: details,
    html: true
  });
  // $(".tooltipEl").hover(function () {
  //     $(this).css({
  //         "fill": "red"
  //     });
  // }, function () {
  //     $(this).css({
  //         "fill": "#FFFFFF"
  //     });
  // });
  data.forEach(function(one) {
    if (one.winner_party_2013 == "BJP") {
      $("#" + one.id).css({
        fill: "#FF9800"
      });
    } else if (one.winner_party_2013 == "INC") {
      $("#" + one.id).css({
        fill: "#7EC0EE"
      });
    } else {
      $("#" + one.id).css({
        fill: "#4CAF50"
      });
    }
  });
});

function details() {
  var id = this.id;
  var response = "";
  data.forEach(function(one) {
    if (one.id == id) {
      response =
        '\
            <div class="card" style="width: 12rem;">\
                <div class="card-body">\
                    <h4 class="card-title" style="color: white">' +
        one.constituency_no +
        ". " +
        one.constituency_name +
        '</h4>\
                    <h6 class="card-subtitle mb-2 text-muted" style="color: white">Reservation: ' +
        one.reservation +
        '</h6>\
                    <h6 class="card-subtitle mb-2 text-muted" style="color: white">Winning Party: ' +
        one.winner_party_2013 +
        "</h6>\
                </div>\
            </div>\
            ";
    }
  });
  if (response == "") {
    response = "not found";
  }
  return response;
}
