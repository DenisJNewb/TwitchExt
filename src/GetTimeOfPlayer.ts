const player = document.querySelector("video");

// Unimplemented
// Unused

const processTime = () => {
  if (!player) {
    console.error("Video player element not found");
    return;
  }

  const rawTimeInSeconds = player.currentTime;

  // Corrected Math
  const hours = Math.floor(rawTimeInSeconds / 3600);
  const minutes = Math.floor((rawTimeInSeconds % 3600) / 60);
  const seconds = Math.floor(rawTimeInSeconds % 60);

  // Formatting with padStart for consistent 00:00:00 style
  const hDisplay = hours.toString().padStart(2, "0");
  const mDisplay = minutes.toString().padStart(2, "0");
  const sDisplay = seconds.toString().padStart(2, "0");

  console.log(`${hDisplay}:${mDisplay}:${sDisplay}`);
};

setInterval(processTime, 1500);