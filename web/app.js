/**
 * Mirrorly Web Controller
 * Handles room join/create and prepares for WebRTC stream + control events
 */

const els = {
  roomCode: document.getElementById('room-code'),
  joinBtn: document.getElementById('join-btn'),
  createBtn: document.getElementById('create-btn'),
  status: document.getElementById('connection-status'),
  deviceName: document.getElementById('device-name'),
  overlay: document.getElementById('overlay'),
  video: document.getElementById('remote-video'),
};

let currentRoom = null;

// Generate a simple 6-character room code
function generateRoomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function setStatus(connected, device = '—') {
  if (connected) {
    els.status.textContent = 'Connected';
    els.status.className = 'badge online';
    els.overlay.style.display = 'none';
  } else {
    els.status.textContent = 'Disconnected';
    els.status.className = 'badge offline';
    els.overlay.style.display = 'flex';
  }
  els.deviceName.textContent = device;
}

// Create room
els.createBtn.addEventListener('click', () => {
  const code = generateRoomCode();
  els.roomCode.value = code;
  currentRoom = code;
  setStatus(false);
  alert(`Room created!\n\nCode: ${code}\n\nOpen the Mirrorly agent on your iPhone and enter this code.`);
});

// Join room
els.joinBtn.addEventListener('click', () => {
  const code = els.roomCode.value.trim().toUpperCase();
  if (code.length < 4) {
    alert('Please enter a valid room code');
    return;
  }
  currentRoom = code;
  setStatus(false, 'Connecting…');

  // TODO: Connect to signaling server + start WebRTC
  console.log('Joining room:', code);
  alert(`Joining room ${code}...\n\n(WebRTC connection will be implemented next)`);
});

// Control buttons
document.querySelectorAll('[data-action]').forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    console.log('Control action:', action);
    // TODO: Send control event over data channel
  });
});

// Click on video = tap
els.video.addEventListener('click', (e) => {
  if (!currentRoom) return;
  const rect = els.video.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width;
  const y = (e.clientY - rect.top) / rect.height;
  console.log('Tap at', x.toFixed(3), y.toFixed(3));
  // TODO: Send normalized coordinates to agent
});

console.log('Mirrorly web controller ready');
