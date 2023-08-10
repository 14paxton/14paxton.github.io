---  
title:        Install    
permalink:    DockerNotes/Install    
category:     DockerNotes    
parent:       DockerNotes    
layout:       default    
has_children: false    
share:        true    
shortRepo:    
  - dockernotes    
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
    
<body>    
     <h2> Windows10 - Install </h2>   <p></p><p><strong>Background</strong></p><p>Docker’s ability to provide applications with resource isolation, portability, consistency and support continuous integration &amp; testing makes it a very attractive tool for every software engineer. With Docker, one can run the entire application stack in a local development machine and deploy to production quickly without worrying how it will perform in the new environment. Though Docker started as Linux container technology, understanding the power of the platform, Microsoft quickly embraced the technology to run Docker natively on Windows OS. This blog is about my experiences of “How to install Docker for Windows?” and integrating the same to “Bash on Ubuntu on Windows”.</p><p>Before installation, you should ensure that the below requirements are satisfied:</p><ul><li><p>Hyper-V is installed</p></li><li><p>Virtualization is enabled</p></li><li><p>Verify your Windows 10 version</p></li></ul><p><strong>Hyper-V:</strong></p><p>Docker for Windows requires a Hyper-V as well as the Hyper-V Module for Windows Powershell to be installed and enabled. The Docker for Windows installer will enable it for you or to be sure you can install Hyper-V manually by going to ‘Programs and Features’ -&gt;&nbsp;<strong>Turn Windows Features on or off</strong>&nbsp;-&gt;&nbsp;<strong>Hyper-V</strong>&nbsp;and click&nbsp;<strong>OK</strong>. A reboot is required. If Hyper-V is installed manually without the reboot, Docker for Windows will not work correctly.</p><img class="confluence-embedded-image confluence-external-resource image-center" src="https://altis.com.au/wp-content/uploads/2017/07/blog-pic-1.png" data-image-src="https://altis.com.au/wp-content/uploads/2017/07/blog-pic-1.png" loading="lazy"><p>On some systems, Virtualization needs to be enabled in the BIOS. I had some challenges enabling the Virtualization in BIOS as I couldn’t access the BIOS during normal start-up because I had a UEFI-based computer. I had to enable “Advanced Restart” and to be able to make changes to the BIOS.</p><p>The steps for this are vendor specific depending on your hardware, but typically the BIOS option is called Virtualization Technology (VTx) or something similar.&nbsp; You can find some help&nbsp;<a href="https://www.howtogeek.com/213795/how-to-enable-intel-vt-x-in-your-computers-bios-or-uefi-firmware/">here</a>.</p><p>Confirm Virtualization is enabled in the Task Manager.</p><img class="confluence-embedded-image confluence-external-resource image-center" src="https://altis.com.au/wp-content/uploads/2017/07/Blog-pic-2.png" data-image-src="https://altis.com.au/wp-content/uploads/2017/07/Blog-pic-2.png" loading="lazy"><p><strong>Windows 10 Version:</strong></p><p>The current version of Docker for Windows runs on 64bit Windows 10 Pro, Enterprise and Education (1511 November update, Build 10586 or later) editions. In the future more versions of Windows 10 are expected to come under support.</p><p><strong>Installing Docker:</strong></p><p>When the pre-requisites are satisfied, download Docker for Windows from&nbsp;<a href="https://download.docker.com/win/stable/InstallDocker.msi">here</a>&nbsp;, double click the “InstallDocker.msi” to run the installer and follow the prompts to run the installation. Docker starts automatically once the installation is complete.</p><p>On successful installation of Docker on Windows, it provides Docker Engine, Docker CLI client, Docker Compose, Docker Machine, and Kitematic.</p><p><h2>Ubuntu Bash for Windows:</h2></p><p>Install Docker for Ubuntu Bash following the steps below, which is similar to installing Docker on Ubuntu.</p><p><code># Install packages to allow apt to use a repository over HTTPS</code><br><code>$ sudo apt-get install apt-transport-https ca-certificates curl software-properties-common</code><br><code># Add Docker's official GPG key</code><br><code>$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -</code><br><code># Set up the repository</code><br><code>sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"</code><br><code># Update source lists</code><br><code>sudo apt-get update</code><br><code># Install Docker</code><br><code>sudo apt-get install docker-ce</code></p><p>Now that the Docker engine is installed on both Windows and the WSL, &nbsp;ensure Docker is running on Windows.</p><p>In order to access the Docker from WSL, issue the following commands from bash:</p><p><code>$ echo "export DOCKER_HOST='tcp://0.0.0.0:2375'" &gt;&gt; ~/.bashrc</code><br><code>$ source ~/.bashrc</code></p><p>In the latest version of Docker (Version 17.06.0-ce-win19 (12801)), TCP endpoint is turned off by default. To activate it, right-click the Docker icon in your taskbar and choose Settings, and tick the box next to<br><code>“Expose daemon on tcp://localhost:2375 without TLS”</code>&nbsp;(make sure you understand the risks).</p><p><img class="confluence-embedded-image confluence-external-resource image-center" src="https://altis.com.au/wp-content/uploads/2017/07/Blog-pic-3.png" data-image-src="https://altis.com.au/wp-content/uploads/2017/07/Blog-pic-3.png" loading="lazy"></p><h3><span style="color: rgb(255,86,48);">When upgrading to WSL2 if you need to keep using sudo to run docker</span></h3><p>-unset DOCKER_HOST</p><p>-And if that works, you can make the fix permanent by going back and commenting out the "export DOCKER_HOST=tcp://localhost:2375" in your .bashrc file. I think it has something to do with how docker is configured in WSL 2 vs. WSL 1, but Docker never updated their documentation to reflect this.</p>    
    
    
    
</body>