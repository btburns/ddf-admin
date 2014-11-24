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
        .get("http://localhost:8181/admin/index.html")
        .waitForElementByCss('#application-grid-layout div.apps-grids div.apps-grid-container.installed div div:nth-child(1) div div.panel-body div.name-version-container div.name span')
    });

    it("should allow app installation", function() {
      return this.browser
        .get("http://localhost:8181/admin/index.html")
        .waitForElementByCss('#application-grid-buttons div div.application-function-btn div div.btn.edit-toggle').click()
        .waitForElementByCss('#application-grid-layout div.apps-grids div.show-in-edit-mode', asserters.isDisplayed)
        .elementByCss('#application-grid-layout div.apps-grids div.show-in-edit-mode div div div:nth-child(1) div div.panel-body div.card-overlay.bottom.show-in-edit-mode.action-button-group div div span:nth-child(1) i.fa.fa-play.fa-stack-1x.fa-inverse').click()
        .waitForElementByCss('#content-app-startModal', asserters.isDisplayed)
        .elementByCss('#content-app-startModal div div div.modal-footer div button.btn.btn-primary.startAppConfirm', asserters.isDisplayed).click()
        .waitForElementByCss('#application-grid-layout div.apps-grids div.apps-grid-container.installed div div:nth-child(3) div')
    });

    it("should allow app uninstallation", function() {
      return this.browser
        .get("http://localhost:8181/admin/index.html")
        .waitForElementByCss('#application-grid-buttons div div.application-function-btn div div.btn.edit-toggle').click()
        .waitForElementByCss('#application-grid-layout div.apps-grids div.apps-grid-container.installed div div:nth-child(3) div div.panel-body div.card-overlay.bottom.show-in-edit-mode.action-button-group div div span:nth-child(1) i.fa.fa-pause.fa-stack-1x').click()
        .waitForElementByCss('#content-app-stopModal', asserters.isDisplayed)
        .elementByCss('#content-app-stopModal div div div.modal-footer div button.btn.btn-primary.stopAppConfirm').click()
        .waitForElementByCss('#application-grid-layout div.apps-grids div.show-in-edit-mode div div div:nth-child(1) div div.panel-body div.card-overlay.bottom.show-in-edit-mode.action-button-group div div span:nth-child(1) i.fa.fa-play.fa-stack-1x.fa-inverse')
    });

    it("should allow app removals", function() {
      return this.browser
        .get("http://localhost:8181/admin/index.html")
        .waitForElementByCss('#application-grid-buttons div div.application-function-btn div div.btn.edit-toggle').click()
        .waitForElementByCss('#application-grid-layout div.apps-grids div.show-in-edit-mode div div div:nth-child(1) div div.panel-body div.card-overlay.bottom.show-in-edit-mode.action-button-group div div span:nth-child(5)').click()
        .waitForElementByCss('#content-app-removeModal', asserters.isDisplayed)
        .elementByCss('#content-app-removeModal div div div.modal-footer div button.btn.btn-primary.removeAppConfirm').click()
        .waitForElementByCss('#application-grid-layout div.apps-grids div.show-in-edit-mode div div div:nth-child(1) div div.panel-body div.card-overlay.bottom.show-in-edit-mode.action-button-group div div span:nth-child(5)', asserters.isNotDisplayed)
        .elementByCss('#application-outline > div.status-container > div.application-status').text.should.become('Remove complete.')
    });
  });
});
