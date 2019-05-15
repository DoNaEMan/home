import loadable from '@loadable/component';

import Loading from '../../components/common/Loading/index';
import { loaddata } from './service';

export default [{
  path: '/index',
  exact: true,
  component: loadable(() => import('./A')),
  loaddata,
}];