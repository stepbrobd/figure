# Figure

Forked from
[`markdown-it-lazy-loading`](https://github.com/ruanyf/markdown-it-image-lazy-loading).

## Usage

See
[`markdown-it-lazy-loading`](https://github.com/ruanyf/markdown-it-image-lazy-loading)
for usage.

Additional usage:

```javascript
md.use(lazy_loading, {
  image_size: true,
  base_path: __dirname + "src/",
  figure: true,
});

md.render(`![](example.png "image title")`);
// <p>`<figure><img src="example.png" alt="" title="image title" loading="lazy" width="100" height="100"><figcaption>image title</figcaption></figure></p>\n
```

## License

All contents inside this repository, excluding submodules, are licensed under
the [MIT License](license.txt). Third-party file(s) and/or code(s) are subject
to their original term(s) and/or license(s).
