### **Procedure**

#### **Hardware Setup**

To interface the **HC-SR04 Ultrasonic Sensor** with the **Raspberry Pi**, follow the wiring instructions carefully:

- Connect the **Vcc pin** of the Ultrasonic Sensor to the **5V PWR** pin of the Raspberry Pi.  
- Connect the **Trig pin** of the Ultrasonic Sensor to **GPIO 18** of the Raspberry Pi.  
- Connect the **GND pin** of the Ultrasonic Sensor to a **Ground (GND)** pin on the Raspberry Pi.  
- Connect the **Echo pin** of the Ultrasonic Sensor to a **1KΩ Resistor**.  
- Connect the **1KΩ Resistor pin**, which is connected with **GPIO 24**, to **Ground (GND)**.  
- Connect the **2KΩ Resistor pin**, which is connected with the **1KΩ Resistor**, to **Ground (GND)**.  



#### **Software Setup**

To control the **Ultrasonic Sensor** using **Python 3** on **Raspberry Pi OS**, follow these steps:

 **1. Import Required Libraries**  
- Import the `RPi.GPIO` module to interact with Raspberry Pi GPIO pins.  
- Import the `time` module for timing operations.  

 **2. Set GPIO Mode**  
- Use `GPIO.setmode(GPIO.BCM)` to refer to GPIO numbers instead of physical pin numbers.  

**3. Define Sensor Pins**  
- Assign **GPIO 18** to the **Trigger pin**.  
- Assign **GPIO 24** to the **Echo pin**.  

 **4. Configure GPIO Pins**  
- Set the **Trig pin** as an **output**.  
- Set the **Echo pin** as an **input**.  

 **5. Trigger the Sensor and Measure Response Time**  
- Set the **Trigg pin HIGH** for **10 microseconds** to send an **ultrasonic burst** at **40 KHz**.  
- Set the **Trig pin LOW** and measure the time taken for the sound wave to return.  

 **6. Calculate Distance**  
- Compute distance using the **time difference** between sending and receiving the pulse.  
- The formula used is:  

  \[
  \text{Distance} = \left( \text{Pulse Duration} \times 34300 \right) / 2
  \]  

  where **34300 cm/s** is the speed of sound in air, and the result is divided by **2** to account for the round trip.  

 **7. Display Output**  
- If the measured distance is **within 2 cm and 400 cm**, print the calculated value with **0.5 cm calibration**.  
- Otherwise, display **"Out of Range"**.  



#### **Python Code Implementation**

```python
import RPi.GPIO as GPIO  # Import GPIO library
import time  # Import time library

# GPIO pin configuration
GPIO.setmode(GPIO.BCM)  # Use Broadcom (GPIO) pin numbering
TRIG = 18  # Assign GPIO 18 to Trigger
ECHO = 24  # Assign GPIO 24 to Echo

# Set up GPIO pin modes
GPIO.setup(TRIG, GPIO.OUT)  # Set Trigger as output
GPIO.setup(ECHO, GPIO.IN)  # Set Echo as input

try:
    while True:
        GPIO.output(TRIG, False)  # Ensure Trigger is LOW
        print("Sensor is stabilizing...")
        time.sleep(2)  # Allow sensor to settle

        # Send ultrasonic pulse
        GPIO.output(TRIG, True)
        time.sleep(0.00001)  # 10 microseconds pulse
        GPIO.output(TRIG, False)

        # Measure the time of flight
        while GPIO.input(ECHO) == 0:
            pulse_start = time.time()  # Record start time

        while GPIO.input(ECHO) == 1:
            pulse_end = time.time()  # Record end time

        # Calculate distance
        pulse_duration = pulse_end - pulse_start
        distance = (pulse_duration * 34300) / 2  # Convert to cm
        distance = round(distance, 2)  # Round to 2 decimal places

        # Display results
        if 2 <= distance <= 400:
            print(f"Distance: {distance - 0.5} cm")  # Apply 0.5 cm correction
        else:
            print("Out of Range")

        time.sleep(1)  # Delay before next measurement

except KeyboardInterrupt:
    print("Measurement stopped by user")
    GPIO.cleanup()  # Reset GPIO settings
