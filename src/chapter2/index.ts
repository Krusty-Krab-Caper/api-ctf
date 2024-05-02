import { randomToken, generateRandomLog } from './randomLog'
import { plantedLogs } from './plantedLogs'

const intervalMin = 100
const intervalMax = 2000

const countdownMin = 2
const countdownMax = 5

function generateAndLog(countdown: number, currentPlantedLog: number) {
  countdown--
  if (countdown === 0) {
    console.log(plantedLogs[currentPlantedLog])
    currentPlantedLog++
    currentPlantedLog %= plantedLogs.length
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
