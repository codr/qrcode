import './style.css';

import { generateQR } from './generate';

const input = document.querySelector<HTMLInputElement>('#qrText')!;
const qrDisplay = document.querySelector<HTMLDivElement>('#qrDisplay')!;

input.addEventListener('input', () => {
  updateQRCodeDisplay(input.value);
});

function updateQRCodeDisplay(value: string = ''): void {
  const qrCode = generateQR(value);

  qrDisplay.innerHTML = qrCode.toConsole();
}

updateQRCodeDisplay(); // Initial call to display an empty QR code

const searchParams = new URLSearchParams(window.location.search);
input.value = searchParams.get('q') || '';
