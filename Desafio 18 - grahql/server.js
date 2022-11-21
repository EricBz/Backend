import express from "express"
import Contenedor from "./Contenedor.js"
import { graphqlHTTP } from "express-graphql"
import { buildSchema } from "graphql"

let Productos = Contenedor.getInstance()
const PORT = 8080

const app = express()

app.use(express.static('public'));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let schema = buildSchema(`
   type Productos {
    id: Int!,
    title: String,
    price: Int,
    thumbnail: String
   },
  type Query {
    hello: String,
    getAll: [Productos],
    getAllById (id: ID): Productos
  }
`);

let root = { hello: () => 'Hello world!',
getAll: async () => await Productos.getAll(),
getAllById: async () => await Productos.getAllById(id)

};


app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(PORT, () => console.log(`Now browse to localhost:${PORT}/graphql`));

