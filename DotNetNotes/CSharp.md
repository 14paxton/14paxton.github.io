---
title:        CSharp
permalink:    DotNetNotes/Csharp
category:     DotNetNotes
parent:       DotNetNotes
layout:       default
has_children: true
share:        true
shortRepo:

- dotnetnotes
- default

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

# Quick tips

## Create Unique Ids

[library](https://github.com/RobThree/IdGen)  
[generators](https://github.com/pbolduc/FlakeGen/tree/master/src/FlakeGen)

---

> GUID is 128 bit (16 bytes) data. To convert GUID to integer without data loss, we cannot use Int32 or Int64.

> .NET 4.0 introduced BigInteger struct which is 128 bit integer. And GUID can be easily converted to BigInteger as follows.

```csharp
using System;
using System.Numerics;

class Program
{
    static void Main(string[] args)
    {
        // ex: 8a847645-8cac-422c-962a-fdf3aa220065
        Guid g = Guid.NewGuid();

        // Convert GUID to BigInteger
        // ex: 134252730720501571475137903438348973637
        BigInteger bigInt = new BigInteger(g.ToByteArray());
    }
}
```

---

```csharp
Guid = Guid.NewGuid()
```

---

```csharp
var id64Generator = new Id64Generator();

public string generateID(string sourceUrl)
{
    return string.Format("{0}_{1}", sourceUrl, id64Generator.GenerateId());
}

// node 0
var id64Generator = new Id64Generator(0);

// node 1
var id64Generator = new Id64Generator(1);

// ... node 10
var id64Generator = new Id64Generator(10);
```

---

```csharp
internal static class CorrelationIdGenerator
{
    // Base32 encoding - in ascii sort order for easy text based sorting
    private static readonly char[] s_encode32Chars = "0123456789ABCDEFGHIJKLMNOPQRSTUV".ToCharArray();

    // Seed the _lastConnectionId for this application instance with
    // the number of 100-nanosecond intervals that have elapsed since 12:00:00 midnight, January 1, 0001
    // for a roughly increasing _lastId over restarts
    private static long _lastId = DateTime.UtcNow.Ticks;

    public static string GetNextId() => GenerateId(Interlocked.Increment(ref _lastId));

    private static string GenerateId(long id)
    {
        return string.Create(13, id, (buffer, value) =>
        {
            char[] encode32Chars = s_encode32Chars;

            buffer[12] = encode32Chars[value & 31];
            buffer[11] = encode32Chars[(value >> 5) & 31];
            buffer[10] = encode32Chars[(value >> 10) & 31];
            buffer[9] = encode32Chars[(value >> 15) & 31];
            buffer[8] = encode32Chars[(value >> 20) & 31];
            buffer[7] = encode32Chars[(value >> 25) & 31];
            buffer[6] = encode32Chars[(value >> 30) & 31];
            buffer[5] = encode32Chars[(value >> 35) & 31];
            buffer[4] = encode32Chars[(value >> 40) & 31];
            buffer[3] = encode32Chars[(value >> 45) & 31];
            buffer[2] = encode32Chars[(value >> 50) & 31];
            buffer[1] = encode32Chars[(value >> 55) & 31];
            buffer[0] = encode32Chars[(value >> 60) & 31];
        });
    }
}
```

---

# Looping

## foreach with index

```csharp
foreach ((string msg, int index) in messageStringList.Select((msg, index) => (msg, index)))
	{
		if (!msg.Contains("https:")) continue;
		interactionResponse.output.content.Add(await BuildResponseWithLinks(msg, index, messageStringList));
	}
```

---

# Dictionary

## get properties and values of object

```csharp
Dictionary<string, object> customParams = visitor
                                             .GetType()
                                             .GetProperties(BindingFlags.Instance | BindingFlags.Public)
                                             .ToDictionary(keySelector: prop => prop.Name, elementSelector: prop => prop.GetValue(visitor, index: null));
```

---

# String

## split

```csharp
string[] separatingStrings = { "https://" };
string[] words = msg.Split(separatingStrings, System.StringSplitOptions.RemoveEmptyEntries);
```

## Regex

```csharp
Regex urlPattern = new Regex(@"(?:(?<=\\n|\n|\s\w*)https:\/\/.*?(?<=\s|$))", RegexOptions.Compiled | RegexOptions.IgnorePatternWhitespace | RegexOptions.IgnoreCase);
						MatchCollection matches = urlPattern.Matches(message);

						foreach (Match match in matches) { Console.WriteLine(message.Substring(match.Index, match.Length)); }
```

```csharp
string mystring = "Here are some linked FAQs that might answer that:  \nhttps://dev.veridiancu.org/faq/8107/what-is-an-hsa-health-savings-account and here this \nhttps://dev.veridiancu.org/faq/8108/how-do-i-qualify-for-a-health-savings-account  and here this \nhttps://dev.veridiancu.org/faq/8106/can-i-open-a-cd-on-my-hsa";

System.Text.RegularExpressions.Regex urlPattern = new System.Text.RegularExpressions.Regex(@"(?:(?:\\n|\n|\s\w*)https:\/\/.*?(?:\s|$))", System.Text.RegularExpressions.RegexOptions.Compiled | System.Text.RegularExpressions.RegexOptions.IgnorePatternWhitespace | System.Text.RegularExpressions.RegexOptions.IgnoreCase);

 System.Text.RegularExpressions.MatchCollection matches = urlPattern.Matches( msg);

string[] stringArray = urlPattern.Split(msg);

 string result = urlPattern.Replace(mystring, delegate(System.Text.RegularExpressions.Match m) {
                               System.Text.RegularExpressions.Match urlMatch = System.Text.RegularExpressions.Regex.Match(m.Value, @"
                                                                                                          (https:\/\/)(.*?)(\s|$)");
                                                                return $"~{urlMatch.Value}~";
                                                             });

   var nn = result.Split('~');

```

---

# Stream

```csharp
using System;
using System.Threading.Tasks;
using System.Windows;
using System.IO;

namespace WpfApplication
{
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }

        private async void Button_Click(object sender, RoutedEventArgs e)
        {
            string StartDirectory = @"c:\Users\exampleuser\start";
            string EndDirectory = @"c:\Users\exampleuser\end";

            foreach (string filename in Directory.EnumerateFiles(StartDirectory))
            {
                using (FileStream SourceStream = File.Open(filename, FileMode.Open))
                {
                    using (FileStream DestinationStream = File.Create(EndDirectory + filename.Substring(filename.LastIndexOf('\\'))))
                    {
                        await SourceStream.CopyToAsync(DestinationStream);
                    }
                }
            }
        }
    }
}
```

---

# Text Writer

```csharp
using System.IO;

namespace ConsoleApplication
{
    class Program4
    {
        static void Main()
        {
            WriteCharacters();
        }

        static async void WriteCharacters()
        {
            using (StreamWriter writer = File.CreateText("newfile.txt"))
            {
                await writer.WriteLineAsync("First line of example");
                await writer.WriteLineAsync("and second line");
            }
        }
    }
}
```

---

# File & Directory

```csharp
string currentDir = Directory.GetCurrentDirectory();
string path = Path.Combine(new FileInfo(Assembly.GetExecutingAssembly().Location).DirectoryName,"vcu-chat-bot");
FileStream stream = new(path, FileMode.Open, FileAccess.Read);
```