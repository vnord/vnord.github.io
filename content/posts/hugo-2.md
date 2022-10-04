---
title: I was kinda dumb
date: 2022-10-04
categories: [ technology ]
description: How I learned to stop worrying and love Github actions
---

So, last year, I wrote a [convoluted post](../hugo) about how I went about deploying these kinds
of posts. 

With hindsight, I don't really know why I didn't go for the extremely obvious approach of
deploying with Github actions. I guess it may have been that I had never used them before,
or mistakenly assumed I had to pay something for runners.

But now I know better. Instead of the convoluted mess which I used before (which, to add insult to
idiocy, also seems to have stopped work for some reason or other -- I haven't bothered figuring out
what it is), I just have [a very simple Github
workflow](https://github.com/vnord/vnordnet/blob/master/.github/workflows/publish.yml). It took me 
about 20 minutes to cobble it together, and my confidence that this will continue running for quite
a long time without any manual intervention whatsoever is now pretty high.

