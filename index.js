const fs = require('fs'),
  { spawn } = require('child_process')

module.exports = {
  async compile() { },
  async generate({
    jasper,
    output,
    format,
    input,
    type,
  }) {
    const process = spawn('./jasperstarter/bin/jasperstarter', [
      "process", jasper,
      "-o", output,
      "-f", format,
      "-t", type,
      "--data-file", input
    ])

    process.stdout.on('data', (data) => {
      if (data) console.log(`stdout: ${data}`);
    })

    process.stderr.on('data', (data) => {
      if (data) console.error(`stderr: ${data}`)
    })

    process.on('exit', code => {
      if (code === 0) {
        const fileName = `${output}.${format}`,
          exportFile = fs.readFileSync(fileName)

        fs.unlinkSync(fileName)

        return exportFile
      } else {
        throw "error"
      }
    })
  },
}