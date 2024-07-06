const bcrypt = require('bcryptjs')

const saltRounds = 10

const testPass = '123456'

const salt = bcrypt.genSaltSync(saltRounds)
const hash = bcrypt.hashSync(testPass, salt)

console.log('Resultado', hash)