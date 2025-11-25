export function sendSMS(to,message){
    return `SMS delivered to ${to}:${message}`
}

export const PROVIDER = 'Twilio'