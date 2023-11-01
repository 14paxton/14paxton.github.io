# [Link for Site: www.paxtonb.com](https://www.paxtonb.com)

# Run Locally

```shell
bundle cache --all-platforms --all
```

```shell
bundle install --full-index binstubs
```

> make standalone to not rely on bundler , saves to bundle folder

```shell
bundle install --full-index --standalone --prefer-local
```

```shell  
bundle exec jekyll serve --incremental     
```

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #31708f; background-color: #d9edf7; border-color: #bce8f1;">            
bundle exec looks for a Gemfile in your current directory, you should run that in Jekyll root folder.

If you don't have a Gemfile then you can create one with bundle init and adding the gems you need.

jekyll serve serves your site locally for development purposes.

Finally, the --incremental flag does what you need:

only re-builds posts and pages that have changed
</div>            

# Adding images data uri

```html

<link rel="modulepreload" href="/assets/js/imageLoader.js">
<script type="module" async src="/assets/js/imageLoader.js"></script>

***

<div id="imageContainer" data-key-as-header="true" data-zoom-on-hover="true" data-img-loader="linuxImages.js" style="width: auto; height: auto;"></div>
```

> use json object put header as key if you need header, data uri as value