
    $(document).ready(function() { 
      var port1Status = false;
      var port2Status = false;
      var port3Status = false;
      var port4Status = false;

      setPower = function() {
        light1 = Number($("#light1-on").hasClass("btn-success"));
        light2 = Number($("#light2-on").hasClass("btn-success"));
        light3 = Number($("#light3-on").hasClass("btn-success"));
        light4 = Number($("#light4-on").hasClass("btn-success"));

        /*
        urlGet = 'http://172.16.17.245/Set.cmd?CMD=SetPower+P61=' + light1 + '+P62=' + light2 + '+P63=' + light3 + '+P64=' + light4;
        console.log(urlGet);
        $.ajax({
          url: urlGet,
          method: 'GET',
          dataType: 'jsonp',
          beforeSend: function (xhr) { xhr.setRequestHeader ('Authorization', 'Basic YWRtaW46MTIzNDU2Nzg='); }, 
          success: function(val) { 
              var portStatusRead = null;
              console.log(val.toString());
          },
          error: function(xhr, ajaxOptions, thrownError) { console.log(xhr); console.log(ajaxOptions); alert(thrownError); }
        });
        */
      }

      $("#light1-on").click(function() {
          $("#light1-on").addClass("btn-success");
          $("#light1-off").removeClass("btn-danger");
          setPower();
      });

      $("#light1-off").click(function() {
          $("#light1-on").removeClass("btn-success");
          $("#light1-off").addClass("btn-danger");
          setPower();
      });

      $("#light2-on").click(function() {
          $("#light2-on").addClass("btn-success");
          $("#light2-off").removeClass("btn-danger");
          setPower();
      });

      $("#light2-off").click(function() {
          $("#light2-on").removeClass("btn-success");
          $("#light2-off").addClass("btn-danger");
          setPower();
      });

      $("#light3-on").click(function() {
          $("#light3-on").addClass("btn-success");
          $("#light3-off").removeClass("btn-danger");
          setPower();
      });

      $("#light3-off").click(function() {
          $("#light3-on").removeClass("btn-success");
          $("#light3-off").addClass("btn-danger");
          setPower();
      });

      $("#light4-on").click(function() {
          $("#light4-on").addClass("btn-success");
          $("#light4-off").removeClass("btn-danger");
          setPower();
      });

      $("#light4-off").click(function() {
          $("#light4-on").removeClass("btn-success");
          $("#light4-off").addClass("btn-danger");
          setPower();
      });

      $("#reset").click(function() {
        /*
        $.ajax({
          url: 'http://172.16.17.245/Set.cmd?CMD=GetPower',
          method: 'GET',
          dataType: 'jsonp',
          beforeSend: function (xhr) { xhr.setRequestHeader ('Authorization', 'Basic YWRtaW46MTIzNDU2Nzg='); }, 
          success: function(val) { 
              // val = <html>p61=0,p62=0,p63=0,p64=0</html>
              var portStatusRead = null;
              console.log(val.toString());

              portStatusRead = val.match('p61=1'); // found the string that indicates that the port is one, otherwise "null"
              if (portStatusRead == null) // light is off
              {
                 port1Status = false; // update status to false to indicate that the light is off
                 $("#light1-on").removeClass("btn-success");
                 $("#light1-off").addClass("btn-danger");
              }
              else // the string p61=1 was found in the status info from the light box, therefore it must be on
              {
                port1Status = true; // update status to true to indicate 
                $("#light1-on").addClass("btn-success");
                $("#light1-off").removeClass("btn-danger");

              }

              portStatusRead = val.match('p62=1'); // found the string that indicates that the port is one, otherwise "null"
              if (portStatusRead == null) // light is off
              {
                 port2Status = false; // update status to false to indicate that the light is off
                 $("#light2-on").removeClass("btn-success");
                 $("#light2-off").addClass("btn-danger");
              }
              else // the string p61=1 was found in the status info from the light box, therefore it must be on
              {
                port2Status = true; // update status to true to indicate 
                $("#light2-on").addClass("btn-success");
                $("#light2-off").removeClass("btn-danger");

              }

              portStatusRead = val.match('p63=1') ;// found the string that indicates that the port is one, otherwise "null"
              if (portStatusRead == null) // light is off
              {
                 port3Status = false; // update status to false to indicate that the light is off
                 $("#light3-on").removeClass("btn-success");
                 $("#light3-off").addClass("btn-danger");
              }
              else // the string p61=1 was found in the status info from the light box, therefore it must be on
              {
                port3Status = true; // update status to true to indicate 
                $("#light3-on").addClass("btn-success");
                $("#light3-off").removeClass("btn-danger");
              }

              portStatusRead = val.match('p64=1'); // found the string that indicates that the port is one, otherwise "null"
              if (portStatusRead == null) // light is off
              {
                 port4Status = false; // update status to false to indicate that the light is off
                 $("#light4-on").removeClass("btn-success");
                 $("#light4-off").addClass("btn-danger");
              }
              else // the string p61=1 was found in the status info from the light box, therefore it must be on
              {
                port4Status = true; // update status to true to indicate 
                $("#light4-on").addClass("btn-success");
                $("#light4-off").removeClass("btn-danger");
              }
              console.log(port1Status)
              if (port1Status == true)
                 statusText = "Light is On"
              $("#statusText1").val(port1Status);
              $("#statusText2").val(port2Status);
              $("#statusText3").val(port3Status);
              $("#statusText4").val(port4Status);
          },
          error: function(xhr, ajaxOptions, thrownError) { console.log(xhr); console.log(ajaxOptions); alert(thrownError); }
        });*/
      });
    });