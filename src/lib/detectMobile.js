
export const MIN_WIDTH = 848

export default function detectMobile () {
  let width = window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  if (navigator.userAgent.match(/Android/i) ||
  navigator.userAgent.match(/webOS/i) ||
  navigator.userAgent.match(/iPhone/i) ||
  navigator.userAgent.match(/iPad/i) ||
  navigator.userAgent.match(/iPod/i) ||
  navigator.userAgent.match(/BlackBerry/i) ||
  navigator.userAgent.match(/Windows Phone/i) ||
  width <= MIN_WIDTH
  ) {
    return true
  } else {
    return false
  }
}
