'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.favoritesGET = function favoritesGET (req, res, next) {
  Default.favoritesGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.hotelPOST = function hotelPOST (req, res, next, body) {
  Default.hotelPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.hotelhotelIDFavoritePOST = function hotelhotelIDFavoritePOST (req, res, next) {
  Default.hotelhotelIDFavoritePOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.hotelhotelIDGET = function hotelhotelIDGET (req, res, next) {
  Default.hotelhotelIDGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.hotelhotelIDPATCH = function hotelhotelIDPATCH (req, res, next, body) {
  Default.hotelhotelIDPATCH(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.hotelhotelIDUnfavoritePOST = function hotelhotelIDUnfavoritePOST (req, res, next) {
  Default.hotelhotelIDUnfavoritePOST()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.hotelsGET = function hotelsGET (req, res, next, name, address) {
  Default.hotelsGET(name, address)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.loginPOST = function loginPOST (req, res, next, body) {
  Default.loginPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.logoutDELETE = function logoutDELETE (req, res, next) {
  Default.logoutDELETE()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.registerPOST = function registerPOST (req, res, next, body) {
  Default.registerPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.reviewPOST = function reviewPOST (req, res, next, body) {
  Default.reviewPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.review_per_hotelhotelIDGET = function review_per_hotelhotelIDGET (req, res, next) {
  Default.review_per_hotelhotelIDGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.reviewreviewIDGET = function reviewreviewIDGET (req, res, next) {
  Default.reviewreviewIDGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.reviewreviewIDToggle_reactionPOST = function reviewreviewIDToggle_reactionPOST (req, res, next, body) {
  Default.reviewreviewIDToggle_reactionPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
