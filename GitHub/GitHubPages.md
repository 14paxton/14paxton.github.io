---
title: GitHubPages
layout: default
permalink: GitHub/GitHubPages
category: GitHub
parent: GitHub
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

# [QUICKSTART](https://docs.github.com/en/pages/quickstart)

# ```_config.yml```

## [my config for githubpages](https://gist.github.com/14paxton/e0dd671b07d810ab13ae37b6828fe63f)

## old simple config

```yml                  
lsi: false
safe: true
source: docs
incremental: false
highlighter: rouge
gist:
  noscript: false
kramdown:
  math_engine: mathjax
  syntax_highlighter: rouge
markdown: kramdown
title: Paxton's Notes
remote_theme: pages-themes/time-machine@v0.2.0
plugins:
  - jekyll-remote-theme
relative_links:
  enabled: true
  collections: true

```                  

                  
---  

# [Custom Domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

1. On GitHub, navigate to your site's repository.

2. Under your repository name, click**Settings**. If you cannot see the "Settings" tab, select the dropdown menu, then click **Settings**

   ![Screenshot of a repository header showing the tabs. The "Settings" tab is highlighted by a dark orange outline.](https://docs.github.com/assets/cb-28266/images/help/repository/repo-actions-settings.png)

3. In the "Code and automation" section of the sidebar, click **Pages**.

4. Under "Custom domain", type your custom domain, then click **Save**.            
   If you are publishing your site from a branch, this will create a commit that adds a```CNAME```file to the root of your source branch.            
   If you are publishing your site with a custom GitHub Actions workflow, no```CNAME```file is created.            
   For more information about your publishing source: [Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

5. Navigate to your DNS provider and create either an ```ALIAS```,```ANAME```, or ```A``` record You can also create```AAAA```records for IPv6 support.            
   If you're implementing IPv6 support, we highly recommend using                
   an```A```record in addition to your```AAAA```record, due to slow adoption of IPv6 globally.            
   For more information about how to create the correct record, see your DNS provider's documentation.

    - To create an```ALIAS```or```ANAME```record, point your apex domain to the default domain for your site.            
      For more information about the default domain for your site, see [About GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#types-of-github-pages-sites)
    - To create```A```records, point your apex domain to the IP addresses for GitHub Pages.

        ```shell                  
        185.199.108.153                  
        185.199.109.153                  
        185.199.110.153                  
        185.199.111.153                  
        ```                  

    - To create```AAAA```records, point your apex domain to the IP addresses for GitHub Pages.

        ```shell                  
        2606:50c0:8000::153                  
        2606:50c0:8001::153                  
        2606:50c0:8002::153                  
        2606:50c0:8003::153                  
        ```                  

   **Warning:**We strongly recommend that you do not use wildcard DNS records, such as ```*.example.com```.            
   These records put you at an immediate risk of domain takeovers, even if you verify the domain.                
   For example, if you verify```example.com``` this prevents someone from using ```a.example.com``` but they could still take over ```b.a.example.com``` (which is covered by the wildcard DNS record)
   For more information: [Verifying your custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)

6. Open Terminal.

7. To confirm that your DNS record configured correctly, use the```dig```command, replacing_EXAMPLE.COM_with your apex domain. Confirm that the results match the IP addresses for GitHub Pages above.

    - For ```A``` records:

        ```shell                  
        $ dig EXAMPLE.COM +noall +answer -t A                  
        > EXAMPLE.COM    3600    IN A     185.199.108.153                  
        > EXAMPLE.COM    3600    IN A     185.199.109.153                  
        > EXAMPLE.COM    3600    IN A     185.199.110.153                  
        > EXAMPLE.COM    3600    IN A     185.199.111.153                  
        ```                  

    - For ```AAAA``` records:

        ```shell                  
        $ dig EXAMPLE.COM +noall +answer -t AAAA                  
        > EXAMPLE.COM     3600    IN AAAA     2606:50c0:8000::153                  
        > EXAMPLE.COM     3600    IN AAAA     2606:50c0:8001::153                  
        > EXAMPLE.COM     3600    IN AAAA     2606:50c0:8002::153                  
        > EXAMPLE.COM     3600    IN AAAA     2606:50c0:8003::153                  
        ```                  

## Personal Steps

## Step 1 — Set domain in GitHub project

Go to your GitHub Pages site’s repository settings. Under “Custom domain,” add or remove your custom domain and click “Save”

Setting “custom domain” creates a file named ```CNAME``` in the same repository. Don’t delete it.

## Step 2 — Set custom resource record for domain

This step is specific to your domain name register (like GoDaddy, Domain.com, Google Domains, etc.). All you need to do is set ```A``` & ```CNAME``` records for the selected domain.

![](https://miro.medium.com/v2/resize:fit:2000/1*lT1CCfb9jX74vGrsF5AoLA.png)


> For ```A``` record, set ```185.199.108.153```,```185.199.109.153```,```185.199.110.153```and```185.199.111.153```.

> To redirect ```www```subdomain to the original domain, add a ```CNAME``` record with your GitHub pages
> profile URL with a ```.```(dot) in the end, for example, ```YOUR-GITHUB-USERNAME.github.io.```

**_Official References_**_: For most up-to-date IP Addresses, use GitHub’s_[_official documentation_](https://help.github.com/articles/setting-up-an-apex-domain/)_  
and for setting up ```CNAME``` use this_[documentation_](https://help.github.com/articles/setting-up-a-www-subdomain/)

> UPDATE #1: The IP addresses for DNS```A```record is updated. The new IP addresses are required to use the free HTTPS support for GitHub pages

> UPDATE #2: Some people said this change is not working, it is actually because the DNS update can**take upto****24 hours**to propagate. So, I guess try hitting your domain the next day. 🤓

> NOTE #1: Even though it’s very obvious, you should replace```_YOUR-GITHUB-USERNAME_```and```your-domain.com```with your personal GitHub username and domain name you are trying to use respectively
                
---

# [DEPLOY](https://github.com/actions/deploy-pages)

> [Ex.](https://github.com/JamesIves/github-pages-deploy-action)

```yaml                
jobs: # Build job                
  build:
  # <Not provided for brevity>                
   # At a minimum, this job should upload artifacts using actions/upload-pages-artifact                

  # Deploy job                
  deploy: # Add a dependency to the build job                
    needs: build

    # Grant GITHUB_TOKEN the permissions required to make a Pages deployment                
    permissions:
      pages: write      # to deploy to Pages                
      id-token: write   # to verify the deployment, originates from an appropriate source                

    # Deploy to the github-pages environment                
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    # Specify runner + deployment step                
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v2 # or the latest "vX.X.X" version tag for this action                
```

# Template

## [just-the-docs (current)](https://github.com/just-the-docs/just-the-docs)

> [template readme](https://github.com/just-the-docs/just-the-docs-template/blob/main/README.md#hosting-your-docs-from-an-existing-project-repo)

> [YAML Example](https://github.com/just-the-docs/just-the-docs/blob/f246498a8fab71a8716194aaca8ef690bbdc1b94/_config.yml)

```yaml
# Set a path/url to a logo that will be displayed instead of the title
#logo: "/assets/images/just-the-docs.png"

# Enable or disable the site search
# Supports true (default) or false
search_enabled: true
search: # Split pages into sections that can be searched individually
   # Supports 1 - 6, default: 2
   heading_level: 2
   # Maximum amount of previews per search result
   # Default: 3
   previews: 2
   # Maximum amount of words to display before a matched word in the preview
   # Default: 5
   preview_words_before: 3
   # Maximum amount of words to display after a matched word in the preview
   # Default: 10
   preview_words_after: 3
   # Set the search token separator
   # Default: /[\s\-/]+/
   # Example: enable support for hyphenated search words
   tokenizer_separator: /[\s/]+/
   # Display the relative url in search results
   # Supports true (default) or false
   rel_url: true
   # Enable or disable the search button that appears in the bottom right corner of every page
   # Supports true or false (default)
   button: false

# For copy button on code
enable_copy_code_button: true

# By default, consuming the theme as a gem leaves mermaid disabled; it is opt-in
mermaid: # Version of mermaid library
   # Pick an available version from https://cdn.jsdelivr.net/npm/mermaid/
   version: "9.1.6"
   # Put any additional configuration, such as setting the theme, in _includes/mermaid_config.js
   # See also docs/ui-components/code
   # To load mermaid from a local library, also use the `path` key to specify the location of the library; e.g.
   # for (v10+):
   # path: "/assets/js/mermaid.esm.min.mjs"
   # for (<v10):
   # path: "/assets/js/mermaid.min.js"
   # Note: copy both `mermaid.esm.min.mjs` (v10+) or `mermaid.min.js` (<v10) and the associated `.map` file from the specified version of `mermaid/dist` to `/assets/js/`.

# Enable or disable heading anchors
heading_anchors: true

# Aux links for the upper right navigation
aux_links:
   "Just the Docs on GitHub":
      - "//github.com/just-the-docs/just-the-docs"

# Makes Aux links open in a new tab. Default is false
aux_links_new_tab: false

# Sort order for navigation links
# nav_sort: case_insensitive # default, equivalent to nil
nav_sort: case_sensitive # Capital letters sorted before lowercase

# External navigation links
nav_external_links:
   - title: Just the Docs on GitHub
     url: https://github.com/just-the-docs/just-the-docs

# Footer content
# appears at the bottom of every page's main content

# Back to top link
back_to_top: true
back_to_top_text: "Back to top"

footer_content: "Copyright &copy; 2017-2020 Patrick Marsceill. Distributed by an <a href=\"https://github.com/just-the-docs/just-the-docs/tree/main/LICENSE.txt\">MIT license.</a> <a href=\"https://www.netlify.com/\">This site is powered by Netlify.</a>"

# Footer last edited timestamp
last_edit_timestamp: true # show or hide edit time - page must have `last_modified_date` defined in the frontmatter
last_edit_time_format: "%b %e %Y at %I:%M %p" # uses ruby's time format: https://ruby-doc.org/stdlib-2.7.0/libdoc/time/rdoc/Time.html



# Footer "Edit this page on GitHub" link text
gh_edit_link: true # show or hide edit this page link
gh_edit_link_text: "Edit this page on GitHub"
gh_edit_repository: "https://github.com/just-the-docs/just-the-docs" # the github URL for your repo
gh_edit_branch: "develop" # the branch that your docs are served from
# gh_edit_source: docs # the source that your files originate from
gh_edit_view_mode: "tree" # "tree" or "edit" if you want the user to jump into the editor immediately

# Color scheme currently only supports "dark", "light"/nil (default), or a custom scheme that you define
color_scheme: nil

callouts_level: quiet # or loud
callouts:
   highlight:
      color: yellow
   important:
      title: Important
      color: blue
   new:
      title: New
      color: green
   note:
      title: Note
      color: purple
   warning:
      title: Warning
      color: red

# Google Analytics Tracking (optional)
# Supports a CSV of tracking ID strings (eg. "UA-1234567-89,G-1AB234CDE5")
# Note: the main Just the Docs site does *not* use Google Analytics.
# ga_tracking: UA-2709176-10,G-5FG1HLH3XQ
# ga_tracking_anonymize_ip: true # Use GDPR compliant Google Analytics settings (true/nil by default)

plugins:
   - jekyll-seo-tag
   - jekyll-github-metadata

kramdown:
   syntax_highlighter_opts:
      block:
         line_numbers: false

compress_html:
   clippings: all
   comments: all
   endings: all
   startings: [ ]
   blanklines: false
   profile: false
   # ignore:
   #   envs: all
```

# [Themes](https://pages.github.com/themes/)

## [REPO](https://github.com/pages-themes)

## [Add Theme](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll)      