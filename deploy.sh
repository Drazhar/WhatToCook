#!/bin/bash
sshfs pi@192.168.0.4:/home/pi /home/traphi/mnt/webserverPi

rsync -vicr 00_deploy/* /home/traphi/mnt/webserverPi/WhatToCook/