//  The gql function is used to parse the plain GraphQL code
import gql from 'graphql-tag'

export const ALL_LINKS_QUERY = gql`
  query AllLinksQuery {
    allLinks {
      id
      createdAt
      url
      description
    }
  }
`
