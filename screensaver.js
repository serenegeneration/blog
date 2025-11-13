const body = document.querySelector('body')
const label = document.querySelector('#label')

let colors = [ 
    '#00ff80ff', 
    '#ff000dff', 
    '#ff7300ff', 
    '#ffc800ff', 
    '#00ffe5ff', 
    '#0095ffff', 
    '#e31bf5ff', 
    '#ffc1f3', 
]

let FPS = 60

let width
  , height
  , velocityX = 1
  , velocityY = 1
  , pause = true
  , previousColor = 0
;

setInterval(() => {
  if (pause) return;

  let rect = label.getBoundingClientRect()

  let left = rect.x
  let top = rect.y

  if (left + rect.width >= width || left <= 0) {
    velocityX = -velocityX
    let randomColor = getRandomColor()
    label.style.stroke = randomColor
    
    if (left + 150 <= width / 2) {
      body.style.boxShadow = `inset 0px 0px 0px 0px `
    } else {
      body.style.boxShadow = `inset 0px 0px 0px 0px `
    }
  }
  if (top + rect.height >= height || top <= 0) {
    velocityY = -velocityY
    let randomColor = getRandomColor()
    label.style.stroke = randomColor
    
    if (top + 28 <= height / 2) {
      body.style.boxShadow = `inset 0px 0px 0px 0px ${randomColor}`
    } else {
      body.style.boxShadow = `inset 0px 0px 0px 0px ${randomColor}`
    }
  }

  label.style.left = rect.x + velocityX + 'px'
  label.style.top = rect.y + velocityY + 'px'
}, 1000 / FPS)


const reset = () => {
  width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  ;

  height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight
  ;

  pause =
    width <= label.getBoundingClientRect().width ||
    height <= label.getBoundingClientRect().height
  ;

  label.style.left = 'calc(50vw - 150px)'
  label.style.top = 'calc(50vh - 28px)'
  label.style.stroke = colors[0]
}


const getRandomColor = () => {
  let currentColor = -1
  
  do {
    currentColor = Math.floor(Math.random() * colors.length);
  } while (previousColor == currentColor);
  
  previousColor = currentColor
  
  return colors[currentColor]
}

reset()

window.addEventListener('resize', reset, true)
