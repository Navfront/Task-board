const ghPages = require('gh-pages')
const path = require('path')

function deploy(cb) {
  ghPages.publish(path.join(process.cwd(), './build'), cb)
}

deploy(() => {
  console.log('Deployed!')
})
