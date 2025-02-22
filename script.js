let cities = [
    { name: "New York", timeZone: "America/New_York" },
    { name: "London", timeZone: "Europe/London" },
    { name: "Tokyo", timeZone: "Asia/Tokyo" }
  ];
  
  const clockContainer = document.getElementById("clockContainer");
  const editToggle = document.getElementById("editToggle");
  const citySelect = document.getElementById("citySelect");
  const addCityButton = document.getElementById("addCityButton");
  
  function updateClocks() {
    clockContainer.innerHTML = "";
  
    cities.forEach((city, index) => {
      const now = new Date();
      const localHourStr = now.toLocaleTimeString([], { hour: '2-digit', hour12: false, timeZone: city.timeZone });
      const localHour = parseInt(localHourStr, 10);
      const isNight = (localHour < 6 || localHour >= 18);
  
      const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false, timeZone: city.timeZone };
      const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', timeZone: city.timeZone };
      const timeString = now.toLocaleTimeString([], timeOptions);
      const dateString = now.toLocaleDateString([], dateOptions);
  
      const clockDiv = document.createElement("div");
      clockDiv.className = "clock" + (isNight ? " night" : "");
      if (editToggle.checked) {
        clockDiv.classList.add("editing");
      }
  
      clockDiv.innerHTML = `
        <div class="city">${city.name}</div>
        <div class="time">${timeString}</div>
        <div class="date">${dateString}</div>
        <div class="edit-controls">
          <button class="upBtn" data-index="${index}">&#8679;</button>
          <button class="downBtn" data-index="${index}">&#8681;</button>
          <button class="delBtn" data-index="${index}">&#10005;</button>
        </div>
      `;
      clockContainer.appendChild(clockDiv);
    });
    attachControlEvents();
  }
  
  function attachControlEvents() {
    document.querySelectorAll(".upBtn").forEach(btn => {
      btn.onclick = function() {
        const idx = parseInt(this.getAttribute("data-index"), 10);
        if (idx > 0) {
          [cities[idx-1], cities[idx]] = [cities[idx], cities[idx-1]];
          updateClocks();
        }
      };
    });
  
    document.querySelectorAll(".downBtn").forEach(btn => {
      btn.onclick = function() {
        const idx = parseInt(this.getAttribute("data-index"), 10);
        if (idx < cities.length - 1) {
          [cities[idx], cities[idx+1]] = [cities[idx+1], cities[idx]];
          updateClocks();
        }
      };
    });
  
    document.querySelectorAll(".delBtn").forEach(btn => {
      btn.onclick = function() {
        const idx = parseInt(this.getAttribute("data-index"), 10);
        cities.splice(idx, 1);
        updateClocks();
      };
    });
  }
  
  addCityButton.addEventListener("click", () => {
    const selectedValue = citySelect.value;
    if (!cities.some(city => city.timeZone === selectedValue)) {
      const selectedText = citySelect.options[citySelect.selectedIndex].text;
      cities.push({ name: selectedText, timeZone: selectedValue });
      updateClocks();
    } else {
      alert("City already added.");
    }
  });
  
  editToggle.addEventListener("change", updateClocks);
  
  updateClocks();
  setInterval(updateClocks, 1000);
  