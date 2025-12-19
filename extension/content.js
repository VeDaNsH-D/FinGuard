document.addEventListener("mouseup", async () => {
  const text = window.getSelection().toString();
  if (text.length < 20) return;

  const res = await fetch("http://localhost:5000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text })
  });

  const d = await res.json();
  alert(`FinGuard: ${d.risk_level} (${d.risk_score})`);
});
