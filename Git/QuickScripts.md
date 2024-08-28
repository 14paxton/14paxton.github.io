---
title:        QuickScripts
permalink:    Git/QuickScripts
category:     Git
parent:       Git
layout:       default
has_children: false        
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

# Remove all commit history

1) Checkout/create orphan branch (this branch won't show in git branch command):
      ```shell
        git checkout --orphan latest_branch
      ```
2) Add all the files to the newly created branch:
    ```shell
        git add -A
    ```
3) Commit the changes:
    ```shell
      git commit -am "commit message"
    ```
4) Delete main (default) branch (this step is permanent):
    ```shell
      git branch -D main
    ```
5) Rename the current branch to main:
    ```shell
      git branch -m main
    ```
6) Finally, all changes are completed on your local repository, and force update your remote repository:
    ```shell
      git push -f origin main
    ```

# SSL certificate problem

> unable to get local issuer certificate

```shell
git config --global http.sslbackend schannel
```

# in a conflicted state, and you want to just accept all of theirs

```shell
git checkout --theirs .
git add .
```

> If you want to do the opposite:

```shell
git checkout --ours .
git add .
```

# That limits the delta cache size to one byte (effectively disabling it) instead of the default of 0, which means unlimited

```shell
 git config pack.deltaCacheSize 1
```

# removed all of my dangling blobs and dangling commits

> removes all references of unreachable commits in reflog.

```shell
  git reflog expire --expire-unreachable=now --all
```

> removes the commits themselves.

```shell
  git gc --prune=now
```

```shell
  git reflog expire --expire-unreachable=now --all
  git gc --prune=now
```

- or  
  `git gc --aggressive` with a later git version
- or
  `git repack -a -f -d --window=250 --depth=250`

# get all deletes and changes

```shell
 git log --shortstat --author "bpaxton"  --since "35 days ago" --until "today" | egrep "file[s]* changed" | sed 's/changed, \([0-9]\+ deletions\)/changed, 0 insertions(+), \1/g' | awk '{files+=$1; inserted+=$4; deleted+=$6} END {print "files changed", files,"total: " inserted - deleted , "lines inserted:", inserted, "lines deleted:", deleted}'
```

# get changed lines

```shell
git log --shortstat --author "username"  --since "5 days ago" --until "today" \
    | egrep "file[s]* changed" \
    | sed 's/changed, \([0-9]\+ deletions\)/changed, 0 insertions(+), \1/g' \
    | awk '{files+=$1; inserted+=$4; deleted+=$6} END {print "files changed", files, "lines inserted:", inserted, "lines deleted:", deleted}'
```

# clone set commit

```shell
git clone git@github.com:14paxton/ScriptsAndSuch.git .;
git remote set-url origin git@github.com:14paxton/ScriptsAndSuch.git;
git fetch;
#git checkout master;
#git merge origin/master;
git add -A --ignore-errors;
git commit -am "script backup $(date +'%s')";
git push;
```

---