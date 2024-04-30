export function updateFavicon(alert: boolean): void {
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  const size = 64;
  canvas.width = size;
  canvas.height = size;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, 0, 0, size, size);
    if (alert) {
      ctx.fillStyle = "red";
      ctx.font = "48px serif";
      ctx.fillText("!", size / 2, size / 2);
    }

    const linkElement = document.getElementById("favicon") as HTMLLinkElement;
    if (linkElement) linkElement.href = canvas.toDataURL("image/x-icon");
  };
  img.src = "../../public/favicon.png";
}