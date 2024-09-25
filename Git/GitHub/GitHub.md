---
title:        GitHub
layout:       default
permalink:    Git/GitHub
category:     Git/GitHub
parent:       Git
has_children: true
share:        true
---

# SSH

## Create

1) Open Terminal.
2) Paste the text below, replacing the email used in the example with your GitHub email address.
      ```shell
        ssh-keygen -t ed25519 -C "your_email@example.com"
      ```  
   > Note: If you are using a legacy system that doesn't support the `Ed25519` algorithm, use:
   >> ```ssh-keygen -t rsa -b 4096 -C "your_email@example.com"```
3) At the prompt, type a secure passphrase.

    ```
      > Enter passphrase (empty for no passphrase): [Type a passphrase]
      > Enter same passphrase again: [Type passphrase again]
    ```

## Adding your SSH key to the ssh-agent

```shell
ssh-add ~/.ssh/id_ed25519
```

### Mac Get Public Key, Copy to clipboard

```shell
pbcopy < ~/.ssh/id_rsa.pub
```

## Create Config File

> Still in the same terminal, try using ls to see if a file name config exists. If it does, use code config to open it up in your code editor. If it
> doesn’t exist, you can create it by using touch
> config, then open it with code config. Copy and paste the following in your config:

### Example

   ```shell
        # Work account
            Host bitbucket.org
            HostName bitbucket.org
            IdentityFile ~/.ssh/id_rsa_work
            User git
            IdentitiesOnly yes
        # Personal account
            Host github.com
            HostName github.com
            IdentityFile ~/.ssh/id_rsa_personal
            User git
            IdentitiesOnly yes
   ```

### Errors

- <div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #a94442; background-color: #f2dede; border-color: #ebccd1;">            
        Permissions for '/Users/username/.ssh/id_rsa' are too open.
    It is recommended that your private key files are NOT accessible by others.
    This private key will be ignored.       
  </div>            

  > If your private key is not-so-private, you can easily fix that.
  > Use chmod 600 ```~/.ssh/id_rsa_work ``` to make it only read-writeable by you.
  > If you just want to make it readable by
  > you, then you can use ```chmod 400 ~/.ssh/id_rsa```
  > I recommend using the 600 over the 400 in this case.

- <div style="padding: 15px; border: 1px solid transparent; border-color: transparent; margin-bottom: 20px; border-radius: 4px; color: #31708f; background-color: #d9edf7; border-color: #bce8f1;">            
           we created a field called Host for each of our SSH keys. In my example, I named them after the website used for source control. If you decided to name yours something else, make sure you reference it when you clone a new repo. Let’s say you decided to do Host personal instead of Host github.com, that means to clone into your github account you would need to use:

  </div>            

     ```shell
      git clone git@personal:username/repo-name.git
     ```

# gh cli

## use token to authorize and merge

  ```shell
    export GH_TOKEN=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;
    act=$(gh auth status -t >>(tee -a) 2>&1 | sed -n 's/.*Token: //p');
    if [ "$act" == *"$GH_TOKEN"* ](%22$act%22%20==%20*%22$GH_TOKEN%22*.md#)
    then echo $GH_TOKEN | gh auth login --with-token;
    gh repo sync --force;
  ```

# workflow

## print env variables

```yaml
name: Print environment variables

on:
  workflow_dispatch:

jobs:
  debug:
    runs-on: ubuntu-latest

    steps:
      - name: Print
        run:  env | sort
```

# Tricks & Tips

## Use URL for a file on GitHub

> use the word 'raw' :

`https://raw.githubusercontent.com/14paxton/14paxton.github.io/master/assets/images/kubernetes.gif`

- > Example:

    ```html
        <img
            alt="kubernetes"
            src="https://github.com/14paxton/14paxton.github.io/blob/master/assets/images/kubernetes.gif?raw=true"
        />
    ```