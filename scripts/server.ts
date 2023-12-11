import express from 'express'
import open from 'open'

const app = express()
const port = 5678

app.use(express.static('example'))
app.use(express.static('dist'))

app.listen(port, () => {
  open('http://localhost:5678')
})
