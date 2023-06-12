---  
title: Obsidian  
category: GithubPages/Pages  
share: true  
repo:  
  owner: 14paxton  
  repo: 14paxton.github.io  
  branch: master  
  autoclean: false  
---  
  
# [Github Publish](https://obsidian-publisher.netlify.app/plugin/)  
  
## [upload setting](https://obsidian-publisher.netlify.app/plugin/settings/upload/)  
  
## [metadata](https://help.obsidian.md/Editing+and+formatting/Metadata#:~:text=YAML%20is%20a%20widely%20used,key%20and%20a%20corresponding%20value.&text=While%20the%20order%20of%20each,more%20than%20one%20tag%20key.)  
  
## [Folder Config](https://obsidian-publisher.netlify.app/plugin/example/filepath_example/)  
  
## [Frontmatter Keys](https://obsidian-publisher.netlify.app/plugin/settings/per%20files%20settings/#frontmatter-keys-explanation)  
  
  
## [Commands](https://obsidian-publisher.netlify.app/plugin/commands/)  
  
The plugin adds seven commands, with one also applied on the right-click menu.  
  
There are four types of commands :  
  
- `Upload`  
- `Refresh`  
- `Purge`  
- `Test` and `Check`  
  
### Upload  
  
Upload sends the `share: true` file and its embedded contents (or note, based on your settings) to the configured repo.  
  
> [!note] "Shared" meaning here "which have the `share: true` frontmatter key."  
  
It includes:  
  
- `Upload single current active note` _(also in the right-click menu)_ : Send only the single current active note. The repo can be changed using the [[Per files settings|frontmatter]].  
- `Upload all notes` : Send all shared notes to the configured repository.  
- `Upload unpublished notes` : Send only the shared note that are not present on the repository.  
  
### Refresh  
  
Refresh scans the repository and updates or sends the notes based on some conditions.  
  
- `Refresh all published notes` : It only updates the content of the published notes. Here, the commit date and the last edited time (from Obsidian) are compared.  
- `Refresh published and upload new notes` : It uploads the note not present in the repository and also updates the note edited since the last push. Same as above, dates are compared.  
  
> [!tip] The refresh command use the last edited time and the last commit date to determine if the note has been edited since the last push.  
> As a dataview table/list/task update don't edit the contents of a note, it won't be updated by the refresh command. You can use the `Upload` command to update it.  
  
### Purge  
  
There is only one command here : `Purge depublished and deleted files`  
  
> [!note] Depublished here means that the `share` key has been removed or set to `false`.  
  
This command will clean your configured repository by removing the files you deleted or stopped sharing.  
  
### Test  
  
Again, only one command : `Test the connection to the configured repository`.  
  
It will check if the repository exists, and also the main branch you set. It also checks whether you forgot (or not) to set a value.  
  
#### Check  
  
The commands is `Check the rate limit of the GitHub API`.  
It will show you the number of requests you have left, and the time when the limit will be reset.  
  
This commands is also run along the verification of the repository value, and check if you will reach the limit using the commands (upload, refresh and purge), based on the number of files you will send, update or delete.  
  
> [!note]  
> The rate limit is 5000 requests per hour. If you reach the limit, you will have to wait for the next hour to be able to push again.  
> Exceding the limit will result in a `403` error.  
> More information about the rate limit can be found [here](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting).  
  
### Copy path  
  
You can choose to add a command to copy the path (from the blog) of the current note. This command is only available if you have enabled the copy link feature in [[Plugin]].