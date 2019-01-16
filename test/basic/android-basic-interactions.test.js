'use strict';

import wd from 'wd';
import chai from 'chai';
import { androidCaps, serverConfig } from '../helpers/caps';
const { assert } = chai;

let driver;

describe('Basic Android interactions', function () {

  before(async () => {
    // Connect to Appium server
    driver = await wd.promiseChainRemote(serverConfig);

    // Start the session
    await driver.init({
      ...androidCaps,
      app: require('../helpers/apps').androidApiDemos
    });
  });

  after(async () => {
    await driver.quit();
  });

  it('Simple android test', async () => {
    const termCheckBox = await driver.waitForElementById('com.byteexperts.texteditor:id/acceptButton');
    await termCheckBox.click();

    const confirm = await driver.waitForElementById('com.android.packageinstaller:id/permission_allow_button');
    await confirm.click();

    const newFilleButton = await driver.waitForElementByXPath('//android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.LinearLayout[2]/android.widget.Button');
    await newFilleButton.click();

    const title = await driver.elementById('com.byteexperts.texteditor:id/editor');
    await title.sendKeys('ggwp');

    const save = await driver.elementById('com.byteexperts.texteditor:id/actionDone');
    await save.click();

    await driver.sleep(100);
    const newFileText = await driver.elementById('com.byteexperts.texteditor:id/filename');

    const text = newFileText.text((err, text) => {
      assert.equal(text, 'Новий файл');
    });
  });
});
