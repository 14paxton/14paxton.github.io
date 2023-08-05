---
title: QuickScripts
permalink: Linux/QuickScripts
category:  Linux
parent:   Linux
layout: default
has_children: false
share: true
shortRepo:
  - linux
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

# Bash

## find and remove files

```bash
for st in $(mdfind -name ultdata); do rm -rf "$st"; done
```

## find and kill by pid

```bash
pkill -f '.*GradleDaemon.*'
```

## kill by port

```bash
npx kill-port 18090
```

## zip folder with pw

```bash
zip -er last_resort.zip attachments;
```

## Add Table of Contents to mark down doc with pandoc

1) set file name
    ```bash
    fileMD=CLI_Grailsw.md;
    ```

2) run
    ```bash
     pandoc -s --toc $fileMD -o output.md; rm -f $fileMD; mv output.md ./$fileMD;
    ```

### UseCase Ex.

#### Backing up IntelliJ Caches

```bash
#!/bin/bash

if [[ ! -d "/Users/bpaxton/Library/Caches/JetBrains/cachebackup/intellij/" ]] then; mkdir -p  /Users/bpaxton/Library/Caches/JetBrains/cachebackup/intellij; fi

if [[ ! -d "/Users/bpaxton/Library/Caches/JetBrains/cachebackup/webstorm/" ]] then; mkdir -p  /Users/bpaxton/Library/Caches/JetBrains/cachebackup/webstorm; fi

if [[ -d "/Volumes/JetBrainsKeys/intellij/" ]] then; cp -a /Volumes/JetBrainsKeys/intellij/. /Users/bpaxton/Library/Caches/JetBrains/cachebackup/intellij; fi

if [[ -d "/Volumes/JetBrainsKeys/webstorm/" ]] then; cp -a /Volumes/JetBrainsKeys/webstorm/. /Users/bpaxton/Library/Caches/JetBrains/cachebackup/webstorm; fi
```

#### Create RamDisk for Jet Brains

```shell
#!/bin/bash

if [ ! -d "/Volumes/JetBrainsKeys/intellij/" ]; then  
diskutil erasevolume HFS+ JetBrainsKeys `hdiutil attach -nomount ram://6291456`;

mkdir -p /Volumes/JetBrainsKeys/intellij;
mkdir -p /Volumes/JetBrainsKeys/webstorm;

[[ -d /Users/bpaxton/Library/Caches/JetBrains/cachebackup/intellij/ ]] &amp;&amp; cp -a /Users/bpaxton/Library/Caches/JetBrains/cachebackup/intellij/. /Volumes/JetBrainsKeys/intellij;

[[ -d /Users/bpaxton/Library/Caches/JetBrains/cachebackup/webstorm/ ]] &amp;&amp; cp -a /Users/bpaxton/Library/Caches/JetBrains/cachebackup/webstorm/. /Volumes/JetBrainsKeys/webstorm;

chmod -R 777 /Volumes/JetBrainsKeys;

#previously was going to use symbolic link to file, would not work
#mkdir -p /Volumes/JetBrainsKeys/tbcore/intellij/caches;
#ln -s /Volumes/JetBrainsKeys/intellij/caches /Users/bpaxton/Library/Caches/JetBrains/IntelliJIdea2022.1/caches;
fi 

[[ -d /Users/bpaxton/Library/Caches/JetBrains/cachebackup/intellij/ &amp;&amp; ! -f /Volumes/JetBrainsKeys/tbcore/intellij/.appinfo ]] &amp;&amp; cp -a /Users/bpaxton/Library/Caches/JetBrains/cachebackup/intellij/. /Volumes/JetBrainsKeys/intellij;

[[ -d /Users/bpaxton/Library/Caches/JetBrains/cachebackup/webstorm/ &amp;&amp; ! -f /Volumes/JetBrainsKeys/tbcore/webstorm/.appinfo ]] &amp;&amp; cp -a /Users/bpaxton/Library/Caches/JetBrains/cachebackup/webstorm/. /Volumes/JetBrainsKeys/webstorm;
```

#### Backup My Scripts to GitHub

```shell
#!/bin/bash

if [[ ! -d "/Users/bpaxton/Documents/ScriptsAndSuch/" ]] then; mkdir -p  /Users/bpaxton/Documents/ScriptsAndSuch; cd /Users/bpaxton/Documents/ScriptsAndSuch; 
git clone git@github.com:14paxton/ScriptsAndSuch.git .; 
git remote set-url origin git@github.com:14paxton/ScriptsAndSuch.git;  
fi

cd /Users/bpaxton/Documents/ScriptsAndSuch;

# git commands can be used
#git fetch;
#git checkout master;
#git merge origin/master;

# gh github cli
export GH_TOKEN=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;
act=$(gh auth status -t &gt;&gt;(tee -a) 2&gt;&amp;1 | sed -n 's/.*Token: //p');
if [[ "$act" == *"$GH_TOKEN"* ]]
then echo $GH_TOKEN | gh auth login --with-token;  
gh repo sync --force;

cp -a /Users/bpaxton/Documents/scripts/. /Users/bpaxton/Documents/ScriptsAndSuch/Temp;

# supposed to be able to grap multiple dir this way , doesnt work
# cp -r /Volumes/JetBrainsKeys/intellij/{caches,workspace,LocalHistory,projects};

if [[ -d "/Volumes/JetBrainsKeys/intellij/" ]] then cd /Volumes/JetBrainsKeys/intellij; tar -cZf intellijcaches.tar.gz --auto-compress ./caches ./workspace ./LocalHistory ./projects ; mv ./intellijcaches.tar.gz /Users/bpaxton/Documents/ScriptsAndSuch/Temp ; fi

if [[ -d "/Volumes/JetBrainsKeys/webstorm/" ]] then cd /Volumes/JetBrainsKeys/webstorm; tar -cZf webstormcaches.tar.gz --auto-compress ./caches ./workspace ./LocalHistory ./projects ; mv ./webstormcaches.tar.gz  /Users/bpaxton/Documents/ScriptsAndSuch/Temp ; fi

cd /Users/bpaxton/Documents/ScriptsAndSuch;
[[ -f *.gz ]] &amp;&amp; rm -rf ./scriptsandcaches.tar.gz;
tar -cZf scriptsandcaches.tar.gz --auto-compress ./Temp
rm -rf /Users/bpaxton/Documents/ScriptsAndSuch/Temp;

git add -A --ignore-errors;
git commit -am "script backup $(date +'%s')";
git push;

fi
```

#### Folder Mod for Notes site

```shell
DIRNAME=$(basename "$(pwd)");
SHORTREPOKEY=$(echo "$DIRNAME" | tr '[:upper:]' '[:lower:]');
access_token='${{ secrets.SYNCTOKEN }}'
wiki_folder='${{ github.event.repository.name }}'

[[ ! -d "./.github/workflows/ " ]] && mkdir -p ./.github/workflows/

cat << EOL >  ./.github/workflows/updatewiki.yml
---
on:
  push:
    branches:
      - "master"
  pull_request:
    branches:
      - "master"
name: Update Wiki
jobs:
  udpate-wiki:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - name: Wiki Sync
        uses: LillyWho/ghaction-wiki-sync-custom@v1.0
        with:
          username: 14paxton
          access_token: $access_token
          wiki_folder: $wiki_folder
          commit_message: "wikisync"
          commit_username: "14paxton"
          commit_email:    "26972590+14paxton@users.noreply.github.com "
EOL

[[ ! -d ./"$DIRNAME" ]] && mkdir -p "$DIRNAME"

cd "$DIRNAME"

[[ -d ./$DIRNAME/ ]] && cd "$DIRNAME"
#[[ ! -f ./$DIRNAME ]] &&  touch "$DIRNAME".md
cat << EOL >  "$DIRNAME".md
---
title: $DIRNAME
layout: default
permalink: $DIRNAME/
category: $DIRNAME
has_children: true
share: true
shortRepo:

  - $SHORTREPOKEY
  - default
---

# [REPO](https://github.com/14paxton/$DIRNAME)
EOL


for st in $(find "$(PWD)" -type f); do
FILENAME=${$(basename "$st")%.*}
PERMALINK=$DIRNAME/$FILENAME
if [[ "$FILENAME" != "$DIRNAME" ]] then;

ex "$st" << eof
1 insert
---
title: $FILENAME
permalink: $PERMALINK
category:  $DIRNAME
parent:   $DIRNAME
layout: default
has_children: false
share: true
shortRepo:
  - $SHORTREPOKEY
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

.
xit
eof


fi

done;
```

# Mac

## get local ip

```bash
osascript -e "IPv4 address of (system info)"
```

```bash
ifconfig | grep "inet " 
```

## convert file/image to base64

```bash
base64 -i ./post_u_north_gate.jpg | pbcopy 
```

```bash
cat ./post_u_north_gate.jpg | openssl base64 | tr -d '\n' | pbcopy
```

```bash
./post_u_north_gate.jpg | openssl base64 | tr -d '\n' | pbcopy    
```