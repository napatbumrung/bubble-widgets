(function () {
  // Create a safe namespace (avoid global collisions)
  window.BWWidgets = window.BWWidgets || {};

  function escapeHtml(s) {
    return String(s ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function mount(el, props) {
    if (!el) return;

    // idempotent: re-render safely
    el.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.className = "bw-hero";

    const title = escapeHtml(props.title);
    const subtitle = escapeHtml(props.subtitle);
    const buttonText = escapeHtml(props.buttonText);

    // Unique button id per mount
    const btnId = "bw-hero-btn-" + Math.random().toString(36).slice(2);

    wrapper.innerHTML = `
      <h1>${title}</h1>
      <p>${subtitle}</p>
      <button id="${btnId}" type="button">${buttonText}</button>
    `;

    el.appendChild(wrapper);

    const btn = document.getElementById(btnId);
    if (btn) {
      btn.addEventListener("click", function () {
        // Optional: send event to Bubble if a Toolbox "Javascript to Bubble" function exists
        // Example: bubble_fn_hero_clicked("clicked")
        if (typeof window.bubble_fn_hero_clicked === "function") {
          window.bubble_fn_hero_clicked("clicked");
        } else {
          alert("Button clicked!");
        }
      });
    }
  }

  function mountAll(selector = ".bw-hero-mount") {
    const nodes = document.querySelectorAll(selector);
    nodes.forEach((node) => {
      const props = {
        title: node.getAttribute("data-title") || "Hello Bubble",
        subtitle: node.getAttribute("data-subtitle") || "Loaded via Bubble + Toolbox",
        buttonText: node.getAttribute("data-button") || "Click me",
      };
      mount(node, props);
    });
  }

  window.BWWidgets.hero = { mount, mountAll };
})();
