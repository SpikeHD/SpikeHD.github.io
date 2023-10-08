let currentDate = new Date();

setInterval(() => {
  updateTime();
}, 5000);

function updateTime() {
  const timeElm = document.getElementById('time');
  const dateElm = document.getElementById('date');

  const isPm = currentDate.getHours() >= 12;
  const hours = currentDate.getHours() % 12 || 12;
  const minutes = currentDate.getMinutes();

  const day = currentDate.getDate();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();

  timeElm.innerHTML = `${hours}:${minutes} ${isPm ? 'PM' : 'AM'}`;
  dateElm.innerHTML = `${monthName} ${day}, ${year}`;

  currentDate = new Date();
}

updateTime();