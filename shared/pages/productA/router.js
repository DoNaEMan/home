import loadable from '@loadable/component';

import Loading from '../../components/Loading';
import { loaddata } from './service';

export default [{
  path: '/index',
  exact: true,
  component: loadable(() => import('./A')),
  loaddata,
}];