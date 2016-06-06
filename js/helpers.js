$.Helpers = {



  getItem: function(key, def) {
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
      return (def) ? def : val;
    }

  },

  setItem: function(key, val) {

    try {
      localStorage.setItem(key, val);
    } catch (e) {
      console.log(e);
    }
  }


};
