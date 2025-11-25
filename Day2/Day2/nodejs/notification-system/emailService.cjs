function sendEmail(to,message){
    return `Email sent to ${to}: ${message}`
}

function validateEmail(email){
    return email.includes('@')
}

module.exports = {
    sendEmail,
    validateEmail
};