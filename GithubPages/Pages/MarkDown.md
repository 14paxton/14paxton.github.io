--- 
title: MarkDown  
category: GitHubPages/Pages
share: true  
repo:  
  owner: 14paxton  
  repo: 14paxton.github.io  
  branch: master  
  autoclean: false  
---
  
# Pandoc  
## Add Table of Contents to mark down doc with pandoc  
1) set file name  
```bash  
fileMD=CLI_Grailsw.md;  
```  
  
2) run  
```bash  
pandoc -s --toc $fileMD -o output.md; rm -f $fileMD; mv output.md ./$fileMD;  
```  
  
## docx to markdown  
```bash  
pandoc -s example30.docx --wrap=none --reference-links -t markdown -o example35.md  
```  
> or  
  ```bash  
  pandoc -t markdown_strict \  
  --extract-media='./BrandonPaxton' myfilename.docx -o myfilename.md  
  ```  
  
- scripts  
  - convert docx  
    ```  
      #!/bin/bash  
  
       # save input from command line  
       input=$1  
  
       # get filename from input  
       filename=$(basename -s .docx $input)  
  
       # convert word to markdown  
       pandoc -f docx -t markdown "$input"  -o $filename.md  
     ```  
       
   - files  
     ```  
       #!/bin/bash  
  
       # save current working directory to variable  
       cwd=$(pwd)  
  
       # find all .docx files in current directory  
       find $cwd -name "*.docx" -type f -print0 | while IFS= read -r -d $'\0' line; do  
  
       # remove spaces in filename  
       ns_filename=$(echo $line | sed 's/ /_/g')  
  
       # get filename from input  
       the_filename=$(basename -s .docx $ns_filename)  
  
       # convert word to markdown  
       # echo "pandoc -f docx -t markdown \"$line\" -o $the_filename.md"  
       pandoc -f docx -t markdown "$line" -o $the_filename.md  
       done  
     ```