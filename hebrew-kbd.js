class HebrewKbd extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const targetId = this.getAttribute('target-id');
    const inputTarget = document.getElementById(targetId);

    if (!inputTarget) {
      this.shadowRoot.innerHTML = `<p style="color:red;">Input with id "${targetId}" not found.</p>`;
      return;
    }

    this.shadowRoot.innerHTML = `
      <style>
        .simple-keyboard {
          max-width: 600px;
          margin-top: 10px;
        }

        .simple-keyboard .hg-button {
          font-size: 18px;
          padding: 12px;
          margin: 3px;
          background-color: #fff;
          border: 1px solid #ccc;
          cursor: pointer;
        }

        .simple-keyboard .hg-row {
          display: flex;
          justify-content: center;
        }
      </style>

      <div class="simple-keyboard"></div>
      <script src="https://cdn.jsdelivr.net/npm/simple-keyboard@latest/build/index.js"></script>
    `;

    const keyboardScript = document.createElement("script");
    keyboardScript.src = "https://cdn.jsdelivr.net/npm/simple-keyboard@latest/build/index.js";
    keyboardScript.onload = () => {
      const Keyboard = window.SimpleKeyboard.default;
      const keyboard = new Keyboard({
        onChange: input => {
          inputTarget.value = input;
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
        onKeyPress: button => {
          if (button === "←") {
            const value = inputTarget.value;
            inputTarget.value = value.slice(0, -1);
          }
        },
      });
    };

    this.shadowRoot.appendChild(keyboardScript);
  }
}

customElements.define('hebrew-kbd', HebrewKbd);
