const detectURLs = (string: string) => {
  const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g
  return string.match(urlRegex)
}

export default detectURLs
