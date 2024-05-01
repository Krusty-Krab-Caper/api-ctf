import { sha1 } from './util'

export type DirectoryEntry = {
    name: string,
    emplid: string,
    dob: string,
    jobTitle: string
}

//player name: Bob
//target name: Dave

export const directoryData: Map<string, DirectoryEntry> = new Map()

directoryData.set(sha1('Bob'), {
    name: 'Bob',
    emplid: 'qwertyuiop',
    dob: 'not as old as u',
    jobTitle: 'peeon'
})
directoryData.set(sha1('Suzie'), {
    name: 'Suzie',
    emplid: 'zxcvbnm',
    dob: 'not as old as u',
    jobTitle: 'Programmer'
})
directoryData.set(sha1('Dave'), {
    name: 'Dave',
    emplid: 'asdfghjkl',
    dob: 'not as old as u',
    jobTitle: 'Admin'
})
directoryData.set(sha1('Connor'), {
    name: 'Connor',
    emplid: 'plmoknijn',
    dob: 'hey 23s not that bad',
    jobTitle: 'idek man'
})
directoryData.set(sha1('Josh'), {
    name: 'Josh',
    emplid: 'qazwsxedcrfv',
    dob: 'idk about u im feelin 22',
    jobTitle: 'Professional Hypeman'
})