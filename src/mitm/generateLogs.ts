import { generateRandomLog } from './randomLog'
import { plantedLogs } from './plantedLogs'

const countdownMin = 2
const countdownMax = 6

function generateLogs(): string[] {
  const logs = []
  let countdown = Math.floor(Math.random() * (countdownMax - countdownMin)) + countdownMin
  let currentPlantedLog = 0
  while (currentPlantedLog < plantedLogs.length) {
    countdown--
    if (countdown === 0) {
      logs.push(
        JSON.stringify({
          ...plantedLogs[currentPlantedLog],
          time: new Date().toISOString()
        })
      )
      currentPlantedLog++
      countdown = Math.floor(Math.random() * (countdownMax - countdownMin)) + countdownMin
    } else {
      logs.push(JSON.stringify(generateRandomLog()))
    }
  }
  // pad with `countdown` random logs
  for (let i = 0; i < countdown; i++) {
    logs.push(JSON.stringify(generateRandomLog()))
  }
  return logs
}

export function getLogsAsJson(): string {
  return JSON.stringify(generateLogs())
}
