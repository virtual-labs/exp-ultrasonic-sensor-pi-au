### Procedure

* Read the instructions carefully. Click on the components to start interacting with it in the connection area.

* Connect one wire between the Raspberry Pi's GND (ground) pin and the Ultrasonic Sensor’s GND pin.
* Connect one wire between the Raspberry Pi's 5V pin and the Sensor’s 5V pin.
* The Trigger pin of the Sensor is connected directly to the GPIO 11 Pin of the Raspberry Pi via the level shifter.
* The Echo pin of the Sensor is connected to the GPIO 12 pin of the RPI.
* Setting up the Voltage Divider Circuit(Level Shifter)
* The echo pin of ultrasonic sensor is connected to two resistors of 1kΩ and 2kΩ in series to GND. the intersection of both resistors are connected to the 3.3V pin and the whole circuit is then connected to the GPIO 12 Pin  
* After completing the circuit diagram, click the "Code" button and submit the code.Software Setup –
Control the Ultrasonic Sensor with Python 3 on Raspberry Pi OS –
* Now that the hardware and software are properly configured, we can begin controlling the Ultrasonic Sensor on the Raspberry Pi with Python3.
* First, we import the RPi.GPIO Python module, which allows us to control all GPIOs on the Raspberry Pi through the GPIO header.
* We also include the time module, which will be used later to wait 2 seconds.
* Create a "constant" global variable with the LED's GPIO number. This allows you to utilise the variable name rather than the number directly. It will produce fewer errors.
* Use the RPi.GPIO module to execute. This allows you to utilise GPIO numbers rather than "normal" pin numbers.
* Configure the respective input and output pins.
* Set the trigger pin as high for 10 microseconds to start the ultrasonic module. It sends 8 ultrasonic bursts a 40 KHz
* Set the trigger as Low and note down the time taken between the pulse sent and received
* Calculate the distance by multiplying the speed with half of the time value.

Code –

    import RPi.GPIO as GPIO              #Import GPIO library
    import time                                	#Import time library
    GPIO.setmode(GPIO.BCM)             	#Set GPIO pin numberingBCM refers GPIO nos 
    TRIG = 11                                			#Associate pin 11 to TRIG
    ECHO = 12                                 		 	#Associate pin 12 to ECHO
    GPIO.setup(TRIG,GPIO.OUT)                 	#Set pin as GPIO out
    GPIO.setup(ECHO,GPIO.IN)                  	#Set pin as GPIO in
    while True:
  	GPIO.output(TRIG, False)                 	#Set TRIG as LOW
  	print("Sensor is stablizing")
  	time.sleep(2)                           		#Delay of 2 seconds
  	GPIO.output(TRIG, True)                  	#Set TRIG as HIGH
 	time.sleep(0.00001)                     	#Delay of 0.00001 seconds
  	GPIO.output(TRIG, False)                	#Set TRIG as LOW
 	while GPIO.input(ECHO)==0:               #Check whether the ECHO is LOW
    		pulse_start = time.time()            #Saves the last known time of LOW pulse
  	while GPIO.input(ECHO)==1:               #Check whether the ECHO is HIGH
    		pulse_end = time.time()              #Saves the last known time of HIGH pulse 
  	pulse_duration = pulse_end - pulse_start 	#Get pulse duration to a variable
    distance = pulse_duration * 17150   	#Multiply pulse duration by 17150 to get distance
  	distance = round(distance, 2)            	#Round to two decimal points
  	if distance > 2 and distance < 400:        #Check whether the distance is within range
    	print("Distance:",distance - 0.5,"cm")       #Print distance with 0.5 cm calibration
  	else:
                print("Out Of Range" )                  	 #display out of range

