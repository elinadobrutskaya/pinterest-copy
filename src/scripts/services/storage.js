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
    } catch (err) {
      console.error('Storage.load parse error:', err)
      return null
    }
  }

  save(value) {
    try {
      STORAGE.setItem(this.key, JSON.stringify(value))
    } catch (err) {
      console.error('Storage.save error:', err)
    }
  }
}
