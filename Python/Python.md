---
title: Python
layout: default
permalink: Python/
category: Python
has_children: false
share: true
shortRepo: ghpages
---

---

<details  markdown="block">                
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

---

# Install

## Using PyEnv

1. Install pyenv using Homebrew:
    ```shell
        brew install pyenv
    ```
2. Add pyenv to your shell configuration. For zsh (default in newer macOS), add these lines to your ~/.zshrc file:
    ```shell
        echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.zshrc
        echo 'export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.zshrc
        echo 'eval "$(pyenv init --path)"' >> ~/.zshrc
    ```
3. Install the Python version you need:
    ```shell
        pyenv install 3.10.x
    ```
4. Set it as your global Python:
    ```shell
        pyenv global 3.10.x
    ```

# Working with Virtual Environments

> Virtual environments are an essential tool for modern Python development. They create isolated spaces where you can install packages without affecting your
> system-wide Python installation. This prevents dependency conflicts between different projects.

- `Here's how to create and use a virtual environment:`
  1. Create a new virtual environment :
     ```shell
     python3 -m venv my_project_env
     ```
  2. Activate the virtual environment:
      ```shell
      source my_project_env/bin/activate
      ```
  3. Your terminal prompt will change to show the active environment. Now you can install packages that will only affect this environment:
      ```shell
      pip install package_name
      ```
  4. When you're done, deactivate the environment:
      ```shell
      deactivate
      ```

