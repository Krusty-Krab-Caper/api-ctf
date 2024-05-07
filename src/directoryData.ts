import { sha1 } from './util'
import { getSecrets } from './gameSecrets'

export type DirectoryEntry = {
    name: string,
    emplid: string,
    dob: string,
    jobTitle: string
}

export const emplids = [
    '209e651a-a6e7-4242-907a-4760bc3772b7',
    'e87930a6-3552-49af-b8d1-0a185d1721a2',
    'c1d28155-2b79-4d5c-8f85-9d56d8b5c736',
    '4279293a-07f1-4cba-82fa-3628e1aa0d06',
    '89264c2a-44a0-4da8-be82-d9f046d85861',
    'd2ece6aa-7f06-472e-898b-0bc61608121f',
    '05f030c3-5425-495b-8957-47e5ae8139c8',
    'f62fd52d-00e8-497f-b562-ded019d5c8ab',
    '27847b4d-e7ac-46f4-86e8-bf709120548a',
    '05e9499b-0ca2-4bd1-a648-61710058d1fc',
    '2c935fd9-fe64-42d3-ba3e-d16da6ad68c0',
    '74d0bf99-5771-45d3-851a-c36747585839',
    'ee6f383e-04e6-4ec9-853c-32c4cbcbf8cc',
    '138b7f10-4f27-4617-8528-cc71b3adbfe4',
    'b617f441-02bc-450b-968f-9097cbcdf77a',
    'f1418ca1-1d59-4adb-93b6-277a0ea0e31e',
    'af973fcb-6b65-4959-ada0-d346fe8bd04b',
    'b5e3e6fb-0c33-46ae-9c98-491e7f16c9a9',
    'b2a32a43-eaa8-4510-bfbe-6b94c1f9d1f6',
    '29bf281a-91d8-433b-8477-4a6a202b539f',
    '41ea1679-51b2-4658-8787-cab1531e918e',
    'ebc150f5-0be9-4dcb-8f08-a34b2801175e',
    '194a977a-7a6e-43cd-a24b-5c233e26746b',
    '5a16d6ef-c12e-4138-a96e-047393b158ef',
    '3c4bc086-4cb4-43d1-9d32-281f795eee84',
    '5c9c0cef-217b-4975-91f5-7d27028f4e7a',
    '858bc587-823b-4d0d-abcc-9e2133e3150a',
    '0d9e4a50-7bc1-4d7f-af88-3bfafd9b033f',
    '78888b53-98b9-4079-b8b3-112b01cad7dc',
    'ecc20e28-082c-4a69-a315-c95ba4b10101',
    '79d6eba8-71de-4f5e-bb1e-2d12822c6894',
    '4ce23d46-6605-4d65-aa37-61c3b6808d4b',
    '4d669895-7fb7-4156-8912-354b5944b26a',
    'f08315cb-9650-41f8-ba2a-7a1f7535e65c',
    '6c6992d2-045e-4ce5-ac18-74ea9b161d76',
    '586e6465-99ff-44a6-b166-61a5b5c1a136',
    'd508553c-1a6d-418e-812b-101f45aef4ef',
    '957e6375-e252-4b62-a187-2202b9349916',
    '72ea241e-7829-444a-a955-708f609c7ea0',
    '801dfd2b-d64a-40be-8f88-ac5c77a47ce7',
    '156cb5ef-d95e-40f0-89cc-2dd4718241c3',
    '1ca63e55-f4a1-42f9-acbd-3a6f3b7b0f7f',
    '51948e77-4ffd-4d69-a38f-4b26749d686a',
    '21a4c82b-9362-4db3-be3b-f21e127fc349',
    'e9e74354-b511-4014-ad3c-aef6a12c6c11',
    '8cbe6c7a-f0ff-42cd-aaf7-d67429c7bab1',
    '95c9af50-4347-4a8d-898b-0dfdb61cdab5',
    'ab336ec3-5e4a-4a86-8cf2-d92004b119dc',
    '6f5efdc1-eda9-4a9a-aef4-7529059d81d4',
    '1af4878a-a6d1-4b5d-8cc2-384e818e7d37',
    '4b3ad1af-8932-49bb-be1f-8207a0983336',
    'e13c4479-af77-493c-96e1-461bdf529843',
    '53686a53-4adf-4672-8339-7d10ec7502b0',
    'd26c036f-f40a-475d-9d62-917957fcaf15',
    '774b0230-342a-475a-ab20-f556ef433c45',
    '03a0f9d9-7776-480e-abd7-37284c3443f2',
    '0670482e-47ad-45e9-a965-f45bb63e626d',
    '3eefdcdf-4d2e-43c3-b88d-a0ea76eb2453',
    '38ca417e-aaa9-4e09-9477-061088a4e198',
    'b9e8c4cb-cbdf-413a-bd08-795bdcaacdc9',
    '147a1458-b4db-4d26-869b-4e2bd2ee611d',
    'e384ce83-e109-4002-a1ab-1cda75f6086d',
    'bd9c80c5-43dd-4fbd-9ae8-56c5ddb5fb4c',
    'cd43dc65-7e14-4699-b3c6-5a74ff356dda',
    '529e5d49-88a5-4d16-9d0b-d83d58c2a8bd',
    'acb14391-14a5-4d6a-b7be-2515122be2f7',
    'e0273484-3db4-4c20-89a7-7126b3033d9b',
    'b04697cc-cfbe-4dbf-9d76-312dbbc7ec58',
    '2eae852c-e633-434b-9c71-7c68a0566350',
    '68942be0-b505-413a-abfb-94b0964b64e8',
    'fc6a9b2b-4cd2-48cd-8420-9e77b9e77702',
    '5b48d0fe-d3dd-48b4-9c90-e223a3b40a90',
    '0e4b6d1d-f529-4440-8b97-1ca635d5a51f',
    '66648e1d-a498-4168-9440-e1e14e7540b2',
    '45ba45f0-cf93-4065-815b-d8df563b1259',
    '4906c258-0ff4-4bc5-811f-43691efcc647',
    'dcf20bbf-ac0a-4fc2-99b6-1cbe816f1274',
    'bef125e2-bd73-497c-b286-0dd18ff45199',
    '7db6b019-2b9c-4b15-8d85-9f221c075c9b',
    'ce3ce34d-909d-44f7-9a16-63448f5bf5b6',
    '42ae5a40-0730-44af-a41c-a846a30e2d88',
    'ae01036c-d8b7-42f8-99a9-e1b0d90ccfa0',
    'f42e3136-f5bd-415f-9b15-d478ba4756ff',
    '812f49a9-4218-44b5-89d5-a355b7aa378c',
    'fcd6ad73-ca93-43ed-b39a-9481b357d57c',
    'd0ca326a-721c-4ad0-9da3-8b2909784d1c',
    'eb46e939-c80c-4428-91b0-6fabb300618c',
    'cfdf15e8-dd8c-4d4b-b667-9c6a0b2e355b',
    '4a83a8c1-c4ef-4211-bad2-34565c8c2428',
    '5bb1d94c-711a-4942-b61f-b2f7b6a9e6ec',
    'f33bc5b8-0abc-43e0-9510-145040ba27f8',
    '01682344-9b87-4bd1-bdd1-a3d7bd3fc25c',
    '90557116-0b6c-472f-bd84-559982cc9dbc',
    '7128745e-0dc3-4549-9a02-ee7b31ae3747',
    'a60c817b-f0f1-4430-bd07-be1505027631',
    '1b6454ca-6535-4a77-aa63-b3ed85efc09a',
    '12955fa5-df7d-4cda-8982-5f303b624678',
    '16189a2d-77fa-419c-87e7-407771c4744c',
    '53276b91-2efd-47cc-8083-39af7adb0b9d',
    '98366100-4644-49b0-8a29-d282a44fe848'
]

export const directoryData: Map<string, DirectoryEntry> = new Map()

directoryData.set('Marina Seashell', {
    name: 'Marina Seashell',
    emplid: emplids[0],
    dob: '1963/11/18',
    jobTitle: 'Scrum Coach'
})

directoryData.set('Sandy Triton', {
    name: 'Sandy Triton',
    emplid: emplids[1],
    dob: '1987/3/7',
    jobTitle: 'Janitor'
})

directoryData.set('Finley Triton', {
    name: 'Finley Triton',
    emplid: emplids[2],
    dob: '1989/8/5',
    jobTitle: 'Accountant'
})

directoryData.set('Coralie Coraline', {
    name: 'Coralie Coraline',
    emplid: emplids[3],
    dob: '1994/3/11',
    jobTitle: 'Programmer'
})

directoryData.set('Coralis Guppy', {
    name: 'Coralis Guppy',
    emplid: emplids[4],
    dob: '1966/7/3',
    jobTitle: 'Scrum Coach'
})

directoryData.set('Nemo Coralis', {
    name: 'Nemo Coralis',
    emplid: emplids[5],
    dob: '1994/8/1',
    jobTitle: 'Janitor'
})

directoryData.set('Shelly Triton', {
    name: 'Shelly Triton',
    emplid: emplids[6],
    dob: '1974/3/13',
    jobTitle: 'Receptionist'
})

directoryData.set('Coralis Marina', {
    name: 'Coralis Marina',
    emplid: emplids[7],
    dob: '1983/6/19',
    jobTitle: 'Security Engineer'
})

directoryData.set('Sebastian Dory', {
    name: 'Sebastian Dory',
    emplid: emplids[8],
    dob: '1972/9/24',
    jobTitle: 'Janitor'
})

directoryData.set('Finley Seashell', {
    name: 'Finley Seashell',
    emplid: emplids[9],
    dob: '1963/7/19',
    jobTitle: 'Systems Designer'
})

directoryData.set('Clammy Coral', {
    name: 'Clammy Coral',
    emplid: emplids[10],
    dob: '1978/8/6',
    jobTitle: 'Security Engineer'
})

directoryData.set('Clammy Coralia', {
    name: 'Clammy Coralia',
    emplid: emplids[11],
    dob: '1972/4/29',
    jobTitle: 'Receptionist'
})

directoryData.set('Finley Coraline', {
    name: 'Finley Coraline',
    emplid: emplids[12],
    dob: '1976/2/22',
    jobTitle: 'Programmer'
})

directoryData.set('Sandy Coralynn', {
    name: 'Sandy Coralynn',
    emplid: emplids[13],
    dob: '1972/10/18',
    jobTitle: 'Systems Designer'
})

directoryData.set('Bubbles Sebastian', {
    name: 'Bubbles Sebastian',
    emplid: emplids[14],
    dob: '1972/8/21',
    jobTitle: 'Accountant'
})

directoryData.set('Coral Coralis', {
    name: 'Coral Coralis',
    emplid: emplids[15],
    dob: '1975/11/22',
    jobTitle: 'Scrum Coach'
})

directoryData.set('Coralynn Seashell', {
    name: 'Coralynn Seashell',
    emplid: emplids[16],
    dob: '1965/1/29',
    jobTitle: 'Systems Designer'
})

directoryData.set('Clammy Coral', {
    name: 'Clammy Coral',
    emplid: emplids[17],
    dob: '1965/11/28',
    jobTitle: 'Scrum Coach'
})

directoryData.set('Finley Coralyn', {
    name: 'Finley Coralyn',
    emplid: emplids[18],
    dob: '1988/3/3',
    jobTitle: 'Receptionist'
})

directoryData.set('Dory Triton', {
    name: 'Dory Triton',
    emplid: emplids[19],
    dob: '1975/1/29',
    jobTitle: 'Receptionist'
})

directoryData.set('Triton Pearl', {
    name: 'Triton Pearl',
    emplid: emplids[20],
    dob: '1988/1/7',
    jobTitle: 'Project Manager'
})

directoryData.set('Anemone Guppy', {
    name: 'Anemone Guppy',
    emplid: emplids[21],
    dob: '1997/6/26',
    jobTitle: 'Programmer'
})

directoryData.set('Clammy Triton', {
    name: 'Clammy Triton',
    emplid: emplids[22],
    dob: '1997/9/8',
    jobTitle: 'Scrum Coach'
})

directoryData.set('Sebastian Anemone', {
    name: 'Sebastian Anemone',
    emplid: emplids[23],
    dob: '1980/8/9',
    jobTitle: 'Scrum Coach'
})

directoryData.set('Coralyn Bubbles', {
    name: 'Coralyn Bubbles',
    emplid: emplids[24],
    dob: '1982/3/9',
    jobTitle: 'Systems Designer'
})

directoryData.set('Flounder Coralie', {
    name: 'Flounder Coralie',
    emplid: emplids[25],
    dob: '1969/3/30',
    jobTitle: 'Accountant'
})

directoryData.set('Finley Guppy', {
    name: 'Finley Guppy',
    emplid: emplids[26],
    dob: '1997/9/12',
    jobTitle: 'Programmer'
})

directoryData.set('Triton Coralyn', {
    name: 'Triton Coralyn',
    emplid: emplids[27],
    dob: '1963/8/22',
    jobTitle: 'Security Engineer'
})

directoryData.set('Bubbles Coralyn', {
    name: 'Bubbles Coralyn',
    emplid: emplids[28],
    dob: '1989/10/25',
    jobTitle: 'Receptionist'
})

directoryData.set('Coralynn Clammy', {
    name: 'Coralynn Clammy',
    emplid: emplids[29],
    dob: '1969/1/3',
    jobTitle: 'Janitor'
})

directoryData.set('Coral Coralyn', {
    name: 'Coral Coralyn',
    emplid: emplids[30],
    dob: '1969/11/23',
    jobTitle: 'Receptionist'
})

directoryData.set('Barnacle Coraline', {
    name: 'Barnacle Coraline',
    emplid: emplids[31],
    dob: '1961/1/3',
    jobTitle: 'Project Manager'
})

directoryData.set('Sebastian Coralis', {
    name: 'Sebastian Coralis',
    emplid: emplids[32],
    dob: '1972/9/12',
    jobTitle: 'Receptionist'
})

directoryData.set('Marina Nemo', {
    name: 'Marina Nemo',
    emplid: emplids[33],
    dob: '1968/4/20',
    jobTitle: 'Project Manager'
})

directoryData.set('Sandy Coralia', {
    name: 'Sandy Coralia',
    emplid: emplids[34],
    dob: '1984/4/5',
    jobTitle: 'Janitor'
})

directoryData.set('Marina Finley', {
    name: 'Marina Finley',
    emplid: emplids[35],
    dob: '1970/11/7',
    jobTitle: 'Janitor'
})

directoryData.set('Seaweed Pearl', {
    name: 'Seaweed Pearl',
    emplid: emplids[36],
    dob: '1986/8/2',
    jobTitle: 'Systems Designer'
})

directoryData.set('Triton Bubbles', {
    name: 'Triton Bubbles',
    emplid: emplids[37],
    dob: '1999/7/3',
    jobTitle: 'Project Manager'
})

directoryData.set('Coralio Flounder', {
    name: 'Coralio Flounder',
    emplid: getSecrets().adminEmplid,
    dob: '1964/7/20',
    jobTitle: 'Systems Administrator'
})

directoryData.set('Coralia Sebastian', {
    name: 'Coralia Sebastian',
    emplid: emplids[39],
    dob: '1970/1/10',
    jobTitle: 'Janitor'
})

directoryData.set('Guppy Shelly', {
    name: 'Guppy Shelly',
    emplid: emplids[40],
    dob: '1994/10/10',
    jobTitle: 'Security Engineer'
})

directoryData.set('Guppy Squidward', {
    name: 'Guppy Squidward',
    emplid: emplids[41],
    dob: '1960/5/15',
    jobTitle: 'Programmer'
})

directoryData.set('Nemo Flounder', {
    name: 'Nemo Flounder',
    emplid: emplids[42],
    dob: '1987/1/29',
    jobTitle: 'Project Manager'
})

directoryData.set('Finley Coralyn', {
    name: 'Finley Coralyn',
    emplid: emplids[43],
    dob: '1994/10/5',
    jobTitle: 'Security Engineer'
})

directoryData.set('Dory Seaweed', {
    name: 'Dory Seaweed',
    emplid: emplids[44],
    dob: '1961/8/11',
    jobTitle: 'Janitor'
})

directoryData.set('Seaweed Seaweed', {
    name: 'Seaweed Seaweed',
    emplid: emplids[45],
    dob: '1974/7/10',
    jobTitle: 'Accountant'
})

directoryData.set('Pearl Seashell', {
    name: 'Pearl Seashell',
    emplid: emplids[46],
    dob: '1985/8/22',
    jobTitle: 'Project Manager'
})

directoryData.set('Coralis Pearl', {
    name: 'Coralis Pearl',
    emplid: emplids[47],
    dob: '1972/3/18',
    jobTitle: 'Programmer'
})

directoryData.set('Seaweed Dory', {
    name: 'Seaweed Dory',
    emplid: emplids[48],
    dob: '1985/7/30',
    jobTitle: 'Programmer'
})

directoryData.set('Shelly Coralynn', {
    name: 'Shelly Coralynn',
    emplid: emplids[49],
    dob: '1971/6/5',
    jobTitle: 'Janitor'
})

directoryData.set('Coralia Bubbles', {
    name: 'Coralia Bubbles',
    emplid: emplids[50],
    dob: '1972/3/3',
    jobTitle: 'Receptionist'
})

directoryData.set('Coralie Coralynn', {
    name: 'Coralie Coralynn',
    emplid: emplids[51],
    dob: '1979/1/22',
    jobTitle: 'Security Engineer'
})

directoryData.set('Nemo Seaweed', {
    name: 'Nemo Seaweed',
    emplid: emplids[52],
    dob: '1992/2/17',
    jobTitle: 'Janitor'
})

directoryData.set('Seaweed Flounder', {
    name: 'Seaweed Flounder',
    emplid: emplids[53],
    dob: '1990/9/12',
    jobTitle: 'Accountant'
})

directoryData.set('Guppy Barnacle', {
    name: 'Guppy Barnacle',
    emplid: emplids[54],
    dob: '1976/10/26',
    jobTitle: 'Programmer'
})

directoryData.set('Squidward Sebastian', {
    name: 'Squidward Sebastian',
    emplid: emplids[55],
    dob: '1981/2/9',
    jobTitle: 'Scrum Coach'
})

directoryData.set('Barnacle Dory', {
    name: 'Barnacle Dory',
    emplid: emplids[56],
    dob: '1984/5/9',
    jobTitle: 'Receptionist'
})

directoryData.set('Anemone Squidward', {
    name: 'Anemone Squidward',
    emplid: emplids[57],
    dob: '1998/2/14',
    jobTitle: 'Receptionist'
})

directoryData.set('Coral Nemo', {
    name: 'Coral Nemo',
    emplid: emplids[58],
    dob: '1985/11/28',
    jobTitle: 'Security Engineer'
})

directoryData.set('Seaweed Bubbles', {
    name: 'Seaweed Bubbles',
    emplid: emplids[59],
    dob: '1988/10/16',
    jobTitle: 'Systems Designer'
})

directoryData.set('Seashell Finley', {
    name: 'Seashell Finley',
    emplid: emplids[60],
    dob: '1978/4/5',
    jobTitle: 'Systems Designer'
})

directoryData.set('Seaweed Bubbles', {
    name: 'Seaweed Bubbles',
    emplid: emplids[61],
    dob: '1982/7/13',
    jobTitle: 'Scrum Coach'
})

directoryData.set('Guppy Guppy', {
    name: 'Guppy Guppy',
    emplid: emplids[62],
    dob: '1984/9/27',
    jobTitle: 'Project Manager'
})

directoryData.set('Coralio Finley', {
    name: 'Coralio Finley',
    emplid: emplids[63],
    dob: '1969/4/22',
    jobTitle: 'Accountant'
})

directoryData.set('Anemone Coralis', {
    name: 'Anemone Coralis',
    emplid: emplids[64],
    dob: '1998/11/17',
    jobTitle: 'Security Engineer'
})

directoryData.set('Clammy Bubbles', {
    name: 'Clammy Bubbles',
    emplid: emplids[65],
    dob: '1987/8/4',
    jobTitle: 'Receptionist'
})

directoryData.set('Coralynn Anemone', {
    name: 'Coralynn Anemone',
    emplid: emplids[66],
    dob: '1973/7/1',
    jobTitle: 'Receptionist'
})

directoryData.set('Coralio Coralyn', {
    name: 'Coralio Coralyn',
    emplid: emplids[67],
    dob: '1997/7/14',
    jobTitle: 'Scrum Coach'
})

directoryData.set('Shelly Sandy', {
    name: 'Shelly Sandy',
    emplid: emplids[68],
    dob: '1966/10/30',
    jobTitle: 'Project Manager'
})

directoryData.set('Pearl Coraline', {
    name: 'Pearl Coraline',
    emplid: emplids[69],
    dob: '1965/4/2',
    jobTitle: 'Security Engineer'
})

directoryData.set('Finley Barnacle', {
    name: 'Finley Barnacle',
    emplid: emplids[70],
    dob: '1973/7/3',
    jobTitle: 'Security Engineer'
})

directoryData.set('Coraline Coralyn', {
    name: 'Coraline Coralyn',
    emplid: emplids[71],
    dob: '1999/8/11',
    jobTitle: 'Scrum Coach'
})

directoryData.set('Barnacle Coralia', {
    name: 'Barnacle Coralia',
    emplid: emplids[72],
    dob: '1992/4/4',
    jobTitle: 'Receptionist'
})

directoryData.set('Clammy Anemone', {
    name: 'Clammy Anemone',
    emplid: emplids[73],
    dob: '1966/10/24',
    jobTitle: 'Scrum Coach'
})

directoryData.set('Coralia Coralio', {
    name: 'Coralia Coralio',
    emplid: emplids[74],
    dob: '1964/2/6',
    jobTitle: 'Scrum Coach'
})

directoryData.set('Coralio Coral', {
    name: 'Coralio Coral',
    emplid: emplids[75],
    dob: '1965/1/2',
    jobTitle: 'Janitor'
})

directoryData.set('Coralie Coralis', {
    name: 'Coralie Coralis',
    emplid: emplids[76],
    dob: '1999/10/11',
    jobTitle: 'Scrum Coach'
})

directoryData.set('Guppy Barnacle', {
    name: 'Guppy Barnacle',
    emplid: emplids[77],
    dob: '1998/8/19',
    jobTitle: 'Security Engineer'
})

directoryData.set('Anemone Seaweed', {
    name: 'Anemone Seaweed',
    emplid: emplids[78],
    dob: '1987/2/28',
    jobTitle: 'Accountant'
})

directoryData.set('Coralyn Coralynn', {
    name: 'Coralyn Coralynn',
    emplid: emplids[79],
    dob: '1960/6/1',
    jobTitle: 'Programmer'
})

directoryData.set('Coral Coralie', {
    name: 'Coral Coralie',
    emplid: emplids[80],
    dob: '1967/6/26',
    jobTitle: 'Scrum Coach'
})

directoryData.set('Flounder Clammy', {
    name: 'Flounder Clammy',
    emplid: emplids[81],
    dob: '1979/2/6',
    jobTitle: 'Project Manager'
})

directoryData.set('Marina Coraline', {
    name: 'Marina Coraline',
    emplid: emplids[82],
    dob: '1971/9/9',
    jobTitle: 'Security Engineer'
})

directoryData.set('Barnacle Marina', {
    name: 'Barnacle Marina',
    emplid: emplids[83],
    dob: '1968/8/14',
    jobTitle: 'Systems Designer'
})

directoryData.set('Sandy Dory', {
    name: 'Sandy Dory',
    emplid: emplids[84],
    dob: '1994/10/7',
    jobTitle: 'Janitor'
})

directoryData.set('Clammy Coralis', {
    name: 'Clammy Coralis',
    emplid: emplids[85],
    dob: '1964/2/12',
    jobTitle: 'Security Engineer'
})

directoryData.set('Coralio Coraline', {
    name: 'Coralio Coraline',
    emplid: emplids[86],
    dob: '1960/5/26',
    jobTitle: 'Receptionist'
})

directoryData.set('Marina Barnacle', {
    name: 'Marina Barnacle',
    emplid: emplids[87],
    dob: '1974/5/2',
    jobTitle: 'Security Engineer'
})

directoryData.set('Coraline Anemone', {
    name: 'Coraline Anemone',
    emplid: emplids[88],
    dob: '1971/8/17',
    jobTitle: 'Receptionist'
})

directoryData.set('Anemone Anemone', {
    name: 'Anemone Anemone',
    emplid: emplids[89],
    dob: '1968/1/4',
    jobTitle: 'Janitor'
})

directoryData.set('Barnacle Coralia', {
    name: 'Barnacle Coralia',
    emplid: emplids[90],
    dob: '1993/9/12',
    jobTitle: 'Scrum Coach'
})

directoryData.set('Coralynn Seaweed', {
    name: 'Coralynn Seaweed',
    emplid: emplids[91],
    dob: '1977/5/1',
    jobTitle: 'Scrum Coach'
})

directoryData.set('Coralie Seashell', {
    name: 'Coralie Seashell',
    emplid: emplids[92],
    dob: '1989/1/23',
    jobTitle: 'Programmer'
})

directoryData.set('Barnacle Pearl', {
    name: 'Barnacle Pearl',
    emplid: emplids[93],
    dob: '1997/5/15',
    jobTitle: 'Project Manager'
})

directoryData.set('Coralyn Coralyn', {
    name: 'Coralyn Coralyn',
    emplid: emplids[94],
    dob: '1964/10/13',
    jobTitle: 'Programmer'
})

directoryData.set('Marina Coralia', {
    name: 'Marina Coralia',
    emplid: emplids[95],
    dob: '1965/11/17',
    jobTitle: 'Systems Designer'
})

directoryData.set('Coralyn Nemo', {
    name: 'Coralyn Nemo',
    emplid: emplids[96],
    dob: '1978/6/7',
    jobTitle: 'Security Engineer'
})

directoryData.set('Marina Shelly', {
    name: 'Marina Shelly',
    emplid: emplids[97],
    dob: '1970/3/1',
    jobTitle: 'Scrum Coach'
})

directoryData.set('Coralie Anemone', {
    name: 'Coralie Anemone',
    emplid: emplids[98],
    dob: '1976/11/16',
    jobTitle: 'Accountant'
})

directoryData.set('Squidward Sebastian', {
    name: 'Squidward Sebastian',
    emplid: emplids[99],
    dob: '1986/8/25',
    jobTitle: 'Receptionist'
})