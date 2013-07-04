
/*
 * Module dependencies
 */
var request = require('superagent');

/*
 * Constants
 */

var API_BASE_URL = "https://api.themoviedb.org/3/";


/*
 * Constructor
 *
 * @param {String} API key
 * @api public
 */
function MovieDB(api_key) {
  if(!(this instanceof MovieDB)) {
    return new MovieDB(api_key);
  }

  if("string" != typeof api_key) {
    throw new Error("Please provide a valid api key");
  }

  this.api_key = api_key;
}

/*
 * GET requests
 *
 * @param {String} endpoint
 * @param {Object} query options
 * @param {Function} callback
 */

MovieDB.prototype.get = function(endpoint, opts, fn) {
  var self = this;
  opts.api_key = this.api_key;

  request.get(API_BASE_URL + endpoint)
    .query(opts)
    .end(function(res){
      fn && fn.call(self, res.error, res.body);
    });
};

/*
 * Auto configuration
 */

MovieDB.prototype.configure = function(fn) {
  this.get('configuration', {}, function(err, res){
    this.config = this.config || {};
    this.config = res;

    fn && fn.call(this);
  });
};

/*
 * Expose the constructor
 */
module.exports = MovieDB;
