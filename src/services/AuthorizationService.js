import { makeAuthorizationService } from '@zenvo/core-ui';
import Settings from '../../config/settings';

export default makeAuthorizationService(`${Settings.BackendUrl}/graphql`);
