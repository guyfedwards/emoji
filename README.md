# emoji
continuous emoji deployment

### configuration
config is done through the following env vars:
```
SLACK_EMAIL
SLACK_PASSWORD
SLACK_SUBDOMAIN # the first part of domain <this>.slack.com
```

### importing
you can run `scripts/import` to kick off the upload of `default.yaml`
```
$./scripts/import
```

### generate yaml file
You can generate a yaml file to use for bulk upload with [emojipacks](https://github.com/lambtron/emojipacks).
```
$ ./generate-yaml.js <emojipack title> <path to yaml> <emoji dir>
```
