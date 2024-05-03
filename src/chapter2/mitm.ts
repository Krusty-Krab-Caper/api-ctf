import { generateRandomLog } from './randomLog'
import { plantedLogs } from './plantedLogs'

const intervalMin = 100
const intervalMax = 2000

const countdownMin = 2
const countdownMax = 8

async function displayEndMessages() {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  for (let i = 0; i < 3; i++) {
    console.log('Error: Failed to connect. Retrying...')
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }
  console.log('Connection failed. Please try again later.')
}

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

function displayLogs(logs: string[]) {
  if (logs.length === 0) {
    displayEndMessages()
    return
  }
  console.log(logs.shift())
  setTimeout(
    () => displayLogs(logs),
    Math.floor(Math.random() * (intervalMax - intervalMin)) + intervalMin
  )
}

function getAndDisplayLogs() {
  const logsJson = getLogsAsJson()
  const logs = JSON.parse(logsJson)
  displayLogs(logs)
}

// getAndDisplayLogs()
