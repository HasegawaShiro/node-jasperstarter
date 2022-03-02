const fs = require('fs'),
  path = require('path'),
  { spawn } = require('child_process')

module.exports = {
  async compile(jrxml) { },
  async generate({
    jrxml,
    jasper,
    output,
    format = "pdf",
    input,
    type = "json",
  }) {
    const processing = spawn(path.resolve(__dirname, './jasperstarter/bin/jasperstarter'), [
      "process", jasper,
      "-o", output,
      "-f", format,
      "-t", type,
      "--data-file", input
    ])
    let errorMessages = ""

    processing.stdout.on('data', (data) => {
      if (data) console.log(`stdout: ${data}`);
    })

    processing.stderr.on('data', (data) => {
      errorMessages += data + "\r\n"
    })

    const generated = new Promise((resolve, reject) => {
      processing.on('exit', code => {
        if (code === 0) {
          const fileName = `${output}.${format}`,
            exportFile = fs.readFileSync(fileName)

          resolve(exportFile)
        } else {
          reject(errorMessages)
        }
      })
    })

    return generated
  },
}