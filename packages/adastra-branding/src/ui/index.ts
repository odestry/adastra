export default function renderBrandingUI(title = 'Hey') {
  const template = document.createElement('h2')
  template.innerHTML = title
  document.body.appendChild(template)
}
