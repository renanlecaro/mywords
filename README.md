# My words

This is a simple words learning app made because I was frustrated
by the current offering.

![Training](./src/assets/screenshots/1.jpg)

It's meant to be free and ad free, and to stay simple. The main target
is students having russian classes (like me) that need to learn specific
vocabulary over time. 

All the critical features should be avaliable offline and with only
the static files. Additional features (smarter suggestions, self 
improving word list ..) can rely on a cheap heroku instance.

The app only targets phones because it's much easier to get a 
cyrillic keyboard there.

PRs and issues are welcome.

## Technical details

- Based on [Preact CLI](https://github.com/developit/preact-cli/blob/master/README.md).

- We embed some english/russian dictionnary in the source code as json,
  the search (when looking for a word to add to the list) happens in 
  a web worker to keep things smooth UI side.

- We use a virtual table to show the words list

- The TTS is delegated to the browser, seems to work fine in firefox
  and chrome on android.
   

## Development

``` bash
npm install

# serve with hot reload at localhost:8080
npm start

```
