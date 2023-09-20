# Screen Management

This module will help manage the display via linux services.

xset commands handle screen blanking
https://linux.die.net/man/1/xset

dpms = Display Power Management

`xset dpms force off`

xrandr contains more screen configuration methods, including brightness.  Although on the raspberry pi touch display, brightness at 0 still puts off light.
https://xorg-team.pages.debian.net/xorg/howto/use-xrandr.html