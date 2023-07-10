const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

function spawnCommand(command, args) {
  const processing = spawn(
    path.resolve(__dirname, './jasperstarter/bin/jasperstarter'),
    [command, ...args]
  )
  let errorMessages = ""

  processing.stdout.on('data', (data) => {
    if (data) console.log(`stdout: ${data}`);
  })

  processing.stderr.on('data', (data) => {
    errorMessages += data + "\r\n"
  })

  return new Promise((resolve, reject) => {
    processing.on('exit', code => {
      if (code === 0) {
        resolve()
      } else {
        reject(errorMessages)
      }
    })
  })
}

module.exports = {
  /**
   * compile jrxml to jasper file
   * 
   * @param {string} jrxml the path of jrxml file
   * @param {string} output the path of jrxml file
   * @returns {Promise<string>} the path of jasper file
   */
  async compile(jrxml, output = null) {
    return new Promise((resolve, reject) => {
      let args = [jrxml]
      if (output !== null) args.unshift("-o", output)  
      
      spawnCommand("compile", args)
        .then(() => resolve(output || jrxml.replace(".jrxml", ".jasper")))
        .catch(e => reject(e))
    })
  },
  /**
   * generate report by jasper file, or it will auto compile if input jrxml 
   * 
   * @param {{jrxml: string, jasper: string, output: string, format: "pdf"|"docx"|"xlsx"|"pptx"|"odt"|"ods", input: Array, type: "json"}}  
   * @returns {Promise<Buffer>}
   */
  async generate({
    jrxml,
    jasper,
    output,
    format = "pdf",
    input,
    type = "json",
  }) {
    if (
      (jrxml && !jasper) ||
      (!fs.existsSync(jasper) && fs.existsSync(jasper.replace(".japser", ".jrxml")))
    ) jasper = await module.exports.compile(jrxml || jasper.replace(".japser", ".jrxml"))

    return new Promise((resolve, reject) => {
      spawnCommand("process", [
        jasper,
        "-o", output,
        "-f", format,
        "-t", type,
        "--data-file", input
      ])
        .then(() => resolve(fs.readFileSync(`${output}.${format}`)))
        .catch(e => reject(e))
    })
  },
}