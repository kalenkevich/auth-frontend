import fetch from 'unfetch';
import ApolloClient from 'apollo-boost';
import { InMemoryCache } from 'apollo-cache-inmemory';
import settings from '../../config/settings';
import NotificationService from './NotificationService';

const defaultClientConfig = {
  uri: `${settings.BackendUrl}/graphql`,
  cache: new InMemoryCache({
    addTypename: true,
  }),
  credentials: 'include',
  fetch,
};

class ApolloClientWrapper {
  constructor() {
    this.setupNewClient(defaultClientConfig);
  }

  setupNewClient(clientConfig) {
    this.apolloClient = new ApolloClient(clientConfig);
  }

  setHeaders(headers) {
    this.setupNewClient({
      ...defaultClientConfig,
      headers,
    });
  }

  async mutate(...rest) {
    try {
      const { data } = await this.apolloClient.mutate(...rest);

      return data;
    } catch (e) {
      const { graphQLErrors: [error] } = e;

      if (error) {
        NotificationService.showErrorNotification(error.message);

        throw error;
      } else {
        throw e;
      }
    }
  }

  async query(...rest) {
    try {
      const result = await this.apolloClient.query(...rest);

      return result.data;
    } catch (e) {
      const { graphQLErrors: [error] } = e;

      if (error) {
        NotificationService.showErrorNotification(error.message);

        throw error;
      } else {
        throw e;
      }
    }
  }

  async watchQuery(...rest) {
    try {
      const { data } = await this.apolloClient.watchQuery(...rest);

      return data;
    } catch (e) {
      const { graphQLErrors: [error] } = e;

      if (error) {
        NotificationService.showErrorNotification(error.message);

        throw error;
      } else {
        throw e;
      }
    }
  }
}

const apolloClientWrapper = new ApolloClientWrapper();

export default apolloClientWrapper;
