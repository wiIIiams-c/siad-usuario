import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    //this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async get(key: string): Promise<any> {
    return await this._storage?.get(key);
  }

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  async clear(){
    this._storage = null;
    await this.storage.clear();
  }
}
