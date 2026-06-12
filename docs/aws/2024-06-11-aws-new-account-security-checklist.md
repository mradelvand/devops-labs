---
sidebar_position: 1
title: "AWS New Account Security Checklist"
description: "The first things I do when spinning up a fresh AWS account — what matters, what order, and what I almost always forget."
slug: aws-new-account-security-checklist
tags: [aws, security, iam, cloud]
---

You spin up a new AWS account. Root credentials are right there. It feels fine. It is not fine.

Here's what I actually do — in priority order — before touching anything else.

<!-- truncate -->

## Step 1: Secure root immediately

Root has unrestricted access to everything and bypasses a lot of CloudTrail logging. The goal is to touch it as little as possible.

- **Add MFA to root** — hardware key (YubiKey) if you have one, TOTP app otherwise
- **Delete any root access keys** — check under *Security credentials* in the console; they should not exist
- **Never use root for day-to-day work** — billing settings only

## Step 2: Create an IAM admin user (or use IAM Identity Center)

On newer accounts, AWS pushes you toward **IAM Identity Center (SSO)** — it's the better long-term choice, especially if you'll have multiple accounts. For a solo lab account, a plain IAM admin user is fine to start.

Either way:

- Attach `AdministratorAccess` to your personal admin user only
- Enable MFA on that user too
- Never hand out `AdministratorAccess` to services or teammates — create narrower roles for that

## Step 3: Set a billing alarm

Runaway costs are a real risk in lab environments.

Go to **CloudWatch → Alarms → Billing**, set a threshold ($10–$50 depending on your usage), attach an SNS email notification. Also enable **AWS Budgets** for finer-grained alerts.

## Step 4: Enable CloudTrail

Without CloudTrail you have zero audit history. If something goes wrong, you're flying blind.

- Go to **CloudTrail → Create trail**
- Store logs in an S3 bucket
- Enable for all regions

That's it. Takes two minutes.

## Step 5: Enable GuardDuty

Threat detection for your account — watches for unusual API calls, credential misuse, cryptomining activity.

Also takes two minutes to enable. There's no reason to skip it.

## Step 6: Block public S3 access at the account level

Go to **S3 → Block Public Access settings for this account** and toggle all four options on.

This is a safety net. Even if you misconfigure a bucket later, nothing will accidentally become public.

## Step 7: The rest — this week

These matter but aren't "do it right now" urgent:

- **IAM password policy** — IAM → Account settings → enforce 12+ chars, symbols, expiry
- **Security Hub** — aggregates findings from GuardDuty, IAM Access Analyzer, and other services in one place
- **AWS Config** — tracks configuration changes over time, helps spot drift

## What got me

I skipped CloudTrail on my first lab account because I thought it was "just for enterprises." Two weeks later I had no idea what created a random IAM role I didn't recognize. I had to nuke the account and start over.

Enable it first, thank yourself later.

## Priority cheat sheet

| Priority | Action |
|---|---|
| 🔴 Right now | Root MFA, delete root access keys |
| 🔴 Right now | IAM admin user + MFA |
| 🟠 Today | CloudTrail, billing alarm, S3 public block |
| 🟡 This week | GuardDuty, Security Hub, IAM password policy |
| 🟢 When you scale | AWS Organizations, IAM Identity Center |

---

*Part of the [AWS Labs] series on the devops-labs blog.*
