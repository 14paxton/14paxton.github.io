---
title:        Maui
permalink:    /DotNetNotes/Maui
category:     DotNetNotes
parent:       DotNetNotes
layout:       default
has_children: false
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

***                

<br/>

# Maui

> ```MAUI```, short for Multi platform
> Application User Interface, is the evolution and simplification of a multitude of solutions which were previously used to create cross-platform
> mobile and desktop applications with .NET
> ( few of those being the various targets of Xamarin like Xamarin.Forms, Xamarin.Android, Xamarin.iOS; Windows UWP, Windows Presentation Foundation,
> Tizen.NET, etc.)
> You’ll find all the details here —

[Learn Maui](https://learn.microsoft.com/en-us/dotnet/maui/what-is-maui)

> I don’t see a reason to explain everything in this post, but the gist being it’s a more modern and simplified experience
> but still familiar to the seasoned C#/Xamarin developers.


<div class="ch bg fw fx fy fz">
  <h1 id="3550" class="nb nc gr be nd ne nf ng nh ni nj nk nl nm nn no np nq nr ns nt nu nv nw nx ny bj" data-selectable-paragraph="">The Setup</h1>
  <p id="2883" class="pw-post-body-paragraph nz oa gr ob b oc od oe of og oh oi oj ok ol om on oo op oq or os ot ou ov ow gk bj" data-selectable-paragraph="">There are two clear paths that atleast I
    see, in terms of the setup and I have a clear preference.
    But I’ll talk about both of them.</p>
  <blockquote class="pc pd pe"><p id="2640" class="nz oa pf ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow gk bj" data-selectable-paragraph=""><em class="gr">Note: I have an
    Intel based Mac so things might be different compared to an M1 based machine.
    I’m still trying to upgrade, and when I do, I’ll write another article covering the differences.</em></p>
  </blockquote>
  <h1 id="27bb" class="nb nc gr be nd ne nf ng nh ni nj nk nl nm nn no np nq nr ns nt nu nv nw nx ny bj" data-selectable-paragraph="">The Visual Studio way</h1>
  <p id="9a35" class="pw-post-body-paragraph nz oa gr ob b oc od oe of og oh oi oj ok ol om on oo op oq or os ot ou ov ow gk bj" data-selectable-paragraph="">If you’re coming with a Xamarin/UWP/WPF
    background, most likely you’d want to use Visual Studio for Mac to get things going.
    The setup is quite straight forward, you just install VS for Mac and tick the check boxes saying you want
    .NET and .NET MAUI to be setup.</p>
  <p id="c705" class="pw-post-body-paragraph nz oa gr ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow gk bj" data-selectable-paragraph="">More details here — <a
          class="af na"
          href="https://learn.microsoft.com/en-us/dotnet/maui/get-started/installation?tabs=vsmac"
          rel="noopener ugc nofollow"
          target="_blank"
  >https://learn.microsoft.com/en-us/dotnet/maui/get-started/installation?tabs=vsmac</a></p>
  <h1 id="9ac9" class="nb nc gr be nd ne nf ng nh ni nj nk nl nm nn no np nq nr ns nt nu nv nw nx ny bj" data-selectable-paragraph="">The non — Visual Studio way</h1>
  <p id="0740" class="pw-post-body-paragraph nz oa gr ob b oc od oe of og oh oi oj ok ol om on oo op oq or os ot ou ov ow gk bj" data-selectable-paragraph="">If you’re starting out new or just
    prefer using Visual Studio Code for your general coding workflow, chances are you’d want to continue using that for developing those cross platform apps.
    And, yes, you can.
    I have done both; I
    enjoy Visual Studio, Visual Studio for Mac, but I also enjoy using Visual Studio Code for coding in JavaScript, TypeScript and any other coding related task, really.</p>
  <p id="71b8" class="pw-post-body-paragraph nz oa gr ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow gk bj" data-selectable-paragraph="">I honestly prefer it this way as I
    learnt a lot, just trying to set it up, but you may be looking for a straight forward setup, I understand.</p>
  <p id="d922" class="pw-post-body-paragraph nz oa gr ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow gk bj" data-selectable-paragraph="">Okay, let’s get to it.</p>
  <h1 id="618e" class="nb nc gr be nd ne nf ng nh ni nj nk nl nm nn no np nq nr ns nt nu nv nw nx ny bj" data-selectable-paragraph="">1. Install pre-requisites</h1>
  <p id="9339" class="pw-post-body-paragraph nz oa gr ob b oc od oe of og oh oi oj ok ol om on oo op oq or os ot ou ov ow gk bj" data-selectable-paragraph="">If you are someone who wants this level
    of control, I assume you use a software package manager to install things.
    I use brew for setting everything up.
    So install brew.
    Checkout <a
            class="af na"
            href="http://brew.sh"
            rel="noopener ugc nofollow"
            target="_blank"
    >brew.sh</a> for this.</p>
  <h1 id="f971" class="nb nc gr be nd ne nf ng nh ni nj nk nl nm nn no np nq nr ns nt nu nv nw nx ny bj" data-selectable-paragraph="">2. Install Visual Studio Code (Duh)</h1>
  <p id="36e0" class="pw-post-body-paragraph nz oa gr ob b oc od oe of og oh oi oj ok ol om on oo op oq or os ot ou ov ow gk bj" data-selectable-paragraph="">You might have it installed already, if
    not, this can be done with a cask as well.</p>
  <pre class="pg ph pi pj pk pl pm pn bo po ba bj"><span id="6443" class="pp nc gr pm b bf pq pr l ps pt" data-selectable-paragraph="">$ brew install <span class="hljs-comment">--cask visual-studio-code</span></span></pre>
  <h1 id="ea25" class="nb nc gr be nd ne nf ng nh ni nj nk nl nm nn no np nq nr ns nt nu nv nw nx ny bj" data-selectable-paragraph="">3. Install .NET SDK</h1>
  <p id="91a3" class="pw-post-body-paragraph nz oa gr ob b oc od oe of og oh oi oj ok ol om on oo op oq or os ot ou ov ow gk bj" data-selectable-paragraph="">Even though .NET 6 is in LTS right now,
    I suggest you install both .NET 7 and .NET 6. This will be helpful for something I’ll discuss later in this article.</p>
  <p id="9e14" class="pw-post-body-paragraph nz oa gr ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow gk bj" data-selectable-paragraph="">I use my <a
          class="af na"
          href="https://github.com/cli-config/cli-config"
          rel="noopener ugc nofollow"
          target="_blank"
  >https://github.com/cli-config/cli-config</a> project to set it up, but feel free to set it up however you wish. dotnet is available as a cask in homebrew but I’ve never set it up that way.</p>
  <h1 id="9a1f" class="nb nc gr be nd ne nf ng nh ni nj nk nl nm nn no np nq nr ns nt nu nv nw nx ny bj" data-selectable-paragraph="">4. Install the MAUI workload</h1>
  <p id="9bf6" class="pw-post-body-paragraph nz oa gr ob b oc od oe of og oh oi oj ok ol om on oo op oq or os ot ou ov ow gk bj" data-selectable-paragraph="">I learnt about .NET cli workloads from
    an article I found when I originally started setting up MAUI on my Mac.
    That article seems to have fallen off of the face of the Earth, can’t find it anymore (will link it if I find it
    again)</p>
  <pre class="pg ph pi pj pk pl pm pn bo po ba bj"><span id="b2f1" class="pp nc gr pm b bf pq pr l ps pt" data-selectable-paragraph=""><span class="hljs-variable">$ </span>dotnet workload install maui</span></pre>
  <p id="abcc" class="pw-post-body-paragraph nz oa gr ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow gk bj" data-selectable-paragraph="">You’ll also need the Project Templates
    for .NET MAUI, so you can do dotnet new maui.</p>
  <pre class="pg ph pi pj pk pl pm pn bo po ba bj"><span id="0e8b" class="pp nc gr pm b bf pq pr l ps pt" data-selectable-paragraph="">$ dotnet <span class="hljs-keyword">new</span> install Microsoft.Maui.<span
          class="hljs-title.class"
  >Templates</span>::<span class="hljs-number">6.0</span>.<span class="hljs-number">312</span></span></pre>
  <p id="e0e0" class="pw-post-body-paragraph nz oa gr ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow gk bj" data-selectable-paragraph="">At this point, you have most of the
    things to at least write a .NET MAUI app, albeit you won’t be able to run it.
    😂 Create a new .NET MAUI app with the following command -</p>
  <pre class="pg ph pi pj pk pl pm pn bo po ba bj"><span id="a2ab" class="pp nc gr pm b bf pq pr l ps pt" data-selectable-paragraph="">$ dotnet <span class="hljs-keyword">new</span> maui -n maui-hello-world</span></pre>
  <p id="5646" class="pw-post-body-paragraph nz oa gr ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow gk bj" data-selectable-paragraph="">Depending on what platform you want to
    run your app on, you’ll need parts of the following -</p>
  <h1 id="b123" class="nb nc gr be nd ne nf ng nh ni nj nk nl nm nn no np nq nr ns nt nu nv nw nx ny bj" data-selectable-paragraph="">5.1. Targeting iOS/mac?</h1>
  <p id="65c7" class="pw-post-body-paragraph nz oa gr ob b oc od oe of og oh oi oj ok ol om on oo op oq or os ot ou ov ow gk bj" data-selectable-paragraph="">You’ll need to install XCode.
    I already
    had XCode installed, but maybe mac should work without it.
    Go to the App Store and download the latest version of XCode.
    You <strong class="ob gs">DON’T</strong> need an Apple Developer
    Account.</p>
  <p id="ea12" class="pw-post-body-paragraph nz oa gr ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow gk bj" data-selectable-paragraph="">To run your app on mac, use the
    following command</p>
  <pre class="pg ph pi pj pk pl pm pn bo po ba bj"><span
          id="3893"
          class="pp nc gr pm b bf pq pr l ps pt"
          data-selectable-paragraph=""
  ><span class="hljs-variable">$ </span>dotnet build -<span class="hljs-symbol">t:</span>Run -f net7.<span class="hljs-number">0</span>-maccatalyst</span></pre>
  <figure class="pg ph pi pj pk mq mi mj paragraph-image">
    <div role="button" tabindex="0" class="mr ms fg mt bg mu">
      <div class="mi mj pu">
        <picture>
          <source
                  srcset="https://miro.medium.com/v2/resize:fit:640/format:webp/1*WysWj94iJpx0wU_2IUB8yQ.png 640w, https://miro.medium.com/v2/resize:fit:720/format:webp/1*WysWj94iJpx0wU_2IUB8yQ.png 720w, https://miro.medium.com/v2/resize:fit:750/format:webp/1*WysWj94iJpx0wU_2IUB8yQ.png 750w, https://miro.medium.com/v2/resize:fit:786/format:webp/1*WysWj94iJpx0wU_2IUB8yQ.png 786w, https://miro.medium.com/v2/resize:fit:828/format:webp/1*WysWj94iJpx0wU_2IUB8yQ.png 828w, https://miro.medium.com/v2/resize:fit:1100/format:webp/1*WysWj94iJpx0wU_2IUB8yQ.png 1100w, https://miro.medium.com/v2/resize:fit:1400/format:webp/1*WysWj94iJpx0wU_2IUB8yQ.png 1400w"
                  sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 700px"
                  type="image/webp"
          >
          <source
                  data-testid="og"
                  srcset="https://miro.medium.com/v2/resize:fit:640/1*WysWj94iJpx0wU_2IUB8yQ.png 640w, https://miro.medium.com/v2/resize:fit:720/1*WysWj94iJpx0wU_2IUB8yQ.png 720w, https://miro.medium.com/v2/resize:fit:750/1*WysWj94iJpx0wU_2IUB8yQ.png 750w, https://miro.medium.com/v2/resize:fit:786/1*WysWj94iJpx0wU_2IUB8yQ.png 786w, https://miro.medium.com/v2/resize:fit:828/1*WysWj94iJpx0wU_2IUB8yQ.png 828w, https://miro.medium.com/v2/resize:fit:1100/1*WysWj94iJpx0wU_2IUB8yQ.png 1100w, https://miro.medium.com/v2/resize:fit:1400/1*WysWj94iJpx0wU_2IUB8yQ.png 1400w"
                  sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 700px"
          >
          <img alt="" class="bg lp mv c" width="700" height="621" loading="lazy" role="presentation" src="https://miro.medium.com/v2/resize:fit:700/1*WysWj94iJpx0wU_2IUB8yQ.png"></picture>
      </div>
    </div>
    <figcaption class="mw fc mx mi mj my mz be b bf z dt" data-selectable-paragraph="">Running the .NET MAUI App on macOS</figcaption>
  </figure>
  <p id="5aee" class="pw-post-body-paragraph nz oa gr ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow gk bj" data-selectable-paragraph="">For iOS — iPhones and iPads, you can run
    the following command to start your app in the iOS simulator.</p>
  <pre class="pg ph pi pj pk pl pm pn bo po ba bj"><span id="b1e2" class="pp nc gr pm b bf pq pr l ps pt" data-selectable-paragraph="">$ dotnet build -t:Run -f net7.0-ios</span></pre>
  <p id="46db" class="pw-post-body-paragraph nz oa gr ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow gk bj" data-selectable-paragraph="">To choose which simulator to use, run
    the following command first, to get a list of all emulators.
    (I got to know this from this <a
            class="af na"
            href="https://github.com/dotnet/xamarin/issues/26#issuecomment-757981580"
            rel="noopener ugc nofollow"
            target="_blank"
    >Github comment</a>)</p>
  <pre class="pg ph pi pj pk pl pm pn bo po ba bj"><span id="dfce" class="pp nc gr pm b bf pq pr l ps pt" data-selectable-paragraph="">$ /Applications/Xcode.app/Contents/Developer/usr/bin/simctl list <br><br>...<br>== Devices ==<br>-- iOS 16.4 --<br>    iPhone SE (3rd generation) (44D1D920-D740-456A-B3EC-E1AA49ED726A) (Shutdown)<br>    iPhone 14 (03C3959D-1674-4EB3-B28E-1CD5448CC818) (Shutdown)<br>...</span></pre>
  <p id="632b" class="pw-post-body-paragraph nz oa gr ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow gk bj" data-selectable-paragraph="">Once you have the Guid, use it to launch
    the app in the right simulator.</p>
  <pre class="pg ph pi pj pk pl pm pn bo po ba bj"><span id="4cf4" class="pp nc gr pm b bf pq pr l ps pt" data-selectable-paragraph="">$ dotnet build -t:Run -f net7.0-ios -p:_DeviceName=:v2:udid=03C3959D-1674-4EB3-B28E-1CD5448CC818</span></pre>
  <figure class="pg ph pi pj pk mq mi mj paragraph-image">
    <div role="button" tabindex="0" class="mr ms fg mt bg mu">
      <div class="mi mj pv">
        <picture>
          <source
                  srcset="https://miro.medium.com/v2/resize:fit:640/format:webp/1*MXp-N-6bAPa0mPmMe1UXmA.png 640w, https://miro.medium.com/v2/resize:fit:720/format:webp/1*MXp-N-6bAPa0mPmMe1UXmA.png 720w, https://miro.medium.com/v2/resize:fit:750/format:webp/1*MXp-N-6bAPa0mPmMe1UXmA.png 750w, https://miro.medium.com/v2/resize:fit:786/format:webp/1*MXp-N-6bAPa0mPmMe1UXmA.png 786w, https://miro.medium.com/v2/resize:fit:828/format:webp/1*MXp-N-6bAPa0mPmMe1UXmA.png 828w, https://miro.medium.com/v2/resize:fit:1100/format:webp/1*MXp-N-6bAPa0mPmMe1UXmA.png 1100w, https://miro.medium.com/v2/resize:fit:1400/format:webp/1*MXp-N-6bAPa0mPmMe1UXmA.png 1400w"
                  sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 700px"
                  type="image/webp"
          >
          <source
                  data-testid="og"
                  srcset="https://miro.medium.com/v2/resize:fit:640/1*MXp-N-6bAPa0mPmMe1UXmA.png 640w, https://miro.medium.com/v2/resize:fit:720/1*MXp-N-6bAPa0mPmMe1UXmA.png 720w, https://miro.medium.com/v2/resize:fit:750/1*MXp-N-6bAPa0mPmMe1UXmA.png 750w, https://miro.medium.com/v2/resize:fit:786/1*MXp-N-6bAPa0mPmMe1UXmA.png 786w, https://miro.medium.com/v2/resize:fit:828/1*MXp-N-6bAPa0mPmMe1UXmA.png 828w, https://miro.medium.com/v2/resize:fit:1100/1*MXp-N-6bAPa0mPmMe1UXmA.png 1100w, https://miro.medium.com/v2/resize:fit:1400/1*MXp-N-6bAPa0mPmMe1UXmA.png 1400w"
                  sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 700px"
          >
          <img alt="" class="bg lp mv c" width="700" height="1319" loading="lazy" role="presentation" src="https://miro.medium.com/v2/resize:fit:700/1*MXp-N-6bAPa0mPmMe1UXmA.png"></picture>
      </div>
    </div>
    <figcaption class="mw fc mx mi mj my mz be b bf z dt" data-selectable-paragraph="">Running the .NET MAUI App on the iOS Simulator</figcaption>
  </figure>
  <h1 id="2c3d" class="nb nc gr be nd ne nf ng nh ni nj nk nl nm nn no np nq nr ns nt nu nv nw nx ny bj" data-selectable-paragraph="">5.2. Targeting Windows?</h1>
  <p id="e4cb" class="pw-post-body-paragraph nz oa gr ob b oc od oe of og oh oi oj ok ol om on oo op oq or os ot ou ov ow gk bj" data-selectable-paragraph="">Well… You’ll need to run your app on a
    Windows Machine, for now.</p>
  <h1 id="95e1" class="nb nc gr be nd ne nf ng nh ni nj nk nl nm nn no np nq nr ns nt nu nv nw nx ny bj" data-selectable-paragraph="">5.3. Targeting Android?</h1>
  <p id="d94e" class="pw-post-body-paragraph nz oa gr ob b oc od oe of og oh oi oj ok ol om on oo op oq or os ot ou ov ow gk bj" data-selectable-paragraph="">You’ll need Android tooling.
    I’m being
    precise here, you don’t need to install Android Studio.
    That might be a faster setup, and I encourage you to try it out, but I want to install only the things I need, so here goes.</p>
  <p id="2bf1" class="pw-post-body-paragraph nz oa gr ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow gk bj" data-selectable-paragraph="">The following steps took me hours to
    figure out 😿 🙆🏻‍♂️, so hope it saves you some time.</p>
  <ul class="">
    <li id="ac1a" class="nz oa gr ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow pw px py bj" data-selectable-paragraph="">First, I’ll install android-sdk</li>
  </ul>
  <pre class="pg ph pi pj pk pl pm pn bo po ba bj"><span
          id="95d9"
          class="pp nc gr pm b bf pq pr l ps pt"
          data-selectable-paragraph=""
  >$ brew install <span class="hljs-comment">--cask android-sdk</span></span></pre>
  <ul class="">
    <li id="18ad" class="nz oa gr ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow pw px py bj" data-selectable-paragraph="">Install the SDK tools for the right the android
      version.
      For example, in the project I created with dotnet new maui, I see <code class="cw pz qa qb pm b">&lt;SupportedOSPlatformVersion
        Condition="$([MSBuild]::GetTargetPlatformIdentifier('$(TargetFramework)')) == 'android'"&gt;31.0.2&lt;/SupportedOSPlatformVersion&gt;</code> in the <code class="cw pz qa qb pm b">.csproj</code>
      file. So i’m installing <code class="cw pz qa qb pm b">android-31</code></li>
  </ul>
  <pre class="pg ph pi pj pk pl pm pn bo po ba bj"><span id="6d43" class="pp nc gr pm b bf pq pr l ps pt" data-selectable-paragraph="">$ sdkmanager <span class="hljs-string">"system-images;android-31;google_apis;x86_64"</span><br><br><span
          class="hljs-comment"
  ># Make sure you are using the right sdkmanager</span><br><br>$ <span class="hljs-built_in">ls</span> -l `<span class="hljs-built_in">which</span> sdkmanager`<br>lrwxr-xr-x@ 1 mrsauravsahu  mrsauravsahu  60 Jun  1 17:14 /usr/local/bin/sdkmanager -&gt; /usr/local/Caskroom/android-sdk/4333796/tools/bin/sdkmanager</span></pre>
  <ul class="">
    <li id="a3aa" class="nz oa gr ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow pw px py bj" data-selectable-paragraph="">Create an emulator with this Android version</li>
  </ul>
  <pre class="pg ph pi pj pk pl pm pn bo po ba bj"><span id="0651" class="pp nc gr pm b bf pq pr l ps pt" data-selectable-paragraph="">$ avdmanager <span class="hljs-built_in">create</span> avd -n my_android_31 -k <span
          class="hljs-string"
  >"system-images;android-31;google_apis;x86_64"</span></span></pre>
  <ul class="">
    <li id="1b01" class="nz oa gr ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow pw px py bj" data-selectable-paragraph="">Launch the emulator, this has its own quirks.</li>
  </ul>
  <p id="6a37" class="pw-post-body-paragraph nz oa gr ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow gk bj" data-selectable-paragraph="">You need to pass the full path to the
    emulator binary.</p>
  <pre class="pg ph pi pj pk pl pm pn bo po ba bj"><span id="dec8" class="pp nc gr pm b bf pq pr l ps pt" data-selectable-paragraph="">$ /usr/local/share/android-sdk/emulator/emulator -avd my_android_31 -skin 540x1200<br><span
          class="hljs-comment"
  ># the -skin parameter can be used to change screen resolution</span></span></pre>
  <blockquote class="pc pd pe"><p id="a779" class="nz oa pf ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow gk bj" data-selectable-paragraph=""><em class="gr">Note: Don’t kill
    this command, it’ll kill the emulator.</em></p></blockquote>
  <figure class="pg ph pi pj pk mq mi mj paragraph-image">
    <div role="button" tabindex="0" class="mr ms fg mt bg mu">
      <div class="mi mj qc">
        <picture>
          <source
                  srcset="https://miro.medium.com/v2/resize:fit:640/format:webp/1*gd8T9xQ608FghGZR4IzpPg.png 640w, https://miro.medium.com/v2/resize:fit:720/format:webp/1*gd8T9xQ608FghGZR4IzpPg.png 720w, https://miro.medium.com/v2/resize:fit:750/format:webp/1*gd8T9xQ608FghGZR4IzpPg.png 750w, https://miro.medium.com/v2/resize:fit:786/format:webp/1*gd8T9xQ608FghGZR4IzpPg.png 786w, https://miro.medium.com/v2/resize:fit:828/format:webp/1*gd8T9xQ608FghGZR4IzpPg.png 828w, https://miro.medium.com/v2/resize:fit:1100/format:webp/1*gd8T9xQ608FghGZR4IzpPg.png 1100w, https://miro.medium.com/v2/resize:fit:1400/format:webp/1*gd8T9xQ608FghGZR4IzpPg.png 1400w"
                  sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 700px"
                  type="image/webp"
          >
          <source
                  data-testid="og"
                  srcset="https://miro.medium.com/v2/resize:fit:640/1*gd8T9xQ608FghGZR4IzpPg.png 640w, https://miro.medium.com/v2/resize:fit:720/1*gd8T9xQ608FghGZR4IzpPg.png 720w, https://miro.medium.com/v2/resize:fit:750/1*gd8T9xQ608FghGZR4IzpPg.png 750w, https://miro.medium.com/v2/resize:fit:786/1*gd8T9xQ608FghGZR4IzpPg.png 786w, https://miro.medium.com/v2/resize:fit:828/1*gd8T9xQ608FghGZR4IzpPg.png 828w, https://miro.medium.com/v2/resize:fit:1100/1*gd8T9xQ608FghGZR4IzpPg.png 1100w, https://miro.medium.com/v2/resize:fit:1400/1*gd8T9xQ608FghGZR4IzpPg.png 1400w"
                  sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 700px"
          >
          <img alt="" class="bg lp mv c" width="700" height="1386" loading="lazy" role="presentation" src="https://miro.medium.com/v2/resize:fit:700/1*gd8T9xQ608FghGZR4IzpPg.png"></picture>
      </div>
    </div>
    <figcaption class="mw fc mx mi mj my mz be b bf z dt" data-selectable-paragraph="">Running the Android Emulator with emulator command</figcaption>
  </figure>
  <p id="ce78" class="pw-post-body-paragraph nz oa gr ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow gk bj" data-selectable-paragraph="">Finally!</p>
  <p id="db73" class="pw-post-body-paragraph nz oa gr ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow gk bj" data-selectable-paragraph="">Time to run the Android app on this
    Emulator.</p>
  <pre class="pg ph pi pj pk pl pm pn bo po ba bj"><span id="eba4" class="pp nc gr pm b bf pq pr l ps pt" data-selectable-paragraph="">$ dotnet build -t:Run -f net7.0-android<br>MSBuild version 17.6.1+8ffc3fe3d <span
          class="hljs-keyword"
  >for</span> .NET<br>  Determining projects to restore...<br>  All projects are up-to-date <span class="hljs-keyword">for</span> restore.<br>/Users/mrsauravsahu/.cli-config/current/dotnet/packs/Microsoft.Android.Sdk.Darwin/33.0.46/tools/Xamarin.Android.Tooling.targets(70,5): error XA5300: The Android SDK directory could not be found. Check that the Android SDK Manager <span
          class="hljs-keyword"
  >in</span> Visual Studio shows a valid installation. To use a custom SDK path <span class="hljs-keyword">for</span> a <span class="hljs-built_in">command</span> line build, <span class="hljs-built_in">set</span> the <span
          class="hljs-string"
  >'AndroidSdkDirectory'</span> MSBuild property to the custom path. [/Users/mrsauravsahu/Downloads/mrsauravsahu/code/maui-hello-world/maui-hello-world.csproj::TargetFramework=net7.0-android]<br><br>Build FAILED.<br>...</span></pre>
  <p id="bb9b" class="pw-post-body-paragraph nz oa gr ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow gk bj" data-selectable-paragraph="">And that failed.
    So, MSBuild needs to
    know where the android-sdk is, so we can pass that parameter.</p>
  <pre class="pg ph pi pj pk pl pm pn bo po ba bj"><span id="5f2a" class="pp nc gr pm b bf pq pr l ps pt" data-selectable-paragraph="">$ dotnet build -t:Run -f net7.0-android -p:AndroidSdkDirectory=/usr/local/share/android-sdk<br><br>MSBuild version 17.6.1+8ffc3fe3d <span
          class="hljs-keyword"
  >for</span> .NET<br>  Determining projects to restore...<br>  All projects are up-to-date <span class="hljs-keyword">for</span> restore.<br>/Users/mrsauravsahu/.cli-config/current/dotnet/packs/Microsoft.Android.Sdk.Darwin/33.0.46/targets/Microsoft.Android.Sdk.Tooling.targets(20,5): error XA0031: Java SDK 11.0 or above is required when using .NET 6 or higher. Download the latest JDK at: &lt;https://aka.ms/msopenjdk&gt; [/Users/mrsauravsahu/Downloads/mrsauravsahu/code/maui-hello-world/maui-hello-world.csproj::TargetFramework=net7.0-android]<br>Build FAILED.<br>...<br>Time Elapsed 00:00:01.55</span></pre>
  <p id="70a8" class="pw-post-body-paragraph nz oa gr ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow gk bj" data-selectable-paragraph="">And we need the Java JDK installed as
    well — Java 11</p>
  <pre class="pg ph pi pj pk pl pm pn bo po ba bj"><span id="7233" class="pp nc gr pm b bf pq pr l ps pt" data-selectable-paragraph=""><span class="hljs-variable">$ </span>brew install java11</span></pre>
  <p id="d4bf" class="pw-post-body-paragraph nz oa gr ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow gk bj" data-selectable-paragraph="">We also need to resolve to this newer
    version of java if we have any other version installed.
    I had java 8 installed.
    We can do that like this.</p>
  <pre class="pg ph pi pj pk pl pm pn bo po ba bj"><span
          id="da40"
          class="pp nc gr pm b bf pq pr l ps pt"
          data-selectable-paragraph=""
  ><span class="hljs-meta.prompt">$ </span><span class="hljs-undefined"><span class="hljs-built_in">export</span> PATH=<span class="hljs-string">"/usr/local/opt/openjdk@11/bin:<span class="hljs-variable">$PATH</span>"</span></span></span></pre>
  <p id="8e01" class="pw-post-body-paragraph nz oa gr ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow gk bj" data-selectable-paragraph="">Rerun the build command and your app
    should now run on the Android Emulator</p>
  <pre class="pg ph pi pj pk pl pm pn bo po ba bj"><span
          id="9be4"
          class="pp nc gr pm b bf pq pr l ps pt"
          data-selectable-paragraph=""
  ><span class="hljs-variable">$ </span>dotnet build -<span class="hljs-symbol">t:</span>Run -f net7.<span class="hljs-number">0</span>-android -<span class="hljs-symbol">p:</span>AndroidSdkDirectory=<span
          class="hljs-regexp"
  >/usr/local</span><span class="hljs-regexp">/share/android</span>-sd</span></pre>
  <figure class="pg ph pi pj pk mq mi mj paragraph-image">
    <div role="button" tabindex="0" class="mr ms fg mt bg mu">
      <div class="mi mj qc">
        <picture>
          <source
                  srcset="https://miro.medium.com/v2/resize:fit:640/format:webp/1*RuMHRgd3wrv2xWIs0vlSsw.png 640w, https://miro.medium.com/v2/resize:fit:720/format:webp/1*RuMHRgd3wrv2xWIs0vlSsw.png 720w, https://miro.medium.com/v2/resize:fit:750/format:webp/1*RuMHRgd3wrv2xWIs0vlSsw.png 750w, https://miro.medium.com/v2/resize:fit:786/format:webp/1*RuMHRgd3wrv2xWIs0vlSsw.png 786w, https://miro.medium.com/v2/resize:fit:828/format:webp/1*RuMHRgd3wrv2xWIs0vlSsw.png 828w, https://miro.medium.com/v2/resize:fit:1100/format:webp/1*RuMHRgd3wrv2xWIs0vlSsw.png 1100w, https://miro.medium.com/v2/resize:fit:1400/format:webp/1*RuMHRgd3wrv2xWIs0vlSsw.png 1400w"
                  sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 700px"
                  type="image/webp"
          >
          <source
                  data-testid="og"
                  srcset="https://miro.medium.com/v2/resize:fit:640/1*RuMHRgd3wrv2xWIs0vlSsw.png 640w, https://miro.medium.com/v2/resize:fit:720/1*RuMHRgd3wrv2xWIs0vlSsw.png 720w, https://miro.medium.com/v2/resize:fit:750/1*RuMHRgd3wrv2xWIs0vlSsw.png 750w, https://miro.medium.com/v2/resize:fit:786/1*RuMHRgd3wrv2xWIs0vlSsw.png 786w, https://miro.medium.com/v2/resize:fit:828/1*RuMHRgd3wrv2xWIs0vlSsw.png 828w, https://miro.medium.com/v2/resize:fit:1100/1*RuMHRgd3wrv2xWIs0vlSsw.png 1100w, https://miro.medium.com/v2/resize:fit:1400/1*RuMHRgd3wrv2xWIs0vlSsw.png 1400w"
                  sizes="(min-resolution: 4dppx) and (max-width: 700px) 50vw, (-webkit-min-device-pixel-ratio: 4) and (max-width: 700px) 50vw, (min-resolution: 3dppx) and (max-width: 700px) 67vw, (-webkit-min-device-pixel-ratio: 3) and (max-width: 700px) 65vw, (min-resolution: 2.5dppx) and (max-width: 700px) 80vw, (-webkit-min-device-pixel-ratio: 2.5) and (max-width: 700px) 80vw, (min-resolution: 2dppx) and (max-width: 700px) 100vw, (-webkit-min-device-pixel-ratio: 2) and (max-width: 700px) 100vw, 700px"
          >
          <img alt="" class="bg lp mv c" width="700" height="1386" loading="lazy" role="presentation" src="https://miro.medium.com/v2/resize:fit:700/1*RuMHRgd3wrv2xWIs0vlSsw.png"></picture>
      </div>
    </div>
    <figcaption class="mw fc mx mi mj my mz be b bf z dt" data-selectable-paragraph="">Running the .NET MAUI App on the Android Emulator</figcaption>
  </figure>
  <h1 id="46e9" class="nb nc gr be nd ne nf ng nh ni nj nk nl nm nn no np nq nr ns nt nu nv nw nx ny bj" data-selectable-paragraph="">Enhancing the Dev Workflow</h1>
  <p id="97f4" class="pw-post-body-paragraph nz oa gr ob b oc od oe of og oh oi oj ok ol om on oo op oq or os ot ou ov ow gk bj" data-selectable-paragraph="">And that’s the setup if you want to do
    things manually.
    At this moment, you’ll be wondering, running the app is fine, but in my dev workflow, I can’t be wasting time rebuilding the app every time I change something.</p>
  <p id="5b99" class="pw-post-body-paragraph nz oa gr ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow gk bj" data-selectable-paragraph="">Now the reason I suggested installing
    .NET 7 is because of the coolest MAUI extension I found — <a
            class="af na"
            href="https://marketplace.visualstudio.com/items?itemName=nromanov.dotnet-meteor"
            rel="noopener ugc nofollow"
            target="_blank"
    >https://marketplace.visualstudio.com/items?itemName=nromanov.dotnet-meteor</a> — install this, follow the instructions and you’ll be able to use XAML Hot Reload — so no need to rebuild your
    app, you’ll be able to see live updates in the emulator.</p>
  <h1 id="6a1f" class="nb nc gr be nd ne nf ng nh ni nj nk nl nm nn no np nq nr ns nt nu nv nw nx ny bj" data-selectable-paragraph="">Conclusion</h1>
  <p id="b403" class="pw-post-body-paragraph nz oa gr ob b oc od oe of og oh oi oj ok ol om on oo op oq or os ot ou ov ow gk bj" data-selectable-paragraph="">This was the first blog on .NET MAUI.
    I’m exploring cross platform app development so I’ll writing more soon.
    Comment your suggestions and let me know if anything didn’t work and how you fixed it!</p>
  <p id="9326" class="pw-post-body-paragraph nz oa gr ob b oc ox oe of og oy oi oj ok oz om on oo pa oq or os pb ou ov ow gk bj" data-selectable-paragraph="">— S</p></div>