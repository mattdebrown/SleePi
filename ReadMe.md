SleePi
============================================

## Overview

SleePi is a bedside clock application built for the Raspberry Pi. Intended as a platform to create complex and custom sound and light programs, for entering and exiting sleep. It also hopes to create a limited portal to the benefits of the internet, while providing an opportunity for users to remove cellular phones from their sleeping space.  

### Planned Features

- A user interface designed for touch screen
- Audio streaming from local or remote sources
- External lamp, based on 2801 LED strips
- Alarm and sleep programs for light and audio devices
- Customizable visual themes
- Access to information API's
- Text to speech capability

### Hardware Setup

Sleepi is an electron app that is currently being designed solely for the raspberry pi official 7' touch screen.  It is planned to have swappable rendering scripts, so in future could be developed with more flexible interfaces. 

**Lampi** is a python program running on a Raspberry Pi Zero W.  It is running Raspberry Pi OS lite, so network and ssh information needs to be set when writing the SD card image.  


To install from github run the following commands

>`sudo apt-get update`

>`sudo apt-get install git-all`

>`git clone https://github.com/mattdebrown/SleePi.git`

>`sudo apt-get install python3-pip`

>`pip3 install Adafruit-WS2801`

>`sudo raspi-config` -> Interface Options -> Enable SPI

>`pip3 install flask`