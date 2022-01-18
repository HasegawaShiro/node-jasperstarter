const fs = require('fs'),
  path = require('path'),
  { spawn } = require('child_process')

module.exports = {
  async compile(jrxml) { },
  async generate({
    jrxml,
    jasper,
    output,
    format,
    input,
    type,
  }) {
    const processing = spawn(path.resolve(__dirname, './jasperstarter/bin/jasperstarter'), [
      "process", jasper,
      "-o", output,
      "-f", format,
      "-t", type,
      "--data-file", input
    ])

    processing.stdout.on('data', (data) => {
      if (data) console.log(`stdout: ${data}`);
    })

    processing.stderr.on('data', (data) => {
      if (data) console.error(`stderr: ${data}`)
    })

    const generated = new Promise((resolve, reject) => {
      processing.on('exit', code => {
        if (code === 0) {
          const fileName = `${output}.${format}`,
            exportFile = fs.readFileSync(fileName)

          fs.unlinkSync(fileName)
          resolve(exportFile)
        } else {
          reject()
        }
      })
    })

    return generated
  },
}