// sets a traffic light without crosswalk
function car_sensor () {
    Red()
    basic.showLeds(`
        . # # # .
        # # . # #
        # . # . #
        # # . # #
        . # # # .
        `)
    basic.pause(5000)
    Green()
    basic.pause(7000)
    Yellow()
    basic.pause(2000)
    Red()
    basic.pause(7000)
}
// sets a 
function GYRS () {
    basic.clearScreen()
    Green()
    basic.pause(1000)
    Crosswalk2()
    basic.pause(1500)
    Yellow()
    basic.pause(2000)
    Red()
    basic.showLeds(`
        . # # # .
        # # . # #
        # . # . #
        # # . # #
        . # # # .
        `)
    basic.pause(5000)
    basic.clearScreen()
}
// sets a normal traffic light w a 10 second countdown for crosswalk without sound
function GYRN () {
    basic.clearScreen()
    Green()
    basic.pause(1000)
    Crosswalk()
    basic.pause(1500)
    Yellow()
    basic.pause(2000)
    Red()
    basic.showLeds(`
        . # # # .
        # # . # #
        # . # . #
        # # . # #
        . # # # .
        `)
    basic.pause(5000)
    basic.clearScreen()
}
// if A is pressed, it sets mode to 1 and calls a normal traffic light w no sound countdown
input.onButtonPressed(Button.A, function () {
    mode = 1
})
// sets where the yellow light appears
function Yellow () {
    range = strip.range(0, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Black))
    range = strip.range(1, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Yellow))
    range = strip.range(2, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Black))
}
// sets volume to 150 & puts the sound in the background
function Sound () {
    music.setVolume(150)
    music.startMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.ForeverInBackground)
}
// stops all sounds
function Sound2 () {
    music.stopMelody(MelodyStopOptions.All)
}
// resets program if A and B are pressed together
input.onButtonPressed(Button.AB, function () {
    control.reset()
})
// sets a crosswalk with sound alongside countdown
function Crosswalk2 () {
    basic.showIcon(IconNames.Yes)
    Sound()
    basic.pause(2000)
    basic.clearScreen()
    Countdown()
    basic.pause(1500)
    basic.showIcon(IconNames.No)
    Sound2()
    basic.pause(2000)
    basic.clearScreen()
}
// sets a crosswalk without sound
function Crosswalk () {
    basic.showIcon(IconNames.Yes)
    basic.pause(2000)
    basic.clearScreen()
    Countdown()
    basic.pause(1000)
    basic.showIcon(IconNames.No)
    basic.pause(2000)
    basic.clearScreen()
}
// if B is pressed, sets mode to 2 and calls a traffic light w sound countdown
input.onButtonPressed(Button.B, function () {
    mode = 2
})
// sets countdown of 10 to 0
function Countdown () {
    for (let index = 0; index <= 10; index++) {
        basic.showNumber(10 - index)
        basic.pause(800)
        basic.clearScreen()
    }
}
// sets where the green light appears
function Green () {
    range = strip.range(0, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Green))
    range = strip.range(1, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Black))
    range = strip.range(2, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Black))
}
// sets where the red light appears
function Red () {
    range = strip.range(0, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Black))
    range = strip.range(1, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Black))
    range = strip.range(2, 1)
    range.showColor(neopixel.colors(NeoPixelColors.Red))
}
// on start, sets distance to 10, 3 led lights at pin 16 to RGB format, and the brightness to 50
let range: neopixel.Strip = null
let mode = 0
let strip: neopixel.Strip = null
let distance = 10
basic.showIcon(IconNames.Diamond)
strip = neopixel.create(DigitalPin.P16, 3, NeoPixelMode.RGB)
strip.setBrightness(50)
basic.pause(3000)
// sets mode 1 to GYR-N (traffic light w/out sound)
// sets mode 2 to GYR-S (traffic light w sound)
basic.forever(function () {
    if (mode == 1) {
        GYRN()
        mode = 0
    } else if (mode == 2) {
        GYRS()
        mode = 0
    } else {
    	
    }
})
// sets the code for the sonar (sensor) and if the distance is less than or equals to 5 then then a traffic light w/out crosswalk will happen
basic.forever(function () {
    pins.digitalWritePin(DigitalPin.P1, 0)
    control.waitMicros(2)
    pins.digitalWritePin(DigitalPin.P1, 1)
    control.waitMicros(10)
    pins.digitalWritePin(DigitalPin.P1, 0)
    distance = pins.pulseIn(DigitalPin.P2, PulseValue.High) / 58
    control.waitMicros(2)
    basic.pause(2000)
    if (distance <= 5) {
        car_sensor()
        mode = 0
    }
})
