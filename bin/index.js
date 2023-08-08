#! /usr/bin/env node
const Torchcraft = require('../index')
const torchcraft = new Torchcraft();
(async () => {
  await torchcraft.pip()
})()
