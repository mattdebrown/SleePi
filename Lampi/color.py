import random

class Color:
    red = 0
    green = 0
    blue = 0

    def __init__(self, red, green, blue):
        self.red = red
        self.green = green
        self.blue = blue
    
    def random_color():
        return Color(random.randint(0, 255), random.randint(0, 255), random.randint(0, 255))


class Pixel:
    color = Color.random_color()
    blank = Color(0,0,0)
    
    def clear(self):
        self.color = self.blank
        self.influences = [self.blank]

    # def add_influence(self, influence_color):
    #     self.influences.append(influence_color)

    def set_color(self, color):
        self.color = color

    def result(self):
        # self.color = self.influences[0] # in future this will blend 
        return self.color