
    
    $(document).ready(function() { 
      
      var getPower = function(callback) {
        console.log("getPower");   
        $.ajax({
          url: '/lights',
          method: 'GET',
          dataType: 'json',
          username: 'admin',
          password: '12345678',
          success: function(val) { 
            console.log("getPower success");
            console.log(val);
            callback(val);
          },
          error: function(xhr, ajaxOptions, thrownError) { 
            console.log("getPower got error");
            console.log(xhr); 
            console.log(ajaxOptions); 
            callback(null); 
          }
        });
      }

      var getPowerCallback = function(lightStatus) {
        if (lightStatus == null) {
          $("#df-error").removeClass("hide");
          $("#df-error").html('<h3>&nbsp;&nbsp; Opps...</h3><p>You can try the eye: <button class="btn btn-warning rereadLights"><i class="icon-eye-open"></i></button></p><p><small>GetPower got null</small></p>');
        }
        if (lightStatus.length && lightStatus.length > 4) {
          for (i=1; i < 5; i++) {
            $("#df-error").addClass("hide");
            var jQuerySelector = '#light' + i;
            if (lightStatus[i] == true) {
              $(jQuerySelector + "-on").addClass("btn-success");
              $(jQuerySelector + "-off").removeClass("btn-danger");
            } else {
              $(jQuerySelector + "-on").removeClass("btn-success");
              $(jQuerySelector + "-off").addClass("btn-danger"); 
            }           
          }
        }
        else
        {
            $("#df-error").removeClass("hide");
            $("#df-error").html('<h3>&nbsp;&nbsp; Opps...</h3><p>You can try the eye: <button class="btn btn-warning rereadLights"><i class="icon-eye-open"></i></button></p><p><small>GetPower results are invalid.</small></p>');
        }
      }
      
      getPower(getPowerCallback);

      
      var setPower = function(port, state, callback) {
        console.log("setPower " + port + ' ' + state);   
        urlGet = '/lights/' + port + '/' + state;
        console.log(urlGet);
        $.ajax({
          url: urlGet,
          method: 'GET',
          dataType: 'json',
          username: 'admin',
          password: '12345678',
          success: function(val) { 
            $("#df-error").addClass("hide");
            console.log("setPower success");
            console.log(val);
          },
          error: function(xhr, ajaxOptions, thrownError) { 
            console.log("setPower got error");
            console.log(xhr); 
            console.log(ajaxOptions); 
            $("#df-error").removeClass("hide");
            $("#df-error").html('<h3>&nbsp;&nbsp; Opps...</h3><p>You can try the eye: <button class="btn btn-warning rereadLights"><i class="icon-eye-open"></i></button></p><p><small>SetPower got an error.</small></p>');
          }
        });
      }
            
      $("#light1-on").click(function() {
          $("#light1-on").addClass("btn-success");
          $("#light1-off").removeClass("btn-danger");
          setPower(1,1);
      });

      $("#light1-off").click(function() {
          $("#light1-on").removeClass("btn-success");
          $("#light1-off").addClass("btn-danger");
          setPower(1,0);
      });

      $("#light2-on").click(function() {
          $("#light2-on").addClass("btn-success");
          $("#light2-off").removeClass("btn-danger");
          setPower(2,1);
      });

      $("#light2-off").click(function() {
          $("#light2-on").removeClass("btn-success");
          $("#light2-off").addClass("btn-danger");
          setPower(2,0);
      });

      $("#light3-on").click(function() {
          $("#light3-on").addClass("btn-success");
          $("#light3-off").removeClass("btn-danger");
          setPower(3,1);
      });

      $("#light3-off").click(function() {
          $("#light3-on").removeClass("btn-success");
          $("#light3-off").addClass("btn-danger");
          setPower(3,0);
      });

      $("#light4-on").click(function() {
          $("#light4-on").addClass("btn-success");
          $("#light4-off").removeClass("btn-danger");
          setPower(4,1);
      });

      $("#light4-off").click(function() {
          $("#light4-on").removeClass("btn-success");
          $("#light4-off").addClass("btn-danger");
          setPower(4,0);
      });

      $(".rereadLights").click(function() {
          $("#df-error").addClass("hide");
          getPower(getPowerCallback);
      });
    });