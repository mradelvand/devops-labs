---
sidebar_position: 1
title: "Hunting the Ghost Process: How to Stop a Runaway Log File"
description: "A forgotten background process is hammering your disk — here's how to find it, kill it, and reclaim the space without making things worse."
tags: [linux, troubleshooting, sysadmin, debian]
---

# Hunting the Ghost Process: How to Stop a Runaway Log File

**What I built:** Found and killed a runaway process eating disk space through an ever-growing log file.
**Time:** ~15 min
**Cost:** Free
**Repo:** [devops-labs](https://github.com/mradelvand/devops-labs)

---

## The goal

Someone left a test program running in the background. It was writing to `/var/log/bad.log` non-stop. The file was growing by the second, and storage alerts were going off. The job: find what's writing to that file, stop it, and reclaim the disk — without making the situation worse.
I tried **ps aux --sort=-%cpu | head -10** to find the culprit, but that only shows CPU-hungry processes.

---

## What I did

### 1. Find what's holding the file open

First instinct might be to just delete the file. Don't. If a process still has the file handle open, the space won't be freed — the file effectively keeps living in memory even after you remove it from the filesystem. You need the PID first.

`lsof` (List Open Files) is the right tool here:

```bash
sudo lsof /var/log/bad.log
```

Look at the `COMMAND` and `PID` columns in the output. That's your culprit.

If `lsof` isn't available, `fuser` gives you just the PID fast:

```bash
sudo fuser /var/log/bad.log
```

### 2. Kill the process

Start polite:

```bash
sudo kill <PID>
```

Wait a few seconds. If it's still running:

```bash
sudo kill -9 <PID>
```

`-9` sends SIGKILL — the process can't ignore it.


### 3. Verify

Make sure nothing new is writing to it:

```bash
sudo lsof /var/log/bad.log
```

No output means no process has it open. Good.

---

## What got me

My first move was to delete the log file. Bad idea. The process was still running and still held the file descriptor open, so the space wasn't actually freed — Linux doesn't release the blocks until every open handle is closed. The file disappeared from the directory listing but the disk was still full. 

Lesson: **always find and kill the process first, then clean up the file.**

The second thing that got me: `kill <PID>` alone wasn't enough because the process was catching SIGTERM and ignoring it. Needed `kill -9` to actually take it down.

---

## Cost note

Fully free tier — no charges.

---

*Part of the [Linux Troubleshooting](https://github.com/mradelvand/devops-labs) series.*
