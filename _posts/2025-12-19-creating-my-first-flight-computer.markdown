---
layout: post
title: "Creating My Very First Flight Computer"
date: 2025-12-19
cover_image: "/assets/images/posts/creating-my-first-flight-computer/FlightComputer.jpg"
excerpt: "Designing the brain behind my TVC rocket system"
---
## Introduction

One of the biggest parts of my TVC rocket project was creating a custom flight computer from scratch. Instead of using a fully prebuilt solution, I wanted to understand how real flight systems work at both the hardware and software level.

The flight computer acts as the "brain" of the rocket. It reads sensor data, processes orientation and movement, and eventually sends commands to the thrust vector control system to stabilize the rocket during flight.

This project ended up teaching me far more than just electronics. It forced me to learn debugging, PCB design decisions, soldering, firmware flashing, wiring management, and how tiny mistakes can completely stop a system from functioning.

---

## Planning the Flight Computer

Before soldering anything, I had to figure out exactly what the system needed to do.

The flight computer needed:
- A microcontroller
- Sensor integration (IMU/gyro + accelerometer)
- Servo outputs
- Stable power delivery
- Data communication
- Compact packaging to fit inside the rocket

I spent a lot of time planning wiring layouts and component placement so everything would stay compact and lightweight.


![Flight Computer Schematic]({{ '/assets/images/posts/creating-my-first-flight-computer/FC_schem.jpg' | relative_url }})

![Flight Computer Design]({{ '/assets/images/posts/creating-my-first-flight-computer/FC_design.jpg' | relative_url }})

---

## Post Design & Testing

I got the PCB manufactured from PCBWAY, which was a really easy process. I decided not to solder the components on myself and just got it fully manufactured. Although it would be a great learning experience, I didn't want to waste components and money.

After getting the PCB, I started figuring out how exactly to flash code to test the sensors. For some reason, the flight computer would refuse to connect to my PC.

After a lot of debugging, I realized the issue came from the reset line design itself.

To fix it, I had to:
- Resolder parts of the board
- Move a resistor
- Add an additional wire connected to GND
- Rework parts of the layout manually

It was frustrating because the mistake was small electrically, but fixing it physically took a long time.

![Reset Switch Soldering]({{ '/assets/images/posts/creating-my-first-flight-computer/solder.jpg' | relative_url }})



---

## Flashing & Firmware Problems

After the hardware was assembled, the next challenge was getting the firmware running properly.

This part caused way more issues than I expected.

At different points:
- The FC wouldn't flash correctly
- Sensors failed to initialize
- Serial communication randomly stopped
- Code uploads would fail entirely

The hardest part about firmware debugging is that the problem could come from literally anywhere:
- Bad wiring
- Incorrect code
- Wrong pin definitions
- Power instability
- Faulty solder joints
- Driver/configuration issues

A lot of progress came from isolating one subsystem at a time and testing components individually before reconnecting everything together.

Eventually, after many failed uploads and debugging sessions, I finally got stable communication and sensor readings working consistently.

---

## Lessons Learned

This project taught me that engineering is rarely clean or straightforward.

Most of the progress came from:
- Repeating tests
- Finding tiny mistakes
- Iterating on failed designs
- Learning how hardware and software interact

I also learned that small electrical mistakes can create massive debugging problems later. Something as simple as one incorrectly connected pin can stop an entire system from functioning.

Even though the process was frustrating at times, building the flight computer from scratch gave me a much deeper understanding of aerospace systems and embedded engineering.

---

## Current Status

The flight computer is now able to:
- Read orientation data
- Communicate with sensors
- Control outputs
- Interface with the TVC system
- Run stabilization-related code

There's still a lot more optimization and testing left to do, but seeing the system finally operate after all the debugging made the process worth it.

---

## Future Improvements

Some future upgrades I want to make include:
- Cleaner PCB design (Smaller, Lighter)
- Improved wiring management
- Better onboard data logging
- More robust power filtering
- Faster stabilization loops
- Improved reliability during launch conditions

This project is still evolving, and every iteration teaches me something new.
