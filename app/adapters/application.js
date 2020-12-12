import ActiveModelAdapter from 'active-model-adapter';
import ENV from 'content-tagger/config/environment';
import TokenAdapterMixin from 'ember-simple-auth-token/mixins/token-adapter';

const { apiHost } = ENV.APP;

export default class ApplicationAdapter extends ActiveModelAdapter.extend(TokenAdapterMixin) {
  // namespace = apiNamespace;
  host = apiHost;
}
