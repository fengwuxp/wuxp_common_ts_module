import {
  AppCommandStorage,
  GetStorageCommandMethod,
  RemoveStorageCommandMethod,
  SetStorageCommandMethod
} from 'fengwuxp-declarative-storage-adapter'
import {tarojsAppCommandStorageFactory} from 'fengwuxp-torojs-storage'


export interface AppStorage extends AppCommandStorage {


}

export const AppStorage = tarojsAppCommandStorageFactory<AppStorage>();

