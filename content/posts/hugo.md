---
title: Hello CD
date: 2021-03-05
categories: [ technology ]
description: Simplifying my blogging work flow with Hugo, Sinatra, and Webhooks.
---

*Author's note on 2022-10-04: this post is kinda dumb, see [this post](../hugo-2).*

# Prelude: Hakyll

This website has (as far as I can remember) always been statically generated.
I've tried various static site generators -- mainly Jekyll, and its cousin
Hakyll, which I liked for the terrible reason that it's written in Haskell and
functional programming is of course cool.

Well, I got it into my head that I wanted to write more blog posts (like this
one).  The problem is that I get this into my head every now and then, but
usually the moments are so far in-between that in the meantime my development
environment has been wiped several times, or I'm using a different computer, or
whatever.  And setting up Hakyll every time is... well, not exactly pleasant.
Haskell's `stack` may be an excellent tool, but it does leave some things to be
desired. More on that in a moment.

So the solution would be to introduce some kind of continuous deployment -- as
soon as I write a new blog post in markdown and push it to Github, it should be
built somewhere and pushed to my web server. Simple enough -- or so I thought.

The first thing I tried was to set up an environment where the Github
repository could be cloned, and Hakyll could then generate the static files. I
had two alternatives here: either do it on the web server itself, or do it on
my general-purpose home-server Raspberry Pi (gen 4). I suspected I might have
to go for the latter, even though it would introduce another link in the chain
(and thus potential headaches whenever it goes down or I move or whatever). But
running Hakyll on my web server was actually not entirely implausible -- it
turns out that my host, NearlyFreeSpeech, actually does have a `ghc` binary and
even `cabal-install`. But actually building Hakyll with `cabal install hakyll`
didn't work out -- it seems that the build of one of the dependencies required
too much memory or something (I didn't bother spending too much time on
figuring out if there was a way around this). And `stack` does not work on
FreeBSD (which is what my web server uses), so that was also out of the
question.

So I ended up giving up on running Hakyll on my web server. The next thing I
tried was to install Hakyll on my Raspberry Pi. This might very well have
worked, but I `ctrl-c`'d the stack build in frustration after a couple of hours
of building dependencies. I didn't want my pi to be an additional part of the
deploy chain anyway.

# Hugo

So I decided to switch from Hakyll to Hugo after seeing the [very nice
theme](https://themes.gohugo.io/anatole/) that I am currently using. It did
need some minor modifications in order to please my aesthetic sensibilities, so
I created a new Github repository for my Hugo site, forked the theme, and added
it as a submodule. I then brought over most of my old markdown posts which only
needed slight modifications in order to work with the new system. 

So far, so good! It looked like Hugo could replace Hakyll. Now  I just needed
to set up the deployment which was so cumbersome with Hakyll.

It turns out that NearlyFreeSpeech already provide a `hugo` binary, so the
first step was easier than pie. Just clone my repository and its submodule, and
run

```bash
hugo --minify -d /home/public/
```

and voilà, we have a website!

# Deployment

At this stage, I would would have to `ssh` into my web server every time I make
an update, and pull in the changes before executing the above command.  Better
than what I did before (which involved `scp`  :cold_sweat:), but not exactly
ezpz.

So the next step is to automate that process. It turns out that Github has a
nifty webhooks feature that can send HTTP requests whenever something happens
in a repository. In this case we're only interested in the default case, which
is a `push` to the repository. So when that happens, you can configure Github
to fire off a `POST` at an arbitrary URL.

So the deploy chain would look something like this:

1. I make changes to my website (e.g. write a new post like this one).
2. I push the changes to Github.
3. Github sends a `POST` request to my web server.
4. My web server receives the request and fires off a deployment script that
   pulls in the changes and then executes `hugo` to generate the static site
   and populate my website.

There are a few questions that need to be resolved here. Who was web server,
and when where he when Github was `POST`s? (If you're too old to parse that,
it's a variant of a [meme](https://knowyourmeme.com/memes/john-is-kill)). How
do we make sure my server doesn't get DDOS:ed if someone sends a bunch of
`POST`s to the correct URL on my web server? How do we actually fire off the
deployment script?

So my initial random internet searches turned up a few snippets that seemed
related to what I wanted to do. The payload that Github posts to your server
can be configured to be encrypted with a secret, that you then decrypt it with
in order to verify that it is indeed Github that is phone. I found a PHP
snippet which seemed to do exactly this. After verifying that the request does
indeed look good, it would then fire off the deploy script with

```php
exec('/path/to/my/deploy_script.sh');
```

So just put the modified
[snippet](https://gist.github.com/cferdinandi/e6e4e05c4b25e322db4eb1f1998523ac)
in a file called `deploy.php` in my `public` folder, and everything should just
work, right? Wrong.

The script certainly seemed to do something. It would log its actions to a
file, so it was certainly running. It needed some cajoling to even get to the
right `if` branch at first, though.  I had to get the secret Github token into
the environment somehow (I couldn't put it in `deploy.php`, of course, as
that's readable by anyone) -- `SetEnv SECRET_TOKEN "random_secret_string_here"`
in `.htaccess` seemed to be the best bet. Then, for some reason
`getenv('SECRET_TOKEN')` only turned up an empty string, but
`$_ENV['SECRET_TOKEN']` worked as expected.  After getting `deploy.php` to
receive the `POST` requests and decrypt them as expected, the only thing left
to figure out was why *NOTHING WAS HAPPENNING*.

For some mysterious reason, everything except executing things seemed to work.
This seemed to be related to Apache running the PHP script as the user `web`,
which lacks a lot of privileges.  I tried a lot of things -- I set the
permissions everywhere in different combinations and with different owners and
sticky bits for various folders, files, and scripts. I tried invoking the shell
script via a CGI script. I tried typing my commands in a more aggressive manner
in order to convince my web server that this indeed was serious business. I
eventually gave up and decided to try a different approach.

# Sinatra

Github's [webhooks
documentation](https://docs.github.com/en/developers/webhooks-and-events/webhooks)
contained some Ruby snippets, and references to something called
[Sinatra](http://sinatrarb.com/) -- which is "a DSL for quickly creating web
applications in Ruby with minimal effort". What's not to like?  But how in the
world would this work together with Apache?

Luckily, I was able to find a [Github
repository](https://github.com/clpo13/SinatraNFSN) with the code and
instructions needed to do almost exactly what I wanted -- set up a Sinatra app
to run on a lightweight webserver (called Thin), and *on my particular web
host, NearlyFreeSpeech*.  Bingo! All I needed to do was change my server realm
to one that supported daemons, then run my Sinatra app as a daemon on its own
port and set up a proxy so that my deploy URL would point at that port. Bingo!

And that was it. Invoking my deploy script in Ruby worked exactly as expected,
and decrypting the payload was a piece of cake.

Fin.
