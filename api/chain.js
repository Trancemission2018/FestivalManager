async function first() {

  return new Promise((resolve, reject) => {
    this.a = 1
    resolve()
  })
}

function second() {
  return new Promise((resolve, reject) => {
    this.a = 1
    console.log('A is', this.a)
    this.b = 2
    resolve()
  })
}


console.log(first().second())
