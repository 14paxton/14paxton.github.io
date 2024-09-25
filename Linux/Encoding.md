---
title: Encoding
permalink: Linux/Encoding
category: Linux
parent: Linux
layout: default
has_children: false
share: true
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

---

<br/>

> Preferred encoding is an overall preference and cannot be specified for individual servers.
> If you have a particular server that requires a different encoding from your usual setting, you can change
> the preferred encoding temporarily to work with that server, and then set it back once you are done with that connection.

- > Western (ISO Latin 1) is the default preferred encoding because it is the most common and compatible character set.
  > While filenames may appear garbled, they will at least be displayed.
  > (ISO Latin
  > 1 is the ISO 8859-1 character set.)

- > Unicode (UTF-8) - Use this encoding when connecting to Mac OS X, Java, or newer Windows servers.

- > Western (macOS Roman) - Use this encoding when connecting to servers based on Mac OS 9 or earlier.

- > Western (Windows Latin 1) - Use this encoding for connecting to older Windows servers.

# Encode to UTF-8 /utf8

> Run : `iconv --list` to see a list of all supported encodings.

## Mac Roman character to equivalent UTF-8

```shell
iconv -f ISO-8859-1 -t UTF-8 < input.latin1 > output.utf8
```

## \*nix like computers (including Mac OS X)

```shell
iconv -f original_charset -t utf-8 originalfile > newfile
```

## script

```bash
#!/bin/bash
FROM=iso-8859-1
TO=UTF-8
ICONV="iconv -f $FROM -t $TO"
# Convert
find ToUTF/ -type f -name "*" | while read fn; do
cp ${fn} ${fn}.bak
$ICONV < ${fn}.bak > ${fn}
rm ${fn}.bak
done
```

## Emacs

> - The default Unicode format for Microsoft Excel and Wordpad is UTF-16. These files can be converted to UTF-8 using GNU Emacs 22.1

1. Open the file with Emacs
2. Enter the command C-x RET c utf-8 RET
3. You will then be asked what command you want this encoding to apply to
4. Enter the command C-x C-w then enter a new file name

> The file you have saved will be UTF-8

# Text files as binaries

> I have found that sometimes text files contain unprintable ASCII characters.
> In such cases, even though the files are "text" files, dos2unix thinks they are binary.
> If this is the case, you can use
> the tr command as such:

```shell
tr -cd '\11\12\15\40-\176' < file.txt
```

> This is the basic command and will clean out those unprintable characters and output your new ASCII-clean text to stdout. To actually save this
> output as a file, just pipe the output to a file:

```shell
tr -cd '\11\12\15\40-\176' < file.txt > newfile.txt
```

> Now `newfile.txt `is your text file on which you can run dos2unix.

> The complement `(ie, -c)` of string `'\11\12\15\40-\176' ` means that the `tr` command strips out everything but the characters defined in that
> string, which are:

- > `octal \11` : `tab`
- > `octal \12` : `new line`
- > `octal \15` : `carriage return`
- > `octal \40-\176` : `all the good/normal keyboard characters`

## Git

> [stackoverflow answer](https://stackoverflow.com/questions/5046032/git-says-binary-files-a-and-b-differ-on-for-reg-files)

> gitattributes has a new working-tree-encoding attribute.

```text
*.sql text working-tree-encoding=UTF-16LE eol=CRLF
```