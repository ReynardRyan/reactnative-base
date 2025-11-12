import Toast from 'react-native-toast-message';

export function showToast(
  type: 'success' | 'error' | 'info',
  text1: string,
  text2?: string
) {
  Toast.show({ type, text1, text2 });
}

export function toastSuccess(text1: string, text2?: string) {
  showToast('success', text1, text2);
}

export function toastError(text1: string, text2?: string) {
  showToast('error', text1, text2);
}

export function toastInfo(text1: string, text2?: string) {
  showToast('info', text1, text2);
}

export function hideToast() {
  Toast.hide();
}
