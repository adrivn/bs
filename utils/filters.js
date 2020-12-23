const {
  DateTime
} = require('luxon');
const slugify = require('slugify');


let defaultZone = 'local'

module.exports = {
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
}