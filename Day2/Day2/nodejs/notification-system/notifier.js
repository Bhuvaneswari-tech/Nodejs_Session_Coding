import {sendSMS, PROVIDER} from './smsService.mjs'

//require - commonJS
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const emailService = require('./emailService.cjs')

const user = {
    email: 'john@example.com',
    phone: '+917689012345'
}

//using commonJS module
if(emailService.validateEmail(user.email)){
    console.log(emailService.sendEmail(user.email,"Welcome to our service"))
}

//using ES module
console.log(sendSMS(user.phone),'Your OTP is 123456')
console.log(`SMS provider: ${PROVIDER}`)