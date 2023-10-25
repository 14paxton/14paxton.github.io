---
title:        AppsForWorkflow
permalink:    GitHubPages/AppsForWorkflow
category:     JobPrep
parent:       MyPersonalDocsAndStuff
layout:       default
has_children: false
share:        true
shortRepo:
# jobprep
# default          
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

* # [GitHub Desktop](https://desktop.github.com/)
* # [GitHub CLI](https://github.com/cli/cli#installation)
* # [GitLab CLI](https://gitlab.com/gitlab-org/cli)
    * ## [gitlab cli Docs ](https://docs.gitlab.com/ee/integration/glab/)
* # [1Password](https://1password.com/)
* # [ Docker Desktop](https://www.docker.com/products/docker-desktop/)
* # [Display Link ](https://www.synaptics.com/products/displaylink-graphics/downloads/macos)
  > Drivers, for DisplayLink HDMI to 4k (using 3rd monitor)
* # [Obsidian](https://help.obsidian.md/Home)
    * ## Plugins
        * ### [GitHub Publisher](https://obsidian-publisher.netlify.app/plugin/#github-publisher)
        * ### [Obsidian Git](https://publish.obsidian.md/git-doc/Start+here)
        * ### [Obsidian TOC](https://github.com/hipstersmoothie/obsidian-plugin-toc#obsidian-plugin-toc)
* # [Zeal Documentation Browser](https://zealdocs.org/download.html#windows)
  > offline documentation browser

---
***

# For Mac

* ## [Rectangle](https://rectangleapp.com/)
* ## [Cheat Sheet](https://cheatsheet-mac.en.softonic.com/mac)
* ## [Mission Control Plus](https://www.fadel.io/missioncontrolplus)
* ## [Amphetamine](https://apps.apple.com/us/app/amphetamine/id937984704?mt=12)
* ## [BetterDisplay](https://github.com/waydabber/BetterDisplay#readme)
* ## [Monitor Control](https://github.com/MonitorControl/MonitorControl#readme)
* ## [HomeBrew](https://brew.sh/)
    * ### Install
         ```shell
          /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)
         ```

---
***

# For Windows

* ## [WSL](https://learn.microsoft.com/en-us/windows/wsl/install-on-server)
* ## [Powertoys](https://learn.microsoft.com/en-us/windows/powertoys/install)
* ## [Ubuntu Subsystem](https://learn.microsoft.com/en-us/windows/wsl/install-manual#downloading-distributions)
  ### Install
    * #### powershell
        * ##### download Ubuntu
             ```powershell
              Invoke-WebRequest -Uri https://aka.ms/wsl-ubuntu-1604 -OutFile Ubuntu.zip -UseBasicParsing
             ```
        * ##### extract the file
             ```powershell
             Expand-Archive ./Ubuntu.zip ./Ubuntu
             ```
        * ##### set path
             ```powershell
             $userenv = [System.Environment]::GetEnvironmentVariable("Path", "User")
             [System.Environment]::SetEnvironmentVariable("PATH", $userenv + $(Get-Location).Path + "\Ubuntu", "User")
             ```
        * ##### install WSL
             ```powershell
             Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
             ```
            * > Now that everything is in place, please restart the server. After the restart, open up ```Powershell``` again and run ```Ubuntu```. You will be asked to create a new ```UNIX``` user
                 ```powershell
                  cd Ubuntu
                  ubuntu1604.exe
                 ```
            * > Now you can upgrade to the latest version of Ubuntu by this script:
                 ```powershell
                  sudo apt-get update
                  sudo apt-get upgrade
                 ```
