const authorsArrToString = (arr, api) => {
    const authorsArr = arr.map((authorObj) => {
        return api == 'contentDeliveryAPI' ? authorObj.author_name 
        : api == 'contentstackGraphQLAPI' ? authorObj.node.author_name 
        : 'no author';        
    });

    return authorsArr.join(', ');
}

export function convertBookObj(obj, api) {
    const authors = api == 'contentDeliveryAPI' ? obj.authors 
        : api == 'contentstackGraphQLAPI' ? obj.authorsConnection.edges
        : '';
    
    return {
        authors: authorsArrToString(authors, api),
        uid: api == 'contentDeliveryAPI' ? obj.uid 
            : api == 'contentstackGraphQLAPI' ? obj.system.uid
            : '',
        imageUrl: api == 'contentDeliveryAPI' ? obj.image.url 
                : api == 'contentstackGraphQLAPI' ? obj.imageConnection.edges[0].node.url
                : '',
        title: obj.book_title,
        description: api == 'contentDeliveryAPI' ? obj.description 
                    : api == 'contentstackGraphQLAPI' ? obj.description.json
                    : '',
        number_of_pages: obj.number_of_pages,
        link: {
          href: obj.link.href,
          title: obj.link.title 
        },
        seo: obj.seo
    }
}