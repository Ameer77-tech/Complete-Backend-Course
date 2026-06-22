# Node.js Event Loop, Asynchronous Architecture & Non-Blocking I/O

## Overview

Node.js is built around an **event-driven, non-blocking architecture** that allows it to handle thousands of concurrent requests efficiently while executing JavaScript on a **single main thread**.

Understanding this architecture is one of the most important backend concepts.

---

# 1. Single Threaded Nature of Node.js

Node.js executes JavaScript on a single main thread.

A single thread can execute only one piece of JavaScript at a time.

Example:

```text
console.log("A")
console.log("B")
console.log("C")
```

Execution:

```text
A
B
C
```

The code runs sequentially on the JavaScript thread.

---

# 2. The Problem

Imagine a request needs to:

* Read a file
* Query a database
* Call an external API
* Wait for a timer

These operations may take milliseconds or even seconds.

If Node.js waited for every operation to finish, all other incoming requests would be blocked.

Example:

```text
Request 1
↓
Database Query (10 seconds)
↓
Response
```

If Node waited synchronously, every other user would have to wait.

This would make Node.js extremely slow.

---

# 3. The Solution: Asynchronous Architecture

Instead of performing slow operations itself, Node.js delegates them.

Examples:

```text
File Operations
Database Queries
Network Requests
Timers
```

Node starts the operation and immediately continues handling other work.

Conceptually:

```text
Request Arrives
        ↓
Node Starts Database Query
        ↓
Node Continues Handling Other Requests
        ↓
Database Finishes
        ↓
Node Sends Response
```

This is called **Non-Blocking I/O**.

---

# 4. What is Non-Blocking I/O?

Non-Blocking I/O means:

```text
Start Operation
↓
Do Not Wait
↓
Continue Executing Other Work
↓
Come Back When Result Is Ready
```

Example:

```text
User 1 → Database Query (10s)
User 2 → Login Request
User 3 → Product Request
User 4 → Health Check
```

Node can continue processing Users 2, 3 and 4 while User 1's database query is running.

---

# 5. Event Loop

The Event Loop is the mechanism that allows Node.js to coordinate asynchronous operations.

Its job is simple:

```text
Is the Call Stack Empty?
        ↓
Yes
        ↓
Execute Pending Callback
```

The Event Loop continuously checks whether JavaScript is free to execute more work.

---

# 6. Callback Queue

When an asynchronous operation completes:

```text
Database Query Finished
Timer Finished
File Read Finished
```

its callback is placed into a queue.

```text
Completed Operation
        ↓
Callback Queue
```

The Event Loop later moves callbacks from the queue into the Call Stack for execution.

---

# 7. Request Lifecycle

Example:

```text
User Sends Request
        ↓
Node Receives Request
        ↓
Database Query Starts
        ↓
Node Continues Handling Other Requests
        ↓
Database Finishes
        ↓
Callback Added To Queue
        ↓
Event Loop Detects Empty Stack
        ↓
Callback Executed
        ↓
Response Sent To User
```

---

# 8. Call Stack

The Call Stack is where JavaScript executes code.

Example:

```text
function A()
    ↓
function B()
    ↓
function C()
```

Stack:

```text
C
B
A
```

Execution follows:

```text
Last In
First Out (LIFO)
```

A function must complete before the previous function continues.

---

# 9. async / await

Many beginners misunderstand async/await.

## What async Does

```text
Makes a function return a Promise
Allows use of await
```

It does NOT:

```text
Create a new thread
Move code to libuv
Make code automatically asynchronous
```

---

## What await Does

```text
Pause Current Function
Wait For Promise
Resume Later
```

Important:

```text
await pauses ONLY the current function
NOT the entire Node.js server
```

Example Flow:

```text
Function Starts
        ↓
await Database Query
        ↓
Function Paused
        ↓
Node Handles Other Requests
        ↓
Database Returns Result
        ↓
Function Resumes
        ↓
Response Sent
```

---

# 10. CPU-Bound vs I/O-Bound Work

## I/O-Bound Work

Examples:

```text
Database Queries
API Calls
File Reads
Network Requests
Timers
```

Characteristics:

```text
Mostly Waiting
```

Node.js performs extremely well here.

---

## CPU-Bound Work

Examples:

```text
Video Encoding
Image Processing
AI Inference
Heavy Calculations
Large Loops
```

Characteristics:

```text
Requires Continuous CPU Usage
```

Node.js must execute this work itself.

If performed on the main thread:

```text
Event Loop Blocks
Other Requests Wait
```

---

# 11. Background Workers

Heavy CPU tasks should be moved outside the API process.

Architecture:

```text
User Uploads Video
        ↓
API Server
        ↓
Store Processing Job
        ↓
Return Response
        ↓
------------------
        ↓
Worker Process
        ↓
Process Video
        ↓
Store Result
```

The worker may be:

```text
Another Node.js Process
Python Service
Go Service
FFmpeg Process
```

This keeps the API responsive.

---

# 12. Mental Model

Think of Node.js as a coordinator.

```text
Node.js
    ↓
Coordinates
    ↓
Database
File System
Network
Timers
Workers
```

Node.js spends very little time waiting.

Instead, it delegates slow operations and uses the Event Loop to resume work when results become available.

---

# Key Takeaway

Node.js handles many concurrent requests efficiently not because it executes many JavaScript threads, but because it delegates slow I/O operations, keeps the main thread free, and uses the Event Loop to execute completed callbacks when results are ready.
