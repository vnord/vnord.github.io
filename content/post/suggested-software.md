---
title: Suggested Software
date: 2021-03-08
categories: [ technology ]
description: "A list of good privacy-preserving alternatives for commonly used software"
---

*NB: this list was written a while ago in collaboration with a friend and in a
rather special context.  This version is slightly modified, but still contains
some stylistic language and grammar. I don't actually follow all of the advice
personally, but I aspire to.*

# Operating systems

I think it is bad practice to not use a **Linux distribution**. I understand it
can be daunting to get started, but there are many easy distributions for
beginners: first choice is [Ubuntu](https://ubuntu.com/download/desktop), but
if you want something more similar to Windows, try
[Kubuntu](https://kubuntu.org/), or [ElementaryOS](https://elementary.io/)
which is more similar to MacOS. Once you get used to that, you can try
something like [Arch Linux](https://www.archlinux.org/download/) which gives
you more (and very easy) control over your computer. Maybe not best
security-wise, though, so be careful - maybe use
[Debian](https://www.debian.org/) (or Gentoo if sperg) for best security.

You must use a phone that is not tied to Google or Apple! Android is ok, but
you *must* use de-googled version like [LineageOS](https://www.lineageos.org/)
or [/e/OS](https://e.foundation/) (if you are a noob and think installing
alternative android version is too hard, I recommend buying refurbished phone
from /e/). If you are not a modern degenerate and have no need of spending 8+
hours per day poking at a smartphone, consider getting the upcoming
[PinePhone](https://www.pine64.org/pinephone/), which will be best possible
phone from the perspective of security/privacy/freedom.

# Watching youtube

On desktop, you must use [Freetube](https://freetubeapp.io/), or at least
[invidio.us](https://invidio.us/) in the browser. This stops Google from
profiling you, and also gives better experience with no ads etc. You should use
the [Invidition](https://addons.mozilla.org/en-US/firefox/addon/invidition/)
browser plugin in order to force Youtube videos to go through an instance of
invidious.

On android, you must use [NewPipe](https://newpipe.schabi.org/), which is
similar to Freetube and much much much better than the shitty bloatware
tracking app that google provide.

# Browser

I actually recommend Firefox, despite some problems with Mozilla being a bit
evil. They are much less evil than Google, though, who in practice control the
future of Chrome-derivatives like Brave. **DO NOT USE CHROME.** The reason I
recommend Firefox is that the addons are generally better. In order to make it
easier to install addons which Mozilla do not like, you can use the
[developer](https://www.mozilla.org/en-US/firefox/developer/) version of
firefox. I strongly recommend the following addons:

* [Decentraleyes](https://addons.mozilla.org/en-US/firefox/addon/decentraleyes/),
  partly stops you from getting pozzed by google, amazon, etc
* [Invidition](https://addons.mozilla.org/en-US/firefox/addon/invidition/) as
  mentioned earlier redirects youtube requests to invidio.us, and optionally
  also twitter requests to nitter which is similar to invidious, but for
  twitter obviously. I strongly recommend this, but if you are a twitter
  addict, you may want to wait until it is a bit more mature and has anonymous
  account support like invidious.

* [AdNauseam](https://addons.mozilla.org/en-US/firefox/addon/adnauseam/) is the
  best adblocker to truly fuck over ad delivery networks like google, I highly
  recommend
* [DuckDuckGo privacy
  essentials](https://addons.mozilla.org/en-US/firefox/addon/duckduckgo-for-firefox/)
* [Facebook
  Container](https://addons.mozilla.org/en-US/firefox/addon/facebook-container/),
  if you use faceshit

* Others, more for quality of life: [I don't care about
  cookies](https://addons.mozilla.org/en-US/firefox/addon/i-dont-care-about-cookies/),
  [Leechblock](https://addons.mozilla.org/en-US/firefox/addon/leechblock-ng/).

For searching, try to avoid using Google. DuckDuckGo is the best due to its
[!quickbangs](https://duckduckgo.com/bang), but startpage is also a good Google
alternative (they pay Google for the results, though).

# Android apps &c (and, especially, alternatives):

* Google play store - [F-droid](https://f-droid.org) when possible, otherwise
  use [Aurora Store](https://f-droid.org/packages/com.aurora.store/) which
  mirrors Google's store but gives you privacy

* Facebook - [Frost](https://f-droid.org/packages/com.pitchedapps.frost/)
* Youtube (and soundcloud) -
  [NewPipe](https://f-droid.org/packages/org.schabi.newpipe/)
* Google drive/dropbox/similar, also calendar syncing -
  [Nextcloud](https://f-droid.org/en/packages/com.nextcloud.client/)
* Messenger, Whatsapp, SMS - [Signal](https://signal.org/download/) (highly
  recommended) or
  [Telegram](https://f-droid.org/en/packages/org.telegram.messenger/)
* Public transit planning:
  [Öffi](https://f-droid.org/en/packages/de.schildbach.oeffi/)
* Podcasts: [AntennaPod](https://f-droid.org/en/packages/de.danoeh.antennapod)
* Google keep, taking and sharing notes (e.g. shopping list for waifu):
  [Simplenote](https://simplenote.com/)
* 2-factor authentication: [Aegis
  Authenticator](https://f-droid.org/en/packages/com.beemdevelopment.aegis)
* Ad-block: [AdAway](https://f-droid.org/en/packages/org.adaway). You can also
  use the firefox mobile browser and install AdNauseam or other adblocking
  browser plugin, but AdAway covers more ads and is better, though it requires
  root.

# Other

For email, I strongly recommend to not use Google.
[ProtonMail](https://protonmail.com/) or [TutaNota](https://www.tutanota.com/)
are good alternatives.

For writing articles, papers, presentations/slides, books, even letters, I
recommend [Pandoc](https://pandoc.org/). It lets you write in Markdown, which
is a very nice way to represent text content, but at the same time leverage the
powers of Latex for typesetting as well as academic/science stuff like Greek
letters.
