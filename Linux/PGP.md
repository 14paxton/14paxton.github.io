---
title:        PGP
permalink:    /Linux/PGP
category:     Linux
parent:       Linux
layout:       default
has_children: false
share:        true
shortRepo:
  - users
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

***                

<br/>

# Install

```
$ sudo apt install gnupg          [On Debian, Ubuntu and Mint]
$ sudo yum install gnupg          [On RHEL/CentOS/Fedora and Rocky/AlmaLinux]
$ sudo emerge -a app-crypt/gnupg  [On Gentoo Linux]
$ sudo apk add gnupg              [On Alpine Linux]
$ sudo pacman -S gnupg            [On Arch Linux]
$ sudo zypper install gnupg       [On OpenSUSE]    
```

# Generating New GPG Key Pairs in Linux

   ```shell
   gpg --full-generate-key
   ```

# List GPG Key Pairs in Linux

```
$ gpg --list-public-keys
OR
$ gpg --list-public-keys --keyid-format=long
```

# list the secret GPG key

```
$ gpg --list-secret-keys
OR
$ gpg --list-secret-keys --keyid-format=long
```

# Encrypting Files Using GPG in Linux

```shell
#gpg -e -r aaronkilik@gmail.com secret.txt  
```

```shell
gpg --encrypt --recipient aaronkilik@gmail.com secret.txt
```

# Decrypting Files Using GPG in Linux

```shell
gpg -d -o secrets.txt secrets.txt.gpg
```

# Export Public PGP Key

```shell
gpg -a --export [pub id] > mypub.asc
```

# Setup GPG on macOS

## Install

-------------------

    brew install gpg

Enter fullscreen mode Exit fullscreen mode

## Create new key

---------------------------------

    # generate key
    gpg --full-generate-key
    
    # get the public key using key ID
    gpg --armor --export XXXXXX
    
    # set the key ID in git
    git config --global user.signingkey XXXXXXX
    
    # always sign commits
    git config commit.gpgsign true

## Setup keychain

---------------------------------

gpg collects password from cli. This causes issues if using vscode to create a commit. So input can be taken from a popup or keychain.

    brew install pinentry-mac

Enter fullscreen mode Exit fullscreen mode

The brew installation will print these caveats:

    ==> Caveats
    You can now set this as your pinentry program like
    
    ~/.gnupg/gpg-agent.conf
        pinentry-program /opt/homebrew/bin/pinentry-mac

Enter fullscreen mode Exit fullscreen mode

So just create a `~/.gnupg/gpg-agent.conf` file if it doesn't exist and put the line `pinentry-program /opt/homebrew/bin/pinentry-mac` in it.

Now, to check if it works.

1.`gpg --list-keys` to print the existing keys.

1. `pkill -TERM gpg-agent`.
2. Restart the terminal.
3. `echo test | gpg -e -r <PUT THE KEY ID HERE> | gpg -d`

This should open a pin entry popup and make sure "save in keychain" option is selected.

# Updating expired GPG keys and their backup 🔑🔐💻

I use a GPG key to sign my git commits.

An error like this one might be a sign of an expired GPG key.

```
error: gpg failed to sign the data fatal: failed to write commit object
```

## 1. Check if you have an expired key

- On your machine, open up the shell (git bash on Windows) and type

```
gpg --list-secret-keys --keyid-format LONG
```

- This will list out all your secret keys in the following fomat:

```
/home/TheSherlockHomie/.gnupg/pubring.kbx
---------------------------------
sec   rsa4096/HJ6582DC8B78GTU 2020-12-09 [SC] [expires: 2025-05-01]
      15JHUG1D325F458624HF7521B3F5D82DC458H
uid                 [ultimate] TheSherlockHomie (Key to sign git commits) <email@gmail.com>
ssb   rsa4096/11HGTH5483DD0A 2020-12-09 [E] [expires: 2025-05-01]
```

- If your keys are expired, you'll se `expired` instead of the expiration date.

## 2. Renew the expired key

- Now that you know for sure that your commit signing key has expired, let's renew the expiration date:

```
gpg --edit-key KEYID

// where KEYID is of the key you want to renew. Here, it is HJ6582DC8B78GTU
```

- Now in the intearctive gpg shell,

```
gpg> expire
```

- When prompted type `1y` or however long you want the key to last for.
- Now to renew all our subkeys too.

```
key 1
key 2 //and so on, depending on the subkeys you have
```

- A star will sppear before all selected keys.

```
gpg> expire
```

- Again, set the expiration time for your subkeys.

## 3. Set the trust level

- Since the key has changed, we now need to trust it. We might get a warning `There is no assurance this key belongs to the named user` otherwise.

```
gpg> trust
```

- Set the trust level `5` (for ultimate) or whatever is the trust level of the key.

## 4. Save your work

```
gpg> save
```

## 5. Updating the expired key on Github

- For the gpg key you updated, export its public key:

```
$ gpg --armor --export KEYID
# Prints the GPG key ID, in ASCII armor format
```

- Copy your GPG key, beginning with `-----BEGIN PGP PUBLIC KEY BLOCK-----` and ending with `-----END PGP PUBLIC KEY BLOCK-----`
- Navigate to `Github>Settings>SSH and GPG keys`
- Delete the expired key.
- Add the new key that you copied.
- "Your previous commits and tags will show as verified, as long as the key meets all other verification requirements." - Github

## 6. Backup your key and trust database

- There is [more than one way](https://gist.github.com/chrisroos/1205934) to accomplish this.
- The method I prefer is:

```
gpg --output backupkeys.pgp --armor --export-secret-keys --export-options export-backup email@gmail.com
```

- This will create a file `backupkeys.pgp` on your present working directory. Make sure to store it safely.
- If this key is important to you, you may want to print out the key on paper using [paperkey](https://www.jabberwocky.com/software/paperkey/), and store it in a fireproof/waterproof safe.
- Now export the trust database

```
gpg --export-ownertrust > ownertrust-gpg.txt
```

- This will create a file `ownertrust-gpg.txt` on your present working directory. Keep it along with your backup keys.

## 7. Importing the backed-up keys

- You might have multiple machines where you need the key, or you might have a setup like me, where I use Ubuntu on WSL and Windows both for development.
- Transfer the keys to your machine, open a shell (or Git Bash), and type:

```
gpg --import backupkeys.pgp
gpg --import-ownertrust ownertrust-gpg.txt
```

- Now verify that you have the keys

```
gpg --list-secret-keys --keyid-format LONG
gpg --list-keys --keyid-format LONG
```

- Which should show your secret and public keys respectively.
- If you do not have the owner trust backup file, you'll need to manually set the trust level:

```
gpg --edit-key KEYID
gpg> trust
```

- And set the trust level accordingly.

## 8. References

- [Github Docs - Updating an expired GPG key](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/updating-an-expired-gpg-key)
- [Github Docs - Checking for existing GPG keys](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/checking-for-existing-gpg-keys)
- [Github Docs - Generating a new GPG key](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/generating-a-new-gpg-key)
- [Github Docs - Adding a new GPG key to your GitHub account](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/adding-a-new-gpg-key-to-your-github-account)

- [krisleech - Renew Expired GPG key (Github Gists)](https://gist.github.com/krisleech/760213ed287ea9da85521c7c9aac1df0s)(And shirohana, with the comment reminding to save your work)
- [Thomas Eisenbarth - GPG: Extract private key and import on different machine (on makandracards.com)](https://makandracards.com/makandra-orga/37763-gpg-extract-private-key-and-import-on-different-machine)
- [Unix & Linux StackExchange - How to export a GPG private key and public key to a file (answered by RubberStamp and edited by Mitch Talmadge)](https://unix.stackexchange.com/questions/481939/how-to-export-a-gpg-private-key-and-public-key-to-a-file)
- [chrisroos - Instructions for exporting/importing (backup/restore) GPG keys (on Github Gists)](https://gist.github.com/chrisroos/1205934)
- [Unix & Linux StackExchange - gpg —list-keys command outputs uid [ unknown ] after importing private key onto a clean install (answered by RubberStamp)](https://unix.stackexchange.com/questions/407062/gpg-list-keys-command-outputs-uid-unknown-after-importing-private-key-onto)