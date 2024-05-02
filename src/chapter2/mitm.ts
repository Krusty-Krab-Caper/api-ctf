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

function generateAndLog(countdown: number, currentPlantedLog: number) {
  countdown--
  if (countdown === 0) {
    if (currentPlantedLog >= plantedLogs.length) {
      displayEndMessages()
      return
    }
    console.log({
      ...plantedLogs[currentPlantedLog],
      time: new Date().toISOString()
    })
    currentPlantedLog++
    countdown = Math.floor(Math.random() * (countdownMax - countdownMin)) + countdownMin
  } else {
    const randomLog = generateRandomLog()
    console.log(randomLog)
  }

  setTimeout(
    () => generateAndLog(countdown, currentPlantedLog),
    Math.floor(Math.random() * (intervalMax - intervalMin)) + intervalMin
  )
}

const currentPlantedLog = 0
const countdown = Math.floor(Math.random() * (countdownMax - countdownMin)) + countdownMin
generateAndLog(countdown, currentPlantedLog)
