---  
title:        Run    
permalink:    Windows_Notes/Run    
category:     Windows_Notes    
parent:       Windows_Notes    
layout:       default    
has_children: false    
share:        true    
shortRepo:    
  - windows_notes    
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
    
# Remote Desktop    
    
- open remote desktop    
  ```mstsc.exe```    
- list monitors    
    
```    
mstsc /l to LIST    
```    
    
- use multiple monitors    
    
```    
/multimon    
```    
    
# Control Panel    
    
- change timeout    
- You can enter the below commands to do so, the equivalent of setting them to never:    
    
```powercfg /change standby-timeout-ac 0```    
    
``` powercfg /change standby-timeout-dc 0```    
    
``` powercfg /change monitor-timeout-ac 0```    
    
``` powercfg /change monitor-timeout-dc 0```    
    
`` powercfg /change hibernate-timeout-ac 0 ```    
    
``` powercfg /change hibernate-timeout-dc 0 ```    
    
    
> AC and DC determine \'on battery\' and \'plugged in\', while 0 disables    
> these options.    
    
***    
    
## getting to control panel display setting,    
    
### Microsoft.Personalization\\pageWallpaper    
    
```shell:::{ED834ED6-4B5A-4bfe-8F11-A626DCB6A921}```