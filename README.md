# emoji
continuous emoji deployment

### Configuration

```
SLACK_TOKEN
SLACK_SUBDOMAIN # the first part of domain <this>.slack.com
```

### Importing

```
$ ./import
```

### Getting a Slack Token

Open any signed in slack window, e.g. subdomain.slack.com/messages, right click
anywhere > inspect element. Open the console and paste:

```
window.prompt("your api token is: ",/api_token: "(.*)"/.exec(document.body.innerHTML)[1])
```

> You will be prompted with your api token! From what I can tell these last
> anywhere from a few days to indefinitely. Currently, user tokens follow the
> format: xoxs-(\w{12}|\w{10})-(\w{12}|\w{11})-\w{12}-\w{64}


### Weechat autocompletion
Copy the existing file from `./weechat` to your weechat config directory, most likely:
```
$ cp ./weechat/weemoji.json ~/.weechat/
```

To generate new autocomplete file, run the script in `./weechat`. With the new file generated you can copy with the command above.
```
$ ./weechat/generate_json
```
