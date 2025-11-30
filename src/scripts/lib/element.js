export function Element(tagName, attributes = {}, ...children) {
  const el = document.createElement(tagName)
  const { textContent, innerHTML, onclick, disabled, dataset, ...rest } =
    attributes || {}
  if (textContent !== undefined) el.textContent = textContent
  if (innerHTML !== undefined) el.innerHTML = innerHTML
  if (onclick) el.onclick = onclick
  if (disabled) el.disabled = true
  if (dataset && typeof dataset === 'object') {
    for (const key in dataset) {
      el.dataset[key] = dataset[key]
    }
  }

  for (const key in rest) {
    const value = rest[key]
    if (typeof value === 'boolean') {
      if (value) el.setAttribute(key, key)
    } else if (value !== undefined && value !== null) {
      el.setAttribute(key, String(value))
    }
  }
  for (const child of children) {
    if (!child) continue
    if (child instanceof Node) el.appendChild(child)
    else if (child.element instanceof Node) el.appendChild(child.element)
    else if (typeof child === 'string' || typeof child === 'number')
      el.append(String(child))
  }
  return el
}
