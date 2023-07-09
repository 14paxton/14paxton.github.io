--- 
title: GitHubPages  
category: GitHubPages/Pages  
share: true  
repo:  
  owner: 14paxton  
  repo: 14paxton.github.io  
  branch: master  
  autoclean: false  
---   

# [QUICKSTART](https://docs.github.com/en/pages/quickstart)

___

# `_config.yml`

- my config for githubpages

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
    
2. Under your repository name, click  **Settings**. If you cannot see the "Settings" tab, select the  dropdown menu, then click **Settings**.
    
    ![Screenshot of a repository header showing the tabs. The "Settings" tab is highlighted by a dark orange outline.](https://docs.github.com/assets/cb-28266/images/help/repository/repo-actions-settings.png)
    
3. In the "Code and automation" section of the sidebar, click  **Pages**.
    
4. Under "Custom domain", type your custom domain, then click **Save**. If you are publishing your site from a branch, this will create a commit that adds a `CNAME` file to the root of your source branch. If you are publishing your site with a custom GitHub Actions workflow , no `CNAME` file is created. For more information about your publishing source, see "[Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)."
    
5. Navigate to your DNS provider and create either an `ALIAS`, `ANAME`, or `A` record. You can also create `AAAA` records for IPv6 support. If you're implementing IPv6 support, we highly recommend using an `A` record in addition to your `AAAA` record, due to slow adoption of IPv6 globally. For more information about how to create the correct record, see your DNS provider's documentation.
    
    - To create an `ALIAS` or `ANAME` record, point your apex domain to the default domain for your site. For more information about the default domain for your site, see "[About GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#types-of-github-pages-sites)."
    - To create `A` records, point your apex domain to the IP addresses for GitHub Pages.
        
        ```shell
        185.199.108.153
        185.199.109.153
        185.199.110.153
        185.199.111.153
        ```
        
    - To create `AAAA` records, point your apex domain to the IP addresses for GitHub Pages.
        
        ```shell
        2606:50c0:8000::153
        2606:50c0:8001::153
        2606:50c0:8002::153
        2606:50c0:8003::153
        ```
        
    
    **Warning:** We strongly recommend that you do not use wildcard DNS records, such as `*.example.com`. These records put you at an immediate risk of domain takeovers, even if you verify the domain. For example, if you verify `example.com` this prevents someone from using `a.example.com` but they could still take over `b.a.example.com` (which is covered by the wildcard DNS record). For more information, see "[Verifying your custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)."
    
6. Open Terminal.
    
7. To confirm that your DNS record configured correctly, use the `dig` command, replacing _EXAMPLE.COM_ with your apex domain. Confirm that the results match the IP addresses for GitHub Pages above.
    
    - For `A` records:
        
        ```shell
        $ dig EXAMPLE.COM +noall +answer -t A
        > EXAMPLE.COM    3600    IN A     185.199.108.153
        > EXAMPLE.COM    3600    IN A     185.199.109.153
        > EXAMPLE.COM    3600    IN A     185.199.110.153
        > EXAMPLE.COM    3600    IN A     185.199.111.153
        ```
        
    - For `AAAA` records:
        
        ```shell
        $ dig EXAMPLE.COM +noall +answer -t AAAA
        > EXAMPLE.COM     3600    IN AAAA     2606:50c0:8000::153
        > EXAMPLE.COM     3600    IN AAAA     2606:50c0:8001::153
        > EXAMPLE.COM     3600    IN AAAA     2606:50c0:8002::153
        > EXAMPLE.COM     3600    IN AAAA     2606:50c0:8003::153
        ```

##  Personal Steps

## ⚙️Step 1 — Set domain in GitHub project

![[Pasted image 20230709141030.png]]

Go to your GitHub Pages site’s repository settings. Under “Custom domain”, add or remove your custom domain and click “Save”.

Setting “custom domain” creates a file named `**CNAME**` in the same repository. Don’t delete it.

## ⚙️Step 2 — Set custom resource record for domain

This step is specific to your domain name register (like GoDaddy, Domain.com, Google Domains, etc). All you need to do is set `**A**` & `**CNAME**` records for the selected domain.

![](https://miro.medium.com/v2/resize:fit:2000/1*lT1CCfb9jX74vGrsF5AoLA.png)

==mine==
![[Pasted image 20230709141245.png]]

For `**A**` record, set ==`185.199.108.153`==, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`. To redirect `**www**` subdomain to the original domain, add a `**CNAME**` record with your GitHub pages profile URL with a `.`(dot) in the end, for example, ‘`_YOUR-GITHUB-USERNAME.github.io._`’.

**_Official References_**_: For most up to date IP Addresses, use GitHub’s_ [_official documentation_](https://help.github.com/articles/setting-up-an-apex-domain/) _and for setting up CNAME use this_ [_documentation_](https://help.github.com/articles/setting-up-a-www-subdomain/)_._



> UPDATE #1: The IP addresses for DNS `A` record is updated. The new IP addresses are required to use the free HTTPS support for GitHub pages.
> 
> UPDATE #2: Some people said this change is not working, it is actually because the DNS update can **take upto** **24 hours** to propagate. So, I guess try hitting your domain next day 🤓
> 
> NOTE #1: Even though it’s very obvious, you should replace `_YOUR-GITHUB-USERNAME_` and `your-domain.com` with your personal github username and domain name you are trying to use respectively.


---

# [Themes](https://pages.github.com/themes/)
- [REPO](https://github.com/pages-themes)

## [Add Theme](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/adding-a-theme-to-your-github-pages-site-using-jekyll)

