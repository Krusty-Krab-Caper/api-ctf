import { randomToken } from '../util'
import { requestPrototype } from './requestPrototype'

const leakedSiteName = 'Krusty Kiosk'
const leakedSiteRepoUrl = 'https://github.com/Krusty-Krab-Caper/krusty-kiosk'

const tokenTeams1 = randomToken()
const tokenTeams2 = randomToken()
const tokenTeams3 = randomToken()
const tokenTeams4 = randomToken()

// convo between leaked-site team lead (2) and employee (1). 2 asks 1 to submit a PR. 1 submits the PR and asks 2 to approve it. 2 approves it and asks 1 to merge it. 1 merges it and realizes they pushed credentials. 1 asks 2 if they should delete the credentials. 2 says to submit another PR that deletes them. 1 asks if the history will still show the credentials. 2 says it should be fine. 1 submits the PR. 2 thanks 1.
const teamsConvo1and2Messages = [
  {
    token: tokenTeams1,
    message: `Ok, I just submitted the PR for the ${leakedSiteName} repo. Can you approve it?`
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

// convo between management (3) and leaked-site team lead (2). 3 asks 2 to remind him the link of the leaked-site repo (there is a believable reason for this, like needing to share it with a new team member). 2 sends the link. 3 thanks 2.
const teamsConvo2and3Messages = [
  {
    token: tokenTeams3,
    message: `Hey, can you remind me the link to the ${leakedSiteName} repo? I need to share it with a new team member.`
  },
  {
    token: tokenTeams2,
    message: `Sure, here it is: ${leakedSiteRepoUrl}`
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
// convo between two employees (1 and 4)
const teamsConvo1and4Messages = [
  {
    token: tokenTeams1,
    message: 'Hey! Did you see the latest episode of Mermaid Man and Barnacle Boy?'
  },
  {
    token: tokenTeams4,
    message:
      'Absolutely! The Invisible Boatmobile chase scene was epic. Did you catch the part where they used the Orb of Confusion?'
  },
  {
    token: tokenTeams1,
    message:
      'Yes, that was hilarious! Speaking of funny, do you want to go to the Comedy Club tonight?'
  },
  {
    token: tokenTeams4,
    message:
      "I'd love to, but I'm swamped with work. How about tomorrow night? Does that work for you?"
  },
  {
    token: tokenTeams1,
    message:
      "Tomorrow night it is! I've been meaning to ask if you'd like to try the new Kelp Shake they're serving there?"
  },
  {
    token: tokenTeams4,
    message: "A new Kelp Shake? Count me in! That sounds like a fun night. Let's do it!"
  }
]

const teamsConvoRequestPrototype = {
  ...requestPrototype,
  http_request: {
    ...requestPrototype.http_request,
    host: 'teams.com',
    method: 'POST',
    query: ''
  },
  msg: 'completed handling request'
}

const teamsConvo1and2 = teamsConvo1and2Messages.map((message) => ({
  ...teamsConvoRequestPrototype,
  http_request: {
    ...teamsConvoRequestPrototype.http_request,
    headers: {
      ...teamsConvoRequestPrototype.http_request.headers,
      authorization: 'Bearer ' + message.token
    },
    path: '/conversation/6298237955',
    method: 'POST',
    query: '',
    body: {
      message: message.message
    }
  },
  msg: 'completed handling request'
}))

const teamsConvo2and3 = teamsConvo2and3Messages.map((message) => ({
  ...teamsConvoRequestPrototype,
  http_request: {
    ...teamsConvoRequestPrototype.http_request,
    headers: {
      ...teamsConvoRequestPrototype.http_request.headers,
      authorization: 'Bearer ' + message.token
    },
    path: '/conversation/2349573492',
    method: 'POST',
    query: '',
    body: {
      message: message.message
    }
  },
  msg: 'completed handling request'
}))

const teamsConvo1and4 = teamsConvo1and4Messages.map((message) => ({
  ...teamsConvoRequestPrototype,
  http_request: {
    ...teamsConvoRequestPrototype.http_request,
    headers: {
      ...teamsConvoRequestPrototype.http_request.headers,
      authorization: 'Bearer ' + message.token
    },
    path: '/conversation/7329584520',
    method: 'POST',
    query: '',
    body: {
      message: message.message
    }
  },
  msg: 'completed handling request'
}))

export const teamsConvos = [teamsConvo1and4, teamsConvo1and2, teamsConvo2and3]
