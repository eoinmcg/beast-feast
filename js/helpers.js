$.Helpers = {



  getItem: function(key) {
    var val;
    try {
      val = localStorage.getItem(key);
    } catch (e) {
      val = false;
    }


    if (val === 'true') {
      return true; 
    } else if (val === 'false') {
      return false; 
    } else {
      return val;
    }

  },

  setItem: function(key, val) {

    try {
      localStorage.setItem(key, val);
    } catch (e) {

    }
  }


};
