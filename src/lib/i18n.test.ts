import assert from "node:assert/strict";
import { test } from "node:test";
import { APP_LANGS, detectBrowserLang, isAppLang, messages, weightName } from "./i18n.ts";

test("detects browser languages", () => {
  assert.equal(detectBrowserLang("ko-KR"), "ko");
  assert.equal(detectBrowserLang("ja"), "ja");
  assert.equal(detectBrowserLang("zh-CN"), "zh-CN");
  assert.equal(detectBrowserLang("zh-TW"), "zh-TW");
  assert.equal(detectBrowserLang("zh-HK"), "zh-TW");
  assert.equal(detectBrowserLang("en-US"), "en");
  assert.equal(detectBrowserLang("fr-FR"), "ko");
});

test("every app language has a complete dictionary", () => {
  const keys = Object.keys(messages("ko"));
  for (const { id } of APP_LANGS) {
    assert.equal(isAppLang(id), true);
    const dict = messages(id);
    for (const key of keys) {
      const value = dict[key as keyof typeof dict];
      assert.notEqual(value, undefined, `${id}.${key}`);
    }
    assert.ok(dict.themes.hanji?.name);
    assert.match(dict.openedFile("a.md"), /a\.md/);
    assert.ok(dict.untitledDocument.length > 0);
    assert.ok(dict.appTitle.length > 0);
  }
});

test("weight names follow the 100-step scale", () => {
  assert.equal(weightName(300, "ko"), "가늘게");
  assert.equal(weightName(400, "ko"), "보통");
  assert.equal(weightName(700, "en"), "Bold");
});
