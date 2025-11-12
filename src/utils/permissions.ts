import { Platform, Linking } from 'react-native';
import { check, request, RESULTS, PERMISSIONS, openSettings } from 'react-native-permissions';

const isGranted = (status: string) => status === RESULTS.GRANTED;
const isBlocked = (status: string) => status === RESULTS.BLOCKED;

export async function requestCameraPermission(): Promise<boolean> {
  const perm = Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
  });
  if (!perm) return false;
  const status = await check(perm);
  if (isGranted(status)) return true;
  const next = await request(perm);
  return isGranted(next);
}

export async function requestLocationWhenInUsePermission(): Promise<boolean> {
  const permPrimary = Platform.select({
    ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  });
  if (!permPrimary) return false;
  const status = await check(permPrimary);
  if (isGranted(status)) return true;
  const next = await request(permPrimary);
  if (isGranted(next)) return true;
  // Fallback to coarse on Android if fine not granted
  if (Platform.OS === 'android') {
    const coarse = await request(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
    if (isGranted(coarse)) return true;
  }
  return false;
}

export async function requestPhotoLibraryPermission(): Promise<boolean> {
  if (Platform.OS === 'ios') {
    const status = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
    if (isGranted(status)) return true;
    const next = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    return isGranted(next);
  }
  // Android: API 33+ uses READ_MEDIA_IMAGES, below uses READ_EXTERNAL_STORAGE
  const sdk = typeof Platform.Version === 'number' ? Platform.Version : 0;
  const androidPerm = sdk >= 33 ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
  const status = await check(androidPerm);
  if (isGranted(status)) return true;
  const next = await request(androidPerm);
  return isGranted(next);
}

export async function requestBluetoothPermissions(): Promise<boolean> {
  if (Platform.OS === 'ios') {
    // iOS requires Bluetooth peripheral permission
    const status = await check(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL);
    if (isGranted(status)) return true;
    const next = await request(PERMISSIONS.IOS.BLUETOOTH_PERIPHERAL);
    return isGranted(next);
  }
  // Android: API 31+ needs runtime BLUETOOTH_SCAN & BLUETOOTH_CONNECT
  const sdk = typeof Platform.Version === 'number' ? Platform.Version : 0;
  if (sdk >= 31) {
    const scan = await check(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
    const connect = await check(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
    let scanOk = isGranted(scan);
    let connectOk = isGranted(connect);
    if (!scanOk) {
      const r = await request(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
      scanOk = isGranted(r);
    }
    if (!connectOk) {
      const r = await request(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
      connectOk = isGranted(r);
    }
    return scanOk && connectOk;
  }
  // Below Android 12, bluetooth perms are normal and often covered by location; treat as granted
  return true;
}

export async function ensurePermissionOrOpenSettings(checkFn: () => Promise<boolean>): Promise<boolean> {
  const ok = await checkFn();
  if (ok) return true;
  // If blocked, suggest opening settings
  try {
    await openSettings();
  } catch (e) {
    // Fallback open system settings
    Linking.openSettings?.();
  }
  return false;
}
