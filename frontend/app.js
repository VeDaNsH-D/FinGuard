async function analyze() {
  const text = document.getElementById("input").value;
  const out = document.getElementById("output");

  out.innerHTML = "Analyzing with Gemini AI...";

  const res = await fetch("http://localhost:5000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const d = await res.json();

  out.innerHTML = `
    <h3>${d.risk_level}</h3>
    <p><b>Risk Score:</b> ${d.risk_score}</p>
    <p><b>Detected Language:</b> ${d.language}</p>
    <p><b>Bank Decision:</b> ${d.bankDecision.message}</p>
    <ul>${d.reasons.map(r => `<li>${r}</li>`).join("")}</ul>
  `;
}
