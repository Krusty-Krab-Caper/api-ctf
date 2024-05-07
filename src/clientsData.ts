import { getSecrets } from "./gameSecrets"
import { randomToken } from "./util" 
import { emplids } from "./directoryData"

export type ClientRegistryEntry = {
    clientId: string
    name: string
}

export type ClientCredentialPair = {
    clientId: string
    secret: string
}

export type EmployeeAccessRecord = {
    emplid: string,
    clientIds: string[]
}

export const clientIds: string[] = [
    '1c681009271276fa3d136350ea0ecaebd88b2241',
    'c98530b6ae8b570e111a27a3677ebff8f5a3fd82',
    'da0eeba3c80538ff355b9a646cdc644dd5eb84c6',
    '21a3ab5b141ff4d75d45ee81c47f7ffd872d7510',
    '664e47dd45902c4f579159c2d5b3dec09db3c6ba',
    '84b18fe78129a284441954576e023eb6e7b4e063',
    '8e4a4ffda6a56d777fea36eb3b71c615739f6ef8',
    '284b2f54e01d5fd62b71e96cb64f94d3ca2471b5',
    '169c8487063994fa737181358d1a63edac548259',
    '3f3af70ac4f5e17606975a442c6eec24e3c28be9',
]

export const employeeClientAccessData: Map<string, EmployeeAccessRecord> = new Map()

employeeClientAccessData.set('Bearer ' + getSecrets().adminBearerToken, {
    emplid: getSecrets().adminEmplid,
    clientIds: clientIds
})

employeeClientAccessData.set('Bearer ' + randomToken(), {
    emplid: emplids[9],
    clientIds: [clientIds[3], clientIds[5]]
})

employeeClientAccessData.set('Bearer ' + randomToken(), {
    emplid: emplids[16],
    clientIds: [clientIds[2]]
})

employeeClientAccessData.set('Bearer ' + randomToken(), {
    emplid: emplids[27],
    clientIds: [clientIds[4]]
})

employeeClientAccessData.set('Bearer ' + randomToken(), {
    emplid: emplids[40],
    clientIds: [clientIds[4]]
})


const clientSecrets: string[] = [
    '5d76c46026da28224b856c8d1170c91c065b2870',
    '2725899462086b8bf7af134ec79357c171d19020',
    'eddd8d9ae7a14d907fff78672264ed0810c5e376',
    '415a430728bc674164d0feee2c7ff7581ec28089',
    'b0325108ef8318b84828c6acdfc1cc14e28da7f2',
    '037844481ded20f12e958823570ac3fc4125af8f',
    '9a4103f5ec03cbddcfbfe73e580853d674de02d0',
    '779800b645b0167831f0048d492258dcd56e4519',
    '171760915a795d8dc0f340b981fabfbe237ee7c4',
    'a1c5012745bd810a15e98b6bff32a9559d5dab17',
]

export const clientCredentials: ClientCredentialPair[] = []

for (let i = 0; i < 10; i++){
    clientCredentials.push(
        { clientId: clientIds[i],
          secret: clientSecrets[i]   
        }
    )
}

export const clientRegistryData: Map<string, ClientRegistryEntry> = new Map()

clientRegistryData.set(clientIds[0], {
    clientId: clientIds[0],
    name: 'Krabby Patty Tracker'
})


clientRegistryData.set(clientIds[1], {
    clientId: clientIds[1],
    name: 'Fry Cook Assistant'
})


clientRegistryData.set(clientIds[2], {
    clientId: clientIds[2],
    name: 'Krusty Kiosk'
})


clientRegistryData.set(clientIds[3], {
    clientId: clientIds[3],
    name: 'Seahorse Delivery'
})


clientRegistryData.set(clientIds[4], {
    clientId: clientIds[4],
    name: 'Chum Bucket Alert'
})


clientRegistryData.set(clientIds[5], {
    clientId: clientIds[5],
    name: 'Bikini Bottom Weather Forecast'
})


clientRegistryData.set(clientIds[6], {
    clientId: clientIds[6],
    name: 'Jellyfish Jam Radio'
})


clientRegistryData.set(clientIds[7], {
    clientId: clientIds[7],
    name: 'Krusty Krab Rewards'
})


clientRegistryData.set(clientIds[8], {
    clientId: clientIds[8],
    name: 'Barnacle Wi-Fi'
})

clientRegistryData.set(clientIds[9], {
    clientId: clientIds[9],
    name: 'KRABBY PATTY SECRET FORMULA VAULT'
})
