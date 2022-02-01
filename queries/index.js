import gql from 'graphql-tag';

export const BOOKS_QUERY = gql`
query allBook ($limit: Int!, $skip: Int!) {
    all_book (limit: $limit, skip: $skip) {
        total
        items {
            number_of_pages
            book_title
            description {
                json
            }
            link {
                href
                title
            }
            authorsConnection {
                edges {
                    node {
                        ... on Author {
                            title
                            author_name
                        }
                    }
                }
            }
            imageConnection {
                edges {
                    node {
                        title
                        url
                        content_type
                        filename
                        file_size
                        description
                    }
                }
            }
            system {
                uid
            }
        }
    }
}
`;


