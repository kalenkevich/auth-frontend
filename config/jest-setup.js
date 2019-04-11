/* eslint-disable import/no-extraneous-dependencies */
import { configure } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

// jest.mock('react-i18next', () => ({
//   // eslint-disable-next-line arrow-parens
//   translate: () => Component => {
//     // eslint-disable-next-line no-param-reassign
//     Component.defaultProps = { ...Component.defaultProps, t: k => k };
//     return Component;
//   },
// }));

configure({ adapter: new EnzymeAdapter() });
