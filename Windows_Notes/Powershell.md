---
title:        Powershell
permalink:    Windows_Notes/Powershell
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

---

<br/>

- > [Microsoft Docs](https://learn.microsoft.com/en-us/powershell/module/cimcmdlets/?view=powershell-7.3)
- > [Releases](https://github.com/PowerShell/PowerShell/releases)

# Gists

## [Sync Chrome Bookmarks](https://gist.github.com/14paxton/c10cfd597e7e7b487e27d641cf964c59#powershell)

> used to sync bookmarks file to a repo to update on both mac and windows using bash and powershell when account can not sync due to admin
> restrictions

---

# [Installing](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-5.1)

> You can launch PowerShell 7 via the Start Menu or `$env:ProgramFiles\PowerShell\<version>\pwsh.exe`
> You can launch PowerShell 5 via the Start Menu or `$env:WINDIR\System32\WindowsPowerShell\v1.0`

## [Install 7.3](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.3)

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
 <p>PowerShell 7.3 installs to a new directory and runs side-by-side with Windows PowerShell 5.1. </p>
 <p>PowerShell 7.3 is an in-place upgrade that replaces PowerShell 7.0 and lower.</p>       
</div>

- > Separate installation path and executable name.
  > Is installed in the `$env:WINDIR\System32\WindowsPowerShell\v1.0`
  > PowerShell 7 is installed in the `$env:ProgramFiles\PowerShell\7`
  > The new location is added to your `PATH`, which allows you to run both `Windows PowerShell 5.1` and `PowerShell 7`.
  > In `Windows PowerShell`, the PowerShell executable is
  > named `powershell.exe`.
  > In version 6 and newer, the executable is named `pwsh.exe`.
  > The new name makes it easy to support side-by-side execution of both versions
- > Separate PSModulePath.
  > By default, Windows PowerShell and `PowerShell 7` store modules in different locations.
  > PowerShell 7 combines those locations in the `$Env:PSModulePath` environment variable.
  > When you import a module by name, PowerShell checks the location that `$Env:PSModulePath` specifies.
  > This feature allows PowerShell 7 to load both Core and Desktop modules.
- > Separate profiles for each version.
  > A PowerShell profile is a script that runs when PowerShell starts.
  > This script customizes the PowerShell environment by adding commands, aliases, functions,
  > variables, modules, and PowerShell drives.
  > In `Windows PowerShell 5.1`, the profile's location is `$HOME\Documents\WindowsPowerShell`.
  > In `PowerShell 7`, the profile's location is
  > `$HOME\Documents\PowerShell`.
- > Separate event logs. `Windows PowerShell` and `PowerShell 7` log events to separate Windows event logs.
- > When you're reviewing a PowerShell session, it's important to determine which version you're using.
  > To determine the current version, enter `$PSVersionTable` in the PowerShell console, and then
  > select `Enter`.
  > PowerShell displays the version numbers for various components, including the main PowerShell version number.

---

### DotNet CLI

```powershell
 dotnet tool install --global PowerShell
```

### MSI

```powershell
 msiexec.exe /package PowerShell-7.3.2-win-x64.msi /quiet ADD_EXPLORER_CONTEXT_MENU_OPENPOWERSHELL=1 ADD_FILE_CONTEXT_MENU_RUNPOWERSHELL=1 ENABLE_PSREMOTING=1 REGISTER_MANIFEST=1
 USE_MU=1 ENABLE_MU=1 ADD_PATH=1
```

### Winget

```powershell
winget install Microsoft.PowerShell
```

---

# Run

> - [Run Bypassing Execution Policy](https://www.netspi.com/blog/technical/network-penetration-testing/15-ways-to-bypass-the-powershell-execution-policy/)

## powershell core 7+

```powershell
 pwsh testscript_writefile.ps1
```

## OS powershell 5

```powershell
 powershell testscript_writefile.ps1
```

---

# Update

## Winget

```powershell
winget upgrade Microsoft.PowerShell
```

## MSI

```powershell
msiexec.exe /fmu .\PowerShell-7.3.0-win-x64.msi USE_MU=1 ENABLE_MU=1
```

---

# Environment

```powershell
 $Env:
```

> `Env` is actually a virtual PowerShell drive and environment variables are items on it.
> There is a special provider `Get-PSProvider -PSProvider Environment `  
> that implements this method of accessing to environment in powershell.

## There are three scopes of what is called Environment Variables:

```powershell
[System.EnvironmentVariableTarget]::Machine
```

```powershell
[System.EnvironmentVariableTarget]::User
```

```powershell
[System.EnvironmentVariableTarget]::Process
```

## To get a list of variables

```powershell
[System.Environment]::GetEnvironmentVariables($scope)
```

```powershell
# This will mix all scopes in one output
[System.Environment]::GetEnvironmentVariables()
```

## Set $env variable

```powershell
$env:AZURE_RESOURCE_GROUP = 'MyTestResourceGroup'
```

```powershell
[System.Environment]::SetEnvironmentVariable($varName, $varValue, $scope)
```

> If `$scope` is Machine or User, it will try to store data, otherwise it will throw an exception.

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
    You can run       
</div>

```powershell
Get-ChildItem -Path 'Env:\
```

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
    and this is exactly the same as       
</div>

```powershell
[System.Environment]::GetEnvironmentVariables()
```

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
    without specifying scope.       
</div>

### Set ENV Persistently

```powershell
[System.Environment]::SetEnvironmentVariable('ResourceGroup', 'AZ_Resource_Group')
```

# WSL

## get a list of distros

```powershell
wslconfig /l
```

## run wsl

```powershell
wsl
```

# JSON

## [ConvertFrom-Json](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/convertfrom-json?view=powershell-5.1)

### USING POWERSHELL TO WRITE JSON

```powershell
$obj = @{
    "PropertyName" = "PropertyValue"
    "ObjectName" = @{
        "ObjectPropertyName" = "ObjectPropertyValue"
    }
}

# Convert object to JSON
$json = $obj | ConvertTo-Json

# Save JSON to file
$json | Set-Content -Path C:\alkane\example.json
```

### USING POWERSHELL TO READ JSON

```powershell
# Load JSON file
$json = Get-Content -Path C:\alkane\example.json -Raw | ConvertFrom-Json

# Access JSON properties
$json.PropertyName
$json.ObjectName.PropertyName
```

### USING POWERSHELL TO ITERATE THROUGH JSON

```powershell
$obj = @{
    "ObjectName1" = @{
        "Object1PropertyName1" = "Object1PropertyValue1"
        "Object1PropertyName2" = "Object1PropertyValue2"
    }
    "ObjectName2" = @{
        "Object2PropertyName1" = "Object2PropertyValue1"
        "Object2PropertyName2" = "Object2PropertyValue2"
    }
}

# Convert object to JSON
$json = $obj | ConvertTo-Json

# Save JSON to file
$json | Set-Content -Path C:\alkane\example.json
```

# XML

## Write

```powershell
# Create new XML document
$xml = New-Object -TypeName System.Xml.XmlDocument

# Create root node
$root = $xml.CreateElement("RootNode")
$xml.AppendChild($root)

# Create child node with attribute and value
$child = $xml.CreateElement("ChildNode")
$child.SetAttribute("AttributeName", "AttributeValue")
$child.InnerText = "Inner text"
$root.AppendChild($child)

# Save XML to file
$xml.Save("C:\alkane\example.xml")
```

## Read

```powershell
# Load XML file
[xml]$xml = Get-Content -Path C:\alkane\example.xml

# Access XML elements and attributes
$xml.RootNode.ChildNode.AttributeName
$xml.RootNode.ChildNode.InnerText

```

## Iterate

```powershell
# Create new XML document
$xml = New-Object -TypeName System.Xml.XmlDocument

# Create root node
$root = $xml.CreateElement("RootNode")
$xml.AppendChild($root)

# Create child node with attribute and value
$child = $xml.CreateElement("ChildNode")
$child.SetAttribute("AttributeName", "AttributeValue1")
$child.InnerText = "Inner text 1"
$root.AppendChild($child)

# Create another child node with attribute and value
$child = $xml.CreateElement("ChildNode")
$child.SetAttribute("AttributeName", "AttributeValue2")
$child.InnerText = "Inner text 2"
$root.AppendChild($child)

# Save XML to file
$xml.Save("C:\alkane\example.xml")
```

# Read From txt File

```powershell
$content = get-content C:\alkane.txt -tail 3

foreach ($line in $content)
{
    write-host $line
}
```

# Find cmdlets / functions

```powershell
#Find cmdlets
Get-Command | where-object CommandType -eq "Cmdlet"

#Find functions
Get-Command | where-object CommandType -eq "Function"
```

# [Invoke-WebRequest](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/invoke-webrequest?view=powershell-7.3&viewFallbackFrom=powershell-6)

```powershell
Invoke-WebRequest -Uri "http://www.contoso.com" -OutFile "C:\path\file"
```

## get file http

```powershell
wget "http://www.contoso.com" -outfile "file"
```

## Download File From Web

```powershell
$WebClient = New-Object System.Net.WebClient
$WebClient.DownloadFile("https://www.contoso.com/file", "C:\path\file")
```

# For Each / foreach / ForEach-Object

- > [foreach(){}](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_foreach?view=powershell-7.3)
- > [ForEach-Object](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/foreach-object?view=powershell-7.3)

```powershell
# Create an array of folders
$folders = @('C:\Folder', 'C:\Program Files\Folder2', 'C:\Folder3')

# Perform iteration to create the same file in each folder
foreach ($i in $folders)
{
    Add-Content -Path "$i\SampleFile.txt" -Value "This is the content of the file"
}
```

> or

```powershell
$folders = @('C:\Folder', 'C:\Program Files\Folder2', 'C:\Folder3')
$folders | ForEach-Object (Add-Content -Path "$_\SampleFile.txt" -Value "This is the content of the file")
```

> or

```powershell
$folders = @('C:\Folder', 'C:\Program Files\Folder2', 'C:\Folder3')
$folders.ForEach({
    Add-Content -Path "$_\SampleFile.txt" -Value "This is the content of the file"
})
```

# Run In Parallel / Async

```powershell
powershell.exe Get-ChildItem C:\Users\$env:UserName\source\repos\GitHub\Veridian\Google\Default | ForEach-Object -Parallel { Remove-Item "$_" -Force -Recurse | Out-Null }
powershell.exe Get-ChildItem  "C:\Users\$env:UserName\AppData\Local\Google\Chrome\User Data\Default" | Where-Object Name -NotIn @( 'Cache', 'Code Cache', 'databases', 'Extension State', 'File System', 'IndexedDB', 'WebStorage', 'Sessions', 'Service Worker', 'Web Applications', 'Default') | ForEach-Object -Parallel { Copy-Item "$_" -Destination C:\Users\$env:UserName\source\repos\GitHub\Veridian\Google\Default -Recurse -Force }
```

# Get-ChildItem cmdlet

> you can confirm that the files were created or update inside each of the subfolders

```powershell
Get-ChildItem -Recurse -Path C:\ARCHIVE_VOLUMES -Include backupstate.txt | Select-Object Fullname,CreationTime,LastWriteTime,Length
```

# Map Network Drive / [New-PSDrive](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/new-psdrive?view=powershell-5.1) / [Remove-PSDrive](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.management/remove-psdrive?view=powershell-5.1)

```powershell
New-PSDrive -Persist -Name T -PSProvider FileSystem -Root \\ss.test-dev.net\BPAXTON_TEST -Scope Global
Remove-PSDrive -Name T -Force -PSProvider FileSystem -Scope Global
```

## cmd Net Use

```powershell
net use x: "\\ss.test-dev.net\BPAXTON_TEST"
net use /delete x:
```

# Quick Scripts

## Get Proxy Settings

```powershell
 netsh winhttp show proxy
```

```powershell
 reg query "HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Internet Settings" | findstr "ProxyServer AutoConfigURL"
```

```powershell
  (Get-ItemProperty -Path 'Registry::HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings')
```

```powershell
(Get-ItemProperty -Path 'Registry::HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings').ProxyEnable
```

## lock screen

```powershell
$xCmdString = { rundll32.exe user32.dll,LockWorkStation }

Invoke-Command $xCmdString
```

## Get version

```powershell
$PSVersionTable
```

## Run As Admin

```powershell

if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]"Administrator"))
{
    Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`" `"$args`"" -Verb RunAs; exit
}
Start-Process -FilePath 'C:\Users\Brandon003842\Downloads\ConnectUtility_2.30.9_Logitech.exe' -WorkingDirectory 'C:\Users\Brandon003842\LogiTech' -Verb RunAs

```

### Get Execution Policy

```powershell
 Get-ExecutionPolicy
```

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
    If it returns Restricted, then run 
<br/><br/>
<code>Set-ExecutionPolicy AllSigned </code><br/>
or <br/>
<code>Set-ExecutionPolicy Bypass -Scope Process    </code>   
</div>

> You can configure the following policy settings:

- > `AllSigned`: Limits script execution on all signed scripts.
  > This setting requires that all scripts are signed by a trusted publisher, including scripts that you write on the local computer.
  > It
  > prompts you before running scripts from publishers that you haven't yet classified as trusted or untrusted.
  > However, verifying the signature of a script doesn't eliminate the possibility of that
  > a script being malicious.
  > It simply provides an extra check that minimizes this possibility.
- > `Default`: Sets the default execution policy, which is Restricted for Windows clients and RemoteSigned for Windows servers.
- > `RemoteSigned`: This is the default execution policy for Windows server computers.
  > Scripts can run, but the policy requires a digital signature from a trusted publisher on scripts and
  > configuration files that have been downloaded from the internet.
  > This setting doesn't require digital signatures on scripts that are written on the local computer.
- > `Restricted`: This is the default execution policy for Windows client computers. It permits running individual commands, but it doesn't allow
  scripts.
- > `Unrestricted`: This is the default execution policy for non-Windows computers, which you can't change.
  > It allows unsigned scripts to run.
  > This policy warns the user before running scripts and
  > configuration files that aren't from the local intranet zone.
- > `Undefined`: Indicates that there isn't an execution policy set in the current scope.
  > If the execution policy in all scopes is Undefined, the effective execution policy is Restricted for
  > Windows clients and RemoteSigned for Windows Server.

<div style="padding: 15px; margin-bottom: 20px; border-radius: 4px; color: #8a6d3b;; background-color: #fcf8e3; border-color: #faebcc;">            
    <p>Mine v7 was saved at <cod>C:\Users\1527151437E\AppData\Local\Microsoft\WindowsApps\pwsh.exe</cod> </p>       
</div> 
> To change the execution policy in PowerShell, use the following command:

```powershell
Set-ExecutionPolicy -ExecutionPolicy <PolicyName>
```

## Rename and Expand .zip

```powershell
Rename-Item .\Ubuntu.appx .\Ubuntu.zip
Expand-Archive .\Ubuntu.zip .\Ubuntu
```

## Execute / Start / Run process / Application

```powershell
Start-Process test.exe
#or
Invoke-Expression -Command "path...test.exe"
```

### Run with no exit

```powershell
 Start-Process pwsh -ArgumentList '-noexit -noprofile -command "powershell C:\Ruby32-x64\bin\ridk"'
```

## Handle Expected Error

```powershell
ps notepad -ErrorAction SilentlyContinue | kill -PassThru
```

- > without aliases

  ```powershell
  Get-Process notepad -ErrorAction SilentlyContinue | Stop-Process -PassThru
  ```

## Search Piped String

```powershell
Select-String -Path "Users\*.csv" -Pattern "Joe"
```

### Creating a File in Each Sub-Folder in a Directory using the ForEach Statement

```powershell
# Define the TOP-level folder
$TOP_FOLDER = "C:\ARCHIVE_VOLUMES"

# Get all sub folders recursively
$Child_Folders = Get-ChildItem -Path $TOP_FOLDER -Recurse | Where-Object { $_.PSIsContainer -eq $true }

# Create a text file in each sub-folder and add the current date/time as value.
foreach ($foldername in $Child_Folders.FullName)
{
    (get-date -Format G) | Out-File -FilePath "$( $foldername )\BackupState.txt" -Force
}
```

## Reading the Contents of each Text File in Sub-Directories

```powershell
## Find all BackupState.txt files in C:\ARCHIVE_VOLUMES
$files = Get-ChildItem -Recurse -Path C:\ARCHIVE_VOLUMES -Include 'BackupState.txt' | Select-Object DirectoryName,FullName

## Read the contents of each file
foreach ($file in $files)
{
    Write-Output ("$( $file.DirectoryName ) last backup time - " + (Get-Content $file.FullName))
}
```

## Getting Services and Starting Them using the ForEach-Object CmdLet

```powershell
## Get a list of automatic services that are stopped.
$services = Get-Service | Where-Object { $_.StartType -eq "Automatic" -and $_.Status -ne "Running" }

## Pass each service object to the pipeline and process them with the Foreach-Object cmdlet
$services | ForEach-Object {
    try
    {
        Write-Host "Attempting to start '$( $_.DisplayName )'"
        Start-Service -Name $_.Name -ErrorAction STOP
        Write-Host "SUCCESS: '$( $_.DisplayName )' has been started"
    }
    catch
    {
        Write-output "FAILED: $( $_.exception.message )"
    }
}
```

## Reading Data from CSV using the ForEach() Method

```powershell
# Import list of Firstname and Lastname from CSV file
$newUsers = Import-Csv -Path .\Employees.csv

Add-Type -AssemblyName System.Web

# Process the list
$newUsers.foreach(
        {
            # Generate a random password
            $password = [System.Web.Security.Membership]::GeneratePassword((Get-Random -Minimum 20 -Maximum 32), 3)
            $secPw = ConvertTo-SecureString -String $password -AsPlainText -Force

            # Formulate a username
            $userName = '{0}{1}' -f $_.FirstName.Substring(0, 1), $_.LastName

            try
            {
                # Build new user attributes
                $newUser = @{
                    GivenName = "$( $_.FirsName )"
                    Surname = "$( $_.LastName )"
                    Name = $userName
                    AccountPassword = $secPw
                }
                New-ADUser @newUser

                Write-Output "User '$( $userName )' has been created."
            }
            catch
            {
                Write-Output $_.Exception.Message
            }
        }
)
```

## Don't Sleep

```powershell
 param($minutes = 900)
 $myShell = New-Object -com "Wscript.Shell"
 $start = 0
 echo $start
 for ($i = 0; $i -lt $minutes; $i++) {
     $start += 1;
     echo $start;
     Start-Sleep -Seconds 30
     $myShell.sendkeys(" ")
 }
```

> or

```powershell
 Echo "Keep-alive with Scroll Lock..."
 $WShell = New-Object -com "Wscript.Shell"
 $start = 0
 while ($true)
 {
     $start += 1;
     echo $start;
     $WShell.sendkeys("{SCROLLLOCK}")
     Start-Sleep -Milliseconds 100
     $WShell.sendkeys("{SCROLLLOCK}")
     Start-Sleep -Seconds 100
 }
```

## Answer / Reply to Yes(y) No(n) Prompt

```powershell
 foreach ($i in $files)
 {
     'y' | powershell -c "Remove-Item $i -Force -ErrorAction silentlycontinue"
 }
```

# Basic Commands

| Command name      | Alias                         | Description                                                                                                           |
|-------------------|-------------------------------|-----------------------------------------------------------------------------------------------------------------------|
| Set-Location      | cd, chdir, sl                 | Sets the current working location to a specified location.                                                            |
| Get-Content       | cat, gc, type                 | Gets the content of the item at the specified location.                                                               |
| Add-Content       | ac                            | Adds content to the specified items, such as adding words to a file.                                                  |
| Set-Content       | sc                            | Writes or replaces the content in an item with new content.                                                           |
| Copy-Item         | copy, cp, cpi                 | Copies an item from one location to another.                                                                          |
| Remove-Item       | del, erase, rd, ri, rm, rmdir | Deletes the specified items.                                                                                          |
| Move-Item         | mi, move, mv                  | Moves an item from one location to another.                                                                           |
| Set-Item          | si                            | Changes the value of an item to the value specified in the command.                                                   |
| New-Item          | ni                            | Creates a new item.                                                                                                   |
| Start-Job         | sajb                          | Starts a Windows PowerShell background job.                                                                           |
| Compare-Object    | compare, dif                  | Compares two sets of objects.                                                                                         |
| Group-Object      | group                         | Groups objects that contain the same value for specified properties.                                                  |
| Invoke-WebRequest | curl, iwr, wget               | Gets content from a web page on the Internet.                                                                         |
| Measure-Object    | measure                       | Calculates the numeric properties of objects, and the characters, words, and lines in string objects, such as files … |
| Resolve-Path      | rvpa                          | Resolves the wildcard characters in a path, and displays the path contents.                                           |
| Resume-Job        | rujb                          | Restarts a suspended job                                                                                              |
| Set-Variable      | set, sv                       | Sets the value of a variable. Creates the variable if one with the requested name does not exist.                     |
| Show-Command      | shcm                          | Creates Windows PowerShell commands in a graphical command window.                                                    |
| Sort-Object       | sort                          | Sorts objects by property values.                                                                                     |
| Start-Service     | sasv                          | Starts one or more stopped services.                                                                                  |
| Start-Process     | saps, start                   | Starts one or more processes on the local computer.                                                                   |
| Suspend-Job       | sujb                          | Temporarily stops workflow jobs.                                                                                      |
| Wait-Job          | wjb                           | Suppresses the command prompt until one or all of the Windows PowerShell background jobs running in the session are … |
| Where-Object      | ?, where                      | Selects objects from a collection based on their property values.                                                     |
| Write-Output      | echo, write                   | Sends the specified objects to the next command in the pipeline. If the command is the last command in the pipeline,… |

---

---

| Command alias | Cmdlet name                    | Description of command                                                                                                                                                                             |
|---------------|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| %             | ForEach-Object                 | Performs an operation against each item in a collection of input objects.                                                                                                                          |
| ?             | Where-Object                   | Selects objects from a collection based on their property values.                                                                                                                                  |
| ac            | Add-Content                    | Appends content, such as words or data, to a file.                                                                                                                                                 |
| asnp          | Add-PSSnapIn                   | Adds one or more Windows PowerShell snap-ins to the current session.                                                                                                                               |
| cat           | Get-Content                    | Gets the contents of a file.                                                                                                                                                                       |
| cd            | Set-Location                   | Sets the current working location to a specified location.                                                                                                                                         |
| chdir         | Set-Location                   | Sets the current working location to a specified location.                                                                                                                                         |
| clc           | Clear-Content                  | Deletes the contents of an item, but does not delete the item.                                                                                                                                     |
| clear         | Clear-Host                     | Clears the display in the host program.                                                                                                                                                            |
| clhy          | Clear-History                  | Deletes entries from the command history.                                                                                                                                                          |
| cli           | Clear-Item                     | Deletes the contents of an item, but does not delete the item.                                                                                                                                     |
| clp           | Clear-ItemProperty             | Deletes the value of a property but does not delete the property.                                                                                                                                  |
| cls           | Clear-Host                     | Clears the display in the host program.                                                                                                                                                            |
| clv           | Clear-Variable                 | Deletes the value of a variable.                                                                                                                                                                   |
| cnsn          | Connect-PSSession              | Reconnects to disconnected sessions                                                                                                                                                                |
| compare       | Compare-Object                 | Compares two sets of objects.                                                                                                                                                                      |
| copy          | Copy-Item                      | Copies an item from one location to another.                                                                                                                                                       |
| cp            | Copy-Item                      | Copies an item from one location to another.                                                                                                                                                       |
| cpi           | Copy-Item                      | Copies an item from one location to another.                                                                                                                                                       |
| cpp           | Copy-ItemProperty              | Copies a property and value from a specified location to another location.                                                                                                                         |
| curl          | Invoke-WebRequest              | Gets content from a webpage on the Internet.                                                                                                                                                       |
| cvpa          | Convert-Path                   | Converts a path from a Windows PowerShell path to a Windows PowerShell provider path.                                                                                                              |
| dbp           | Disable-PSBreakpoint           | Disables the breakpoints in the current console.                                                                                                                                                   |
| del           | Remove-Item                    | Deletes files and folders.                                                                                                                                                                         |
| diff          | Compare-Object                 | Compares two sets of objects.                                                                                                                                                                      |
| dir           | Get-ChildItem                  | Gets the files and folders in a file system drive.                                                                                                                                                 |
| dnsn          | Disconnect-PSSession           | Disconnects from a session.                                                                                                                                                                        |
| ebp           | Enable-PSBreakpoint            | Enables the breakpoints in the current console.                                                                                                                                                    |
| echo          | Write-Output                   | Sends the specified objects to the next command in the pipeline. If the command is the last command in the pipeline, the objects are displayed in the console.                                     |
| epal          | Export-Alias                   | Exports information about currently defined aliases to a file.                                                                                                                                     |
| epcsv         | Export-Csv                     | Converts objects into a series of comma-separated (CSV) strings and saves the strings in a CSV file.                                                                                               |
| epsn          | Export-PSSession               | Imports commands from another session and saves them in a Windows PowerShell module.                                                                                                               |
| erase         | Remove-Item                    | Deletes files and folders.                                                                                                                                                                         |
| etsn          | Enter-PSSession                | Starts an interactive session with a remote computer.                                                                                                                                              |
| exsn          | Exit-PSSession                 | Ends an interactive session with a remote computer.                                                                                                                                                |
| fc            | Format-Custom                  | Uses a customized view to format the output.                                                                                                                                                       |
| fl            | Format-List                    | Formats the output as a list of properties in which each property appears on a new line.                                                                                                           |
| foreach       | ForEach-Object                 | Performs an operation against each item in a collection of input objects.                                                                                                                          |
| ft            | Format-Table                   | Formats the output as a table.                                                                                                                                                                     |
| fw            | Format-Wide                    | Formats objects as a wide table that displays only one property of each object.                                                                                                                    |
| gal           | Get-Alias                      | Gets the aliases for the current session.                                                                                                                                                          |
| gbp           | Get-PSBreakpoint               | Gets the breakpoints that are set in the current session.                                                                                                                                          |
| gc            | Get-Content                    | Gets the contents of a file.                                                                                                                                                                       |
| gci           | Get-ChildItem                  | Gets the files and folders in a file system drive.                                                                                                                                                 |
| gcm           | Get-Command                    | Gets all commands.                                                                                                                                                                                 |
| gcs           | Get-PSCallStack                | Displays the current call stack.                                                                                                                                                                   |
| gdr           | Get-PSDrive                    | Gets drives in the current session.                                                                                                                                                                |
| ghy           | Get-History                    | Gets a list of the commands entered during the current session.                                                                                                                                    |
| gi            | Get-Item                       | Gets files and folders.                                                                                                                                                                            |
| gjb           | Get-Job                        | Gets Windows PowerShell background jobs that are running in the current session.                                                                                                                   |
| gl            | Get-Location                   | Gets information about the current working location or a location stack.                                                                                                                           |
| gm            | Get-Member                     | Gets the properties and methods of objects.                                                                                                                                                        |
| gmo           | Get-Module                     | Gets the modules that have been imported or that can be imported into the current session.                                                                                                         |
| gp            | Get-ItemProperty               | Gets the properties of a specified item.                                                                                                                                                           |
| gps           | Get-Process                    | Gets the processes that are running on the local computer or a remote computer.                                                                                                                    |
| group         | Group-Object                   | Groups objects that contain the same value for specified properties.                                                                                                                               |
| gsn           | Get-PSSession                  | Gets the Windows PowerShell sessions on local and remote computers.                                                                                                                                |
| gsnp          | Get-PSSnapIn                   | Gets the Windows PowerShell snap-ins on the computer.                                                                                                                                              |
| gsv           | Get-Service                    | Gets the services on a local or remote computer.                                                                                                                                                   |
| gu            | Get-Unique                     | Returns unique items from a sorted list.                                                                                                                                                           |
| gv            | Get-Variable                   | Gets the variables in the current console.                                                                                                                                                         |
| gwmi          | Get-WmiObject                  | Gets instances of Windows Management Instrumentation (WMI) classes or information about the available classes.                                                                                     |
| h             | Get-History                    | Gets a list of the commands entered during the current session.                                                                                                                                    |
| history       | Get-History                    | Gets a list of the commands entered during the current session.                                                                                                                                    |
| icm           | Invoke-Command                 | Runs commands on local and remote computers.                                                                                                                                                       |
| iex           | Invoke-Expression              | Runs commands or expressions on the local computer.                                                                                                                                                |
| ihy           | Invoke-History                 | Runs commands from the session history.                                                                                                                                                            |
| ii            | Invoke-Item                    | Performs the default action on the specified item.                                                                                                                                                 |
| ipal          | Import-Alias                   | Imports an alias list from a file.                                                                                                                                                                 |
| ipcsv         | Import-Csv                     | Creates table-like custom objects from the items in a CSV file.                                                                                                                                    |
| ipmo          | Import-Module                  | Adds modules to the current session.                                                                                                                                                               |
| ipsn          | Import-PSSes sion              | Imports commands from another session into the current session.                                                                                                                                    |
| irm           | Invoke-RestMethod              | Sends an HTTP or HTTPS request to a RESTful web service.                                                                                                                                           |
| ise           | powershell_ise.exe             | Explains how to use the PowerShell_ISE.exe command-line tool.                                                                                                                                      |
| iwmi          | Invoke-WMIMethod               | Calls Windows Management Instrumentation (WMI) methods.                                                                                                                                            |
| iwr           | Invoke-WebRequest              | Gets content from a web page on the Internet.                                                                                                                                                      |
| kill          | Stop-Process                   | Stops one or more running processes.                                                                                                                                                               |
| lp            | Out-Printer                    | Sends output to a printer.                                                                                                                                                                         |
| ls            | Get-ChildItem                  | Gets the files and folders in a file system drive.                                                                                                                                                 |
| man           | help                           | Displays information about Windows PowerShell commands and concepts.                                                                                                                               |
| md            | mkdir                          | Creates a new item.                                                                                                                                                                                |
| measure       | Measure-Object                 | Calculates the numeric properties of objects, and the characters, words, and lines in string objects, such as files of text.                                                                       |
| mi            | Move-Item                      | Moves an item from one location to another.                                                                                                                                                        |
| mount         | New-PSDrive                    | Creates temporary and persistent mapped network drives.                                                                                                                                            |
| move          | Move-Item                      | Moves an item from one location to another.                                                                                                                                                        |
| mp            | Move-ItemProperty              | Moves a property from one location to another.                                                                                                                                                     |
| mv            | Move-Item                      | Moves an item from one location to another.                                                                                                                                                        |
| nal           | New-Alias                      | Creates a new alias.                                                                                                                                                                               |
| ndr           | New-PSDrive                    | Creates temporary and persistent mapped network drives.                                                                                                                                            |
| ni            | New-Item                       | Creates a new item.                                                                                                                                                                                |
| nmo           | New-Module                     | Creates a new dynamic module that exists only in memory.                                                                                                                                           |
| npssc         | New-PSSessionConfigurationFile | Creates a file that defines a session configuration.                                                                                                                                               |
| nsn           | New-PSSession                  | Creates a persistent connection to a local or remote computer.                                                                                                                                     |
| nv            | New-Variable                   | Creates a new variable.                                                                                                                                                                            |
| ogv           | Out-GridView                   | Sends output to an interactive table in a separate window.                                                                                                                                         |
| oh            | Out-Host                       | Sends output to the command line.                                                                                                                                                                  |
| popd          | Pop-Location                   | Changes the current location to the location most recently pushed to the stack. You can pop the location from the default stack or from a stack that you create by using the Push-Location cmdlet. |
| ps            | Get-Process                    | Gets the processes that are running on the local computer or a remote computer.                                                                                                                    |
| pushd         | Push-Location                  | Adds the current location to the top of a location stack.                                                                                                                                          |
| pwd           | Get-Location                   | Gets information about the current working location or a location stack.                                                                                                                           |
| r             | Invoke-History                 | Runs commands from the session history.                                                                                                                                                            |
| rbp           | Remove-PSBreakpoint            | Deletes breakpoints from the current console.                                                                                                                                                      |
| rcjb          | Receive-Job                    | Gets the results of the Windows PowerShell background jobs in the current session.                                                                                                                 |
| rcsn          | Receive-PSSession              | Gets results of commands in disconnected sessions.                                                                                                                                                 |
| rd            | Remove-Item                    | Deletes files and folders.                                                                                                                                                                         |
| rdr           | Remove-PSDrive                 | Deletes temporary Windows PowerShell drives and disconnects mapped network drives.                                                                                                                 |
| ren           | Rename-Item                    | Renames an item in a Windows PowerShell provider namespace.                                                                                                                                        |
| ri            | Remove-Item                    | Deletes files and folders.                                                                                                                                                                         |
| rjb           | Remove-Job                     | Deletes a Windows PowerShell background job.                                                                                                                                                       |
| rm            | Remove-Item                    | Deletes files and folders.                                                                                                                                                                         |
| rmdir         | Remove-Item                    | Deletes files and folders.                                                                                                                                                                         |
| rmo           | Remove-Module                  | Removes modules from the current session.                                                                                                                                                          |
| rni           | Rename-Item                    | Renames an item in a Windows PowerShell provider namespace.                                                                                                                                        |
| rnp           | Rename-ItemProperty            | Renames a property of an item.                                                                                                                                                                     |
| rp            | Remove-ItemProperty            | Deletes the property and its value from an item.                                                                                                                                                   |
| rsn           | Remove-PSSession               | Closes one or more Windows PowerShell sessions (PSSessions).                                                                                                                                       |
| rsnp          | Remove-PSSnapin                | Removes Windows PowerShell snap-ins from the current session.                                                                                                                                      |
| rujb          | Resume-Job                     | Restarts a suspended job                                                                                                                                                                           |
| rv            | Remove-Variable                | Deletes a variable and its value.                                                                                                                                                                  |
| rvpa          | Resolve-Path                   | Resolves the wildcard characters in a path, and displays the path contents.                                                                                                                        |
| rwmi          | Remove-WMIObject               | Deletes an instance of an existing Windows Management Instrumentation (WMI) class.                                                                                                                 |
| sajb          | Start-Job                      | Starts a Windows PowerShell background job.                                                                                                                                                        |
| sal           | Set-Alias                      | Creates or changes an alias (alternate name) for a cmdlet or other command element in the current Windows PowerShell session.                                                                      |
| saps          | Start-Process                  | Starts one or more processes on the local computer.                                                                                                                                                |
| sasv          | Start-Service                  | Starts one or more stopped services.                                                                                                                                                               |
| sbp           | Set-PSBreakpoint               | Sets a breakpoint on a line, command, or variable.                                                                                                                                                 |
| sc            | Set-Content                    | Replaces the contents of a file with contents that you specify.                                                                                                                                    |
| select        | Select-Object                  | Selects objects or object properties.                                                                                                                                                              |
| set           | Set-Variable                   | Sets the value of a variable. Creates the variable if one with the requested name does not exist.                                                                                                  |
| shcm          | Show-Command                   | Creates Windows PowerShell commands in a graphical command window.                                                                                                                                 |
| si            | Set-Item                       | Changes the value of an item to the valu                                                                                                                                                           |