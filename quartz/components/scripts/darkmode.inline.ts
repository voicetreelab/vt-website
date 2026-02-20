// Force dark mode — no toggle, no system preference detection
document.documentElement.setAttribute("saved-theme", "dark")
localStorage.setItem("theme", "dark")

document.addEventListener("nav", () => {
  document.documentElement.setAttribute("saved-theme", "dark")
  localStorage.setItem("theme", "dark")
  const themeEvent = new CustomEvent("themechange", {
    detail: { theme: "dark" },
  })
  document.dispatchEvent(themeEvent)
})
