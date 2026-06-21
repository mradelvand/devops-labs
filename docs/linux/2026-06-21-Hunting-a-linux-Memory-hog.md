---
sidebar_position: 1
title: "The Ghost in the Machine: Troubleshooting Post-Reboot RAM Starvation"
description: "How a forgotten HELK stack ate 7GB of RAM on boot, and the htop trick that found it"
slug: hunting-linux-memory-hog-elasticsearch
authors: [mradelvand]
tags: [linux, troubleshooting, docker, elasticsearch,sysadmin]
---

# The Ghost in the Machine: Troubleshooting Post-Reboot RAM Starvation
>System was crawling right after a fresh reboot. Mouse stuttering, video playback dropping frames, just one browser window open. No IDEs, no VMs, nothing heavy on screen. Classic "ghost in the machine" feeling.

## What I built / Time / Cost

- **What:** Triage process for tracking down a hidden RAM hog and a quick playbook for next time
- **Time:** ~20 minutes
- **Cost:** Free
**Repo:** [devops-labs](https://github.com/mradelvand/devops-labs)

<!--truncate-->

## The problem

Right after boot, `free -h` showed **13.1 GB used out of 15.4 GB**. With basically nothing open, that's not normal.

```bash
free -w -h
```

## Step 1: Don't trust the default process view

`top` and `htop` sort by `%CPU` by default. **A process can sit at 0% CPU and still be holding gigabytes of RAM** — it'll be invisible at the bottom of the list if you're only looking at CPU.

## Step 2: Sort by memory instead

Opened `htop`, pressed `F6`, switched the sort column to `PERCENT_MEM`. The list flipped instantly:

```text
USER       PID  %CPU %MEM      VSZ     RSS TTY   STAT START   TIME COMMAND
labadan   4099  17.1 47.2 14743628 7610352 ?     SLl  11:11   2:38 /usr/share/elasticsearch/jdk/bin/java ...
```

One process, **47.2% of total RAM** (~7.4 GB RSS). Command line pointed straight at `org.elasticsearch.bootstrap.Elasticsearch`.

A local HELK (Hunting ELK) stack — Elasticsearch, Logstash, Kafka, Kibana — was running in the background via Docker, with a `restart: always` policy. Every reboot, it came back.

The real culprit was the JVM flags: `-Xms6500m -Xmx6500m`. **`-Xms` forces the JVM to pre-allocate its entire initial heap immediately on start**. So the second the kernel finished booting, Elasticsearch grabbed 6.5 GB before I even logged in.

## Step 3: Kill it and stop it coming back

Stop everything running right now:

```bash
docker stop $(docker ps -q)
```

Then make sure it doesn't auto-relaunch on the next reboot:

```bash
docker update --restart=no $(docker ps -a -q)
```

## Verification

Memory usage dropped from 13.1 GB to 3.18 GB. UI lag gone, video playback back to normal.

## Fast-track cheatsheet

Save this for the next time a machine feels sluggish for no obvious reason:

```bash
# Top 10 RAM consumers
ps -e -o pid,pmem,comm --sort=-pmem | head -n 11

# Real memory picture (used vs. cache)
free -w -h

# Stop everything Docker is running
docker stop $(docker ps -q)

# Stop it from coming back on reboot
docker update --restart=no $(docker ps -a -q)
```

## What got me

`top`'s default CPU-sort view completely hid the problem. The process using almost half my RAM was sitting at 0-17% CPU, so it never showed up near the top of the screen unless I explicitly re-sorted by memory. If I hadn't known to hit `F6` in `htop`, I'd have kept staring at the wrong column.

## Key takeaway

When RAM is the symptom, sort by RAM — not CPU. And any background stack with `restart: always` (ELK, monitoring agents, local dev clusters) needs an on-demand startup policy, or it'll quietly reclaim your whole workstation every time you reboot.
