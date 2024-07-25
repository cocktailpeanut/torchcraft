/******************************************
*
*   
*   1. pip
*   $ npx torchcraft
*   $ pip install -r torchcraft.txt
*   
*
******************************************/
const path = require('path')
const os = require('os')
const fs = require('fs')
const si = require('systeminformation')
class Torchcraft {
  gpus() {
    return si.graphics().then((g) => {
      if (g && g.controllers && g.controllers.length > 0) {
        return g.controllers.map((x) => { return x.vendor.toLowerCase() })
      } else {
        return []
      }
    })
  }
  resolve(platform, gpus) {
    if (platform === "win32") {
      if (gpus.includes("nvidia")) {
        return path.resolve(__dirname, "requirements", "win32-nvidia.txt")
      } else if (gpus.includes("amd") || gpus.includes("advanced micro devices")){
        return path.resolve(__dirname, "requirements", "win32-cpu.txt") // amd not supported on windows yet?
      } else {
        return path.resolve(__dirname, "requirements", "win32-cpu.txt")
      }
    } else if (platform === "darwin") {
      return path.resolve(__dirname, "requirements", "darwin-default.txt")
    } else if (platform === "linux") {
      if (gpus.includes("nvidia")) {
        return path.resolve(__dirname, "requirements", "linux-nvidia.txt")
      } else if (gpus.includes("amd") || gpus.includes("advanced micro devices")){
        return path.resolve(__dirname, "requirements", "linux-amd.txt")
      } else {
        return path.resolve(__dirname, "requirements", "linux-cpu.txt")
      }
    } else {
      throw new Error("undectedted platform: " + platform)
    }
  }
  async pip(run) {
    let gpus = await this.gpus()
    let src = this.resolve(os.platform(), gpus)
    await fs.promises.copyFile(src, "torchcraft.txt")
  }
}
module.exports = Torchcraft
