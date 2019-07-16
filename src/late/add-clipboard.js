import os from 'os'
import { globalShortcut, clipboard } from 'electron'

import plist from 'plist'

function getDarwinFiles () {
  if (!clipboard.has('NSFilenamesPboardType')) {
    return []
  }

  return plist.parse(clipboard.read('NSFilenamesPboardType'))
}

function getWinFiles () {
  const rawFilePath = clipboard.read('FileGroupDescriptorW')

  const filePath = rawFilePath.replace(new RegExp(String.fromCharCode(0), 'g'), '')
  console.log('Clipboard(RAW): ', rawFilePath)
  console.log('Clipboard(File): ', filePath)
}

function getClipboardFiles () {
  switch (os.platform()) {
    case 'darwin':
      return getDarwinFiles()
    case 'win32':
      return getWinFiles()
    default:
      return null
  }
}

export default function (ctx) {
  globalShortcut.register('Command+Control+G', () => {
    console.log(getClipboardFiles())
  })
}
