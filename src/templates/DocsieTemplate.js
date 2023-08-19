import React from "react"
import { graphql, useStaticQuery, Link } from "gatsby"

const navQuery = graphql`
  query NavQuery {
    allDocsieNav {
      nodes {
        id
        items {
          id
          order
          name
          slug
          items {
            id
            name
            order
            slug
            items {
              id
              name
              order
              slug
            }
          }
        }
      }
    }
  }
`

const DocsieNav = () => {
  const nav = useStaticQuery(navQuery)

  let navItems = nav.allDocsieNav.nodes.map((n) => {
    return (
      <div>
        {n.items.map((doc) => {
          return (
            <div>
              <b>
                <Link to={doc.slug}>{doc.name}</Link>
              </b>
              <div>
                {doc.items.map((book) => {
                  return (
                    <div>
                      <Link to={book.slugAsHash}>{book.name}</Link>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    )
  })
  return <div>{navItems.map((item) => item)}</div>
}

export default function DocsieBook(props) {
  const { name, childrenDocsieBook } = props.pageContext

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div>
        <DocsieNav></DocsieNav>
      </div>
      <div>
        {childrenDocsieBook.map((book) => {
          console.log("book", book)
          return (
            <>
              <h2>{book.name}</h2>
              {book.childrenDocsieArticle.map((article) => {
                return (
                  <div
                    dangerouslySetInnerHTML={{ __html: article.html }}
                    key={article.id}
                  />
                )
              })}
            </>
          )
        })}
      </div>
    </div>
  )
}
