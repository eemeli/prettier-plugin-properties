# Prettier for .properties Files

Adds support to Prettier (v2.3 and later) for [`.properties`](https://en.wikipedia.org/wiki/.properties) files.
To use, install it:

```
npm install --save-dev prettier-plugin-properties
```

and then add it to your [Prettier plugin configuration](https://prettier.io/docs/plugins).

## Configuration

In addition to the default options, two additional options are available:

### Escape Non-Latin-1 Characters

Escape with `\u` all non-Latin-1 characters, to allow safely encoding output as ISO-8859-1.

| Default | CLI Override          | API Override              |
| ------- | --------------------- | ------------------------- |
| `false` | `--escape-non-latin1` | `escapeNonLatin1: <bool>` |

### Key Separator

Set the separator to use between a property key and its value.

Valid options:<br>
`" " | ":" | "=" | ": " | "= " | " : " | " = "`

| Default | CLI Override              | API Override            |
| ------- | ------------------------- | ----------------------- |
| `" = "` | `--key-separator "<sep>"` | `keySeparator: "<sep>"` |

### Using Overrides

To apply separate Prettier configuration for different file types,
you may use [configuration overrides](https://prettier.io/docs/configuration.html#configuration-overrides).
For example:

```json
{
  "overrides": [
    {
      "files": "*.properties",
      "options": {
        "printWidth": 0
      }
    }
  ]
}
```
