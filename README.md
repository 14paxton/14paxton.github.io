# [Link for Site: www.paxtonb.com](https://www.paxtonb.com)

# setup
```shell
brew install ruby;
brew update;

gem install bundler;
bundle update --bundler;
bundle install jekyll;
bundle update;
```
# Install and Cache

```shell
bundle install --full-index
```

```shell
bundle binstubs --all
```

```shell
bundle config set cache_all true
```

```shell
bundle lock --add-platform x86_64-linux
```

```shell
bundle cache --all-platforms
```

```shell
bundle config set --local system 'true'
```

# Run Site Locally

```shell
bundle exec jekyll serve --incremental --watch --verbose --profile --trace
```

<div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #31708f; background-color: #d9edf7; border-color: #bce8f1;">            
bundle exec looks for a Gemfile in your current directory, you should run that in Jekyll root folder.

If you don't have a Gemfile then you can create one with bundle init and adding the gems you need.

jekyll serve serves your site locally for development purposes.

Finally, the --incremental flag does what you need:

only re-builds posts and pages that have changed

</div>

- > ***make standalone to not rely on bundler , saves to bundle folder***

    ```shell
    bundle install --full-index --standalone --prefer-local
    ```   

# Adding images data uri

```html

<link href="/assets/js/imageLoader.js" rel="modulepreload"/>
<script async src="/assets/js/imageLoader.js" type="module"></script>
<div
        data-img-loader="linuxImages.js"
        data-key-as-header="true"
        data-zoom-on-hover="true"
        id="imageContainer"
        style="width: auto; height: auto;"
></div>
```

> use json object put header as key if you need header, data uri as value