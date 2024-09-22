let currentAlertState = false;
let faviconOriginalHref = '';

export function updateFavicon(alert: boolean): void {
  currentAlertState = alert;

  if (!faviconOriginalHref) {
    const originalFavicon = document.getElementById("favicon") as HTMLLinkElement;
    if (originalFavicon) {
      faviconOriginalHref = originalFavicon.href;
    }
  }

  updateFaviconIcon();

  if (!updateFavicon.hasListener) {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    updateFavicon.hasListener = true;
  }
}

updateFavicon.hasListener = false;

function handleVisibilityChange() {
  updateFaviconIcon();
}

function updateFaviconIcon() {
  const linkElement = document.getElementById("favicon") as HTMLLinkElement;
  if (!linkElement) return;

  if (document.visibilityState === 'visible') {
    linkElement.href = faviconOriginalHref;
    return;
  }

  if (currentAlertState && document.visibilityState === 'hidden') {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const size = 64;
    canvas.width = size;
    canvas.height = size;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      ctx.drawImage(img, 0, 0, size, size);

      // Dessiner le point rouge ou un symbole d'alerte
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(size - 16, 16, 10, 0, 2 * Math.PI);
      ctx.fill();

      linkElement.href = canvas.toDataURL("image/png");
    };
    img.src = faviconOriginalHref;
  }
}