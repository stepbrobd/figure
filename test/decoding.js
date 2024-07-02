var test = require("tape");

var md = require("markdown-it")();
var lazy_loading = require("../index.js");
md.use(lazy_loading, {
  decoding: true,
});

test("decoding test", function (t) {
  t.plan(1);

  t.equal(
    md.render(`![](example.png "image title")`),
    '<p><img src="example.png" alt="" title="image title" loading="lazy" decoding="async"></p>\n',
  );
});
