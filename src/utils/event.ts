import { EventEmitter } from 'events';

class AppEventEmitter extends EventEmitter {}

const appEventEmitter = new AppEventEmitter();

export function emitEvent(event: string, payload: any): void {
  appEventEmitter.emit(event, payload);
}

export function onEvent(event: string, callback: (payload: any) => void): void {
  appEventEmitter.on(event, callback);
}

// Additional event utilities can be added here