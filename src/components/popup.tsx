import { Popup } from '@sekizlipenguen/react-native-popup-confirm-toast';

export function showPopupMessage(
  title: string,
  textBody: string,
  type: 'success' | 'danger' | 'warning' | 'confirm' = 'success',
  buttonText = 'OK',
  callback?: () => void
) {
  Popup.show({
    type,
    title,
    textBody,
    buttonText,
    callback: callback ?? (() => Popup.hide()),
  });
}

export function showPopupConfirm(
  title: string,
  textBody: string,
  okText = 'OK',
  cancelText = 'Batal',
  onOk?: () => void,
  onCancel?: () => void
) {
  Popup.show({
    type: 'confirm',
    title,
    textBody,
    buttonText: okText,
    confirmText: cancelText,
    callback: () => {
      onOk?.();
      Popup.hide();
    },
    cancelCallback: () => {
      onCancel?.();
      Popup.hide();
    },
  });
}

export function hidePopup() {
  Popup.hide();
}
