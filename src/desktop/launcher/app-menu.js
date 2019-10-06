const { app, Menu, shell } = require('electron')
const { aboutMenuItem, appMenu, is, openUrlMenuItem } = require('electron-util')

const dispatch = require('./dispatcher')

// const { showAppSettingsDialog } = esmRequire('../../actions/app-settings')

const helpSubmenu = [
  openUrlMenuItem({
    label: 'Website',
    url: 'https://collmot.com'
  })
]

const preferencesItem = {
  label: 'Preferences...',
  accelerator: 'Command+,',
  click () {
    dispatch({ type: 'SHOW_APP_SETTINGS_DIALOG' })
  }
}

const macOsMenuTemplate = [
  appMenu([preferencesItem]),
  {
    role: 'editMenu'
  },
  {
    role: 'windowMenu'
  },
  {
    role: 'help',
    submenu: helpSubmenu
  }
]

const linuxWindowsMenuTemplate = [
  {
    label: 'File',
    submenu: [
      preferencesItem,
      { type: 'separator' },
      { role: 'quit' }
    ]
  },
  {
    role: 'editMenu'
  },
  {
    role: 'windowMenu'
  },
  {
    role: 'help',
    submenu: helpSubmenu
  }
]

if (!is.macos) {
  helpSubmenu.push(
    { type: 'separator' },
    aboutMenuItem({
      copyright: 'Copyright © CollMot Robotics'
    })
  )
}

const template = is.macos ? macOsMenuTemplate : linuxWindowsMenuTemplate

if (is.development) {
  template.push({
    label: 'Debug',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { role: 'toggledevtools' },
      { type: 'separator' },
      {
        label: 'Show App Data',
        click () {
          shell.openItem(app.getPath('userData'))
        }
      },
      {
        label: 'Delete App Data',
        click () {
          shell.moveItemToTrash(app.getPath('userData'))
          app.relaunch()
          app.quit()
        }
      }
    ]
  })
}

module.exports = app =>
  Menu.buildFromTemplate(template)
