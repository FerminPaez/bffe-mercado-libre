const transformToListOfResults = arreglo => {
    const items = []

    arreglo.forEach( item => {
        const {
            id,
            title,
            price,
            currency_id,
            condition,
            shipping: {free_shipping: shipping},
            address: { state_name: address},
            thumbnail
        } = item

        const producto = {
            id,
            title,
            price:{
                currency: currency_id,
                amount:price,
                decimals: 0,
            },
            picture: thumbnail,
            condition,
            free_shipping: shipping,
            address
        }

        items.push(producto)
    })

    return items
}

const getFiveElements = arreglo =>{
    const data = []
    for (let index = 0; index < 5; index++) {
        data.push(arreglo[index]);
    }
    return data
}

const formatItemWithId = ({id,
    title,
    price,
    currency_id,
    pictures,
    condition,
    free_shipping,
    sold_quantity,
    seller_address
    }) =>{

    const objeto = {
        author: {
            name: "Fermin",
            lastname: "Paez"
        },
        address: seller_address.state,
        id,
        title,
        price:{
            currency:currency_id,
            amount: price,
            decimals: 0
        },
        picture : pictures[0].secure_url,
        condition,
        free_shipping,
        sold_quantity,
        description:''}
    return objeto
}


module.exports = {
    transformToListOfResults,
    getFiveElements,
    formatItemWithId
}
