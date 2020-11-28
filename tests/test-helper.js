import Application from 'content-tagger-frontend/app';
import config from 'content-tagger-frontend/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
