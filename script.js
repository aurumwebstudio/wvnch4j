const music = document.querySelector("#music");
const audioGate = document.querySelector(".audio-gate");
const title = document.querySelector("h1");
const links = document.querySelector(".links");

const positionAudioGate = () => {
  if (!audioGate || !title || !links) return;

  const titleBottom = title.getBoundingClientRect().bottom;
  const linksTop = links.getBoundingClientRect().top;
  const midpoint = titleBottom + (linksTop - titleBottom) / 2;

  audioGate.style.setProperty("--gate-top", `${midpoint}px`);
};

const startMusic = async () => {
  if (!music) return;

  try {
    music.volume = 0.175;
    await music.play();
    audioGate?.classList.add("is-hidden");
    window.removeEventListener("pointerdown", startMusic);
    window.removeEventListener("keydown", startMusic);
    audioGate?.removeEventListener("click", startMusic);
  } catch {
    window.addEventListener("pointerdown", startMusic, { once: true });
    window.addEventListener("keydown", startMusic, { once: true });
    audioGate?.addEventListener("click", startMusic, { once: true });
  }
};

positionAudioGate();
window.addEventListener("resize", positionAudioGate);
startMusic();
