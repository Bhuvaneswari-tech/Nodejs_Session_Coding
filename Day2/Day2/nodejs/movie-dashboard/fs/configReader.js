import fs from 'fs'

export function readConfig(){
    return fs.promises.readFile('./config.json','utf-8')
}