const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
let deferredPrompt;

// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log("beforeinstallprompt fired");
    event.preventDefault();
    deferredPrompt = event;
    installButton.hidden = false;
    installButton.addEventListener("click", installApp);
});

function installApp() {
    deferredPrompt.prompt();
    installButton.disabled = true;

    deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === "accepted") {
          console.log("PWA setup accepted");
          installButton.hidden = true;
        } else {
          console.log("PWA setup rejected");
        }
        installButton.disabled = false;
        deferredPrompt = null;
      });
}

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // hideInstallPromotion();
    if (!installPrompt) {
        return;
    }
    const result = await installPrompt.prompt();
    console.log(`Install prompt was: ${result.outcome}`);
    installPromptPoof();
});

function installPromptPoof() {
    installPrompt = null;
    installButton.setAttribute('hidden', '');
}

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    installPromptPoof();
});
