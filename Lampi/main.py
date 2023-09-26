import time
import random
import lerp
from color import Color, Pixel

from enum import Enum, auto

import lightstrip

from flask import Flask, request, jsonify
import threading

from perlin_noise import PerlinNoise

app = Flask(__name__)


@app.route("/hello", methods=["GET"])
def hello():
    return jsonify({"message": "Hello, World!"})


@app.route("/set_color", methods=["POST"])
def set_color():
    data = request.get_json()  # Assuming the incoming data is in JSON format
    print(data)
    red = data.get("red")
    green = data.get("green")
    blue = data.get("blue")
    print(green)
    set_color(red, green, blue)
    return jsonify(data)


@app.route("/set_state", methods=["POST"])
def set_state():
    data = request.get_json()
    print(data)
    state = data.get("state")
    set_state(state)
    return jsonify(data)


@app.route("/clear", methods=["POST"])
def clear():
    clear_pixels()
    return jsonify({"message": "Cleared all pixels"})


def start_thread():
    app.run(host="172.16.1.81", port=5000)


def start_server():
    print("Starting Server...")

    # start_thread()

    # Start Flask app in a separate thread
    with app.app_context():
        flask_thread = threading.Thread(target=start_thread)
        flask_thread.start()


current_color = Color.random_color()


# def set_color(red, green, blue):
#     print('main set color')
#     current_color = WS2801.RGB_to_color(blue, green, red)
#     result = WS2801.RGB_to_color(blue, green, red)
#     for i in range(pixels.count()):
#         pixels.set_pixel(i, result)
#     pixels.show()


def clear_pixels():
    pixels.clear()
    pixels.show()


class Source:
    TOP_SPEED = 0.002
    BOTTOM_SPEED = 0.0001

    TOP_SIZE = 0.6
    BOTTOM_SIZE = 0.2

    position = 0.5
    speed = 0.0008
    size = 0.5

    def __init__(self, color):
        self.color = color
        self.speed = self.BOTTOM_SPEED + (
            random.random() * (self.TOP_SPEED - self.BOTTOM_SPEED)
        )
        self.size = self.BOTTOM_SIZE + (
            random.random() * (self.TOP_SIZE - self.BOTTOM_SIZE)
        )

    def update_point(self):
        self.position += self.speed
        if self.position > 1 + self.size:
            self.position = 0 - self.size
        if self.position < 0 - self.size:
            self.position = 1 + self.size


current_color = Color.random_color()
blank = lightstrip.WS2801.RGB_to_color(0, 0, 0)

points = [Source(Color.random_color()), Source(Color.random_color())]


# create an array of pixels
pixels_buffer = [Pixel() for i in range(lightstrip.PIXEL_COUNT)]


def update_pixels_to_points():
    # clear pixel array, and add random influence to top group
    # i = 0
    # for pixel in pixels_buffer:
    #     pixel.clear()
    #     i += 1
    #     if(i > 10):
    #         pixel.add_influence(random_color())

    # for each pixel, calculate value influenced by point
    # pixelCount = pixels.count()
    # for i in range(pixelCount):
    #     # normalized pixel position
    #     pixel_position = i / pixelCount

    #     # for now trying with one point still
    #     point = points[0]

    # absolute_difference = abs(point.position - pixel_position)
    # if(absolute_difference < point.size):
    #     effector = lerp.inv_lerp(point.size, 0, absolute_difference)
    #     effector **= 6
    #     color_value = WS2801.RGB_to_color(int(current_color.red * effector), int(current_color.green * effector), int(current_color.blue * effector))
    #     pixels.set_pixel(i, color_value)
    # else:
    #     pixels.set_pixel(i, blank)
    # pixel_color = Color(pixels_buffer[i].combined_result())
    # wscolor = WS2801.RGB_to_color(pixel_color.red, pixel_color.green, pixel_color.blue)
    # pixels.set_pixel(i, wscolor)

    pixels.show()


# def random_update():
#     print("random_update")
#     lightstrip.render_color(Color.random_color())


## State Object Definition


class NoiseMode:
    seed = 1
    octaves = 10
    time = 0
    rate = 0.2
    noise = PerlinNoise(octaves=10, seed=1)

    def __init__(self):
        self.setup_noise()

    def setup_noise(self):
        self.time = 0
        print(self.noise)

    def update_noise(self):
        self.time += self.rate

        # value = self.noise([0, self.time])

        global pixels_buffer
        global current_color

        i = 0
        for pixel in pixels_buffer:
            pixel.clear()
            i += 1
            value_r = self.noise(int(self.time))
            value_g = self.noise([i + 20, int(self.time)])
            value_b = self.noise(i)
            print(
                f"i: {i}   value_R: {value_r}   value_G: {value_g}   value_B: {value_b}"
            )

            # trying to get perlin noise
            # pixel.set_color(Color(int(current_color.red) * value_r, int(current_color.green) * value_g, int(current_color.blue * 0)))

            # completely random pixels
            pixel.set_color(Color.random_color())

        lightstrip.render_pixels(pixels_buffer)

        time.sleep(self.rate)


class StrobeMode:
    on = True
    rate = 0.005

    def __init__(self):
        self.rate = 0.02

    def flip(self):
        self.on = not self.on
        if self.on:
            lightstrip.render_color(current_color)
        else:
            lightstrip.clear()

    def update(self):
        time.sleep(self.rate)
        self.flip()


strobe_mode = StrobeMode()
noise_mode = NoiseMode()

## State Management


class State(Enum):
    OFF = 0
    SOLID = 1
    STROBE = 2
    NOISE = 3


current_state = State.SOLID


def set_state(state):
    # print(state)

    global current_state
    current_state = State(state)
    # print(current_state)

    if current_state == State.OFF:
        print("confirmed OFF")
        lightstrip.clear()

    if current_state == State.SOLID:
        print("confirmed SOLID")
        lightstrip.render_color(current_color)

    if current_state == State.STROBE:
        print("confirmed STROBE")
        lightstrip.clear()

    # if(current_state == State.NOISE)


def update_state():
    if current_state == State.STROBE:
        # print('update strobe')
        strobe_mode.update()

    if current_state == State.NOISE:
        # print('noise update')
        noise_mode.update_noise()


set_state(current_state)


def set_color(red, green, blue):
    global current_color
    current_color = Color(red, green, blue)
    if current_state == State.SOLID:
        lightstrip.render_color(current_color)

    if current_state == State.STROBE:
        lightstrip.render_color(current_color)


## Main Loop
if __name__ == "__main__":
    desired_runtime = 60
    start_time = time.time()

    start_server()

    try:
        while True:
            # update_pixels_to_points()
            # for point in points:
            #     point.update_point()

            # random_update()

            # print(f"current_state: {current_state}")

            update_state()

            # current_time = time.time()
            # elapsed_time = current_time - start_time

            # if elapsed_time >= desired_runtime:
            #     break

    except KeyboardInterrupt:
        pass

    lightstrip.clear()

    set_state(State.NOISE)
