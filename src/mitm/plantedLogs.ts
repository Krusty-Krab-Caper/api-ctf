import { tokenRequests } from './tokenRequests'
import { vaultRequests } from './vaultRequests'
import { clientsRequests } from './clientRequests'
import { directoryRequests } from './directoryRequests'
import { teamsConvos } from './teamsConvos'

const logLists = [...teamsConvos, directoryRequests, clientsRequests, vaultRequests, tokenRequests]

const plantedLogs: any[] = []

// random round robin planting of logs
while (logLists.length) {
  const logListIndex = Math.floor(Math.random() * logLists.length)
  const logList = logLists[logListIndex]
  const logIndex = Math.floor(Math.random() * logList.length)
  plantedLogs.push(logList[logIndex])
  logList.splice(logIndex, 1)
  if (!logList.length) {
    logLists.splice(logListIndex, 1)
  }
}

export { plantedLogs }
