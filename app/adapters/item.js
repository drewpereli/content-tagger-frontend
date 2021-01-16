/* eslint-disable ember/no-mixins */
import ApplicationAdapter from './application';
import { isArray } from '@ember/array';
// import FormDataAdapterMixin from 'ember-cli-form-data/mixins/form-data-adapter';

export default class ItemAdapter extends ApplicationAdapter {
  // Overwrite to change the request types on which Form Data is sent
  formDataTypes = ['POST', 'PUT', 'PATCH'];

  // Overwrite to flatten the form data by removing the root
  disableRoot = false;

  ajaxOptions(url, type, options) {
    if (type === 'GET') {
      return super.ajaxOptions.apply(this, arguments);
    }

    let data;

    if (options && 'data' in options) {
      data = options.data;
    }

    let hash = super.ajaxOptions.apply(this, arguments);

    if (typeof FormData !== 'undefined' && data && this.formDataTypes.indexOf(type) >= 0) {
      hash.processData = false;
      hash.contentType = false;
      if (typeof hash.headers !== 'undefined') {
        delete hash.headers['content-type'];
      }
      hash.data = this._getFormData(data);
    }

    hash.body = hash.data;
    return hash;
  }

  _getFormData(data) {
    let formData = new FormData();
    if (this.disableRoot) {
      let root = Object.keys(data)[0];
      Object.keys(data[root]).forEach(function (key) {
        this._appendValue(data[root][key], key, formData);
      }, this);
    } else {
      // Handle >1 root key:
      Object.keys(data).forEach(function (root) {
        this._appendValue(data[root], root, formData);
      }, this);
    }

    return formData;
  }

  _appendValue(value, formKey, formData) {
    if (isArray(value)) {
      value.forEach(function (item) {
        this._appendValue(item, `${formKey}[]`, formData);
      }, this);
    } else if (value && value.constructor === Object) {
      Object.keys(value).forEach(function (key) {
        this._appendValue(value[key], `${formKey}[${key}]`, formData);
      }, this);
    } else if (typeof value !== 'undefined') {
      formData.append(formKey, value === null ? '' : value);
    }
  }
}
