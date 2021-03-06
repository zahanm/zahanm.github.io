# [&larr;](/)

## Web / Mobile Release Tools
![facebook](/images/f.png) ![mobile](/images/phone.png)

I'm helping think through how we build and release software. Supporting the needs of O(thousands) of developers comes with it's challenges which are fun to tackle.

## React Native
![mobile](/images/phone.png)

Facebook has open sourced the cross-platform framework, [React Native](https://facebook.github.io/react-native/), and I'm thinking through the process of shipping apps built with it.

Having a say in the entire stack that renders an app unlocks some interesting technological solutions to the way we ship mobile apps. Hopefully we'll soon be able to share our experiences with them.

## SMS Auto-Routing
![mobile](/images/phone.png)

As is repeated all too often in The Valley, scaling is a hard problem. Facebook sends a mind-numbing number of SMS messages to people every day around the world. I led the effort to re-build the system that chooses a route such that it improves delivery rates and provides transparency into how it operates.

It is much easier to build a complicated, opaque system than a simple, understandable one. I've learned time and again that the latter is a better option: you can iterate on something you understand, and a simple stack is by definition easier to maintain.

## Registration Flow across Interfaces
![facebook](/images/f.png) ![mobile](/images/phone.png) ![data analysis](/images/data.png)

I used to tech lead Facebook's team responsible for the influx of new users. We monitor [Growth](http://www.thestreet.com/story/12051899/1/a-sneak-peak-at-whats-really-behind-facebooks-growth.html), and pay special interest to emerging markets where people are grappling with concepts about online living that we take for granted.

I spent two and a half years on this team, and in that time we've shifted our focus to people with limited access to the internet through their [Android](https://code.facebook.com/posts/android/) phones. A major contribution of mine was a logging funnel; which doesn't sound too sexy until you realize how key it is to understanding intent and retention. For technical reasons, Facebook's established [A/B testing framework](https://code.facebook.com/posts/520580318041111/airlock-facebook-s-mobile-a-b-testing-framework/) didn't work for us out of the box, so we leveraged my work here to efficiently experiment in native apps.

Ping me for chai / coffee if you want to hear about some of the challenges we've tackled.

## Dog Programming Language
![human](/images/person.png) ![research](/images/lab.png)

This was a project with Sep Kamvar and his students to make [a programming language](http://www.technologyreview.com/news/429544/new-programming-language-makes-coding-social-apps-easier/) that captures the richness of human social interactions. This built on earlier work to create a ["social computing stack"](http://zahanm.s3-website-us-east-1.amazonaws.com/Jabberwocky-UIST2011.pdf) that allows one to author a program that weaves together regular computational work with tasks that a person can execute.

Later, I spent a summer at the [Media Lab](https://www.media.mit.edu/research/groups/social-computing) working on applications of this language: like people coming together to create a piece of artwork, or help each other learn a new skill. Sep even exhibited some of this work at a [museum](http://www.adk.lu.se/en/index.php?id=247) in Sweden, which was of course fun to tag along for.

## Teaching Programming
![open source](/images/code.png) ![research](/images/lab.png) ![data analysis](/images/data.png)

Alex Ji and I started [a class](https://physics91si.stanford.edu) based on the [software carpentry](https://software-carpentry.org/) principle. The idea is that programming is a tool that people across disciplines need to master. We taught physicists, biologists, etc. the basics of programming in Python, writing code in a sustainable manner and analyzing data with numpy and matplotlib. Anyone who has worked in a scientific lab will attest to how messy the software development techniques can be; I'm told we made a dent in that problem at Stanford Physics at least.

I went back to the class as a guest lecturer a few years later to talk about data analysis at Facebook. To assist, I made this toy framework [abtest-learn](https://github.com/zahanm/abtest-learn) that simulates running experiments for us to analyze.

## Power Editor
![facebook](/images/f.png) ![open source](/images/code.png)

At Facebook, I worked on a client-driven Javascript web app, before it was cool to do so. The creator of [ukijs](http://blog.ukijs.org/) was my intern mentor, and the [Power Editor](http://www.facebook.com/ads/manage/powereditor) was our test bed. We dealt with the scaling problems that modern Javascript tries to address, and I collaborated with great engineers who went on to make frameworks you may be familiar with like [Bolt](http://shaneosullivan.github.io/boltjs/gettingstarted.html) and [React](https://facebook.github.io/react/index.html).

We also got a bit of [press](http://techcrunch.com/2011/07/01/facebook-circles/) for a fun hack we did.

## Still Reading?

See my [Github profile](https://github.com/zahanm), or cross-reference this with my [resumé](/resume.html) listing the organizations where I have worked.
