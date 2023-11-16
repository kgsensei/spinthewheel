function randint(i,x){return Math.random()*(x-i)+i}
function gid(i){return document.getElementById(i)}

const fruits = [
    "Apple", "Orange", "Banana", "Peach",
    "Apricot", "Avocado", "Blackberry", "Blueberry",
    "Cherry", "Coconut", "Grapes", "Lemon",
    "Lime", "Mango", "Melon", "Pear",
    "Plum", "Pineapple", "Raspberry", "Zucchini"
]

var wheel = gid("wheel")
var editor = gid("options")
var options = ["Mango", "Cherry", "Peach", "Raspberry"]

function drawWheel() {
    var slices = 360 / options.length
    wheel.innerHTML = ""
    for (let i = 0; i < options.length; i++) {
        wheel.innerHTML += `<span class="wheel-slice" style="transform: rotate(${slices * i}deg) translate(0px, -50%);">${options[i]}</span>`
        wheel.innerHTML += `<hr class="wheel-divider" style="transform: rotate(${slices * i + (slices / 2)}deg) translate(0px, -50%);">`     
    }
}

function drawEditor() {
    editor.innerHTML = ""
    for (let i = 0; i < options.length; i++) {
        editor.innerHTML += `
            <div class="opt">
                <input type="text" class="opt-input" value="${options[i]}" onchange="updateItem(this, ${i})">
                <div class="opt-remove" onclick="removeItem('${options[i]}')">
                    <div class="center-text">
                        X
                    </div>
                </div>
            </div>
        `
    }
}

function updateItem(e, i) {
    options[i] = e.value

    drawEditor()
    drawWheel()
}

function removeItem(v) {
    var z = options.indexOf(v)
    if (z > -1) {
        options.splice(z, 1)
    }

    drawEditor()
    drawWheel()
}

function addItem() {
    options.push(fruits[Math.floor(Math.random() * fruits.length)])

    drawEditor()
    drawWheel()
}

function spinWheel() {
    var spins = randint(3, 5)
    var deg = spins * 360
    var currentRotation = wheel.style.rotate.replace("deg", "") * 1
    wheel.style.transition = `rotate ${spins * 500}ms ease-out`
    deg = currentRotation < 0 ? deg : -deg
    wheel.style.rotate = `${deg}deg`
    setTimeout(() => {
        var wheelOffset = Math.abs(360 - (wheel.style.rotate.replace("deg", "") * 1) % 360)
        var index = Math.round(wheelOffset / (360 / options.length))
        index = index >= options.length ? index % options.length : index
        var item = options[index]

        winner(item)
    }, spins * 500 + 100)
}

function removeAndContinue(n) {
    removeItem(n)

    drawEditor()
    drawWheel()

    gid("winning-background").style.display = "none"
}

function winner(n) {
    n = n == undefined ? 'Nothing...?' : n
    gid("winner").innerHTML = n
    gid("winning-background").style.display = "block"

    gid("removeAndContinue").setAttribute("onclick", `removeAndContinue('${n}')`)
}

function hideWinner() {
    gid("winning-background").style.display = "none"
}

drawEditor()
drawWheel()
