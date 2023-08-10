---  
title:        Quick-TidBits  
permalink:    DockerNotes/Quick-TidBits  
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
  
# Restart Docker  
  
1)  
  
 ```shell  
  sudo su  
 ```  
  
 ```shell  
 systemctl start docker  
 ```  
  
 ```shell  
 systemctl enable docker  
 ```  
  
 ```shell  
 systemctl restart docker  
 ```  
  
2)  
  
 ```shell  
 sudo dockerd    
 ```  
  
3)  
  
 ```shell  
  snap stop docker  
 ```  
  
 ```shell  
  snap start docker  
 ```  
  
4)  
  
```shell  
sudo systemctl unmask docker  
```  
  
```shell  
sudo systemctl start docker    
```  
  
# To keep your Docker images small, don't install unnecessary editors. You can edit the files over SSH from the Docker host to the container:  
  
   ```shell  
    vim scp://remoteuser@containerip//path/to/document    
   ```  
  
# [Use host ip](https://gist.github.com/14paxton/fc9331557d823620d73d15c453b83bd8)  
  
```  
host.docker.internal    
```  
  
<div style="padding: 15px;  margin-bottom: 20px; border-radius: 4px; color: #010234; background-color: #7ccdf5; border-color: #b200ce;">              
  
<strong>  
The gateway is also reachable as  
</strong>  
<br/>  
<code>  
gateway.docker.internal  
</code>  
</div>              
  
---  
If you are running this stack on Linux  
you need to have the ```DOCKER_GATEWAY_HOST``` environment variable set for the Docker gateway host.  
Simply put this line into your  
`.bashrc (.bash_profile or .zshrc)`  
---  
  
```shell  
 export DOCKER_GATEWAY_HOST=172.17.0.1    
 source https://docs.docker.com/desktop/mac/networking/.        
 extra hosts https://docs.docker.com/compose/compose-file/#extra_hosts  
```