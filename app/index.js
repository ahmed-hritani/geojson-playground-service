const dotenv = require('dotenv')
const path = require('path')
const app = require('./server')

dotenv.config({ path: path.join(__dirname, '..', '.env') })

const PORT = process.env.PORT || 3000

app.listen(3000, () => {
  console.log('Server started at:', PORT)
})
