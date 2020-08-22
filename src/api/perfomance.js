const results = {}

function perfStart (functionName) {
  if (!([functionName] in results)) { results[functionName] = { time: null, perfomance: null } }
  results[functionName].time = performance.now()
}

function perfEnd (functionName) {
  results[functionName].perfomance +=
    performance.now() - results[functionName].time
}

function perfResults () {
  console.log(results)
}

export { perfStart, perfEnd, perfResults }
