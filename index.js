/**
 * @author Dan Zajdband <dan.zajdband@gmail.com>
 * @version 0.0.1
 */

/**
 * Module dependencies
 */
var request = require('superagent');

/** @constant {String} */
var API_BASE_URL = "https://api.themoviedb.org/3/";


/**
 * @constructor
 * @param {String} api_key - API key
 * @public
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

/**
 * GET requests
 * @param {String} endpoint
 * @param {Object} opts - query options
 * @param {Function} fn - callback
 * @public
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

/**
 * POST requests
 * @param {String} endpoint
 * @param {Object} opts - query options
 * @param {Function} fn - callback
 * @public
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

/**
 * Auto configuration
 * @param {Function} fn - callback
 * @public
 */
MovieDB.prototype.configure = function(fn) {
  this.get('configuration', {}, function(err, res){
    this.config = this.config || {};
    this.config = res;

    fn && fn.call(this);
  });
};

/**
 * Get full image url (first need to query "configure")
 * @param {String} path - Image path
 * @param {String} size - Image size (defaults to original)
 * @returns {String} full url
 * @public
 */
MovieDB.prototype.getImageURL = function(path, size) {
  if(!this.config) {
    throw new Error("Please fetch config first via MovieDB#configure() method.");
  }
  return this.secure_base_url + (size || "original") + path;
};

/**
 * Get config image sizes (first need to query "configure")
 * @param {String} poster | backdrop | profile | logo
 * @returns {Array} Image sizes
 * @public
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
 * @exports MovieDB
 */
module.exports = MovieDB;
