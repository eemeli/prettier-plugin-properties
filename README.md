# Prettier for .properties Files

Adds support to Prettier (v2.3 and later) for [`.properties`](https://en.wikipedia.org/wiki/.properties) files. To use, just install it:

```
npm install --save-dev prettier-plugin-properties
```

Prettier should then automatically detect and use the `'dot-properties'` parser for `.properties` files.

For more information, see [Prettier plugins documentation](https://prettier.io/docs/en/plugins.html).

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

## Prettier Overrides

By default, the plugin will use your Prettier configuration. For example that the lines will automatically wrap based on the `printWidth` option. To disable this you can simply add the following Prettier override:

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
