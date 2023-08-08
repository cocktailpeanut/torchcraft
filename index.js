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
  gpu() {
    return si.graphics().then((g) => {
      if (g && g.controllers && g.controllers.length > 0) {
        return g.controllers[0].vendor.toLowerCase()
      } else {
        return null
      }
    })
  }
  resolve(platform, gpu) {
    if (platform === "win32") {
      if (gpu === "nvidia") {
        return path.resolve(__dirname, "requirements", "win32-nvidia.txt")
      } else if (gpu === "amd") {
        return path.resolve(__dirname, "requirements", "win32-cpu.txt") // amd not supported on windows yet?
      } else {
        return path.resolve(__dirname, "requirements", "win32-cpu.txt")
      }
    } else if (platform === "darwin") {
      return path.resolve(__dirname, "requirements", "darwin-default.txt")
    } else if (Platform === "linux") {
      if (gpu === "nvidia") {
        return path.resolve(__dirname, "requirements", "linux-nvidia.txt")
      } else if (gpu === "amd") {
        return path.resolve(__dirname, "requirements", "linux-amd.txt")
      } else {
        return path.resolve(__dirname, "requirements", "linux-cpu.txt")
      }
    } else {
      throw new Error("undectedted platform: " + platform)
    }
  }
  async pip(run) {
    let gpu = await this.gpu()
    let src = this.resolve(os.platform(), gpu)
    await fs.promises.copyFile(src, "torchcraft.txt")
  }
}
module.exports = Torchcraft
