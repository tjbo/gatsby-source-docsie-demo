const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const queryResults = await graphql(`
    query AllDocsieDoc {
      allDocsieDoc {
        nodes {
          slug
          id
          name
          order
          childrenDocsieBook {
            name
            order
            id
            slug
            slugAsHash
            childrenDocsieArticle {
              html
              icon
              id
              name
              order
              slug
            }
          }
        }
      }
    }
  `)

  const docTemplate = path.resolve(`src/templates/DocsieTemplate.js`)

  queryResults.data.allDocsieDoc.nodes.forEach((node) => {
    createPage({
      path: `${node.slug}`,
      component: docTemplate,
      context: {
        ...node,
        slug: `${node.slug}`,
      },
    })
  })
}
