/*
 * This script is the source code for the mitm.js script on the user distributed repo. The version on the user's repo is obfuscated.
 */
async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function randomSleep(min, max) {
  await sleep(Math.floor(Math.random() * (max - min)) + min)
}

async function displayStartupMessages() {
  console.log('Starting up...')
  await randomSleep(500, 2000)
  console.log('Initializing intercept module...')
  await randomSleep(500, 2000)
  console.log('Scanning network traffic...')
  await randomSleep(500, 2000)
  console.log('Injecting benign packets...')
  await randomSleep(500, 2000)
  console.log('Ready to intercept communications.')
  await randomSleep(500, 2000)
}

async function displayEndMessages() {
  const reconnectionAttempts = 3
  await sleep(2000)
  console.log('WARNING: Connection lost!')
  await sleep(500)
  console.log('Attempting to reconnect...')
  for (let i = 0; i < reconnectionAttempts; i++) {
    console.log(`Attempt ${i + 1}/${reconnectionAttempts}...`)
    await sleep(2000)
  }
  console.log('Unable to reestablish connection. Exiting...')
}

async function getLogsAsJson() {
  const response = await fetch('http://localhost:8080/mitm')
  return await response.json()
}

const intervalMin = 100
const intervalMax = 2000
async function displayLogs(logs) {
  const numLogs = logs.length
  for (let i = 0; i < numLogs; i++) {
    console.log({
      ...JSON.parse(logs[i]),
      time: new Date().toISOString()
    })
    await randomSleep(intervalMin, intervalMax)
  }
}

async function getAndDisplayLogs() {
  const logsJson = await getLogsAsJson()
  await displayLogs(logsJson)
}

async function main() {
  await displayStartupMessages()
  await getAndDisplayLogs()
  await displayEndMessages()
}

main()
