type ClientRegistryEntry = {
    clientId: string
    name: string
}

const clientIds: string[] = [
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
    'bee943ee5aa1fc8e2fb6fb69d03e94e137adabd4',
    'be7c9e86cb04f057bb770dbeadcedd7622da47ee',
    '36b30132081a176babc17c186bbfcd908f4c2005',
    '9833139f07e82f640f8781218045a30897e1d127',
    '4fe74ef55eda5feb6bbd6a53f737f7d80417feae',
    '001b45210a9f52ae3efe28a59e2dffb3b79d44e4',
    '2d6e52224ce5f3a41bc8ccae58ceec08efcec58c',
    'b5eb74647c4b2d1a864f566ef0d181b01fe5ab4b',
    '936f7bbdd69a79badf72cde5043acce6eed643fd',
    '1a10c31965855b19a94ab4b82e2485e790d22cdb',
    '54ac9717fcc37a1982c7dd956ee4a79fb67d2057',
    '4bcde99e5516ec3618a0ef2bdad6ddb5006b6c9d',
    '1b21fd89507b3e4bc23ac523f1d2d1b650e9b300',
    '54acdfbd22894113357e9af522d98fcb84a20ac4',
    '0100a75f90cd91e0c9e650147d309c2f0a5d4661',
    '3a36015886ffbf4b2b9c746b354a91229025c25d',
    '334d1eba362f52131d2c7e18725c1888f08f65c1',
    'fe2fc38a7b0803dd532940c767dabb77d61d61ec',
    '23019102c7103290665ecbb5a08f845376836db4',
    'babaf0aa9b284dfb4f22fa7bec1ca387f8497784',
]

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
    '1c552810e3dae7ed939dac1a99b3d65c2d01f5c2',
    'd4f00f3aff04315bce6bccc48382e0a985d336e8',
    '49d20ebfec85bd321b6438bd84214cf674077a07',
    '3670ca6a6ddbd533584376189700b2681d7ba074',
    'fa13bc432c1bd3963a2951b33cd6162e78298a0b',
    'efa78910b03a7996596ab262012e5e5cd7fce19f',
    '7dc624f72d866cdf9ffd8bfb1dc929dd499d6c5b',
    '9ff11be853f08044b9236c84b138f163d7203d12',
    '618915b2e99f10eab0bcdfd4597973eb1e5b4dbb',
    '3693f31aa05169a17d96a86d7db11807f91aa4af',
    'b1e5c5ea0822a650ff4d33ebfd53d8af4fc1b737',
    '03ad79f6390fbb38c25e689cb9b84799ef7f17d2',
    'ece4b35600931e5eb17398a13d641689dc126cf7',
    'c3b07b5f08a31ad80735d074c2c2eb5141554bdf',
    'a051f5f3b1f36758ba79088aa2766dbb537919f2',
    'd553a9db746e7fda1f60c11e3bed74cd840ff75a',
    'a246ca408319ac898f47923677aefb016bba13cf',
    'f48ab9484c17bf69f825630ce64ecfd4d0b862f9',
    '65adc29ab3557f39adf0fd7bec717a4bdbe6fd26',
    'c41fb0580ce750234c32df486a82b14ee71f114f',
]

export const clientRegistryData: Map<string, ClientRegistryEntry> = new Map()

clientRegistryData.set(clientIds[0], {
    clientId: clientIds[0],
    name: 'This is one of the apps I suppose'
})

