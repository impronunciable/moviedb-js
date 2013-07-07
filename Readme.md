
# moviedb-js

  theMovieDB.org API wrapper

## Installation

  Install with [component(1)](http://component.io):

    $ component install danzajdband/moviedb-js

## API

MovieDB(api_key)
----------------
**Parameters**

**api_key**:  *String* - API key

get(endpoint, opts, fn)
-----------------------
GET requests


**Parameters**

**endpoint**:  *String*

**opts**:  *Object* - query options

**fn**:  *Function*  - callback

post(endpoint, opts, fn)
------------------------
POST requests


**Parameters**

**endpoint**:  *String*

**opts**:  *Object*  - query options

**fn**:  *Function*  - callback

configure(fn)
-------------
Auto configuration


**Parameters**

**fn**:  *Function*  - callback

getImageURL(path, size)
-----------------------
Get full image url (first need to query "configure")


**Parameters**

**path**:  *String*  - Image path

**size**:  *String*  - Image size (defaults to original)

**Returns**

*String*  full url

getImageSizes(poster)
---------------------
Get config image sizes (first need to query "configure")


**Parameters**

**poster**:  *String*  | backdrop | profile | logo

**Returns**

*Array*  Image sizes



## License

  MIT
