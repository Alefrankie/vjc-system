const withImages = require('next-images')
const withPlugins = require('next-compose-plugins')
const path = require('path')

const imagePlugin = withImages({
  inlineImageLimit: 16384,
  useFileSystemPublicRoutes: true,
  webpack (config, options) {
    config.module.rules.push({
      test: /\.(eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader'
      }
    })
    config.resolve.modules.push(path.resolve('./'))
    return config
  }
})

module.exports = withPlugins([imagePlugin])
