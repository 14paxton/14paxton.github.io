---
title:     JavaScript
layout:    default
permalink: JavaScript/
category:  JavaScript
has_children: true
share:     true
shortRepo:

  - javascript
  - default

---

# [REPO](https://github.com/14paxton/javascript)

# Gists

- ## [AddToCustomFeed.js](https://gist.github.com/14paxton/63944ec7e8bcd0e7ee9b97e3dc6fd48e)
- ## [FormFillScript.js](https://gist.github.com/14paxton/fedc95a9b660e1625373bea6f92e4648)
- ## [GetCSSFromElement.js](https://gist.github.com/14paxton/70018ca1b4b990db4fbf4edfd1907af8)
- ## [JsEnumUnion.js](https://gist.github.com/14paxton/685637fd8c513c7539a10f66b2386cfe)
- ## [NewDocumentAndWindow.js](https://gist.github.com/14paxton/fb7f33fd6f5fa7a15077b6ebf18fca44)
- ## [ReadHTMLToNewDocument.js](https://gist.github.com/14paxton/a5a6b17131a2791b757973f866e3eb98)
- ## [SeeFormChange.js](https://gist.github.com/14paxton/f7f177713ec7e8effcdeec086c22e43a)
- ## [SendFormWithFileInput.js](https://gist.github.com/14paxton/eeeb29357613698bd877eb35dcf0ad89)
- ## [groupArrayOfObjectsByKey.js](https://gist.github.com/14paxton/a87f5d47aaf678e89a1dfeffa51b46d9)

# [Primitive Types and Data Structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)

|   Type    | typeof return value | Object wrapper |
|:---------:|:-------------------:|:--------------:|
|   Null    |      "object"       |      N/A       |
| Undefined |     "undefined"     |      N/A       |
|  Boolean  |      "boolean"      |    Boolean     |
|  Number   |      "number"       |     Number     |
|  BigInt   |      "bigint"       |     BigInt     |
|  String   |      "string"       |     String     |
|  Symbol   |      "symbol"       |     Symbol     |

# Cheat Sheet

![javascriptCheatSheet.png](..%2Fassets%2Fimages%2FjavascriptCheatSheet.png)  
![javascriptCheatSheet2.png](..%2Fassets%2Fimages%2FjavascriptCheatSheet2.png)  
![javascriptCheatSheet3.png](..%2Fassets%2Fimages%2FjavascriptCheatSheet3.png)  
![javascriptCheatSheet4.png](..%2Fassets%2Fimages%2FjavascriptCheatSheet4.png)

# Key Value Events / Keyboard Events Name and Code

<div>
<table>
  <thead>
    <tr>
      <th>Key Name</th>
      <th>event.which</th>
      <th>event.key</th>
      <th>event.code</th>
      <th>Notes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>backspace</td>
      <td>8</td>
      <td>Backspace</td>
      <td>Backspace</td>
      <td></td>
    </tr>
    <tr>
      <td>tab</td>
      <td>9</td>
      <td>Tab</td>
      <td>Tab</td>
      <td></td>
    </tr>
    <tr>
      <td>enter</td>
      <td>13</td>
      <td>Enter</td>
      <td>Enter</td>
      <td></td>
    </tr>
    <tr>
      <td>shift(left)</td>
      <td>16</td>
      <td>Shift</td>
      <td>ShiftLeft</td>
      <td><code>event.shiftKey</code> is true</td>
    </tr>
    <tr>
      <td>shift(right)</td>
      <td>16</td>
      <td>Shift</td>
      <td>ShiftRight</td>
      <td><code>event.shiftKey</code> is true</td>
    </tr>
    <tr>
      <td>ctrl(left)</td>
      <td>17</td>
      <td>Control</td>
      <td>ControlLeft</td>
      <td><code>event.ctrlKey</code> is true</td>
    </tr>
    <tr>
      <td>ctrl(right)</td>
      <td>17</td>
      <td>Control</td>
      <td>ControlRight</td>
      <td><code>event.ctrlKey</code> is true</td>
    </tr>
    <tr>
      <td>alt(left)</td>
      <td>18</td>
      <td>Alt</td>
      <td>AltLeft</td>
      <td><code>event.altKey</code> is true</td>
    </tr>
    <tr>
      <td>alt(right)</td>
      <td>18</td>
      <td>Alt</td>
      <td>AltRight</td>
      <td><code>event.altKey</code> is true</td>
    </tr>
    <tr>
      <td>pause/break</td>
      <td>19</td>
      <td>Pause</td>
      <td>Pause</td>
      <td></td>
    </tr>
    <tr>
      <td>caps lock</td>
      <td>20</td>
      <td>CapsLock</td>
      <td>CapsLock</td>
      <td></td>
    </tr>
    <tr>
      <td>escape</td>
      <td>27</td>
      <td>Escape</td>
      <td>Escape</td>
      <td></td>
    </tr>
    <tr>
      <td>space</td>
      <td>32</td>
      <td></td>
      <td>Space</td>
      <td>The <code>event.key</code> value is a single space.</td>
    </tr>
    <tr>
      <td>page up</td>
      <td>33</td>
      <td>PageUp</td>
      <td>PageUp</td>
      <td></td>
    </tr>
    <tr>
      <td>page down</td>
      <td>34</td>
      <td>PageDown</td>
      <td>PageDown</td>
      <td></td>
    </tr>
    <tr>
      <td>end</td>
      <td>35</td>
      <td>End</td>
      <td>End</td>
      <td></td>
    </tr>
    <tr>
      <td>home</td>
      <td>36</td>
      <td>Home</td>
      <td>Home</td>
      <td></td>
    </tr>
    <tr>
      <td>left arrow</td>
      <td>37</td>
      <td>ArrowLeft</td>
      <td>ArrowLeft</td>
      <td></td>
    </tr>
    <tr>
      <td>up arrow</td>
      <td>38</td>
      <td>ArrowUp</td>
      <td>ArrowUp</td>
      <td></td>
    </tr>
    <tr>
      <td>right arrow</td>
      <td>39</td>
      <td>ArrowRight</td>
      <td>ArrowRight</td>
      <td></td>
    </tr>
    <tr>
      <td>down arrow</td>
      <td>40</td>
      <td>ArrowDown</td>
      <td>ArrowDown</td>
      <td></td>
    </tr>
    <tr>
      <td>print screen</td>
      <td>44</td>
      <td>PrintScreen</td>
      <td>PrintScreen</td>
      <td></td>
    </tr>
    <tr>
      <td>insert</td>
      <td>45</td>
      <td>Insert</td>
      <td>Insert</td>
      <td></td>
    </tr>
    <tr>
      <td>delete</td>
      <td>46</td>
      <td>Delete</td>
      <td>Delete</td>
      <td></td>
    </tr>
    <tr>
      <td>0</td>
      <td>48</td>
      <td>0</td>
      <td>Digit0</td>
      <td></td>
    </tr>
    <tr>
      <td>1</td>
      <td>49</td>
      <td>1</td>
      <td>Digit1</td>
      <td></td>
    </tr>
    <tr>
      <td>2</td>
      <td>50</td>
      <td>2</td>
      <td>Digit2</td>
      <td></td>
    </tr>
    <tr>
      <td>3</td>
      <td>51</td>
      <td>3</td>
      <td>Digit3</td>
      <td></td>
    </tr>
    <tr>
      <td>4</td>
      <td>52</td>
      <td>4</td>
      <td>Digit4</td>
      <td></td>
    </tr>
    <tr>
      <td>5</td>
      <td>53</td>
      <td>5</td>
      <td>Digit5</td>
      <td></td>
    </tr>
    <tr>
      <td>6</td>
      <td>54</td>
      <td>6</td>
      <td>Digit6</td>
      <td></td>
    </tr>
    <tr>
      <td>7</td>
      <td>55</td>
      <td>7</td>
      <td>Digit7</td>
      <td></td>
    </tr>
    <tr>
      <td>8</td>
      <td>56</td>
      <td>8</td>
      <td>Digit8</td>
      <td></td>
    </tr>
    <tr>
      <td>9</td>
      <td>57</td>
      <td>9</td>
      <td>Digit9</td>
      <td></td>
    </tr>
    <tr>
      <td>a</td>
      <td>65</td>
      <td>a</td>
      <td>KeyA</td>
      <td></td>
    </tr>
    <tr>
      <td>b</td>
      <td>66</td>
      <td>b</td>
      <td>KeyB</td>
      <td></td>
    </tr>
    <tr>
      <td>c</td>
      <td>67</td>
      <td>c</td>
      <td>KeyC</td>
      <td></td>
    </tr>
    <tr>
      <td>d</td>
      <td>68</td>
      <td>d</td>
      <td>KeyD</td>
      <td></td>
    </tr>
    <tr>
      <td>e</td>
      <td>69</td>
      <td>e</td>
      <td>KeyE</td>
      <td></td>
    </tr>
    <tr>
      <td>f</td>
      <td>70</td>
      <td>f</td>
      <td>KeyF</td>
      <td></td>
    </tr>
    <tr>
      <td>g</td>
      <td>71</td>
      <td>g</td>
      <td>KeyG</td>
      <td></td>
    </tr>
    <tr>
      <td>h</td>
      <td>72</td>
      <td>h</td>
      <td>KeyH</td>
      <td></td>
    </tr>
    <tr>
      <td>i</td>
      <td>73</td>
      <td>i</td>
      <td>KeyI</td>
      <td></td>
    </tr>
    <tr>
      <td>j</td>
      <td>74</td>
      <td>j</td>
      <td>KeyJ</td>
      <td></td>
    </tr>
    <tr>
      <td>k</td>
      <td>75</td>
      <td>k</td>
      <td>KeyK</td>
      <td></td>
    </tr>
    <tr>
      <td>l</td>
      <td>76</td>
      <td>l</td>
      <td>KeyL</td>
      <td></td>
    </tr>
    <tr>
      <td>m</td>
      <td>77</td>
      <td>m</td>
      <td>KeyM</td>
      <td></td>
    </tr>
    <tr>
      <td>n</td>
      <td>78</td>
      <td>n</td>
      <td>KeyN</td>
      <td></td>
    </tr>
    <tr>
      <td>o</td>
      <td>79</td>
      <td>o</td>
      <td>KeyO</td>
      <td></td>
    </tr>
    <tr>
      <td>p</td>
      <td>80</td>
      <td>p</td>
      <td>KeyP</td>
      <td></td>
    </tr>
    <tr>
      <td>q</td>
      <td>81</td>
      <td>q</td>
      <td>KeyQ</td>
      <td></td>
    </tr>
    <tr>
      <td>r</td>
      <td>82</td>
      <td>r</td>
      <td>KeyR</td>
      <td></td>
    </tr>
    <tr>
      <td>s</td>
      <td>83</td>
      <td>s</td>
      <td>KeyS</td>
      <td></td>
    </tr>
    <tr>
      <td>t</td>
      <td>84</td>
      <td>t</td>
      <td>KeyT</td>
      <td></td>
    </tr>
    <tr>
      <td>u</td>
      <td>85</td>
      <td>u</td>
      <td>KeyU</td>
      <td></td>
    </tr>
    <tr>
      <td>v</td>
      <td>86</td>
      <td>v</td>
      <td>KeyV</td>
      <td></td>
    </tr>
    <tr>
      <td>w</td>
      <td>87</td>
      <td>w</td>
      <td>KeyW</td>
      <td></td>
    </tr>
    <tr>
      <td>x</td>
      <td>88</td>
      <td>x</td>
      <td>KeyX</td>
      <td></td>
    </tr>
    <tr>
      <td>y</td>
      <td>89</td>
      <td>y</td>
      <td>KeyY</td>
      <td></td>
    </tr>
    <tr>
      <td>z</td>
      <td>90</td>
      <td>z</td>
      <td>KeyZ</td>
      <td></td>
    </tr>
    <tr>
      <td>left window key</td>
      <td>91</td>
      <td>Meta</td>
      <td>MetaLeft</td>
      <td><code>event.metaKey</code> is true</td>
    </tr>
    <tr>
      <td>right window key</td>
      <td>92</td>
      <td>Meta</td>
      <td>MetaRight</td>
      <td><code>event.metaKey</code> is true</td>
    </tr>
    <tr>
      <td>select key (Context Menu)</td>
      <td>93</td>
      <td>ContextMenu</td>
      <td>ContextMenu</td>
      <td></td>
    </tr>
    <tr>
      <td>numpad 0</td>
      <td>96</td>
      <td>0</td>
      <td>Numpad0</td>
      <td></td>
    </tr>
    <tr>
      <td>numpad 1</td>
      <td>97</td>
      <td>1</td>
      <td>Numpad1</td>
      <td></td>
    </tr>
    <tr>
      <td>numpad 2</td>
      <td>98</td>
      <td>2</td>
      <td>Numpad2</td>
      <td></td>
    </tr>
    <tr>
      <td>numpad 3</td>
      <td>99</td>
      <td>3</td>
      <td>Numpad3</td>
      <td></td>
    </tr>
    <tr>
      <td>numpad 4</td>
      <td>100</td>
      <td>4</td>
      <td>Numpad4</td>
      <td></td>
    </tr>
    <tr>
      <td>numpad 5</td>
      <td>101</td>
      <td>5</td>
      <td>Numpad5</td>
      <td></td>
    </tr>
    <tr>
      <td>numpad 6</td>
      <td>102</td>
      <td>6</td>
      <td>Numpad6</td>
      <td></td>
    </tr>
    <tr>
      <td>numpad 7</td>
      <td>103</td>
      <td>7</td>
      <td>Numpad7</td>
      <td></td>
    </tr>
    <tr>
      <td>numpad 8</td>
      <td>104</td>
      <td>8</td>
      <td>Numpad8</td>
      <td></td>
    </tr>
    <tr>
      <td>numpad 9</td>
      <td>105</td>
      <td>9</td>
      <td>Numpad9</td>
      <td></td>
    </tr>
    <tr>
      <td>multiply</td>
      <td>106</td>
      <td>*</td>
      <td>NumpadMultiply</td>
      <td></td>
    </tr>
    <tr>
      <td>add</td>
      <td>107</td>
      <td>+</td>
      <td>NumpadAdd</td>
      <td></td>
    </tr>
    <tr>
      <td>subtract</td>
      <td>109</td>
      <td>-</td>
      <td>NumpadSubtract</td>
      <td></td>
    </tr>
    <tr>
      <td>decimal point</td>
      <td>110</td>
      <td>.</td>
      <td>NumpadDecimal</td>
      <td></td>
    </tr>
    <tr>
      <td>divide</td>
      <td>111</td>
      <td>/</td>
      <td>NumpadDivide</td>
      <td></td>
    </tr>
    <tr>
      <td>f1</td>
      <td>112</td>
      <td>F1</td>
      <td>F1</td>
      <td></td>
    </tr>
    <tr>
      <td>f2</td>
      <td>113</td>
      <td>F2</td>
      <td>F2</td>
      <td></td>
    </tr>
    <tr>
      <td>f3</td>
      <td>114</td>
      <td>F3</td>
      <td>F3</td>
      <td></td>
    </tr>
    <tr>
      <td>f4</td>
      <td>115</td>
      <td>F4</td>
      <td>F4</td>
      <td></td>
    </tr>
    <tr>
      <td>f5</td>
      <td>116</td>
      <td>F5</td>
      <td>F5</td>
      <td></td>
    </tr>
    <tr>
      <td>f6</td>
      <td>117</td>
      <td>F6</td>
      <td>F6</td>
      <td></td>
    </tr>
    <tr>
      <td>f7</td>
      <td>118</td>
      <td>F7</td>
      <td>F7</td>
      <td></td>
    </tr>
    <tr>
      <td>f8</td>
      <td>119</td>
      <td>F8</td>
      <td>F8</td>
      <td></td>
    </tr>
    <tr>
      <td>f9</td>
      <td>120</td>
      <td>F9</td>
      <td>F9</td>
      <td></td>
    </tr>
    <tr>
      <td>f10</td>
      <td>121</td>
      <td>F10</td>
      <td>F10</td>
      <td></td>
    </tr>
    <tr>
      <td>f11</td>
      <td>122</td>
      <td>F11</td>
      <td>F11</td>
      <td></td>
    </tr>
    <tr>
      <td>f12</td>
      <td>123</td>
      <td>F12</td>
      <td>F12</td>
      <td></td>
    </tr>
    <tr>
      <td>num lock</td>
      <td>144</td>
      <td>NumLock</td>
      <td>NumLock</td>
      <td></td>
    </tr>
    <tr>
      <td>scroll lock</td>
      <td>145</td>
      <td>ScrollLock</td>
      <td>ScrollLock</td>
      <td></td>
    </tr>
    <tr>
      <td>audio volume mute</td>
      <td>173</td>
      <td>AudioVolumeMute</td>
      <td></td>
      <td>
        ⚠️ The <code>event.which</code> value is 181 in Firefox. Also FF
        provides the code value as, <code>VolumeMute</code>
      </td>
    </tr>
    <tr>
      <td>audio volume down</td>
      <td>174</td>
      <td>AudioVolumeDown</td>
      <td></td>
      <td>
        ⚠️ The <code>event.which</code> value is 182 in Firefox. Also FF
        provides the code value as, <code>VolumeDown</code>
      </td>
    </tr>
    <tr>
      <td>audio volume up</td>
      <td>175</td>
      <td>AudioVolumeUp</td>
      <td></td>
      <td>
        ⚠️ The <code>event.which</code> value is 183 in Firefox. Also FF
        provides the code value as, <code>VolumeUp</code>
      </td>
    </tr>
    <tr>
      <td>media player</td>
      <td>181</td>
      <td>LaunchMediaPlayer</td>
      <td></td>
      <td>
        ⚠️ The ️<code>event.which</code> value is 0(no value) in Firefox. Also
        FF provides the code value as, <code>MediaSelect</code>
      </td>
    </tr>
    <tr>
      <td>launch application 1</td>
      <td>182</td>
      <td>LaunchApplication1</td>
      <td></td>
      <td>
        ⚠️ The ️<code>event.which</code> value is 0(no value) in Firefox. Also
        FF provides the code value as, <code>LaunchApp1</code>
      </td>
    </tr>
    <tr>
      <td>launch application 2</td>
      <td>183</td>
      <td>LaunchApplication2</td>
      <td></td>
      <td>
        ⚠️ The ️<code>event.which</code> value is 0(no value) in Firefox. Also
        FF provides the code value as, <code>LaunchApp2</code>
      </td>
    </tr>
    <tr>
      <td>semi-colon</td>
      <td>186</td>
      <td>;</td>
      <td>Semicolon</td>
      <td>⚠️ The <code>event.which</code> value is 59 in Firefox</td>
    </tr>
    <tr>
      <td>equal sign</td>
      <td>187</td>
      <td>=</td>
      <td>Equal</td>
      <td>⚠️ The <code>event.which</code> value is 61 in Firefox</td>
    </tr>
    <tr>
      <td>comma</td>
      <td>188</td>
      <td>,</td>
      <td>Comma</td>
      <td></td>
    </tr>
    <tr>
      <td>dash</td>
      <td>189</td>
      <td>-</td>
      <td>Minus</td>
      <td>⚠️ The <code>event.which</code> value is 173 in Firefox</td>
    </tr>
    <tr>
      <td>period</td>
      <td>190</td>
      <td>.</td>
      <td>Period</td>
      <td></td>
    </tr>
    <tr>
      <td>forward slash</td>
      <td>191</td>
      <td>/</td>
      <td>Slash</td>
      <td></td>
    </tr>
    <tr>
      <td>Backquote/Grave accent</td>
      <td>192</td>
      <td>`</td>
      <td>Backquote</td>
      <td></td>
    </tr>
    <tr>
      <td>open bracket</td>
      <td>219</td>
      <td>[</td>
      <td>BracketLeft</td>
      <td></td>
    </tr>
    <tr>
      <td>back slash</td>
      <td>220</td>
      <td>\</td>
      <td>Backslash</td>
      <td></td>
    </tr>
    <tr>
      <td>close bracket</td>
      <td>221</td>
      <td>]</td>
      <td>BracketRight</td>
      <td></td>
    </tr>
    <tr>
      <td>single quote</td>
      <td>222</td>
      <td>'</td>
      <td>Quote</td>
      <td></td>
    </tr>
  </tbody>
</table>
</div>