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
    
***    
    
<br/>    
    
# [PowerShell](https://learn.microsoft.com/en-us/powershell/module/cimcmdlets/?view=powershell-7.3)    
    
- Run    
  Just run    
    
> powershell core 7+    
``pwsh testscript_writefile.ps1```    
    
> OS powershell 5    
```powershell testscript_writefile.ps1```    
    
- [Install](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.3)    
    
  > By default the package is installed to ```$env:ProgramFiles\PowerShell\<version>```    
  > You can launch PowerShell via the Start Menu or ```$env:ProgramFiles\PowerShell\<version>\pwsh.exe```    
    
- Note    
    
  > PowerShell 7.3 installs to a new directory and runs side-by-side with Windows PowerShell 5.1.    
  > PowerShell 7.3 is an in-place upgrade that replaces PowerShell 7.0 and lower.    
    
> PowerShell 7.3 is installed to ```$env:ProgramFiles\PowerShell\7```    
> The ```$env:ProgramFiles\PowerShell\7``` folder is added to ```$env:PATH```    
> Folders for previously released versions are deleted    
    
---  
    
```powershell    
dotnet tool install --global PowerShell    
```    
    
```powershell    
msiexec.exe /package PowerShell-7.3.2-win-x64.msi /quiet ADD_EXPLORER_CONTEXT_MENU_OPENPOWERSHELL=1 ADD_FILE_CONTEXT_MENU_RUNPOWERSHELL=1 ENABLE_PSREMOTING=1 REGISTER_MANIFEST=1 USE_MU=1 ENABLE_MU=1 ADD_PATH=1    
```    
    
# [Releases](https://github.com/PowerShell/PowerShell/releases)    
    
## Update PowerShell using Windows Package Manager (winget)    
    
```powershell    
winget upgrade Microsoft.PowerShell    
```    
    
## You also can install PowerShell by using below command via winget    
    
```powershell    
winget install Microsoft.PowerShell    
```    
    
> update    
    
```powershell    
msiexec.exe /fmu .\PowerShell-7.3.0-win-x64.msi USE_MU=1 ENABLE_MU=1    
```    
    
- [winget in Microsoft Docs](https://learn.microsoft.com/en-us/windows/package-manager/winget/)    
- [winget in GitHub repository](https://github.com/microsoft/winget-cli)    
    
***    
    
# Environment    
    
> There are 3 scopes of what is called Environment Variables:    
```[System.EnvironmentVariableTarget]::Machine```    
    
```[System.EnvironmentVariableTarget]::User```    
    
```[System.EnvironmentVariableTarget]::Process```    
    
---  
    
> To get list of variables, you can use    
    
```[System.Environment]::GetEnvironmentVariables($scope)```    
    
```    
[System.Environment]::GetEnvironmentVariables()     
# This will mix all scopes in one output    
```    
    
---  
    
> To set variable, you can use    
    
```[System.Environment]::SetEnvironmentVariable($varName, $varValue, $scope)```    
    
---  
    
> If $scope is Machine or User, it will try to store data, otherwise it will throw an exception.    
    
---  
---  
    
- ```$Env:```    
    
> is actually a virtual PowerShell drive and environment variables are items on it. There is a special provider Get-PSProvider -PSProvider Environment    
> that implements this method of accessing to environment in powershell.    
    
***    
    
> You can run '''Get-ChildItem -Path 'Env:\''''    
> and this is exactly the same as ```[System.Environment]::GetEnvironmentVariables()```    
> without specifying scope.    
    
***    
    
## WSL    
    
- get list of distros    
    
```powershell    
wslconfig /l    
```    
    
- run wsl    
    
```powershell    
wsl    
```    
    
# Quick Scripts    
    
## lock screen    
    
```powershell    
$xCmdString = {rundll32.exe user32.dll,LockWorkStation}    
    
Invoke-Command $xCmdString    
```    
    
## - get file http    
    
```bash    
Invoke-WebRequest -Uri "http://www.contoso.com" -OutFile "C:\path\file"    
```    
    
```bash    
wget "http://www.contoso.com" -outfile "file"    
```    
    
## - Get version    
    
```powershell    
$PSVersionTable    
```    
    
## Run As Admin    
    
```powershell    
    
if (!([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator"))     
{ Start-Process powershell.exe "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`" `"$args`"" -Verb RunAs; exit }     
Start-Process -FilePath 'C:\Users\Brandon003842\Downloads\ConnectUtility_2.30.9_Logitech.exe' -WorkingDirectory 'C:\Users\Brandon003842\LogiTech' -Verb RunAs    
    
```    
    
## rename and expand zip    
    
```powershell    
Rename-Item .\Ubuntu.appx .\Ubuntu.zip    
Expand-Archive .\Ubuntu.zip .\Ubuntu    
```    
    
## - execute    
    
```powershell    
Start-Process test.exe    
#or    
Invoke-Expression -Command "path...test.exe"    
```    
    
## - set env variable    
    
```powershell    
$env:AZURE_RESOURCE_GROUP = 'MyTestResourceGroup'    
```    
    
- set env variable persistently    
    
```powershell    
[System.Environment]::SetEnvironmentVariable('ResourceGroup','AZ_Resource_Group')    
```    
    
## Get execution policy    
    
```    
 Get-ExecutionPolicy. If it returns Restricted, then run Set-ExecutionPolicy AllSigned or Set-ExecutionPolicy Bypass -Scope Process    
```    
    
## search piped string    
    
```bash    
Select-String -Path "Users\*.csv" -Pattern "Joe"    
    
```    
    
## download file from web    
    
```powershell    
$WebClient = New-Object System.Net.WebClient    
$WebClient.DownloadFile("https://www.contoso.com/file","C:\path\file")    
```    
    
## - invoke-WebRequest    
    
```powershell    
Invoke-WebRequest -Uri "http://www.contoso.com" -OutFile "C:\path\file"    
```    
    
## foreach    
    
```powershell    
# Create an array of folders    
$folders = @('C:\Folder','C:\Program Files\Folder2','C:\Folder3')    
    
# Perform iteration to create the same file in each folder    
foreach ($i in $folders) {    
    Add-Content -Path "$i\SampleFile.txt" -Value "This is the content of the file"    
}    
```    
    
```shell    
$folders = @('C:\Folder','C:\Program Files\Folder2','C:\Folder3')    
$folders | ForEach-Object (Add-Content -Path "$_\SampleFile.txt" -Value "This is the content of the file")    
```    
    
```shell    
$folders = @('C:\Folder','C:\Program Files\Folder2','C:\Folder3')    
$folders.ForEach({    
	Add-Content -Path "$_\SampleFile.txt" -Value "This is the content of the file"    
})    
```    
    
### Creating a File in Each Sub-Folder in a Directory using the ForEach Statement    
    
```shell    
# Define the TOP-level folder    
$TOP_FOLDER = "C:\ARCHIVE_VOLUMES"    
    
# Get all sub folders recursively    
$Child_Folders = Get-ChildItem -Path $TOP_FOLDER -Recurse | Where-Object { $_.PSIsContainer -eq $true }    
    
# Create a text file in each sub-folder and add the current date/time as value.    
foreach ($foldername in $Child_Folders.FullName) {    
   (get-date -Format G) | Out-File -FilePath "$($foldername)\BackupState.txt" -Force    
}    
```    
    
> Using the Get-ChildItem cmdlet, you can confirm that the files were created or update inside each of the sub-folders.    
    
```shell    
Get-ChildItem -Recurse -Path C:\ARCHIVE_VOLUMES -Include backupstate.txt | Select-Object Fullname,CreationTime,LastWriteTime,Length    
```    
    
### Reading the Contents of each Text File in Sub-Directories    
    
```shell    
## Find all BackupState.txt files in C:\ARCHIVE_VOLUMES    
$files = Get-ChildItem -Recurse -Path C:\ARCHIVE_VOLUMES -Include 'BackupState.txt' | Select-Object DirectoryName,FullName    
    
## Read the contents of each file    
foreach ($file in $files) {    
    Write-Output ("$($file.DirectoryName) last backup time - " + (Get-Content $file.FullName))    
}    
```    
    
### Getting Services and Starting Them using the ForEach-Object CmdLet    
    
```shell    
## Get a list of automatic services that are stopped.    
$services = Get-Service | Where-Object {$.StartType -eq 'Automatic' -and $.Status -ne 'Running'}    
    
## Pass each service object to the pipeline and process them with the Foreach-Object cmdlet    
$services | ForEach-Object {    
    try {    
        Write-Host "Attempting to start '$($.DisplayName)'"    
        Start-Service -Name $.Name -ErrorAction STOP    
        Write-Host "SUCCESS: '$($.DisplayName)' has been started"    
    } catch {    
        Write-output "FAILED: $($.exception.message)"    
    }    
}    
```    
    
### Reading Data from CSV using the ForEach() Method    
    
```shell    
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
    
        # Build new user attributes    
        $NewUserParameters = @{    
            GivenName       = $_.FirstName    
            Surname         = $_.LastName    
            Name            = $userName    
            AccountPassword = $secPw    
        }    
    
        try {    
            New-AdUser @NewUserParameters -ErrorAction Stop    
            Write-Output "User '$($userName)' has been created."    
        }    
        catch {    
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
    
- or    
    
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
    
## answer prompt    
    
```shell    
 foreach($i in $files) {'y' | powershell -c "Remove-Item $i -Force -ErrorAction silentlycontinue"}    
```    
    
## parallel    
    
```shell    
powershell.exe Get-ChildItem C:\Users\$env:UserName\source\repos\GitHub\Veridian\Google\Default | ForEach-Object -Parallel {Remove-Item "$_" -Force -Recurse | Out-Null}    
powershell.exe Get-ChildItem  "C:\Users\$env:UserName\AppData\Local\Google\Chrome\User Data\Default" | Where-Object Name -NotIn @( 'Cache','Code Cache','databases','Extension State','File System' , 'IndexedDB', 'WebStorage', 'Sessions', 'Service Worker', 'Web Applications', 'Default') | ForEach-Object -Parallel {Copy-Item "$_" -Destination C:\Users\$env:UserName\source\repos\GitHub\Veridian\Google\Default -Recurse -Force}    
```    
    
***    
    
# Basic Commands    
    
<html>    
<body>    
<!--StartFragment-->    
    
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
    
<!--EndFragment-->    
</body>    
</html>    
    
***     
<html>    
<body>    
<!--StartFragment-->    
    
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
    
<!--EndFragment-->    
</body>    
</html>