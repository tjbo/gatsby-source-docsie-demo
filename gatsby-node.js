const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const queryResults = await graphql(`
    query AllDocsieBook {
      allDocsieBook {
        nodes {
          id
          name
          slug
          childrenDocsieArticle {
            html
            id
            name
            order
          }
        }
      }
    }
  `)

  const bookTemplate = path.resolve(`src/templates/DocsieBook.js`)

  queryResults.data.allDocsieBook.nodes.forEach((node) => {
    console.log(node.children)
    createPage({
      path: `/${node.slug}`,
      component: bookTemplate,
      context: {
        ...node,
      },
    })
  })
}
