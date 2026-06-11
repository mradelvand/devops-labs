---
title: "Saskatoon: Counting IPs in an Access Log"
description: "Extract the first field from a web server access log, count occurrences, and identify the IP address with the most requests."
sidebar_position: 1
tags: [linux, awk, cut, log-analysis, sysadmin]
---

# Saskatoon: Counting IPs in an Access Log

**What I built:** Found the IP address that generated the most requests in a web server access log.
**Time:** ~5 min | **Cost:** Free

---

## The goal

The file `/home/admin/access.log` has one HTTP request per line. The first field on every line is the client IP address.

The task:

1. Extract all IPs.
2. Count how many times each one appears.
3. Find the one with the highest count.
4. Write that IP to `/home/admin/highestip.txt`.

---

## Understanding the log

A typical line looks like this:

```text
192.168.1.10 - - [10/Oct/2024:13:55:36] "GET /index.html HTTP/1.1" 200 1234
```

The IP is always the first field — everything before the first space.

---

## What I did

### 1. Extract the first field

Two ways to do it. With `awk`:

```bash
awk '{print $1}' /home/admin/access.log | head
```

Or with `cut`:

```bash
cut -d' ' -f1 /home/admin/access.log | head
```

Both give you a raw list of IPs, one per line.

### 2. Sort the IPs

`uniq` only counts *consecutive* duplicates, so sort first:

```bash
awk '{print $1}' /home/admin/access.log | sort | head
```

Now identical IPs are grouped together.

### 3. Count each unique IP

```bash
awk '{print $1}' /home/admin/access.log | sort | uniq -c | head
```

Output looks like:

```text
 15 10.0.0.1
 27 172.16.0.8
482 192.168.1.5
```

First column is the count, second is the IP.

### 4. Find the highest count

Sort numerically in reverse order and grab the top line:

```bash
awk '{print $1}' /home/admin/access.log | sort | uniq -c | sort -nr | head -1
```

```text
482 192.168.1.5
```

### 5. Save only the IP

That command returns both the count and the IP. Use a second `awk` to pull just the IP:

```bash
awk '{print $1}' /home/admin/access.log | sort | uniq -c | sort -nr | head -1 | awk '{print $2}' > /home/admin/highestip.txt
```

### Verification

Check the count matches:

```bash
grep -c -F -f /home/admin/highestip.txt /home/admin/access.log
```

Expected: `482`. If you get a lower number, something went wrong upstream.

---

## What got me

I kept forgetting that `uniq -c` needs the input sorted first. Running it on unsorted data gives you counts per *run*, not per unique value — so you end up with the same IP counted multiple times in separate blocks. The `sort` before `uniq -c` is not optional.

---

## Key takeaway

The whole thing is one pipeline:

```bash
awk '{print $1}' access.log | sort | uniq -c | sort -nr | head -1
```

Read it left to right:

1. Extract IPs.
2. Sort them.
3. Count occurrences.
4. Sort counts highest to lowest.
5. Take the top result.

Once the pipeline clicks, any log-analysis problem with "find the most frequent X" becomes the same pattern.

---

*Part of the [SadServers Practice](https://sadservers.com) series on Linux troubleshooting.*
