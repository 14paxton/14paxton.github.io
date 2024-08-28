---
title:        UsersAndGroups
permalink:    MacNotes/UsersAndGroups
category:     MacNotes
parent:       MacNotes
layout:       default
has_children: false
share:        true
shortRepo:
  - macnotes
  - default
---

<br/>

<details markdown="block">                
<summary>                
Table of contents                
</summary>                
{: .text-delta }                
1. TOC                
{:toc}                
</details>

<br/>

---

<br/>

# Users

## Get User List

```shell
dscl . list /Users | grep -v "^_"
```

## List existing group

- > IDs in numerical order
  ```shell
    dscl . -list /Groups PrimaryGroupID | awk '{print $2}' | sort -n
  ```
- > List sorted by group name:

  ```shell
   dscl . list /Groups PrimaryGroupID
  ```

- > List sorted by group gid

  ```shell
   dscl . list /Groups PrimaryGroupID | tr -s ' ' | sort -n -t ' ' -k2,2
  ```

- > List groups with members
  ```shell
    dscl . list /Groups GroupMembership
  ```

<div style="padding: 15px; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
    Note: neither dscacheutil nor dscl list members of the group staff other than root. Use dsmemberutil to confirm a member belongs to the group staff.       
</div>

> Example a user with uid 501:

```shell
 dsmemberutil checkmembership -u 501 -g 20
```

### Create the new group 'newgroup' and assign it an ID

<div style="padding: 15px; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
    One thing you have to take care when choosing a group id is that the id is not already used by another group. In order to list the existing group ids in numerical order, you can do:
<p>
<code>
dscl . -list /groups PrimaryGroupID | awk '{print $2}' | sort -n
</code> 
</p>      
</div>

```shell
sudo dscl . -create /Groups/newgroup
sudo dscl . -create /Groups/newgroup PrimaryGroupID 1000
```

#### View the new group

```shell
dscl . -read /Groups/newgroup
```

> output

```
 AppleMetaNodeLocation: /Local/Default
 GeneratedUID: 423AF02C-F053-41E0-ABCD-33127EF9A9CA
 PrimaryGroupID: 1000
 RecordName: newgroup
 RecordType: dsRecTypeStandard:Groups
```

<div style="padding: 15px; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
OS X conventionally uses different ID ranges for different types of accounts. Here's the current layout as I understand it:

up to 100: Reserved for static system-defined (built in) groups

101 - 199: Used by the OS for dynamically created groups (e.g., share point access groups)

200—?: More static system groups (apparently 100 wasn't enough)

400 - 500: More dynamic system groups

501 and up: Local admin-created groups

1024 and up: Domain-based admin-created groups

</div>

## Add user to group

```shell
sudo dseditgroup -o edit -a john -t user admin
sudo dseditgroup -o edit -a john -t user wheel
```

## Create new user

```shell
sudo dscl . -create /Users/newuser
sudo dscl . -create /Users/newuser UserShell /bin/bash
sudo dscl . -create /Users/newuser RealName "New User"
sudo dscl . -create /Users/newuser UniqueID "1000"
sudo dscl . -create /Users/newuser PrimaryGroupID 1000
```

```shell
sudo dscl . -create /Users/username NFSHomeDirectory /Local/Users/username
```

```shell
sudo dscl . -passwd /Users/username password
```

```shell
sudo dscl . -append /Groups/admin GroupMembership username
```

### View the new user

```shell
dscl . -read /Users/newuser
```

> output

```
AppleMetaNodeLocation: /Local/Default
GeneratedUID: 47D6D841-C7F1-4962-9F7E-167E8BFC3A91
PrimaryGroupID: 1000
RealName:
Application
RecordName: newuser
RecordType: dsRecTypeStandard:Users
UniqueID: 1000
UserShell: /usr/bash
```

## Change Password

```shell
sudo dscl . -passwd /Users/username password
```

## Root

### Enable Root User

#### Use Directory Utility

> Use Spotlight to find and open Directory Utility, or follow these steps:

1. From the menu bar in the Finder, choose Go > Go to Folder.
2. Type or paste /System/Library/CoreServices/Applications/, then press Return.
3. Open Directory Utility from the window that opens.

##### To enable or disable the root user

> In the Directory Utility window, click the lock icon, then enter an administrator name and password.

- To enable the root user, choose Edit > Enable Root User from the menu bar. Then enter the password that you want to use. You can then log in as the root user.
- To disable the root user, choose Edit > Disable Root User.

##### To change the root password

> In the Directory Utility window, click the lock icon, then enter an administrator name and password. From the menu bar, choose Edit > Change Root Password.

##### Log in as the root user

> When the root user is enabled, you have its privileges only while logged in as the root user.

1. Choose an Apple menu  > Log Out to log out of your current user account.
2. At the login window, log in with the username “root” and the password you created for the root user.

- If the login window is a list of users, click Other, then log in.

### add user to SUDO

```shell
su AdminUser
authentication, and then:
```

> Now, as Adminuser, use the visudo command to edit the sudoers file:

```shell
sudo visudo
# Add the following line to the sudoers file:
username ALL = (ALL) ALL
```

> If you want to be able to use sudo without typing a password:

```shell
username        ALL = (ALL) NOPASSWD:ALL
```