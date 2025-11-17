export function Element(tagName, attributes = {}, ...children) {
  this.element = document.createElement(tagName)

  const { textContent, innerHTML, onclick, ...restAttributes } = attributes

  if (textContent) this.element.textContent = textContent
  if (innerHTML) this.element.innerHTML = innerHTML
  if (onclick) this.element.onclick = onclick

  for (const key in restAttributes) {
    const value = restAttributes[key]
    if (typeof value === 'boolean') {
      if (value) this.element.setAttribute(key, key)
    } else {
      this.element.setAttribute(key, value)
    }
  }

  for (const child of children) {
    if (child) this.element.append(child)
  }

  return this.element
}
