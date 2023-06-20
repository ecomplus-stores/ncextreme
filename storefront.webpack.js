const path = require('path')

module.exports = () => ({
  resolve: {
    alias: {
      './html/APrices.html': path.resolve(__dirname, 'template/js/custom-js/html/APrices.html'),
      './html/TheProduct.html': path.resolve(__dirname, 'template/js/custom-js/html/TheProduct.html'),
      './html/ProductGallery.html': path.resolve(__dirname, 'template/js/custom-js/html/ProductGallery.html'),
      './js/ProductGallery.js': path.resolve(__dirname, 'template/js/custom-js/js/ProductGallery.js'),
      './scss/ProductGallery.scss': path.resolve(__dirname, 'template/js/custom-js/scss/ProductGallery.scss')
    }
  }
})