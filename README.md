# POC of OT-MICROSERVICES Frontend

---

## Author Information

| **Author**   | **Created on** | **Version** | **Last updated by** | **Last edited on** | **Level** | **Reviewer**  |
|--------------|----------------|-------------|---------------------|--------------------|-----------|---------------|
| Ishaan       | 1-08-25       | v1.0        | Ishaan              | 3-08-25           | Internal  | Rohit Chopra  | 

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Purpose](#2-purpose)  
3. [Pre-Requisites](#3-pre-requisites)  
4. [System Requirements](#4-system-requirements)   
5. [Ports](#5-ports)  
6. [Setup and Execution](#6-setup-and-execution)   
7. [Troubleshooting](#7-troubleshooting)  
8. [FAQs](#8-faqs)  
9. [Contact Information](#9-contact-information)  
10. [References](#10-references)  

---

## 1. Introduction

This document serves as the installation, setup, and troubleshooting guide for the OT-MICROSERVICES Frontend, a ReactJS-based web application.

---

## 2. Purpose

The OT-MICROSERVICES Frontend is a ReactJS web application that provides the main user interface for the OT-Microservices stack. It enables management and visualization of employee, attendance, and salary information by communicating with the backend REST APIs.

---

## 3. Pre-Requisites

- Node.js (v12.22.9 or later recommended)
- npm (v8.5.1 or later)
- GNU Make (v4.3 or later)


---

## 4. System Requirements

| Hardware/Software | Minimum Recommendation  |# frontend-api
|-------------------|------------------------|
| Processor         | 1 CPU (t2.micro EC2)   |
| RAM               | 1 GiB                  |
| Disk              | 8 GB                   |
| OS                | Ubuntu 22.04 LTS       |

---

## 5. Ports

| Port | Service              | Description                         |
|------|---------------------|-------------------------------------|
| 22   | SSH                 | Remote terminal access              |
| 3000 | HTTP (ReactJS)      | Default frontend port               |

---

## 6. Setup and Execution

### 1. Install System Dependencies

```bash
sudo apt update
sudo apt install make
```
<img width="1919" height="804" alt="Screenshot 2025-08-01 000718" src="https://github.com/user-attachments/assets/201c9c86-d53b-4e0e-831a-269872ae93ba" />


### 2. Install Node.js version 16

```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs
```
<img width="1919" height="876" alt="Screenshot 2025-08-01 001030" src="https://github.com/user-attachments/assets/ca73869e-d45a-4f49-8efe-017d3498dab8" />

### 3. Check Node and npm Versions

```bash
node -v
npm -v
```

### 4. Clone the Repository

```bash
git clone https://github.com/OT-MICROSERVICES/frontend.git
cd frontend
```

### 5. Install Project Dependencies

```bash
make install
```

### 6. Build the Application

```bash
npm run build
```

- If you get “JavaScript heap out of memory”, run:
  ```bash
  NODE_OPTIONS="--max_old_space_size=4096" npm run build
  ```
  *(For low-RAM systems, use 512/1024 instead of 4096.)*

### 7. Install and Use Serve (for static hosting)

```bash
sudo npm install -g serve
serve -s build
```

### 8. Optionally, create a systemd service for auto-start

```bash
sudo nano /etc/systemd/system/frontend.service
```
_Sample Service File:_
```
[Unit]
Description=OT-MICROSERVICES Frontend ReactJS Service
After=network.target

[Service]
User=ubuntu
WorkingDirectory=/home/ubuntu/frontend
ExecStart=/usr/bin/serve -s build
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable frontend.service
sudo systemctl start frontend.service
sudo systemctl status frontend.service
```

---



## 7. Troubleshooting

| Issue                        | Solution                                                         |
|------------------------------|------------------------------------------------------------------|
| JS heap out of memory        | Use `NODE_OPTIONS="--max_old_space_size=4096" npm run build`     |
| Port 3000 in use             | Run `serve -s build -l 3001` or kill previous process            |
| Cannot access externally     | Check firewall/security group for port 3000                      |
| Deprecated/vulnerable dependencies   | Run `npm audit fix` (optional, not blocking for deployment)      |                           |

---


## 8. FAQs

- **Is this application free?**  
  Yes, open-source.

- **Can I deploy on any cloud?**  
  Yes, on VM/container with Node.js.

- **Is there an enterprise version?**  
  No, only open-source.

---

## 9. Contact Information

| Name| Email Address      | GitHub | URL |
|-----|--------------------------|-------------|---------|
| Ishaan | ishaan.aggarwal.snaatak@mygurukulam.co|  Ishaan-Dev1  |   https://github.com/Ishaan-Dev1  |


---

## 10. References

| Description                       | Link                                                                 |
|------------------------------------|----------------------------------------------------------------------|
| Frontend API                       | https://github.com/OT-MICROSERVICES/frontend                         |
| Javascript heap out of memory      | https://geekflare.com/fix-javascript-heap-out-of-memory-error/       |
