class HebrewKbd extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        body {
          font-family: sans-serif;
        }
        input {
          width: 100%;
          font-size: 18px;
          padding: 10px;
          margin-bottom: 15px;
          direction: rtl;
        }
        .simple-keyboard {
          max-width: 600px;
        }
      </style>
      <input id="input" placeholder="הקלד כאן..." />
      <div class="simple-keyboard"></div>
      <script src="https://cdn.jsdelivr.net/npm/simple-keyboard@latest/build/index.js"></script>
    `;

    const keyboardInit = () => {
      const Keyboard = window.SimpleKeyboard.default;
      const input = this.shadowRoot.querySelector("#input");
      const keyboardContainer = this.shadowRoot.querySelector(".simple-keyboard");

      const keyboard = new Keyboard({
        onChange: inputVal => {
          input.value = inputVal;
          window.parent.postMessage({ type: "hebrewInput", value: inputVal }, "*");
        },
        layout: {
          default: [
            "ק ר א ט ו ן ם פ",
            "ש ד ג כ ע י ח ל ך",
            "ז ס ב ה נ מ צ ת ץ ←"
          ]
        },
        display: {
          "←": "⌫"
        },
        theme: "hg-theme-default myTheme1",
        debug: false
      });

      input.addEventListener("input", (e) => {
        keyboard.setInput(e.target.value);
      });
    };

    // Wait for external script to load
    const script = this.shadowRoot.querySelector("script");
    script.onload = keyboardInit;
  }
}

customElements.define("hebrew-kbd", HebrewKbd);
