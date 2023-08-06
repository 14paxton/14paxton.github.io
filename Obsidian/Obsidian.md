---
title:        Obsidian          
layout:       default          
has_children: false          
permalink:    Obsidian/Obsidian          
category:     Obsidian          
share:        true          
shortRepo:    ghpages          
---

***          
<details  markdown="block">            
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

***          

# Multiple Cursors

Obsidian lets you edit text in multiple places at the same time using multiple cursors. You can add additional cursors by holding`Alt`(or`Option`on macOS) and selecting another position in the note.

# Templates

## [GitHubPages](https://github.com/ObsidianPublisher/template-gh-pages/blob/main/mkdocs.yml)

                  
---          

# [Editing And Formatting](https://help.obsidian.md/Editing+and+formatting/Basic+formatting+syntax)

                  
---          

# [METADATA](https://help.obsidian.md/Editing+and+formatting/Metadata#:~:text=YAML%20is%20a%20widely%20used,key%20and%20a%20corresponding%20value.&text=While%20the%20order%20of%20each,more%20than%20one%20tag%20key.)

### FRONTMATTER

```yml                  
---  
title:    GHP          
category: GithubPages/Pages          
share:    true          
repo:          
  owner:     14paxton          
  repo:      14paxton.github.io          
  branch:    master          
---           
```                  

                  
---          

# [Plugins](https://help.obsidian.md/Plugins/Core+plugins)

## [Material for MKDocs](https://squidfunk.github.io/mkdocs-material/creating-your-site/#advanced-configuration)

## [Github Publish](https://obsidian-publisher.netlify.app/plugin/)

- [MkDocsPublisher Documents](https://mkusz.github.io/mkdocs-publisher/)
- [REPO ReadMe](https://github.com/ObsidianPublisher/obsidian-github-publisher/blob/master/README.md)

### [upload setting](https://obsidian-publisher.netlify.app/plugin/settings/upload/)

### [FileSettings](https://obsidian-publisher.netlify.app/plugin/settings/per%20files%20settings/)

#### YAML

```yaml                
links:          
  mdlinks: boolean #convert to markdownlinks                 
  convert: boolean #transform to simple string with keeping alt text or file name/ title (it removes the [](.md#) or []())                
embed:          
  send:   boolean #prevent sending embed                
  remove: boolean #remove embed citation completely (replace to empty string the ![](.md#) or ![]())                
attachment:          
  send:   boolean #prevent sending attachment                
  folder: string #change default folder for attachment                
dataview:  boolean #force/prevent dataview queries conversion                
hardbreak: boolean #same but for hardbreak                
repo:          
  branch:    string #change default branch                 
  repo:      string #change default repository                
  owner:     string #change default owner (it's your github Username)                
  autoclean: boolean #disable auto cleaning                
baselink:  string #change base link for copylink settings                
```                

```yml                
links:          
  mdlinks: boolean #convert to markdownlinks                 
  convert: boolean #transform to simple string with keeping alt text or file name/ title (it removes the [](.md#) or []())                
embed:          
  send:   boolean #prevent sending embed                
  remove: boolean #remove embed citation completely (replace to empty string the ![](.md#) or ![]())                
attachment:          
  send:   boolean #prevent sending attachment                
  folder: string #change default folder for attachment                
dataview:  boolean #force/prevent dataview queries conversion                
hardbreak: boolean #same but for hardbreak                
baselink:  string #change base link for copylink settings                
multipleRepo:          
          
  - repo:          
      branch:    string #change default branch                 
      repo:      string #change default repository                
      owner:     string #change default owner (it's your github Username)                
      autoclean: boolean #enable auto cleaning                
  - repo:          
      branch:    string #change default branch                 
      repo:      string #change default repository                
      owner:     string #change default owner (it's your github Username)                
      autoclean: boolean #enable auto cleaning                
```                

### [Folder Config](https://obsidian-publisher.netlify.app/plugin/example/filepath_example/)

### [Frontmatter Keys](https://obsidian-publisher.netlify.app/plugin/settings/per%20files%20settings/#frontmatter-keys-explanation)

### [Commands](https://obsidian-publisher.netlify.app/plugin/commands/)

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

- `Upload single current active note` _(also in the right-click menu)_ : Send only the single current active note. The repo can be changed using the [frontmatter](Per%20files%20settings.md#).
- `Upload all notes` : Send all shared notes to the configured repository.
- `Upload unpublished notes` : Send only the shared note that are not present on the repository.

### Refresh

Refresh scans the repository and updates or sends the notes based on some conditions.

- `Refresh all published notes` : It only updates the content of the published notes. Here, the commit date and the last edited time (from Obsidian) are compared.
- `Refresh published and upload new notes` : It uploads the note not present in the repository and also updates the note edited since the last push. Same as above, dates are compared.

> [!tip] The refresh command use the last edited time and the last commit date to determine if the note has been edited since the last push.                    
> As a dataview table/list/task update don't edit the contents of a note, it won't be updated by the refresh command.          
> You can use the `Upload` command to update it.

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

This commands is also run along the verification of the repository value, and check if you will reach the limit using the commands (upload, refresh and purge), based on the number of files you            
will                
send, update or delete.

> [!note]                    
> The rate limit is 5000 requests per hour.          
> If you reach the limit, you will have to wait for the next hour to be able to push again.                    
> Exceding the limit will result in a `403` error.                    
> More information about the rate limit can be found [here](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting).

### Copy path

You can choose to add a command to copy the path (from the blog) of the current note. This command is only available if you have enabled the copy link feature in [Plugin](Plugin.md#).

### mkdoc.yml

```yml                
site_name:        Obsidian Mkdocs Publisher          
site_description: The documentation for Obsidian Mkdocs Publisher          
site_url:         https://obsidian-publisher.netlify.app          
          
theme:          
  name:        'material'          
  highlightjs: true          
  hljs_languages:          
    - yaml          
    - rust          
  logo:        assets/meta/SEO.png          
  favicon:     assets/meta/SEO.png          
  custom_dir:  overrides          
  font:          
    text: Ubuntu          
    code: Ubuntu Mono          
  language:    en          
  palette:          
          
    # Light mode                
    - media:   "(prefers-color-scheme: light)"          
      scheme:  default          
      primary: teal          
      accent:  light blue          
      toggle:          
        icon: material/toggle-switch-off-outline          
        name: Switch to dark mode          
          
    # Dark mode                
    - media:   "(prefers-color-scheme: dark)"          
      scheme:  slate          
      primary: blue          
      accent:  indigo          
      toggle:          
        icon: material/toggle-switch          
        name: Switch to light mode          
  features:          
    - navigation.indexes          
    - navigation.top          
    - navigation.sections          
    - navigation.tabs          
    - navigation.tabs.sticky          
    - navigation.expand          
    - search.suggest          
    - search.highlight          
# Extensions                
markdown_extensions:          
  - footnotes          
  - nl2br          
  - attr_list          
  - sane_lists          
  - meta          
  - smarty          
  - tables          
  - mdx_breakless_lists          
  - pymdownx.arithmatex:          
      generic: true          
  - pymdownx.details          
  - pymdownx.magiclink          
  - pymdownx.critic          
  - pymdownx.caret          
  - pymdownx.keys          
  - pymdownx.mark          
  - pymdownx.tilde          
  - pymdownx.highlight:          
      use_pygments:    true          
      anchor_linenums: true          
  - pymdownx.tasklist:          
      custom_checkbox: true          
  - pymdownx.emoji:          
      emoji_generator: !!python/name:pymdownx.emoji.to_svg          
  - admonition          
  - md_in_html          
  - toc:          
      permalink: true          
  - pymdownx.inlinehilite          
  - pymdownx.snippets          
  - pymdownx.superfences:          
      custom_fences:          
        - name:  mermaid          
          class: mermaid          
          format: !!python/name:pymdownx.superfences.fence_code_format          
plugins:          
  - search          
  - glightbox          
  - ezlinks:          
      wikilinks: true          
  - awesome-pages:          
      collapse_single_pages: true          
  - embed_file:          
      callouts:          true          
      custom-attributes: 'assets/css/custom_attributes.css'          
      language_message:  'ERROR 404 : NOT FOUND'          
  - callouts          
  - custom-attributes:          
      file: 'assets/css/custom_attributes.css'          
  - meta-descriptions          
  - exclude:          
      glob:          
        - "*obsidian*"          
  - tags:          
      tags_file: tags.md          
hooks:          
  - overrides/hooks/on_page_markdown.py          
  - overrides/hooks/on_env.py          
  - overrides/hooks/on_files.py          
extra_javascript:          
  - https://cdn.jsdelivr.net/gh/ObsidianPublisher/assets@main/dist/javascript.js          
  - https://polyfill.io/v3/polyfill.min.js?features=es6          
  - https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js          
extra_css:          
  - https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css          
  - https://cdn.jsdelivr.net/gh/ObsidianPublisher/assets@main/dist/styles.css          
  - assets/css/admonition.css          
  - assets/css/custom_attributes.css          
  - assets/css/customization.css          
extra:          
  comments:       false          
  generate_graph: false          
  SEO:            'assets/meta/SEO.png'          
  attachments:    'assets/img'          
  no-auto-h1:     true          
  blog_list:          
    pagination:             false          
    pagination_message:     false          
    pagination_translation: ''          
    no_page_found:          ''          
  hooks:          
    strip_comments: true          
    fix_heading:    false                
```      