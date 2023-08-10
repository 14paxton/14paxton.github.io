---  
title:        ADMIN-ROOT    
permalink:    Linux/ADMIN-ROOT    
category:     Linux    
parent:       Linux    
layout:       default    
has_children: false    
share:        true    
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
    
# Reset admin password    
    
```shell    
 sudo passwd root    
```    
    
# Ways to purge apps    
    
```shell    
sudo dpkg --configure -a    
```    
    
```shell    
sudo apt-get install -f    
```    
    
```shell    
sudo apt-get remove --purge package_name    
```    
    
```shell    
sudo apt autoremove    
```    
    
```shell    
sudo ls -l /var/lib/dpkg/info | grep -i package_name *then* sudo mv /var/lib/dpkg/info/package_name.* /tmp *then* sudo apt-get update    
```    
    
```shell    
sudo dpkg -i --force-overwrite /var/cache/apt/archives/full_name_of_package    
```    
    
# Udate chmod    
    
```shell    
    cd $HOME    
    { sudo chflags -R nouchg,nouappnd ~ $TMPDIR.. ; \    
      sudo chown -R $UID:staff ~ $_ ; \    
      sudo chmod -R -N ~ $_ ; \    
      sudo chmod -R 755 ~ $_ ; \    
      sudo chmod 700 Desktop Documents Downloads Dropbox Library Movies Music Pictures Sites $_ ; \    
      sudo chmod 777 Public ; \    
      sudo chmod 733 Public/Drop\ Box ; \    
      } 2> /dev/null    
```    
    
# Find App By Name    
    
```shell    
    mdfind -name [application name]    
```    
    
# reset user permissions    
    
```shell    
    diskutil                       resetUserPermissions        /               `id        -u`    
```