const detectURL = (string: string) => {
  const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g
  return string.match(urlRegex)
}

export default detectURL
