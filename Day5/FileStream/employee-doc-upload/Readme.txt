Example 1 — File Upload Using Streams

Problem
Employees upload large files during onboarding. If HR uploads a 200MB PDF, 
a normal file handler will:

Read the entire file into RAM
Freeze the server
Crash Node.js (Out-of-memory)

Goal
Build an API where:
Files stream chunk-by-chunk directly into a folder (or cloud).
Server memory stays low (few KB).
Upload does NOT block other requests.
