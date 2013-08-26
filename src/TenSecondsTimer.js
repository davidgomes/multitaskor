TenSecondsTimer = (function() {
  function constructor() { }

  constructor.prototype = {
    start: function() {
      this.time = 10;
      this.callOneSecondTimer();
    },

    callOneSecondTimer: function() {
      if (this.time == 0) return;

      var self = this;

      var oneSecondTimer = setTimeout(function() {
        if (self.time < 5 && self.time != 1) {
          document.getElementById("beep").play();
        }
        
        self.time -= 1;

        self.callOneSecondTimer();
      }, 1000);
    },

    draw: function() {
      currentFont = "20px pixel";
      drawString(this.time, 635, 25, "black", "right");
    }
  };

  return constructor;
})();
