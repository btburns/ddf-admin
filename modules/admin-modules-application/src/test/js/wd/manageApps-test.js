/*jslint node: true */
/* global describe, it, require */
'use strict';

var shared = require('./shared');
var asserters = shared.asserters;

describe('Admin UI', function() {
	shared.setup(this);

  describe('App Management', function() {
    it("should allow viewing of apps", function() {
      return this.browser
        .get('http://admin:admin@localhost:8181/admin/index.html')
        .title()
          .should.become('Admin Console')
        .waitForElementByCss('div.installed', asserters.isDisplayed)
        .elementByCss('div.edit-toggle', asserters.isDisplayed).click()
        .waitForElementByCss('div.not-installed', asserters.isDisplayed)
    });

    it("should allow app installation", function() {
      return this.browser
        .get('http://admin:admin@localhost:8181/admin/index.html')
        .title()
          .should.become('Admin Console')
        .waitForElementByCss('div.installed')
        .elementByCss('div.edit-toggle', asserters.isDisplayed).click()
        .waitForElementByCss('div.not-installed', asserters.isDisplayed)
        .elementByCss('div.not-installed #content-app-card i.fa-play', asserters.isDisplayed).click()
        .waitForElementByCss('#content-app-startModal', asserters.isDisplayed)
        .elementByCss('#content-app-startModal button.startAppConfirm').click()
        .elementByCss('div.edit-toggle').click()
        .waitForElementByCss('div.not-installed', asserters.isNotDisplayed)
        .waitForElementByCss('div.installed #content-app-card', asserters.isDisplayed)
    });

    it("should allow app uninstallation", function() {
      return this.browser
        .get('http://admin:admin@localhost:8181/admin/index.html')
        .title()
          .should.become('Admin Console')
        .waitForElementByCss('div.installed')
        .elementByCss('div.edit-toggle', asserters.isDisplayed).click()
        .waitForElementByCss('div.not-installed', asserters.isDisplayed)
        .elementByCss('div.installed #content-app-card i.fa-pause', asserters.isDisplayed).click()
        .waitForElementByCss('#content-app-stopModal', asserters.isDisplayed)
        .elementByCss('#content-app-stopModal button.stopAppConfirm').click()
        .waitForElementByCss('div.not-installed #content-app-card', asserters.isDisplayed)
        .elementByCss('div.edit-toggle').click()
        .waitForElementByCss('div.not-installed', asserters.isNotDisplayed)
    });

    it("should allow app removals", function() {
      return this.browser
        .get('http://admin:admin@localhost:8181/admin/index.html')
        .title()
          .should.become('Admin Console')
        .waitForElementByCss('div.installed')
        .elementByCss('div.edit-toggle', asserters.isDisplayed).click()
        .waitForElementByCss('div.not-installed', asserters.isDisplayed)
        .elementByCss('div.not-installed #content-app-card i.fa-trash', asserters.isDisplayed).click()
        .waitForElementByCss('#content-app-removeModal', asserters.isDisplayed)
        .elementByCss('#content-app-removeModal button.removeAppConfirm').click()
        .waitForElementByCss('div.not-installed #content-app-card').should.eventually.be.null
    });
    
    it("should allow app additions", function() {
      return this.browser
    });
    
  });
});
