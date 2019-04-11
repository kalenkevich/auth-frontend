import { makeBackendGraphQLConnector } from '@zenvo/core-ui';
import Settings from '../../config/settings';

export default makeBackendGraphQLConnector(`${Settings.BackendUrl}/graphql`);
