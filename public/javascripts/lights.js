
    
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
          setTimeout(function() { $("#df-error").removeClass("hide"); }, 27*42*7);
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
            setTimeout(function() { $("#df-error").addClass("hide"); }, 27*42*7);
            $("#df-error").html('<h3>&nbsp;&nbsp; Opps...</h3><p>You can try the eye: <button class="btn btn-warning rereadLights"><i class="icon-eye-open"></i></button></p><p><small>GetPower results are invalid.</small></p>');
        }
      }
      
      getPower(getPowerCallback);

      setInterval(function() { getPower(getPowerCallback); }, 42*888);

      setInterval(function() { 
        /*
        var shouldDisplay = function() {
          var randomNo = Math.floor((Math.random()*3)+1);
          console.log('random no = ' + randomNo)
          if (randomNo == 3)
          {
             return false;
          }
          else
          {
            return true;
          }
        };

        $(".randomLight > i").each(function() {
           if (shouldDisplay()) {
            console.log("show random light button");
            $(this).removeClass('hide');
           } else {            
            console.log("hide random light button");
            $(this).addClass('hide');
           } 

        });
        */
        var randomNo = Math.floor((Math.random()*3)+1);
        console.log('random no = ' + randomNo);
        $(".randomLight").each(function() {
          console.log($(this));
          var randomNo = Math.floor((Math.random()*3)+1);
          if (randomNo == 1) {
            console.log('icon-glass');
            $('#randomLightGlass > i').attr('class', 'icon-glass');
            $('#randomLightMusic > i').attr('class', 'icon-music');
            $('#randomLightFire > i').attr('class', 'icon-fire icon-white');

          }
          else if (randomNo == 2)
          {
            console.log('icon-fire');
            $('#randomLightGlass > i').attr('class', 'icon-music');
            $('#randomLightMusic > i').attr('class', 'icon-glass');
            $('#randomLightFire > i').attr('class', 'icon-fire icon-white');
          }
          else if (randomNo == 3)
          {
            console.log('icon-music');
            $('#randomLightGlass > i').attr('class', 'icon-fire');
            $('#randomLightMusic > i').attr('class', 'icon-music');
            $('#randomLightFire > i').attr('class', 'icon-glass icon-white');
          }
        });
      }, 23 * 13);

      
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
            setTimeout(function() { $("#df-error").addClass("hide"); }, 27*42*7);
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
          setTimeout(function() { getPower(getPowerCallback) }, 33*17);
      });

      $("#light1-off").click(function() {
          $("#light1-on").removeClass("btn-success");
          $("#light1-off").addClass("btn-danger");
          setPower(1,0);
          setTimeout(function() { getPower(getPowerCallback) }, 33*17);
      });

      $("#light2-on").click(function() {
          $("#light2-on").addClass("btn-success");
          $("#light2-off").removeClass("btn-danger");
          setPower(2,1);
          setTimeout(function() { getPower(getPowerCallback) }, 33*17);
      });

      $("#light2-off").click(function() {
          $("#light2-on").removeClass("btn-success");
          $("#light2-off").addClass("btn-danger");
          setPower(2,0);
          setTimeout(function() { getPower(getPowerCallback) }, 33*17);
      });

      $("#light3-on").click(function() {
          $("#light3-on").addClass("btn-success");
          $("#light3-off").removeClass("btn-danger");
          setPower(3,1);
          setTimeout(function() { getPower(getPowerCallback) }, 33*17);
      });

      $("#light3-off").click(function() {
          $("#light3-on").removeClass("btn-success");
          $("#light3-off").addClass("btn-danger");
          setPower(3,0);
          setTimeout(function() { getPower(getPowerCallback) }, 33*17);
      });

      $("#light4-on").click(function() {
          $("#light4-on").addClass("btn-success");
          $("#light4-off").removeClass("btn-danger");
          setPower(4,1);
          setTimeout(function() { getPower(getPowerCallback) }, 33*17);
      });

      $("#light4-off").click(function() {
          $("#light4-on").removeClass("btn-success");
          $("#light4-off").addClass("btn-danger");
          setPower(4,0);
          setTimeout(function() { getPower(getPowerCallback) }, 33*17);
      });

      $("#randomLightGlass").click(function() {
          setPower('x',0);
          setTimeout(function() { getPower(getPowerCallback) }, 33*17);
      });

      $("#randomLightMusic").click(function() {
          setPower('x','x');
          setTimeout(function() { getPower(getPowerCallback) }, 33*17);
      });

      $("#randomLightFire").click(function() {
          setPower('x',1);
          setTimeout(function() { getPower(getPowerCallback) }, 33*17);
      });

      $(".rereadLights").click(function() {
          setTimeout(function() { $("#df-error").addClass("hide"); }, 27*42*7);
          getPower(getPowerCallback);
      });
    });