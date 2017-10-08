var https = require('https')

exports.handler = (event, context) => {

  try {


  if(event.session.new) {
    //New session
    console.log("NEW SESSION")
  }

  switch (event.request.type) {

    case "LaunchRequest":
    //LaunchRequest
    console.log('LAUNCH REQUEST')
      context.succeed(
        generateResponse(
          buildSpeechletResponse("Welcome to this Alexa Skill", true),
          {}
        )
      )
    break;

    case "IntentRequest":
    //IntentRequest
    console.log('INTENT REQUEST')
    switch(event.request.intent.name) {
          case "GetSubCount":
            var endpoint = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCLmtTDE8vwH-q2COyQ2UFzw&key=AIzaSyB7jEkeBUX46lYsj8EWEeOrMYyZoJvV6hA" // ENDPOINT GOES HERE
            var body = ""
            https.get(endpoint, (response) => {
              response.on('data', (chunk) => { body += chunk })
              response.on('end', () => {
                var data = JSON.parse(body)
                var subscriberCount = data.items[0].statistics.subscriberCount
                context.succeed(
                  generateResponse(
                    buildSpeechletResponse(`Current subscriber count is ${subscriberCount}`, true),
                    {}
                  )
                )
              })
            })
            break;

          case "GetViewCount":
            var endpoint = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCLmtTDE8vwH-q2COyQ2UFzw&key=AIzaSyB7jEkeBUX46lYsj8EWEeOrMYyZoJvV6hA" // ENDPOINT GOES HERE
            var body = ""
            https.get(endpoint, (response) => {
              response.on('data', (chunk) => { body += chunk })
              response.on('end', () => {
                var data = JSON.parse(body)
                var viewCount = data.items[0].statistics.viewCount
                context.succeed(
                  generateResponse(
                    buildSpeechletResponse(`Current view count is ${viewCount}`, true),
                    {}
                  )
                )
              })
            })
            break;

          case "GetViewSinceDate":
            console.log(event.request.intent.slots.SinceDate.value)
            var endpoint = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCLmtTDE8vwH-q2COyQ2UFzw&key=AIzaSyB7jEkeBUX46lYsj8EWEeOrMYyZoJvV6hA" // ENDPOINT GOES HERE
            var body = ""
            https.get(endpoint, (response) => {
              response.on('data', (chunk) => { body += chunk })
              response.on('end', () => {
                var data = JSON.parse(body)
                var viewCount = data.items[0].statistics.viewCount
                context.succeed(
                  generateResponse(
                    buildSpeechletResponse(`Current view count is ${viewCount}`, true),
                    {}
                  )
                )
              })
            })
            break;

            case "GetSubSinceDate":
              console.log(event.request.intent.slots.SinceDate.value)
              var endpoint = "https://www.googleapis.com/youtube/v3/channels?part=statistics&id=UCLmtTDE8vwH-q2COyQ2UFzw&key=AIzaSyB7jEkeBUX46lYsj8EWEeOrMYyZoJvV6hA" // ENDPOINT GOES HERE
              var body = ""
              https.get(endpoint, (response) => {
                response.on('data', (chunk) => { body += chunk })
                response.on('end', () => {
                  var data = JSON.parse(body)
                  var viewCount = data.items[0].statistics.viewCount
                  context.succeed(
                    generateResponse(
                      buildSpeechletResponse(`Current sub count is ${subCount}`, true),
                      {}
                    )
                  )
                })
              })
              break;

          default:
            throw "Invalid intent"
          }
    break;

    case "SessionEndedRequest":
    //SessionEndedRequest
    console.log('SESSION ENDED REQUEST')
    break;

    default:
      context.fail('INVALID REQUEST TYPE: ${event.request.type}')

    }

  }catch(error) { context.fail('Exception: ${error}') }

}

//Helpers
buildSpeechletResponse = (outputText, shouldEndSession) => {
  return {
    outputSpeech: {
      type: "PlainText",
      text: outputText
    },
    shouldEndSession: shouldEndSession
  }

}

generateResponse = (sessionAttributes, speechletRespone) => {
  return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletRespone
  }

}

};
