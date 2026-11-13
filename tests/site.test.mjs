import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

const html = await readFile(
  new URL("../dist/index.html", import.meta.url),
  "utf8",
);
const values = (pattern) => [...html.matchAll(pattern)].map((m) => m[1]);

test("page has one h1 with spaced words, a title and a description", () => {
  assert.equal(html.match(/<h1[\s>]/g)?.length, 1);
  assert.match(html, /Code review<\/span> <span/);
  assert.match(html, /<title>[^<]+<\/title>/);
  assert.match(html, /<meta name="description" content="[^"]+"/);
});

test("every in-page link and label points at an element on the page", () => {
  const ids = new Set(values(/\sid="([^"]+)"/g));
  const targets = [
    ...values(/\shref="#([^"]+)"/g),
    ...values(/\saria-labelledby="([^"]+)"/g),
  ];
  assert.ok(targets.length > 0);
  for (const target of targets) {
    assert.ok(ids.has(target), `#${target} has no matching id`);
  }
});

test("page loads nothing from another origin", () => {
  const loaded = values(/<(?:script|link|img)\b[^>]*\s(?:src|href)="([^"]+)"/g);
  assert.ok(loaded.length > 0);
  for (const url of loaded) {
    assert.doesNotMatch(url, /^(?:[a-z]+:)?\/\//i, `${url} is off-site`);
  }
});

test("content security policy limits the page to its own origin", () => {
  const policy = values(
    /<meta http-equiv="content-security-policy" content="([^"]+)"/gi,
  );
  assert.equal(policy.length, 1);
  assert.match(policy[0], /default-src 'self'/);
  assert.doesNotMatch(policy[0], /https?:|\*|'unsafe-|data:|blob:/);
});

test("bottom footer bar credits Ashish Patel with a link to the GitHub profile", () => {
  assert.match(
    html,
    /class="site-footer__legal"[\s\S]*Made with[\s\S]{0,200}love[\s\S]{0,40}by <a[^>]*href="https:\/\/github\.com\/ashishpatelcs"[^>]*>Ashish Patel<\/a>/,
  );
});

test("primary pilot button opens an email to the pilot address", () => {
  assert.match(
    html,
    /class="btn btn--primary"[^>]*href="mailto:hello@nitwise\.com\?subject=[^"]+"/,
  );
});
