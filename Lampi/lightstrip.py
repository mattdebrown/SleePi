import Adafruit_WS2801 as WS2801
import Adafruit_GPIO.SPI as SPI
from color import Color, Pixel

SPI_PORT = 0
SPI_DEVICE = 0

PIXEL_COUNT = 96
PIXEL_BRIGHTNESS = 255

strip = WS2801.WS2801Pixels(PIXEL_COUNT, spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE), gpio=None)

def render_pixels(pixels):
    for i in range(PIXEL_COUNT):
        strip.set_pixel(i, ws_color(pixels[i].result()))
    strip.show() 

def render_color(color):
    # wscolor = ws_color(color)
    for i in range(PIXEL_COUNT):
        strip.set_pixel(i, ws_color(color))
    strip.show() 

def ws_color(color):
    # colour = Color(color)
    return WS2801.RGB_to_color(color.blue, color.green, color.red)

def clear():
    strip.clear()
    strip.show()