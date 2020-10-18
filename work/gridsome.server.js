const axios = require('axios')

module.exports = function (api) {
  api.loadSource(({ addCollection }) => {
  })

  api.createPages(({ createPage }) => {
    createPage({
      path: '/my-page',
      component: './src/templates/MyPage.vue'
    })
  })

  api.loadSource(async ({ addCollection, store }) => {
    const collection = addCollection('Post')
    const configuration = addCollection('configuration')
    const information = addCollection('information')

    const data = await Promise.all([
      axios.get("https://github-laziji.github.io/static/configuration.json"),
      axios.get("https://api.github.com/users/GitHub-Laziji")
    ])

    const configurate = configuration.addNode(data[0].data)
    const info = information.addNode(data[1].data)
    // 数据预取示例
    collection.addNode({
      id: 1,
      configuration: store.createReference(configurate),
      info: store.createReference(info)
    })
  })
}
