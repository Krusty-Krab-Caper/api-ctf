import { time } from 'console'
import { randomToken } from './randomLog'

const targetEmplid = '12345'
const targetToken = randomToken()
const targetHeaders = {
  accept: 'application/json',
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  authorization: 'Bearer ' + targetToken
}
const targetLog = {
  http_request: {
    headers: {
      ...targetHeaders
    },
    host: 'localhost:8080',
    method: 'GET',
    path: '/clients',
    query: 'emplid=' + targetEmplid,
    remote: '127.0.0.1:51952',
    scheme: 'http'
  },
  http_response: {
    headers: {
      'cache-control': 'private, no-cache, no-store, must-revalidate',
      'content-type': 'application/json; charset=utf-8'
    },
    size: 2116,
    status: 200,
    text_status: 'OK',
    took: 14843
  },
  level: 'info',
  msg: 'completed handling request',
  time: new Date().toISOString()
}

const tokenEmployeeEndpoint = randomToken()
const tokenPayrollEndpoint = randomToken()

const tokenTeams1 = randomToken()
const tokenTeams2 = randomToken()
const tokenTeams3 = randomToken()
const tokenTeams4 = randomToken()

// convo between vault-site team lead (2) and employee (1). 2 asks 1 to submit a PR. 1 submits the PR and asks 2 to approve it. 2 approves it and asks 1 to merge it. 1 merges it and realizes they pushed credentials. 1 asks 2 if they should delete the credentials. 2 says to submit another PR that deletes them. 1 asks if the history will still show the credentials. 2 says it should be fine. 1 submits the PR. 2 thanks 1.
const teamsConvo1and2Messages = [
  {
    token: tokenTeams1,
    message: 'Ok, I just submitted the PR for the vault-site repo. Can you approve it?'
  },
  {
    token: tokenTeams2,
    message: "Sure, I'll take a look at it now."
  },
  {
    token: tokenTeams2,
    message: 'Looks good! Approved, go ahead and merge it.'
  },
  {
    token: tokenTeams1,
    message: "Perfect, thanks! I'll merge it now."
  },
  {
    token: tokenTeams1,
    message: 'Oh shoot, I think I accidentally pushed some credentials. I already merged the PR...'
  },
  {
    token: tokenTeams2,
    message: 'Ah well dang it. Just submit another PR that deletes them.'
  },
  {
    token: tokenTeams1,
    message: "Won't the history still show the credentials?"
  },
  {
    token: tokenTeams2,
    message:
      "Yeah, but it should be fine. Someone would have to go through the history to find them. It'd be like finding a needle in a haystack."
  },
  {
    token: tokenTeams1,
    message: "I guess you're right. I'll go ahead and submit the PR."
  },
  {
    token: tokenTeams2,
    message: 'Sounds good. Thanks for catching that.'
  }
]

// convo between management (3) and vault-site team lead (2). 3 asks 2 to remind him the link of the vault-site repo (there is a believable reason for this, like needing to share it with a new team member). 2 sends the link. 3 thanks 2.
const teamsConvo2and3Messages = [
  {
    token: tokenTeams3,
    message:
      'Hey, can you remind me the link to the vault-site repo? I need to share it with a new team member.'
  },
  {
    token: tokenTeams2,
    message: 'Sure, here it is: <TODO>'
  },
  {
    token: tokenTeams3,
    message: 'Thanks!'
  },
  {
    token: tokenTeams2,
    message: 'No problem!'
  }
]

// convo between two employees (1 and 4). They talk about stuff unrelated to work. 1 asks 4 if they want to grab lunch. 4 says they are busy. 1 asks if they want to grab dinner instead. 4 says they are free. 1 asks if they want to go to a new restaurant. 4 agrees.
const teamsConvo1and4Messages = [
  {
    token: tokenTeams1,
    message: 'Hey! Caught any good waves this weekend? 🏄‍♂️'
  },
  {
    token: tokenTeams4,
    message:
      'Totally! The swell was perfect at the beach. How about you? Did you get to hit the trails? 🚵'
  },
  {
    token: tokenTeams1,
    message:
      'Yes, the mountain trails were epic! Speaking of good times, fancy grabbing lunch today?'
  },
  {
    token: tokenTeams4,
    message:
      "Would love to, but I'm swamped with code reviews. Dinner might work though. How's that sound?"
  },
  {
    token: tokenTeams1,
    message:
      "Dinner it is! I've been meaning to ask if you'd like to check out that new fusion place? Heard they have a killer ramen burger. 🍔"
  },
  {
    token: tokenTeams4,
    message:
      "Ramen burger? Count me in! That sounds like an adventure for our taste buds. Let's do it!"
  }
]

const teamsConvo1and2 = teamsConvo1and2Messages.map((message) => ({
  ...targetLog,
  http_request: {
    ...targetLog.http_request,
    headers: {
      ...targetHeaders,
      authorization: 'Bearer ' + message.token
    },
    path: '/conversation/6298237955',
    method: 'POST',
    query: '',
    body: {
      message: message.message
    }
  },
  msg: 'completed handling request',
  time: new Date().toISOString()
}))

const teamsConvo2and3 = teamsConvo2and3Messages.map((message) => ({
  ...targetLog,
  http_request: {
    ...targetLog.http_request,
    headers: {
      ...targetHeaders,
      authorization: 'Bearer ' + message.token
    },
    path: '/conversation/2349573492',
    method: 'POST',
    query: '',
    body: {
      message: message.message
    }
  },
  msg: 'completed handling request',
  time: new Date().toISOString()
}))

const teamsConvo1and4 = teamsConvo1and4Messages.map((message) => ({
  ...targetLog,
  http_request: {
    ...targetLog.http_request,
    headers: {
      ...targetHeaders,
      authorization: 'Bearer ' + message.token
    },
    path: '/conversation/7329584520',
    method: 'POST',
    query: '',
    body: {
      message: message.message
    }
  },
  msg: 'completed handling request',
  time: new Date().toISOString()
}))

export const plantedLogs = [
  {
    ...targetLog,
    http_request: {
      ...targetLog.http_request,
      headers: {
        ...targetHeaders,
        authorization: 'Bearer ' + tokenEmployeeEndpoint
      },
      path: '/employee',
      method: 'GET',
      query: ''
    },
    time: new Date().toISOString()
  },
  {
    ...targetLog,
    http_request: {
      ...targetLog.http_request,
      headers: {
        ...targetHeaders,
        authorization: 'Bearer ' + tokenEmployeeEndpoint
      },
      path: '/employee',
      method: 'POST',
      query: ''
    },
    time: new Date().toISOString()
  },
  {
    ...targetLog,
    http_request: {
      ...targetLog.http_request,
      headers: {
        ...targetHeaders,
        authorization: 'Bearer ' + tokenEmployeeEndpoint
      },
      path: '/employee',
      method: 'GET',
      query: ''
    },
    time: new Date().toISOString()
  },
  targetLog,
  {
    ...targetLog,
    http_request: {
      ...targetLog.http_request,
      headers: {
        ...targetHeaders,
        authorization: 'Bearer ' + tokenPayrollEndpoint
      },
      path: '/payroll',
      method: 'GET',
      query: 'emplid=' + targetEmplid
    },
    time: new Date().toISOString()
  },
  {
    ...targetLog,
    http_request: {
      ...targetLog.http_request,
      headers: {
        ...targetHeaders,
        authorization: 'Bearer ' + tokenPayrollEndpoint
      },
      path: '/payroll',
      method: 'GET',
      query: 'emplid=' + targetEmplid
    },
    time: new Date().toISOString()
  }
]

// insert the teams conversations into the planted logs at random intervals but in order
let plantedLogsIndex = 0
let teamsConvo1and2Index = 0
let teamsConvo2and3Index = 0
let teamsConvo1and4Index = 0

while (
  teamsConvo1and2Index < teamsConvo1and2.length ||
  teamsConvo2and3Index < teamsConvo2and3.length ||
  teamsConvo1and4Index < teamsConvo1and4.length
) {
  const randomInterval = Math.floor(Math.random() * 3)
  if (randomInterval === 0 && teamsConvo1and2Index < teamsConvo1and2.length) {
    plantedLogs.splice(plantedLogsIndex, 0, teamsConvo1and2[teamsConvo1and2Index])
    teamsConvo1and2Index++
  } else if (randomInterval === 1 && teamsConvo2and3Index < teamsConvo2and3.length) {
    plantedLogs.splice(plantedLogsIndex, 0, teamsConvo2and3[teamsConvo2and3Index])
    teamsConvo2and3Index++
  } else if (randomInterval === 2 && teamsConvo1and4Index < teamsConvo1and4.length) {
    plantedLogs.splice(plantedLogsIndex, 0, teamsConvo1and4[teamsConvo1and4Index])
    teamsConvo1and4Index++
  }
  plantedLogsIndex += 2
}
