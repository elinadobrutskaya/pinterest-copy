export function Element(tagName, attributes = {}, ...children) {
  this.element = document.createElement(tagName)

  const { textContent, innerHTML, onclick, dataset, ...rest } = attributes

  if (textContent) this.element.textContent = textContent
  if (innerHTML) this.element.innerHTML = innerHTML
  if (onclick) this.element.onclick = onclick

  // FIX dataset
  if (dataset && typeof dataset === 'object') {
    for (const key in dataset) {
      this.element.dataset[key] = dataset[key]
    }
  }

  // все остальные атрибуты
  for (const key in rest) {
    const value = rest[key]
    if (typeof value === 'boolean') {
      if (value) this.element.setAttribute(key, key)
    } else {
      this.element.setAttribute(key, value)
    }
  }

  // CHILDREN
  for (const child of children) {
    if (child) this.element.append(child)
  }

  return this.element
}
