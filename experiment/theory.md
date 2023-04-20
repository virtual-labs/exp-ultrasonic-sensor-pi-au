### Theory

Electronic hobbyists frequently use ultrasonic sensors, notably the HC-SR04 Ultrasonic Sensor, in a range of projects including obstacle-avoiding robots, distance measurement, proximity detection, and so forth. This lab will teach us about the HC-SR04 Ultrasonic and demonstrate how to connect one to a Raspberry Pi.

An ultrasonic sensor is a sensor that sends ultrasonic sound waves out and then receives them to figure out how far away an item is. It is employed in several applications, including liquid measurement in bottles and robots that avoid obstacles. It is comparable to the SONAR technology used by ships to determine the ocean's depth.

Let's now focus specifically on the HC-SR04 ultrasonic sensor. By using these little modules, you may measure distances up to 4-5 metres by ultrasound and are surprisingly accurate. HC-SR04 ultrasonic sensor has 4 important pins. Let's understand them properly.

VCC and GND are power supply pins.

Trig pin:
Sends the ultrasonic wave which hits the target object and gets reflected or echoed back.

Echo pin:
This reflected/echoed wave is received by the receiver which makes this echo pin go from the initial state of HIGH(goes high 5v when trig pin transmits wave) to LOW(goes low when the wave is received).
Note: Sending 5V output signal from echo pin to GPIO of Rpi (rated at 3.3v) would damage the pin. To solve this problem we will be using a level shifter for this pin.
Working Principle:
Speed = Distance/Time  
Distance = Speed*Time

Speed of sound is 340 m/s in air medium. To calculate the distance in cm, the speed of sound is 34000 cm/s. We will be using this formula later in our code. 
Components used in this experiment are – 

* Raspberry Pi 4 B
* HC-SR04 ultrasonic sensor module
* 1K, 2K Resistors
* Jumper cables
* Breadboard
* Rasberry Pi official power supply adapter


First and foremost, ensure that your Raspberry Pi is turned off. This is quite crucial. Never connect or disconnect any hardware component while your Pi is switched on. You might harm it, for example, with an ESD (Electro Static Discharge), or perhaps destroy it, if you connect the incorrect pins.

CIRCUIT – 
The trigger pin of the ultrasonic sensor goes to the GPIO 11 (physical PIN is 23) of RPI via the level shifter. The echo pin of the ultrasonic sensor goes to GPIO 12 (physical PIN 32) of RPI. The 5V and GND pin of ultrasonic sensor is connected to 5V and GND of Raspberry Pi respectively.
