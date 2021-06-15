const spawn = require("child_process").spawn;

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

const run = (args, callback) => {
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
};

run(["-i", "input.mp4", "output.mp4", "-y"], (percent, eta) => {
  console.log([percent, eta]);
});
