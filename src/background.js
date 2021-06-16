"use strict";

import { app, protocol, BrowserWindow, ipcMain, dialog } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension, { VUEJS_DEVTOOLS } from "electron-devtools-installer";
import { spawn } from "child_process";
import { dirname } from "path";
import { readFile, unlink } from 'fs';

let win = null;
const isDevelopment = process.env.NODE_ENV !== "production";
const duration_re = /Duration:([0-9]*:[0-9]*.[0-9]*.[0-9]*)/;
const time_re = /time=([0-9]*:[0-9]*.[0-9]*.[0-9]*)/;
const speed_re = /speed=(([0-9]*[.])?[0-9]+)x/;

const convert_timestamp = (time) => {
  const splited = time.split(":");
  let timestamp = parseFloat(splited.pop());
  timestamp += parseInt(splited[0]) * 3600;
  timestamp += parseInt(splited[1]) * 60;
  return timestamp;
};

const ffmpegRun = (args, callback, exitCallback) => {
  const process = spawn("ffmpeg", args);

  let duration = null;

  process.stderr.on("data", (data) => {
    const message = data.toString().replace(/ /g, "").replace(/\r/g, "");

    if (!duration) {
      const check_duration = duration_re.exec(message);
      if (check_duration) {
        duration = convert_timestamp(check_duration[1]);
      }
    }

    const check_time = time_re.exec(message);
    if (check_time) {
      const speed = parseFloat(speed_re.exec(message)[1]);
      const now = convert_timestamp(check_time[1]);

      let percent = (now / duration) * 100;
      let eta = (duration - now) / speed;

      if (percent === Infinity || eta === Infinity) {
        percent = 0;
        eta = 0;
      }

      callback(percent, eta);
    }
  });

  process.on("close", exitCallback);
};

protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

async function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 1000,
    minHeight: 600,
    frame: false,
    webPreferences: {
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      enableRemoteModule: true,
    },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol("app");
    win.loadURL("app://./index.html");
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

ipcMain.on('openDialog', (evt, payload) => {
  dialog.showSaveDialog(win, {
    filters: [
      { name: 'mp4', extensions: ['mp4'] }
    ]
  }).then(data => {
    evt.reply('path', data.filePath)
  })
})

ipcMain.on("render", (evt, payload) => {
  const { inputPath, outputPath, width, height, x, y } = payload;

  const random = Math.random().toString(36).substr(2, 11);
  const outputPathDir = dirname(outputPath);

  ffmpegRun(
    [
      "-i",
      inputPath,
      "-filter:v",
      `crop=${width}:${height}:${x}:${y}`,
      `${outputPathDir}/${random}.mp4`,
    ],
    (percent, eta) => {
      evt.reply("progressCrop", { percent, eta });
    },
    () => {
      evt.reply("doneCrop");

      ffmpegRun(
        [
          "-i",
          `${outputPathDir}/${random}.mp4`,
          "-i",
          `${outputPathDir}/${random}.mp4`,
          "-i",
          `${outputPathDir}/${random}.mp4`,
          "-filter_complex",
          "hstack=inputs=3",
          outputPath,
        ],
        (percent, eta) => {
          evt.reply("progressMerge", { percent, eta });
        },
        () => {
          evt.reply("doneMerge");

          readFile(outputPath, (err, data) => {
            evt.reply('done', data)

            unlink(`${outputPathDir}/${random}.mp4`, () => { })
          })
        }
      );
    }
  );
});

if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
