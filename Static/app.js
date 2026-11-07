(() => {
  const status = document.getElementById("voice-status");
  const speakButtons = [...document.querySelectorAll("[data-speak-text]")];

  function speak(text) {
    if (!("speechSynthesis" in window)) {
      if (status) status.textContent = "Speech playback is not supported in this browser.";
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-NZ";
    utterance.rate = 0.88;

    utterance.onstart = () => {
      if (status) status.textContent = "Playing. Listen, then repeat the sentence aloud.";
    };
    utterance.onend = () => {
      if (status) status.textContent = "Finished. You can listen again or practise another phrase.";
    };
    utterance.onerror = () => {
      if (status) status.textContent = "Could not play audio. Try another browser or device.";
    };

    window.speechSynthesis.speak(utterance);
  }

  speakButtons.forEach((button) => {
    button.addEventListener("click", () => {
      speak(button.dataset.speakText || "");
    });
  });

  const repeatButton = document.getElementById("repeat-all");

  if (repeatButton) {
    repeatButton.addEventListener("click", async () => {
      const phrases = [...document.querySelectorAll(".phrase-text")]
        .map((element) => element.textContent.trim())
        .filter(Boolean);

      if (!("speechSynthesis" in window)) {
        if (status) status.textContent = "Speech playback is not supported in this browser.";
        return;
      }

      window.speechSynthesis.cancel();

      for (const phrase of phrases) {
        await new Promise((resolve) => {
          const utterance = new SpeechSynthesisUtterance(phrase);
          utterance.lang = "en-NZ";
          utterance.rate = 0.88;
          utterance.onstart = () => {
            if (status) status.textContent = `Listen, then repeat: “${phrase}”`;
          };
          utterance.onend = resolve;
          utterance.onerror = resolve;
          window.speechSynthesis.speak(utterance);
        });

        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
          break;
        }

        // Pause between phrases so the learner can repeat aloud.
        await new Promise((resolve) => setTimeout(resolve, 2500));
      }

      if (status) status.textContent = "Practice finished. Select a phrase to hear it again.";
    });
  }
})();
