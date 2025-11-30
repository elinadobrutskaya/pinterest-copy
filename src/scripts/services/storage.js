const STORAGE = window.localStorage

export class Storage {
  constructor(key) {
    this.key = key
  }

  load() {
    try {
      const raw = STORAGE.getItem(this.key)
      if (!raw) return null
      return JSON.parse(raw)
    } catch (e) {
      console.error('Storage.load parse error', e)
      return null
    }
  }

  save(data) {
    try {
      STORAGE.setItem(this.key, JSON.stringify(data))
    } catch (e) {
      console.error('Storage.save error', e)
    }
  }
}
