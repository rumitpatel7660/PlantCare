const mongoose = require('mongoose')
const Schema = mongoose.mongoose.Schema

const userSchema = new Schema({
    email: String,
    billingID: String,
    plan: {type: String, enum: ['basic','standard','premium'], default:'basic'},
    endDate: {type: Date,default: null}
})

const userModel = mongoose.model('user',userSchema,'user')

module.exports = userModel