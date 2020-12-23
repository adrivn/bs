const filters = require('./utils/filters')
const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginNavigation = require('@11ty/eleventy-navigation')

module.exports = (config) => {
  
  //  Adding filters

  Object.keys(filters).forEach((filterName) => {
    config.addFilter(filterName, filters[filterName])
  })

  //  Adding plugins

  config.addPlugin(pluginRss)
  config.addPlugin(pluginNavigation)

  config.addPassthroughCopy({ 'src/assets': 'assets' })
  config.setBrowserSyncConfig({
    files: ['dist/**/*'],
    open: true,
    // Tweak for Turbolinks & Browserstack Compatibility
    snippetOptions: {
      rule: {
        match: /<\/head>/i,
        fn: function (snippet, match) {
          return snippet + match;
        }
      }
    }
  })
  config.setDataDeepMerge(true)

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
  }
}
