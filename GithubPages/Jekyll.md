---  
title: Jekyll  
layout: default  
permalink: GithubPages/Jekyll  
category: GithubPages  
parent: GHP  
has_children: false  
share: true    
shortRepo: ghpages
---  


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

# [YML Config](https://jekyllrb.com/docs/configuration/default/)

## Where things are

```yaml  
source:          .
destination:     ./_site
collections_dir: .
plugins_dir:     _plugins # takes an array of strings and loads plugins in that order  
layouts_dir:     _layouts
data_dir:        _data
includes_dir:    _includes
sass:
sass_dir:        _sass
collections:
posts:
output:          true  
```  

## Handling Reading

```yaml  
safe:                false
include: [ ".htaccess" ]
exclude: [ "Gemfile", "Gemfile.lock", "node_modules", "vendor/bundle/", "vendor/cache/", "vendor/gems/", "vendor/ruby/" ]
keep_files: [ ".git", ".svn" ]
encoding:            "utf-8"
markdown_ext:        "markdown,mkdown,mkdn,mkd,md"
strict_front_matter: false  
```  

## Filtering Content

```yaml  
show_drafts: null
limit_posts: 0
future:      false
unpublished: false  
```  

## Plugins

```yaml  
whitelist: [ ]
plugins: [ ]  
```  

## Conversion

```yaml  
markdown:          kramdown
highlighter:       rouge
lsi:               false
excerpt_separator: "\n\n"
incremental:       false  
```  

## Serving

```yaml  
detach:           false
port:             4000
host:             127.0.0.1
baseurl:          "" # does not include hostname  
show_dir_listing: false  
```  

## Outputting

```yaml  
permalink:        date
paginate_path:    /page:num
timezone:         null

quiet:            false
verbose:          false
defaults: [ ]

liquid:
error_mode:       warn
strict_filters:   false
strict_variables: false  
```  

## Markdown Processors

> [Options](https://kramdown.gettalong.org/options.html)

```yaml  
kramdown:
auto_ids:      true
entity_output: as_char
toc_levels: [ 1, 2, 3, 4, 5, 6 ]
smart_quotes:  lsquo,rsquo,ldquo,rdquo
input:         GFM
hard_wrap:     false
footnote_nr:   1
show_warnings: false  
```  

  
---  

# [Metadata](https://jekyll.github.io/github-metadata/site.github/)

```json  
{
  "versions": {
    "jekyll": <version>,
    "kramdown": <version>,
    "liquid": <version>,
    "maruku": <version>,
    "rdiscount": <version>,
    "redcarpet": <version>,
    "RedCloth": <version>,
    "jemoji": <version>,
    "jekyll-mentions": <version>,
    "jekyll-redirect-from": <version>,
    "jekyll-sitemap": <version>,
    "github-pages": <version>,
    "ruby": <version>
  },
  "hostname": "github.com",
  "pages_hostname": "github.io",
  "api_url": "https://api.github.com",
  "help_url": "https://help.github.com",
  "environment": "dotcom",
  "pages_env": "dotcom",
  "public_repositories": [
    Repository
    Objects
  ],
  "organization_members": [
    User
    Objects
  ],
  "build_revision": "cbd866ebf142088896cbe71422b949de7f864bce",
  "project_title": "metadata-example",
  "project_tagline": "A GitHub Pages site to showcase repository metadata",
  "owner_name": "github",
  "owner_url": "https://github.com/github",
  "owner_gravatar_url": "https://github.com/github.png",
  "repository_url": "https://github.com/github/metadata-example",
  "repository_nwo": "github/metadata-example",
  "repository_name": "metadata-example",
  "zip_url": "https://github.com/github/metadata-example/zipball/gh-pages",
  "tar_url": "https://github.com/github/metadata-example/tarball/gh-pages",
  "clone_url": "https://github.com/github/metadata-example.git",
  "releases_url": "https://github.com/github/metadata-example/releases",
  "issues_url": "https://github.com/github/metadata-example/issues",
  "wiki_url": "https://github.com/github/metadata-example/wiki",
  "language": null,
  "is_user_page": false,
  "is_project_page": true,
  "show_downloads": true,
  "url": "http://username.github.io/metadata-example",
  // (or the CNAME)  
  "baseurl": "/metadata-example",
  "contributors": [
    User
    Objects
  ],
  "releases": [
    Release
    Objects
  ],
  "latest_release": [
    Release
    Object
  ],
  "private": false,
  "archived": false,
  "disabled": false,
  "license": {
    "key": "mit",
    "name": "MIT License",
    "spdx_id": "MIT",
    "url": "https://api.github.com/licenses/mit"
  },
  "source": {
    "branch": "gh-pages",
    "path": "/"
  }
}  
```  

  
---  

# Resources

## [Setup](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll)

## [GitHubActions](https://jekyllrb.com/docs/continuous-integration/github-actions/)

## [Jekyll Docker Image](https://github.com/envygeeks/jekyll-docker/blob/master/README.md)

## [FrontMatter Defaults](https://jekyllrb.com/docs/configuration/front-matter-defaults/)

## [Markdown Processor](https://jekyllrb.com/docs/configuration/markdown/)

  
---  