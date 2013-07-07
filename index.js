
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

  endpoint = endpoint.replace('{id}', opts.id);

  request.get(API_BASE_URL + endpoint)
    .query(opts)
    .end(function(res){
      fn && fn.call(self, res.error, res.body);
    });
};

/*
 * POST requests
 *
 * @param {String} endpoint
 * @param {Object} request body
 * @param {Function} callback
 */

MovieDB.prototype.post = function(endpoint, opts, fn) {
  var self = this;

  endpoint = endpoint.replace('{id}', opts.id);

  request.post(API_BASE_URL + endpoint)
    .query({api_key: this.api_key, session_id: this.session_id})
    .send(opts)
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
 * Get full image url (first need to query "configure")
 *
 * @param {String} Image path
 * @param {String} Image size (defaults to original)
 * @return {String} full url
 */

MovieDB.prototype.getImageURL = function(path, size) {
  if(!this.config) {
    throw new Error("Please fetch config first via MovieDB#configure() method.");
  }
  return this.secure_base_url + (size || "original") + path;
};

/*
 * Get config image sizes (first need to query "configure")
 *
 * @param {String} poster | backdrop | profile | logo
 * @return {Array} Image sizes
 */

MovieDB.prototype.getImageSizes = function(type) {
  if(this.config) {
    return this.config[type + "_sizes"];
  } else {
    throw new Error("Please fetch config first via MovieDB#configure() method.");
  }
};

/*
 * Expose the constructor
 */
module.exports = MovieDB;
