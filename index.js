
const express = require('express')
const cors = require('cors');
const axios = require('axios');
const util = require('./utils/transformToListOfResults')

const app = express()

// Configuracion cors

const DIRECTORIO_PERMITIDO_CORS = "http://localhost:3000";
app.use(cors({
  origin: DIRECTORIO_PERMITIDO_CORS
}));

// Fin configuracion cors
const BASE_ROUTE = 'https://api.mercadolibre.com'

const PORT = 3031
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

app.get('/:id', async (req, resp) => {

    const route = `${BASE_ROUTE}/sites/MLA/search?q=${req.params.id}`

    await axios.get(route).then(response => {
        const data = util.getFiveElements(response.data.results)
        const items = util.transformToListOfResults(data)
        const objeto = {
            author: {
                name: "Fermin",
                lastname: "Paez"
            },
            categories: [],
            items
        }

        resp.send(objeto)
    })
})

app.get('/items/:id', async (req, resp) => {
    const route =`${BASE_ROUTE}/items/${req.params.id}`
    const routeDescription = `${BASE_ROUTE}/items/${req.params.id}/description`
    let objeto
    await axios.get(route)
    .then(response => objeto = util.formatItemWithId( response.data ))
    await axios.get(routeDescription)
    .then(response => objeto.description = response.data.plain_text)
    resp.send(objeto)
})
