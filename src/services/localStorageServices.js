export function saveUserLocalStorage(data = {}) {
  localStorage.setItem("user", JSON.stringify(data))
}

export function getUserLocalStorage() {
  const dataUser = localStorage.getItem("user")
  if (!!dataUser) {
    return JSON.parse(dataUser)
  }
  return {}
}

export function clearUserLocalStorage() {
    localStorage.removeItem('user');
}