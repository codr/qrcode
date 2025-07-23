import './style.css';

import { generateQR } from './generate';

// put `querySelector` in a separate function to reduce bundle size
const querySelector = <T extends Element>(selector: string): T | null =>
  document.querySelector<T>(selector);

const input = querySelector<HTMLInputElement>('#i')!;
const qrDisplay = querySelector<HTMLDivElement>('#d')!;

// `oninput` uses fewer bytes than `addEventListener('input', ...)`
input.oninput = () => {
  updateQRCodeDisplay(input.value);
};

function updateQRCodeDisplay(value: string = ''): void {
  const qrCode = generateQR(value);

  qrDisplay.innerHTML = qrCode.toConsole();
}

if (import.meta.env.MODE !== 'nano') {
  const searchParams = new URLSearchParams(window.location.search);
  input.value = searchParams.get('i') || '';
}

updateQRCodeDisplay(input.value); // Initial call to display an empty QR code
