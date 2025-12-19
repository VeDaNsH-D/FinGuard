async function analyze() {
  const text = document.getElementById("input").value;
  const out = document.getElementById("output");

  out.innerHTML = "Analyzing with AI...";

  const res = await fetch("http://localhost:5000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const data = await res.json();

  let cls = "low";
  if (data.level === "High Risk") cls = "high";
  else if (data.level === "Suspicious") cls = "medium";

  out.innerHTML = `
    <h3 class="${cls}">${data.level}</h3>
    <p><strong>Risk Score:</strong> ${data.score}/100</p>
    <p><strong>AI Confidence:</strong> ${data.aiConfidence}</p>
    <ul>${data.explanation.map(e => `<li>${e}</li>`).join("")}</ul>
  `;
}
