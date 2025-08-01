const form = document.getElementById("sessionForm");
const resultDiv = document.getElementById("result");

const API_URL = "http://localhost:5000/api/session";

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const activity = document.getElementById("activity").value.trim();
  const duration = parseInt(document.getElementById("duration").value);

  if (!username || !activity || isNaN(duration)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, activity, duration }),
    });

    const data = await res.json();
    console.log("Session logged:", data);

    form.reset();
    fetchSessions();
  } catch (err) {
    console.error("Error submitting session:", err);
    alert("Failed to submit. Try again.");
  }
});

// Fetch and display past sessions
async function fetchSessions() {
  try {
    const res = await fetch(API_URL);
    const sessions = await res.json();

    resultDiv.innerHTML = ""; // Clear old content

    if (sessions.length === 0) {
      resultDiv.innerHTML = "<p>No sessions yet. Start wasting time 😎</p>";
      return;
    }

    sessions.forEach((s) => {
      const div = document.createElement("div");
      div.className = "session-card";
      div.innerHTML = `
        <p><strong>${s.username}</strong> wasted <strong>${s.duration} min</strong> on <em>${s.activity}</em></p>
        <p>🫢 Roast: ${s.roast}</p>
        <p>📅 ${new Date(s.date).toLocaleString()}</p>
        <button onclick="deleteSession('${s._id}')">🗑️ Delete</button>
        <hr/>
      `;
      resultDiv.appendChild(div);
    });
  } catch (err) {
    console.error("Error fetching sessions:", err);
    resultDiv.innerHTML = "<p>Could not load sessions. Try again later.</p>";
  }
}

// Delete session
async function deleteSession(id) {
  const confirmed = confirm("Are you sure you want to delete this session?");
  if (!confirmed) return;

  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    console.log("Deleted:", data);

    fetchSessions(); // Refresh the list
  } catch (err) {
    console.error("Error deleting session:", err);
    alert("Could not delete session. Try again.");
  }
}

// Initial fetch on page load
fetchSessions();
