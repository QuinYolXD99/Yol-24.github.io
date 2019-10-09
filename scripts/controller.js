
$(document).ready(function () {
  var client = null;
  client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt");

  client.on("connect", function () {
    console.log("connected!")
    var timestamp = moment().format('MMMM D YYYY , h:mm:ss a');
    client.subscribe("yol/device/status");
    client.publish("yol/device/status", "OFF:" + timestamp);

    $('button').click(function () {
      timestamp = moment().format('MMMM D YYYY , h:mm:ss a')
      var payload = $(this).text()
      client.publish("yol/device/status", payload + ":" + timestamp)
    });

    client.on("message", function (topic, payload) {
      console.log("Device Status:" + payload.toString())
      var payload = payload.toString().split(":");
      $("#status").text(payload[0])
      if (payload[0] == "ON") {
        $("img").attr("src","img/bulbon.png")
        $(".positive").attr("disabled", true)
        $(".negative").attr("disabled", false)


      } else {
        $("img").attr("src","img/bulboff.png")

        $(".negative").attr("disabled", true)
        $(".positive").attr("disabled", false)


      }

    })



  })


});
