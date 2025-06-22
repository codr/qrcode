import './style.css';

import { generateQR } from './generate';

const input = document.querySelector<HTMLInputElement>('#qrText');

input?.addEventListener('input', () => {
  updateQRCodeDisplay(input.value);
});

function updateQRCodeDisplay(value: string = ''): void {
  const qrCode = generateQR(value);

  document.querySelector<HTMLDivElement>('#qrDisplay')!.innerHTML =
    qrCode.toConsole();
}

updateQRCodeDisplay(); // Initial call to display an empty QR code
