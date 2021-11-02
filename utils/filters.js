
const { DateTime } = require('luxon')
const slugify = require('slugify');

let defaultZone = 'local'

module.exports = {
    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    htmlDateString: (dateObj) => {
      return DateTime.fromJSDate(dateObj, {
        zone: 'utc'
      }).toFormat('yyyy-LL-dd');
    },
    dateToFormat: (date, format, zone = defaultZone) => {
      return DateTime.fromJSDate(date, {
        zone
      }).toFormat(String(format))
    },
  
    dateToRSS: (date, zone = defaultZone) => {
      return DateTime.fromJSDate(date, {
        zone
      }).toRFC2822()
    },
  
    dateISOtoRSS: (date, zone = defaultZone) => {
      return DateTime.fromISO(date, {
        zone
      }).toRFC2822()
    },
  
    dateISOtoFormat: (date, format, zone = defaultZone) => {
      return DateTime.fromISO(date, {
        zone
      }).toFormat(String(format))
    },
  
    dateToISO: (date, zone = defaultZone) => {
      return DateTime.fromJSDate(date, {
        zone
      }).toISO({
        includeOffset: false,
        suppressMilliseconds: true,
      })
    },
  
    obfuscate: (str) => {
      const chars = []
      for (var i = str.length - 1; i >= 0; i--) {
        chars.unshift(['&#', str[i].charCodeAt(), ';'].join(''))
      }
      return chars.join('')
    },
  
    split: (val, delimiter = '/') => {
      return val.toString().split(delimiter)
    },
  
    slug: function (str) {
      return slugify(str, {
        replacement: '-', // replace spaces with replacement character, defaults to `-`
        remove: /[*+~.()'"!:@?¿]/g, // remove characters that match regex, defaults to `undefined`
        lower: true, // convert to lower case, defaults to `false`
        strict: true, // strip special characters except replacement, defaults to `false`
      })
    },
  
    ltrim: (val, charlist) => {
      return val.toString().replace(new RegExp('^[' + charlist + ']+'), '')
    },
  
    rtrim: (val, charlist) => {
      return val.toString().replace(new RegExp('[' + charlist + ']+$'), '')
    },

    getRating: (rating) =>{
      const wrapper = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>';
      const array = [];
      for (let i = 0; i < rating; i++) {
        array[i] = wrapper;
      };
      return array;
    }
}