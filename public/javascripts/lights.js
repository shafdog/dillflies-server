
    $(document).ready(function() { 
      
      getPower = function(callback) {
        console.log("getPower");   
        $.ajax({
          url: '/lights',
          method: 'GET',
          dataType: 'json',
          username: 'admin',
          password: '12345678',
          success: function(val) { 
            console.log("getPower success"
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
      
      setPower = function(port, state) {
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
            console.log("setPower success");
            console.log(val);
          },
          error: function(xhr, ajaxOptions, thrownError) { 
            console.log("setPower got error");
            console.log(xhr); 
            console.log(ajaxOptions); 
            alert(thrownError); 
          }
        });
      }
      
      getPowerCallback = function(lightStatus) {
        if (lightStatus == null) {
          alert('could not get light status');
        }
        for (i=1; i < 5; i++) {
          var jQuerySelector = '#light' + i;
          if (lightStatus[i] == true)
            $(jQuerySelector + "-on").addClass("btn-success");
            $(jQuerySelector + "-off").removeClass("btn-danger");
          else
            $(jQuerySelector + "-on").removeClass("btn-success");
            $(jQuerySelector + "-off").addClass("btn-danger");            
        }
      });
      
      // getPower(getPowerCallback);
      
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

      $("#reset").click(function() {
          getPower(getPowerCallback);
      });
    });