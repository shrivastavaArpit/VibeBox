// Elements
const searchInput = document.getElementById("searchInput");
const trackContainer = document.querySelector(".card-container");
const playbarTrackInfo = document.querySelector(".track-info");
const audioPlayer = document.querySelector("audio");

// Event listener for search
searchInput.addEventListener("input", searchMusic);

// Function to fetch and display search results
async function searchMusic() {
  const query = searchInput.value.trim();
  if (query === "") {
    trackContainer.innerHTML = ""; // Clear results when input is empty
    return;
  }

  const response = await fetch(`https://itunes.apple.com/search?term=${query}&entity=song&limit=12`);
  const data = await response.json();

  // Display results
  trackContainer.innerHTML = "";
  data.results.forEach(song => {
    const songCard = createSongCard(song);
    trackContainer.appendChild(songCard);
  });
}

// Function to create individual song cards
function createSongCard(song) {
  const card = document.createElement("div");
  card.classList.add("track");

  const songImage = document.createElement("img");
  songImage.src = song.artworkUrl100;
  songImage.alt = song.trackName;

  const songTitle = document.createElement("h3");
  songTitle.textContent = song.trackName;

  const artistName = document.createElement("p");
  artistName.textContent = song.artistName;

  card.appendChild(songImage);
  card.appendChild(songTitle);
  card.appendChild(artistName);

  // Event listener for song selection
  card.addEventListener("click", () => playSong(song));

  return card;
}

// Function to play the selected song
function playSong(song) {
  playbarTrackInfo.textContent = `🎧 Now Playing: ${song.trackName} - ${song.artistName}`;
  audioPlayer.src = song.previewUrl;
  audioPlayer.play();
}
