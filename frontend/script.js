async function analyze() {
  const message = document.getElementById("message").value;
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "Analyzing...";

  const response = await fetch("http://localhost:5000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await response.json();

  let colorClass = "low";
  if (data.level === "High Risk") colorClass = "high";
  else if (data.level === "Suspicious") colorClass = "medium";

  resultDiv.innerHTML = `
    <h3 class="${colorClass}">Risk Level: ${data.level}</h3>
    <p><strong>Score:</strong> ${data.score}/100</p>
    <ul>
      ${data.reasons.map(r => `<li>${r}</li>`).join("")}
    </ul>
  `;
}
