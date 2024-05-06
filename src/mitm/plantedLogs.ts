import {
  directoryRequests,
  clientsRequests,
  vaultRequests,
  tokenRequests
} from './endpointRequests'
import { teamsConvos } from './teamsConvos'

const logLists = [...teamsConvos, directoryRequests, clientsRequests, vaultRequests, tokenRequests]

const plantedLogs: any[] = [...logLists[0]]

for (let i = 1; i < logLists.length; i++) {
  const logs = logLists[i]
  let minPlantedLogIndex = 0
  for (let j = 0; j < logs.length; j++) {
    const randomIndex =
      Math.floor(Math.random() * (plantedLogs.length - minPlantedLogIndex)) + minPlantedLogIndex
    plantedLogs.splice(randomIndex, 0, logs[j])
    minPlantedLogIndex = randomIndex + 1
  }
}

export { plantedLogs }
